# Workflow: Iterative Deep-Clean & Asset Extraction

Dieses Dokument standardisiert den Prozess, wie ein Agent (oder User) ein historisch gewachsenes, überladenes Repository analysiert, reinigt und dessen essenzielle Bausteine (Assets) in eine neue, saubere Architektur überführt, ohne das "Rauschen" (Context Bloat) mitzunehmen.

## Zielsetzung
Verhinderung von "Garbage In, Garbage Out". Wenn ein altes Projekt in ein neues Framework (wie die OpenCode Control Node) überführt wird, dürfen Altlasten, zirkuläre Abhängigkeiten und gigantische Node-Module niemals in den Kontext der neuen Agenten gelangen.

## Die 4-Phasen-Architektur-Bergung

### Phase 1: Die Oberflächen-Aufklärung (Surface Scan)
1. **Verzeichnisstruktur erfassen:** Nutze `glob` oder `tree`-ähnliche Befehle, um die Ordnerstruktur der Ebene 1 und 2 zu scannen.
2. **Black Holes ignorieren:** Schließe standardmäßig `node_modules`, `.git`, `dist`, `.next`, `.svelte-kit` und alle generierten Build-Artefakte aus der Betrachtung aus.
3. **Konfigurations-Check:** Suche nach Manifest-Dateien (`package.json`, `Cargo.toml`, `pyproject.toml`) und Konfigurationsdateien (`biome.json`, `tsconfig.json`, `opencode.json`), um den Tech-Stack und die bestehenden Constraints zu verstehen.

### Phase 2: Die Logik- und Regel-Bergung (The Brain Extraction)
1. **Regel-Zerschlagung (De-Monolithisierung):** Finde monolithische Anweisungsdateien (z. B. eine 300-Zeilen `AGENTS.md`).
2. **Modularisierung:** Spalte diese in einzelne, logische Markdown-Module auf (z. B. Architektur, Node-Patterns, Security, Git-Workflow).
3. **Payload-Verpackung:** Lege diese Regeln in den `templates/base_payload/.opencode/rules/` Ordner der neuen Architektur ab, sodass sie als saubere Kopiervorlage dienen können.

### Phase 3: Die Quellcode-Bergung (The Muscle Extraction)
1. **Source Code (`src/`):** Identifiziere den echten, lauffähigen Quellcode.
2. **Kritische Überprüfung:** Gibt es bekannte Compiler- oder Linter-Fehler im alten Code? (Diese müssen *während* der Migration gefixt werden).
3. **Skripte & Kommandos:** Prüfe zwingend versteckte Orchestrierungs-Ordner (`scripts/`, `.opencode/commands/`, `.opencode/scripts/`). Ohne diese Skripte ist der transferierte Quellcode oft nutzlos (z. B. wenn das Projektions-Skript für Event-Sourcing fehlt).

### Phase 4: Die Forensische Tiefensuche (The Deep Find)
*Dies ist der Schritt, der am häufigsten vergessen wird und die wertvollsten "Golden Nuggets" birgt.*
1. **Tiefen-Scan:** Führe einen rohen Unix-Scan aus, der das gesamte Repository nach vergessenen Textdateien durchsucht: `find . -type f | grep -v "node_modules"`.
2. **Research & Handover Docs:** Suche nach Markdown-Dateien in Ordnern wie `docs/`, `research/`, `Handover/`, `plans/`.
3. **Architektur-Referenzen:** Extrahiere wertvolle Referenz-Implementierungen (z. B. unfertige, aber funktionsfähige Architektur-Snippets wie State-Machines oder Queues) und speichere sie isoliert im neuen Repo unter `docs/architecture_reference/` ab.
4. **Decision Logging:** Fasse die Gründe für vergangene Fehlversuche (z. B. "Warum wir LangGraph nicht nutzen") in einem `ARCHITECTURE_DECISION_LOG.md` zusammen.

## Resultat
Das Ziel-Repository enthält am Ende nur noch:
- Das Master-Gehirn (Orchestrator-Regeln & Firewall)
- Die "Golden Master" Payload-Templates (Isoliert)
- Eine Bibliothek aus geborgenen Konzepten und Dokumentationen (Referenz-Wissen)

Das alte Repository kann danach gefahrlos archiviert oder gelöscht werden.