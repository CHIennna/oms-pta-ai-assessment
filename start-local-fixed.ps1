$ErrorActionPreference = 'Stop'

function ConvertTo-PlainText([Security.SecureString]$SecureValue) {
  $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureValue)
  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
  }
}

function Read-FixedAccount([int]$Number) {
  do {
    $account = (Read-Host "Enter account $Number").Trim()
    if ($account -notmatch '^[A-Za-z0-9_-]{3,32}$') {
      Write-Host 'Account must contain 3-32 letters, digits, underscores, or hyphens.' -ForegroundColor Yellow
    }
  } until ($account -match '^[A-Za-z0-9_-]{3,32}$')

  do {
    $securePassword = Read-Host "Enter password for account $Number (input is hidden)" -AsSecureString
    $password = ConvertTo-PlainText $securePassword
    if ($password.Length -lt 1 -or $password.Length -gt 128) {
      Write-Host 'Password must contain 1-128 characters.' -ForegroundColor Yellow
    }
  } until ($password.Length -ge 1 -and $password.Length -le 128)

  return @{ account = $account; password = $password; nickname = "User $Number" }
}

$accounts = @()
try {
  Write-Host 'Local fixed-login setup. Credentials are kept in memory and are not written to files.' -ForegroundColor Cyan
  $accounts = @(
    Read-FixedAccount 1
    Read-FixedAccount 2
  )
  if ($accounts[0].account -eq $accounts[1].account) {
    throw 'The two accounts must be different.'
  }

  $env:OMS_FIXED_USERS_JSON = ConvertTo-Json $accounts -Compress
  $env:PORT = '4176'
  Write-Host 'Starting local service: http://127.0.0.1:4176/' -ForegroundColor Green
  Write-Host 'Keep this window open. Closing it stops the local service.' -ForegroundColor Yellow
  node server.js
} finally {
  Remove-Item Env:OMS_FIXED_USERS_JSON -ErrorAction SilentlyContinue
  Remove-Item Env:PORT -ErrorAction SilentlyContinue
  $accounts = $null
  $password = $null
  $securePassword = $null
}
