param(
  [Parameter(Mandatory = $true)]
  [string]$PackagePath,
  [string]$ProjectRoot = $PSScriptRoot
)

$ErrorActionPreference = 'Stop'
$utf8 = [System.Text.UTF8Encoding]::new($false)
Add-Type -AssemblyName System.IO.Compression.FileSystem

function Read-ZipEntryText {
  param($Archive, [string]$Name)
  $entry = $Archive.Entries | Where-Object FullName -eq $Name | Select-Object -First 1
  if (-not $entry) { throw "Import package is missing $Name" }
  $reader = [System.IO.StreamReader]::new($entry.Open(), [System.Text.Encoding]::UTF8)
  try { return $reader.ReadToEnd() } finally { $reader.Dispose() }
}

function Read-FencedSample {
  param([string]$Statement, [string]$Heading)
  $pattern = '(?s)#{1,6}\s*' + [regex]::Escape($Heading) + '.*?```(?:text)?\s*(.*?)\s*```'
  $match = [regex]::Match($Statement, $pattern)
  if ($match.Success) { return $match.Groups[1].Value.Trim() }
  return $null
}

$package = [System.IO.Compression.ZipFile]::OpenRead($PackagePath)
try {
  $config = Read-ZipEntryText $package 'OMS配置.json' | ConvertFrom-Json
  $testEntry = $package.Entries | Where-Object FullName -eq '2025大一计算机机试_80个测试点.zip' | Select-Object -First 1
  if (-not $testEntry) { throw 'Import package is missing the test archive.' }

  $testArchiveName = 'fzu-2025-freshman-cs-tests.zip'
  $testArchivePath = Join-Path $ProjectRoot $testArchiveName
  $source = $testEntry.Open()
  $target = [System.IO.File]::Create($testArchivePath)
  try { $source.CopyTo($target) } finally { $target.Dispose(); $source.Dispose() }

  $tests = [System.IO.Compression.ZipFile]::OpenRead($testArchivePath)
  try {
    $difficultyById = @{
      P1 = '入门'
      P2 = '普及-'
      P3 = '入门'
      P4 = '普及-'
      P5 = '普及-'
      P6 = '普及-'
      P7 = '普及'
      P8 = '普及-'
    }
    $tagsById = @{
      P1 = @('基础算术')
      P2 = @('日期模拟', '闰年')
      P3 = @('顺序模拟', '环形数组')
      P4 = @('二维枚举', '前缀和', '排序')
      P5 = @('排序', '基础贪心')
      P6 = @('蛇形遍历', '排序')
      P7 = @('字符串解析', '表达式模拟')
      P8 = @('排序', '贪心不变量')
    }
    $questions = @()
    foreach ($question in $config.questions) {
      $statement = Read-ZipEntryText $package $question.statementFile
      $cases = @()
      for ($index = 1; $index -le [int]$question.testArchive.count; $index++) {
        $number = $index.ToString('00')
        $input = (Read-ZipEntryText $tests "$($question.testArchive.prefix)/$number.in").TrimEnd()
        $expected = (Read-ZipEntryText $tests "$($question.testArchive.prefix)/$number.out").TrimEnd()
        $cases += [ordered]@{ input = $input; expected = $expected; score = [int]$question.testArchive.score }
      }
      $sampleInput = Read-FencedSample $statement '样例输入'
      $sampleOutput = Read-FencedSample $statement '样例输出'
      if (-not $sampleInput) { $sampleInput = $cases[0].input }
      if (-not $sampleOutput) { $sampleOutput = $cases[0].expected }
      $questions += [ordered]@{
        id = [string]$question.id
        name = [string]$question.title
        title = [string]$question.title
        score = [int]$question.score
        tests = $cases.Count
        sampleInput = $sampleInput
        sampleOutput = $sampleOutput
        statement = $statement.Trim()
        testCases = $cases
        timeLimitMs = [int]$question.timeLimitMs
        memoryLimitMB = [int]$question.memoryLimitMB
        judgeable = $true
        difficulty = [string]$difficultyById[[string]$question.id]
        tags = @($tagsById[[string]$question.id])
      }
    }
  } finally {
    $tests.Dispose()
  }
} finally {
  $package.Dispose()
}

$exam = [ordered]@{
  examVersion = '2025-transfer-major-freshman-exam'
  title = '2025计算机转专业机试（大一）'
  duration = 120
  totalScore = 800
  participants = 186
  startAt = '2025-12-01T19:00'
  endAt = '2025-12-01T21:00'
  author = '本站集备组'
  category = 'past'
  date = '2025-12-01'
  status = '历年卷'
  testArchive = $testArchiveName
  questions = $questions
}

$json = $exam | ConvertTo-Json -Depth 100 -Compress
$javascript = @"
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

$outputPath = Join-Path $ProjectRoot 'src\data\exams\fzu-2025-freshman-cs.js'
[System.IO.File]::WriteAllText($outputPath, $javascript, $utf8)
Write-Output "Generated $outputPath with $($questions.Count) questions and $((@($questions | ForEach-Object tests) | Measure-Object -Sum).Sum) test points."
