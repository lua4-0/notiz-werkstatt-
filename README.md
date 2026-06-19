# Notiz-Werkstatt – PWA-Version

Browser-basiertes Notizbuch mit Apple-Pencil-Unterstützung, mehreren Fächern,
PDF-Import und Scan-Funktion. Läuft offline nach erstem Start.

## Was ist drin?

```
.
├── index.html       # Die App selbst
├── manifest.json    # PWA-Metadaten (Name, Icons, Vollbildmodus)
├── sw.js            # Service Worker (Offline-Cache)
├── icons/           # App-Icons in verschiedenen Größen
│   ├── icon-32.png
│   ├── icon-96.png
│   ├── icon-180.png  (apple-touch-icon)
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon-512-maskable.png
└── README.md        # Diese Datei
```

## Auf GitHub Pages veröffentlichen

### Einmalig: Repo anlegen

1. Auf [github.com](https://github.com) einloggen.
2. Oben rechts auf das `+`-Symbol → **New repository**.
3. **Repository name**: irgendwas, z.B. `notiz-werkstatt`.
4. **Public** lassen (für Gratis-Pages nötig).
5. *Nicht* "Initialize with README" anhaken.
6. Auf **Create repository** klicken.

### Dateien hochladen

1. Im neuen Repo auf **uploading an existing file** klicken
   (oder: **Add file → Upload files**).
2. Den **gesamten Inhalt** dieses Ordners hochladen – also `index.html`,
   `manifest.json`, `sw.js`, `README.md` und den `icons/`-Ordner mit allen PNGs.
   → Per Drag & Drop ins Browser-Fenster ziehen funktioniert.
3. Ganz unten auf **Commit changes** klicken.

### Pages aktivieren

1. Im Repo oben auf **Settings** klicken.
2. Links im Menü auf **Pages**.
3. Unter **Source**: **Deploy from a branch** auswählen.
4. **Branch**: `main` (oder `master`), Ordner: `/ (root)` → **Save**.
5. Ein paar Minuten warten. Oben auf der Pages-Seite erscheint dann:
   > Your site is live at https://DEIN-USERNAME.github.io/notiz-werkstatt/

Diese URL kannst du jetzt aufrufen.

## Auf dem iPhone / iPad als App installieren

1. Die GitHub-Pages-URL in **Safari** öffnen (nicht in Chrome / Firefox – nur
   Safari kann auf iOS PWAs installieren).
2. Auf das **Teilen**-Symbol unten in der Mitte tippen.
3. In der Liste runterscrollen zu **Zum Home-Bildschirm**.
4. Namen bestätigen → **Hinzufügen**.

Auf dem Homescreen erscheint das Icon. Beim ersten Start aus dem Homescreen
heraus läuft die App im Vollbild – ohne Safari-UI.

## Offline?

- App-Code (HTML, JS, Icons): wird beim ersten Besuch in den Cache geschrieben
  und läuft danach offline.
- PDF-Import: braucht beim ersten Mal Internet (PDF.js wird vom CDN geholt
  und gecacht). Danach offline-fähig.
- Notizen: liegen lokal in der **IndexedDB** des Browsers / der App.
  Werden nie hochgeladen, sind nur auf diesem Gerät.

## Updates ausspielen

Wenn ich später Änderungen an der App mache:

1. Geänderte Dateien einfach wieder im Repo hochladen (überschreiben).
2. Wichtig: in `sw.js` die Zeile `const CACHE = "notiz-werkstatt-v1";` auf
   `v2`, `v3` etc. erhöhen, sonst zieht der Service Worker den alten Code
   weiter aus dem Cache.
3. App nach dem Update einmal schließen und wieder öffnen – beim zweiten
   Start ist die neue Version drin.

## Daten exportieren / Backup?

Eingebaut: aktuelle Seite als PNG exportieren (Knopf in der Topbar).

Komplettes Backup über mehrere Fächer hinweg ist noch nicht eingebaut.
Auf Anfrage kann ich einen JSON-Export bauen, der alle Fächer und Seiten
in eine Datei packt.
