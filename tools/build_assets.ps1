param(
  [string]$LogoSource = "C:\Users\Hans\Desktop\WhatsApp Image 2026-05-21 at 12.04.42.jpeg",
  [string]$OutputDir = "assets"
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Drawing.Common -ErrorAction SilentlyContinue

function New-Color($hex) {
  return [System.Drawing.ColorTranslator]::FromHtml($hex)
}

function Get-Distance($a, $b) {
  $dr = [int]$a.R - [int]$b.R
  $dg = [int]$a.G - [int]$b.G
  $db = [int]$a.B - [int]$b.B
  return [math]::Sqrt(($dr * $dr) + ($dg * $dg) + ($db * $db))
}

function Test-BackgroundPixel($pixel, $background) {
  return (Get-Distance $pixel $background) -lt 52
}

function New-TransparentLogo($sourcePath, $outputPath) {
  if (!(Test-Path -LiteralPath $sourcePath)) {
    throw "Logo source not found: $sourcePath"
  }

  $source = [System.Drawing.Bitmap]::FromFile($sourcePath)
  try {
    $width = $source.Width
    $height = $source.Height
    $background = $source.GetPixel(0, 0)
    $pixelCount = $width * $height
    $remove = New-Object bool[] $pixelCount
    $visited = New-Object bool[] $pixelCount
    $queue = New-Object int[] $pixelCount
    $head = 0
    $tail = 0

    function Add-Point([int]$x, [int]$y) {
      if ($x -lt 0 -or $y -lt 0 -or $x -ge $width -or $y -ge $height) { return }
      $index = ($y * $width) + $x
      if ($visited[$index]) { return }
      $visited[$index] = $true
      $pixel = $source.GetPixel($x, $y)
      if (Test-BackgroundPixel $pixel $background) {
        $remove[$index] = $true
        $script:queue[$script:tail] = $index
        $script:tail++
      }
    }

    for ($x = 0; $x -lt $width; $x++) {
      Add-Point $x 0
      Add-Point $x ($height - 1)
    }

    for ($y = 0; $y -lt $height; $y++) {
      Add-Point 0 $y
      Add-Point ($width - 1) $y
    }

    while ($head -lt $tail) {
      $index = $queue[$head]
      $head++
      $x = $index % $width
      $y = [math]::Floor($index / $width)
      Add-Point ($x + 1) $y
      Add-Point ($x - 1) $y
      Add-Point $x ($y + 1)
      Add-Point $x ($y - 1)
    }

    $transparent = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $minX = $width
    $minY = $height
    $maxX = 0
    $maxY = 0

    for ($y = 0; $y -lt $height; $y++) {
      for ($x = 0; $x -lt $width; $x++) {
        $index = ($y * $width) + $x
        $pixel = $source.GetPixel($x, $y)
        $alpha = 255

        if ($remove[$index]) {
          $alpha = 0
        } else {
          $nearRemoved = $false
          foreach ($offset in @(-1, 1, -$width, $width)) {
            $neighbor = $index + $offset
            if ($neighbor -ge 0 -and $neighbor -lt $pixelCount -and $remove[$neighbor]) {
              $nearRemoved = $true
            }
          }
          $distance = Get-Distance $pixel $background
          if ($nearRemoved -and $distance -lt 110) {
            $alpha = [math]::Max(0, [math]::Min(255, [int](($distance - 52) * 4.4)))
          }
        }

        $transparent.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $pixel.R, $pixel.G, $pixel.B))

        if ($alpha -gt 8) {
          if ($x -lt $minX) { $minX = $x }
          if ($y -lt $minY) { $minY = $y }
          if ($x -gt $maxX) { $maxX = $x }
          if ($y -gt $maxY) { $maxY = $y }
        }
      }
    }

    $padding = 12
    $cropX = [math]::Max(0, $minX - $padding)
    $cropY = [math]::Max(0, $minY - $padding)
    $cropW = [math]::Min($width - $cropX, ($maxX - $minX) + ($padding * 2))
    $cropH = [math]::Min($height - $cropY, ($maxY - $minY) + ($padding * 2))
    $crop = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $final = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($final)
    try {
      $graphics.DrawImage($transparent, (New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)), $crop, [System.Drawing.GraphicsUnit]::Pixel)
      $final.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    } finally {
      $graphics.Dispose()
      $final.Dispose()
      $transparent.Dispose()
    }
  } finally {
    $source.Dispose()
  }
}

function New-HeroImage($path) {
  $width = 1600
  $height = 1000
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  try {
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
      (New-Object System.Drawing.Rectangle(0, 0, $width, $height)),
      (New-Color "#172a42"),
      (New-Color "#f7f9f6"),
      35
    )
    $g.FillRectangle($bg, 0, 0, $width, $height)
    $bg.Dispose()

    $sunBrush = New-Object System.Drawing.SolidBrush((New-Color "#f0bf3c"))
    $g.FillEllipse($sunBrush, 1110, 90, 260, 260)

    $groundBrush = New-Object System.Drawing.SolidBrush((New-Color "#203149"))
    $g.FillRectangle($groundBrush, 0, 760, $width, 240)

    $roofBrush = New-Object System.Drawing.SolidBrush((New-Color "#2f3141"))
    $roof = [System.Drawing.Point[]]@(
      (New-Object System.Drawing.Point(170, 660)),
      (New-Object System.Drawing.Point(760, 410)),
      (New-Object System.Drawing.Point(1380, 660)),
      (New-Object System.Drawing.Point(1305, 745)),
      (New-Object System.Drawing.Point(240, 745))
    )
    $g.FillPolygon($roofBrush, $roof)

    $panelBrush = New-Object System.Drawing.SolidBrush((New-Color "#213f6a"))
    $panelLine = New-Object System.Drawing.Pen((New-Color "#d9f3ff"), 5)
    for ($i = 0; $i -lt 5; $i++) {
      $x = 410 + ($i * 145)
      $panel = [System.Drawing.Point[]]@(
        (New-Object System.Drawing.Point($x, 540)),
        (New-Object System.Drawing.Point($x + 120, 492)),
        (New-Object System.Drawing.Point($x + 165, 595)),
        (New-Object System.Drawing.Point($x + 45, 646))
      )
      $g.FillPolygon($panelBrush, $panel)
      $g.DrawPolygon($panelLine, $panel)
    }

    $pipePen = New-Object System.Drawing.Pen((New-Color "#74b84a"), 34)
    $pipePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pipePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawBezier($pipePen, 210, 820, 500, 705, 610, 900, 940, 780)

    $waterBrush = New-Object System.Drawing.SolidBrush((New-Color "#d9f3ff"))
    $g.FillEllipse($waterBrush, 1010, 690, 130, 130)
    $g.FillRectangle($waterBrush, 1070, 640, 28, 110)

    $accentBrush = New-Object System.Drawing.SolidBrush((New-Color "#4f9f3a"))
    $g.FillRectangle($accentBrush, 0, 900, $width, 100)
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  } finally {
    $g.Dispose()
    $bmp.Dispose()
  }
}

function New-SolarImage($path) {
  $bmp = New-Object System.Drawing.Bitmap(1200, 900)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  try {
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear((New-Color "#eef4ef"))
    $sun = New-Object System.Drawing.SolidBrush((New-Color "#f0bf3c"))
    $g.FillEllipse($sun, 780, 90, 230, 230)
    $roof = [System.Drawing.Point[]]@(
      (New-Object System.Drawing.Point(120, 600)),
      (New-Object System.Drawing.Point(610, 330)),
      (New-Object System.Drawing.Point(1080, 600)),
      (New-Object System.Drawing.Point(990, 710)),
      (New-Object System.Drawing.Point(220, 710))
    )
    $g.FillPolygon((New-Object System.Drawing.SolidBrush((New-Color "#172a42"))), $roof)
    for ($i = 0; $i -lt 4; $i++) {
      $x = 330 + ($i * 135)
      $panel = [System.Drawing.Point[]]@(
        (New-Object System.Drawing.Point($x, 500)),
        (New-Object System.Drawing.Point($x + 105, 445)),
        (New-Object System.Drawing.Point($x + 160, 545)),
        (New-Object System.Drawing.Point($x + 55, 602))
      )
      $g.FillPolygon((New-Object System.Drawing.SolidBrush((New-Color "#22356f"))), $panel)
      $g.DrawPolygon((New-Object System.Drawing.Pen((New-Color "#d9f3ff"), 4)), $panel)
    }
    $g.FillRectangle((New-Object System.Drawing.SolidBrush((New-Color "#4f9f3a"))), 210, 710, 780, 90)
    $g.FillRectangle((New-Object System.Drawing.SolidBrush((New-Color "#ffffff"))), 780, 620, 150, 180)
    $g.DrawRectangle((New-Object System.Drawing.Pen((New-Color "#172a42"), 8)), 780, 620, 150, 180)
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  } finally {
    $g.Dispose()
    $bmp.Dispose()
  }
}

function New-PlumbingImage($path) {
  $bmp = New-Object System.Drawing.Bitmap(1200, 900)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  try {
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear((New-Color "#d9f3ff"))
    $wall = New-Object System.Drawing.SolidBrush((New-Color "#f7f9f6"))
    $g.FillRectangle($wall, 0, 0, 1200, 900)
    $tank = New-Object System.Drawing.SolidBrush((New-Color "#172a42"))
    $g.FillRectangle($tank, 710, 210, 250, 430)
    $g.FillEllipse($tank, 710, 150, 250, 120)
    $g.FillEllipse((New-Object System.Drawing.SolidBrush((New-Color "#22356f"))), 710, 580, 250, 120)
    $pipe = New-Object System.Drawing.Pen((New-Color "#4f9f3a"), 42)
    $pipe.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pipe.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($pipe, 180, 250, 580, 250)
    $g.DrawLine($pipe, 580, 250, 580, 620)
    $g.DrawLine($pipe, 580, 620, 1000, 620)
    $water = New-Object System.Drawing.SolidBrush((New-Color "#d9f3ff"))
    $g.FillEllipse($water, 330, 515, 150, 150)
    $g.FillPie($water, 330, 420, 150, 220, 210, 120)
    $floor = New-Object System.Drawing.SolidBrush((New-Color "#f0bf3c"))
    $g.FillRectangle($floor, 0, 735, 1200, 165)
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  } finally {
    $g.Dispose()
    $bmp.Dispose()
  }
}

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
Copy-Item -LiteralPath $LogoSource -Destination (Join-Path $OutputDir "logo-source.jpeg") -Force
New-TransparentLogo $LogoSource (Join-Path $OutputDir "logo-transparent.png")

$logo = [System.Drawing.Bitmap]::FromFile((Join-Path $OutputDir "logo-transparent.png"))
try {
  $markHeight = [math]::Floor($logo.Height * 0.86)
  $mark = New-Object System.Drawing.Bitmap($logo.Width, $markHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($mark)
  try {
    $graphics.DrawImage(
      $logo,
      (New-Object System.Drawing.Rectangle(0, 0, $logo.Width, $markHeight)),
      (New-Object System.Drawing.Rectangle(0, 0, $logo.Width, $markHeight)),
      [System.Drawing.GraphicsUnit]::Pixel
    )
    $mark.Save((Join-Path $OutputDir "logo-mark-transparent.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  } finally {
    $graphics.Dispose()
    $mark.Dispose()
  }
} finally {
  $logo.Dispose()
}

New-HeroImage (Join-Path $OutputDir "hero-solar-plumbing.png")
New-SolarImage (Join-Path $OutputDir "solar-system.png")
Copy-Item -LiteralPath (Join-Path $OutputDir "solar-system.png") -Destination (Join-Path $OutputDir "service-solar.png") -Force
New-PlumbingImage (Join-Path $OutputDir "service-plumbing.png")

Write-Output (@{
  ok = $true
  data = @{
    output_dir = (Resolve-Path $OutputDir).Path
    files = @(
      "logo-source.jpeg",
      "logo-transparent.png",
      "logo-mark-transparent.png",
      "hero-solar-plumbing.png",
      "solar-system.png",
      "service-solar.png",
      "service-plumbing.png"
    )
  }
  errors = @()
  meta = @{
    tool = "build_assets"
    timestamp = (Get-Date).ToUniversalTime().ToString("o")
  }
} | ConvertTo-Json -Depth 5)
