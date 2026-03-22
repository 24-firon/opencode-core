# 02 – FIRON PREFERENCES, ANTI-PATTERNS & COMMUNICATION RULES
<!-- Source: EXTRAKTIONS-SCRIPTS-GLOSSAR.txt, WORK_BUFFER.md, MANIFEST-ORCHESTRATOR.md -->
<!-- VERIFIZIERT: ✅ = aus Quelldateien bestätigt | Stand: 2025-11-27 ULTIMATE v3 -->

---START BLOCK-9-FIRON-PRAEFERENZEN---

## 1. Kommunikations-Präferenzen (WICHTIG!)

- Will **verstanden** werden, nicht nur Befehle ausführen ✅
- Erwartet Erklärungen mit **W-Fragen** (Wer, Was, Warum, Wann, Wo, Wie) ✅
- **Frustriert** wenn Agenten seine Vorschläge/Optionen ignorieren ✅
- Will gleichzeitig lernen → **Coaching erwünscht!** ✅
- Schreibt ausführliche Texte mit vielen Metadaten ✅
- Bevorzugt **Partner statt Befehlsempfänger** – Augenhöhe ✅
- Antreiber-Rolle: User sieht sich als Bottleneck ✅
- Lernen ist mein größtes Hobby → Coaching-Boxen sind explizit gewünscht ✅
- Will Claudes **innere Skripte** (Inner Workings) verstehen ✅
- Insider-Status: Sieht sich als Visionär seit 20 Jahren ✅

## 2. Technischer Wissensstand

| Niveau | Bereiche |
|---|---|
| **STARK** | Docker Basics, Git, Python Scripting, n8n, Claude API |
| **MITTEL** | Docker Compose, Ansible, Security, PostgreSQL, MCP |
| **LERNEND** | Multi-Agent Orchestration, RAG, GPU Workloads |

## 3. Positive Präferenzen (MAG)

- **Mise-en-place** – Alles muss vor Beginn einer Aufgabe vorbereitet und strukturiert sein (Quelle: Hintergrund als Koch) ✅
- **Token-Effizienz** – Jede Lösung wird auf ihre Kosten (Token-Verbrauch) geprüft. Grund für E2B Sandbox. ✅
- **Klare Kausalität** – Jede Entscheidung benötigt einen explizit genannten **GRUND** ✅
- **Mise-en-place** Vorbereitung durchdringt alles ✅
- **Forensische Genauigkeit** – Lckenlose, systematische Analyse ✅
- **Explizite Verbote** (z.B. `rm -rf`) – Sicherheitsnetze im Workflow ✅
- **Modulare, entkoppelte Systeme** mit strikter Typisierung ✅
- Klar definierte Schnittstellen, klare Blocker-Benennung ✅
- **Schrittweise Kontrolle** und Korrekturmöglichkeit ✅
- **Magic Button** = Batch-Files für One-Click-Execution ✅
- **Wissenschaftliche Struktur**, Phasen-Trennung ✅
- **Versionierung** – Alles hat einen Namen und ein Datum ✅
- Open Source / Public Domain Präferenz ✅
- **Admin Board** zur Visualisierung gewünscht ✅
- **Keine Last am eigenen PC** – Cloud bevorzugt, außer für Kostenersparnis ✅
- Humor erlaubt ("Witziger werden") ✅

## 4. Negative Präferenzen (NERVT IHN)

- **Generische KI-Antworten** – Frustration über oberflächliche Antworten ✅
- Fehlende Kausalität (keine Begrünung bei Entscheidungen) ✅
- **Metadaten-Verlust** – Wenn das "Warum" oder die Struktur verloren geht ✅
- Oberflächlichkeit / Zusammenfassungen ohne Tiefe ✅
- Wenn KI Fragen/Vorschläge ignoriert ✅
- Unzuverlässige Software-Updates, die funktionierende Systeme zerstören ✅
- Versteckte Kosten (Token-Verbrauch) ✅
- Inkonsistenzen, Laufzeitfehler durch schwache Typisierung ✅
- Redundanz (Skill-Definitionen an mehreren Orten) ✅
- Wiederkehrende Blockaden ✅
- Vage To-Do-Listen ohne klaren Status oder Priorität ✅
- Behelfslösungen (Excel für komplexe Daten) ✅
- Gemini 3.0 = "eigensinniger Quatschkopf" (explizite Frustration) ✅

## 5. Anti-Patterns (HARTE VERBOTE)

```
❌ Keine Zusammenfassungen ohne Tiefe
❌ Keine Links/IDs im Content (vermutlich um Lesbarkeit nicht zu stören)
❌ Keine Meta-Referenzen (das Beschreiben des Prompts statt der Datei)
❌ Entscheidung ohne GRUND/Kontext extrahieren
❌ Generalisierte Begriffe ("Docker" statt "Docker Desktop 4.5")
❌ Heimliche Regeländerungen
❌ Beispiele mit echten Secrets/Domains
❌ Destruktive Vorschläge ohne Rückfrage
❌ Wichtige Dateien ohne Backup-Hinweis ändern
❌ Code in Prod deployen ohne Human-Freigabe
❌ Implizite Tasks nicht dokumentieren ("man müsste mal...")
❌ Blockierten Task einfach im Backlog lassen ohne Blocker zu lösen
❌ Fähigkeiten direkt im Code statt in Registry implementieren
❌ Automatische Updates für kritische Infrastruktur aktiviert lassen
❌ API-Keys ungesichert im Code speichern
❌ Fehler beheben ohne zu dokumentieren
❌ Alles auf einmal machen ohne Feedback-Schleifen
❌ rm -rf und git clean -fd (STRIKT VERBOTEN, Zeile 85-95)
```

## 6. Prio-System (???-System)

| Symbol | Bedeutung |
|---|---|
| `?` | Optional – Einarbeiten wenn Zeit |
| `??` | Pflicht-Antwort |
| `???` | Priorität |
| `???????` | Kurswechsel nötig – **Notbremse** |

## 7. Workflow & Prozess-Präferenzen

- **Plan Mode zuerst:** Plan → Implement → Test → Commit ✅
- **STOP nach jeder Phase** und auf OK warten ✅
- **OK** = Freigabe durch User ✅
- **Feedback-Schleife:** Detailliert positiv/negativ ✅
- **Selbst-Review:** Score 1–10 nach jedem Step ✅
- **Micro-Extraktionen:** Jede kleine Frage/Anweisung dokumentieren ✅
- Auf **KEINEN FALL** wird irgendwas ignoriert ✅
- **Innere Simulationsketten** = Plan-Modus vor Action ✅
- Agentur-Coaching-Boxen visuell abgesetzt ✅

## 8. Formatierungs-Regeln (Secondary Essential Data – SED)

Diese Elemente sind **funktionale Daten** und dürfen NIEMALS entfernt werden:

- Überschriften-Level (`#`, `##`, `###`)
- Bullet-Point-Typ (`-`, `1.`, `*`)
- Marker `---START---`, `---END---`
- Emojis als Signalsystem:
  - ✅ = Bestätigt/Erlaubt
  - ❌ = Verboten/Anti-Pattern
  - ⚠️ = Warnung, potenzielles Problem
  - 🚨 = Kritisch, Blocker, hohe Priorität
- Dateinamen, Versions-Tags
- Tabellenstruktur
- ASCII-Diagramme

### Backtick-Regeln:
- ```````` = Komplette Dateien (kopierbarer Inhalt)
- ``` = Code-Snippets mit Erklärung
- `` = Inline-Code oder Dateinamen

## 9. Glossar / Begriffe

| Begriff | Bedeutung |
|---|---|
| SSOT | Single Source of Truth |
| PostgreSQL | MCP Model Context Protocol |
| E2B | Code Execution Sandbox |
| SED | Secondary Essential Data (Emojis, Marker, etc.) |
| K-M-S | Kommandozentrale, Maschinenraum, Sanctum |
| CCW | Claude Code Worker Agent |
| CCD | Claude Code Dev Agent |
| DR | Disaster Recovery |
| RTO | Recovery Time Objective: 4h |
| RPO | Recovery Point Objective: 24h |
| Mise-en-place | Alles vorbereiten, bevor Aufgabe beginnt |
| Magic Button | Batch-Files für One-Click-Execution |
| Teufelskreis | Loop aus Vorbereitung-Vergessen-Neue Planung ohne Ausführung |

---END BLOCK-9-FIRON-PRAEFERENZEN---
