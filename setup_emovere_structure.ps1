# setup_emovere_structure.ps1
# Esegui questo file dalla ROOT del progetto Next.js (quella che contiene package.json)

$ErrorActionPreference = "Stop"

# -------- Cartelle --------
$dirs = @(
  "components",
  "content",
  "app\api\contact",
  "app\cookies",
  "app\contatti",
  "app\privacy",
  "app\robots.txt",
  "app\sitemap.xml",
  "app\servizi\[slug]"
)

foreach ($d in $dirs) {
  New-Item -ItemType Directory -Path $d -Force | Out-Null
}

# -------- File vuoti/placeholder --------
$files = @(
  "components\CardLink.jsx",
  "content\site.config.json",
  "app\api\contact\route.js",
  "app\cookies\page.js",
  "app\contatti\page.js",
  "app\privacy\page.js",
  "app\robots.txt\route.js",
  "app\sitemap.xml\route.js",
  "app\servizi\[slug]\page.js",
  "app\globals.css",
  "app\layout.js",
  "app\page.js",
  "next.config.js"
)

foreach ($f in $files) {
  if (-Not (Test-Path $f)) {
    New-Item -ItemType File -Path $f -Force | Out-Null
  }
}

Write-Host "`n✅ Struttura creata. Ora sostituisci i file con i contenuti completi dalla chat." -ForegroundColor Green
