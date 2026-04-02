# 🏛️ Kategorie 1: Sicherheit & Basis-Setup (Config & Network)

### 🎯 Worum geht es?
Bevor deine Agenten anfangen zu programmieren, brauchst du ein **Fundament**. OpenCode speichert seine Einstellungen in einer **Vielzahl von Ebenen** (Global, Projekt, Remote). In diesem Modul legen wir die **harten Unternehmens-Regeln** fest: Welche KI-Anbieter sind absolut verboten? Welche Ordner darf die KI niemals ansehen?

### 🚀 Dein Enterprise-Vorteil
* **Schutz vor Datenabfluss:** Du kannst das automatische Hochladen von Konversationen (Share-Feature) hart blockieren.
* **Schutz vor "Blackholes" (Performance):** KI-Agenten stürzen ab oder fressen massiv Rechenleistung, wenn sie versuchen, kompilierte `dist/` oder `node_modules/` Ordner zu scannen. Hier setzt du die "Scheuklappen" auf.
* **Erzwungene Regeln:** Du kannst Anbietern wie "Gemini" hart den Saft abdrehen (`disabled_providers`), selbst wenn ein Mitarbeiter versucht, sie zu nutzen.

---

### 📊 Matrix: Die Config-Hierarchie (Wer überschreibt wen?)
*Wenn es Konflikte gibt, gewinnt die unterste Ebene!*

| Ebene | Datei / Ort | Wer nutzt das? (Sinn) |
| :--- | :--- | :--- |
| **1. Remote (Schwächstes)** | `.well-known/opencode` | Globale Unternehmens-Vorgaben für alle. |
| **2. Global** | `~/.config/opencode/...` | Deine persönlichen Standard-Settings auf deinem Mac/PC. |
| **3. Projekt (Stärkstes)** | `opencode.json` (im Repo) | **Das Herzstück!** Überschreibt alles andere für dieses eine Projekt. |

---

### 💡 Die Coach-Ecke (Hintergrund & Best Practices)
> **Das Snapshot-Problem in großen Projekten**
> OpenCode trackt im Hintergrund jede Änderung über ein verstecktes Git-Repo, damit du "Undo" (Rückgängig) drücken kannst. 
> **Die Gefahr:** Wenn du an einem riesigen "Monorepo" arbeitest, bringt dieses ständige Zwischenspeichern deine Festplatte zum Glühen und das System laggt extrem. 
> **Der Fix:** Du musst das Feature per `snapshot: false` abschalten.

> ### ⚠️ COMMUNITY REALITY CHECK (März 2026)
> **Die Doku sagt:** `snapshot` und `watcher.ignore` seien transparente Hintergrund-Prozesse. 
> **Die Realität:** In Repos mit >50k Dateien friert der Snapshot-Prozess das System für **über 8 Minuten** komplett ein (GitHub Issue #1646). Das `watcher.ignore`-Flag wird vom Snapshot-Modul intern ignoriert. Zudem operiert OpenCode by default mit einem Permissions-Modell äquivalent zu `--dangerously-skip-permissions` (Reddit r/LocalLLaMA).
> **Workaround:** Zwingend `"snapshot": false` setzen + eine `.opencodeignore` Datei anlegen + OpenCode NUR in Sandboxen (Docker/WSL) betreiben.

---

### 🔗 Meta-Ebene & Abhängigkeiten
* **Verwandt mit:** [Kategorie 03: Tools & Permissions](./03_TOOLS_PERMISSIONS.md) (Dort werden Aktionen gesperrt, hier werden Ordner/Provider gesperrt).

---

### 📋 Prompt-Bibliothek (Copy & Paste für deine Agenten)

#### 1. Das Full-Protection-Setup (Snapshot + Blackhole + Security Baseline)
*Die Community hat herausgefunden, dass das Snapshot-System in riesigen Repos das System einfriert und das `watcher.ignore`-Flag intern ignoriert wird. Dieser Prompt setzt ALLE Sicherheits- und Performance-Flags auf einmal.*

```text
@build Konfiguriere bitte unsere `opencode.json` für maximale Performance und Sicherheit bei großen Repositories.

Setze folgende Dinge um (community-bewährte Workaround-Kombination):
1. `"snapshot": false` auf der Top-Ebene — deaktiviert das interne Git-Tracking komplett.
2. `"watcher": { "ignore": ["node_modules/**", "dist/**", ".git/**", "data/**"] }` — Blackhole-Schutz.
3. Erstelle zusätzlich eine `.opencodeignore` Datei im Root (wie `.gitignore`), da `watcher.ignore` intern oft nicht greift.
4. Setze `"share": "disabled"` — verhindert das Hochladen von Chats ins CDN.

Hinweis für dich: Der Snapshot-Fix wurde erst in OpenCode v0.3.132 nachgeliefert. Prüfe, ob eure Version aktuell ist!
```

#### 2. Das Datenleck (Share-Feature) schließen
*Verhindert, dass der Agent sich beim Durchsuchen in riesigen Abhängigkeits-Ordnern aufhängt und schont die Festplatte.*

```text
@build Konfiguriere bitte unsere `opencode.json` für maximale Performance bei großen Repositories.

Setze folgende Dinge um:
1. Deaktiviere das interne Version-Tracking (Snapshot-Feature).
2. Richte ein "watcher.ignore" Array ein, das den Agenten komplett blind für Ordner wie "node_modules/**", "dist/**" und ".git/**" macht.

Hinweis für dich:
Nutze die Keys "snapshot": false und "watcher": { "ignore": [...] } auf der Top-Ebene der Konfiguration.
```

#### 2. Das Datenleck (Share-Feature) schließen
*Zwingt das System, niemals Chat-Verläufe ins Internet auf die OpenCode-Server hochzuladen.*

```text
@build Aus Gründen der Unternehmenssicherheit müssen wir das Teilen von Sitzungen komplett verbieten.
Bitte aktualisiere unsere `opencode.json` so, dass das Share-Feature hart deaktiviert ist.

Hinweis für dich: 
Setze den Key `"share"` auf `"disabled"`.
```

#### 3. Provider aussperren (Compliance)
*Verhindert die Nutzung von unautorisierten KIs.*

```text
@build Richte in unserer `opencode.json` harte Provider-Restriktionen ein.
Wir wollen ausschließlich "anthropic" und "openai" erlauben.
Gleichzeitig müssen wir "gemini" auf die harte Blacklist setzen, falls jemand versucht, es über die Hintertür zu nutzen.

Hinweis für dich:
Nutze die Keys "enabled_providers" und "disabled_providers" (Arrays).
```
