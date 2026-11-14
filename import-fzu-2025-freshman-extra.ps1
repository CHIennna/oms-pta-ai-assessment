param(
  [Parameter(Mandatory = $true)]
  [string]$PackagePath,
  [string]$ProjectRoot = $PSScriptRoot
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem

function Read-ZipEntryText {
  param(
    [System.IO.Compression.ZipArchive]$Archive,
    [string]$EntryName
  )
  $entry = $Archive.GetEntry($EntryName)
  if (-not $entry) { throw "压缩包内缺少文件：$EntryName" }
  $reader = [System.IO.StreamReader]::new($entry.Open(), [System.Text.Encoding]::UTF8)
  try { return $reader.ReadToEnd() } finally { $reader.Dispose() }
}

function Copy-ZipEntry {
  param(
    [System.IO.Compression.ZipArchiveEntry]$Source,
    [System.IO.Compression.ZipArchive]$Target,
    [string]$TargetName
  )
  $targetEntry = $Target.CreateEntry($TargetName, [System.IO.Compression.CompressionLevel]::Optimal)
  $sourceStream = $Source.Open()
  $targetStream = $targetEntry.Open()
  try { $sourceStream.CopyTo($targetStream) } finally { $targetStream.Dispose(); $sourceStream.Dispose() }
}

$package = [System.IO.Compression.ZipFile]::OpenRead((Resolve-Path -LiteralPath $PackagePath))
try {
  $readmeEntry = $package.Entries | Where-Object { $_.FullName -match '/README\.md$' } | Select-Object -First 1
  if (-not $readmeEntry) { throw '导入包缺少 README.md' }
  $rootPrefix = $readmeEntry.FullName.Substring(0, $readmeEntry.FullName.Length - 'README.md'.Length)

  $testArchiveName = 'fzu-2025-freshman-extra-tests.zip'
  $testArchivePath = Join-Path $ProjectRoot $testArchiveName
  $targetStream = [System.IO.File]::Create($testArchivePath)
  $targetArchive = [System.IO.Compression.ZipArchive]::new($targetStream, [System.IO.Compression.ZipArchiveMode]::Create)
  try {
    $difficultyById = @{
      P01 = '入门'
      P02 = '入门'
      P03 = '入门'
      P04 = '入门'
      P05 = '入门'
      P06 = '入门'
      P07 = '普及-'
      P08 = '普及-'
      P09 = '普及+/提高-'
    }
    $titleById = @{
      P06 = 'fuzhouU 大写转换'
    }
    $questions = @()
    for ($position = 1; $position -le 11; $position++) {
      $code = 'P{0:D2}' -f $position
      if ($position -ge 10) {
        $noticeEntry = $package.Entries | Where-Object { $_.FullName -match "^$([regex]::Escape($rootPrefix))$code`_[^/]+/说明\.md$" } | Select-Object -First 1
        if (-not $noticeEntry) { throw "导入包缺少 $code 的资料缺失说明" }
        $questions += [ordered]@{
          id = $code
          name = '资料缺失'
          title = '资料缺失'
          score = 0
          tests = 0
          sampleInput = ''
          sampleOutput = ''
          statement = (Read-ZipEntryText $package $noticeEntry.FullName).Trim()
          judgeable = $false
          missingReason = '现有来源未提供该题题名、题面、输入输出格式及测试点。'
          difficulty = '待定'
        }
        continue
      }
      $folderEntry = $package.Entries | Where-Object { $_.FullName -match "^$([regex]::Escape($rootPrefix))$code`_[^/]+/配置\.json$" } | Select-Object -First 1
      if (-not $folderEntry) { throw "导入包缺少 $code 的配置文件" }
      $folderPrefix = $folderEntry.FullName.Substring(0, $folderEntry.FullName.Length - '配置.json'.Length)
      $config = (Read-ZipEntryText $package $folderEntry.FullName) | ConvertFrom-Json
      $title = if ($titleById.ContainsKey($code)) { [string]$titleById[$code] } else { [string]$config.title }
      $statement = Read-ZipEntryText $package "${folderPrefix}题面.md"
      $cases = @()
      for ($testIndex = 1; $testIndex -le [int]$config.testcases; $testIndex++) {
        $number = '{0:D2}' -f $testIndex
        $inputEntryName = "${folderPrefix}tests/$number.in"
        $outputEntryName = "${folderPrefix}tests/$number.out"
        $input = (Read-ZipEntryText $package $inputEntryName).TrimEnd()
        $expected = (Read-ZipEntryText $package $outputEntryName).TrimEnd()
        $cases += [ordered]@{
          input = $input
          expected = $expected
          score = [int]$config.points_per_testcase
        }
        Copy-ZipEntry $package.GetEntry($inputEntryName) $targetArchive "$code/$number.in"
        Copy-ZipEntry $package.GetEntry($outputEntryName) $targetArchive "$code/$number.out"
      }
      $questions += [ordered]@{
        id = $code
        name = $title
        title = $title
        score = [int]$config.score
        tests = [int]$config.testcases
        sampleInput = [string]$cases[0].input
        sampleOutput = [string]$cases[0].expected
        statement = $statement.Trim()
        testCases = $cases
        timeLimitMs = [int]$config.time_limit_ms
        memoryLimitMB = [int]$config.memory_limit_mb
        judgeable = $true
        difficulty = [string]$difficultyById[$code]
      }
    }
  } finally {
    $targetArchive.Dispose()
    $targetStream.Dispose()
  }
} finally {
  $package.Dispose()
}

$exam = [ordered]@{
  examVersion = '2025-transfer-major-freshman-extra-exam'
  title = '2025计算机转专业机试（大一加赛）'
  duration = 90
  totalScore = 900
  participants = 2
  startAt = '2025-12-01T19:00'
  endAt = '2025-12-01T20:30'
  author = '本站集备组'
  category = 'past'
  date = '2025-12-01'
  status = '历年卷'
  testArchive = $testArchiveName
  questions = $questions
}

$json = $exam | ConvertTo-Json -Depth 12 -Compress
$script = @"
(function () {
  const exam = $json;
  const archive = Array.isArray(window.OMS_EXAM_ARCHIVE) ? window.OMS_EXAM_ARCHIVE : [];
  const index = archive.findIndex(item => item.examVersion === exam.examVersion);
  const numbered = window.OMS_NUMBER_EXAM ? window.OMS_NUMBER_EXAM(exam, archive) : exam;
  if (index >= 0) archive[index] = numbered;
  else archive.push(numbered);
  window.OMS_EXAM_ARCHIVE = archive;
})();
"@

$outputPath = Join-Path $ProjectRoot 'src\data\exams\fzu-2025-freshman-extra.js'
[System.IO.File]::WriteAllText($outputPath, $script, [System.Text.UTF8Encoding]::new($false))
Write-Host "Generated $outputPath with $($questions.Count) questions and $((@($questions | ForEach-Object { $_.tests }) | Measure-Object -Sum).Sum) test points."
