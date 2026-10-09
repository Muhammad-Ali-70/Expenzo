# Renders framed 1080x1920 Play Store screenshots from screenshots/raw into screenshots/framed.
# Edit the list below to change order, captions or images, then run: .\render-screenshots.ps1
$shots = @(
  @{ out = '1-home';        img = 'home.png';        title = 'Know where every<br><em>rupee</em> goes' },
  @{ out = '2-udhar';       img = 'udhar.png';       title = 'Never forget<br>an <em>udhar</em>' },
  @{ out = '3-add-expense'; img = 'add-expense.png'; title = 'Log your <em>kharcha</em><br>in seconds' },
  @{ out = '4-budget';      img = 'budget.png';      title = 'Stay within your<br><em>monthly budget</em>' },
  @{ out = '5-history';     img = 'history.png';     title = 'Every transaction,<br><em>in one place</em>' },
  @{ out = '6-templates';   img = 'templates.png';   title = 'Start fast with<br><em>budget templates</em>' }
)

$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$root = $PSScriptRoot -replace '\\', '/'

foreach ($s in $shots) {
  $q = 'img=' + [uri]::EscapeDataString("screenshots/raw/$($s.img)") + '&title=' + [uri]::EscapeDataString($s.title)
  $png = Join-Path $PSScriptRoot "screenshots\framed\$($s.out).png"
  & $chrome --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 `
    --window-size=1080,1920 --virtual-time-budget=3000 --screenshot="$png" `
    "file:///$root/screenshot-frame.html?$q" 2>$null | Out-Null
  Write-Output "rendered $($s.out).png"
}
