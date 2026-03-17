# Session Artifact: OpenCode Control Node Genesis (Walkthrough Log)

**Datum:** 16. März 2026
**Zweck:** Erhaltung des absoluten, unkomprimierten Meta-Kontexts. Dieses Dokument ist das Gedächtnis der iterativen Architektur-Entwicklung und erklärt nicht nur, *wie* das System gebaut wurde, sondern *warum* (die schmerzhaften Lektionen aus dem Chat-Verlauf).

---

## 1. Die Meta-Ebene: Das Chaos der "Automatischen Injektion"
Die Reise begann mit massiver Frustration über das Verhalten von KI-Agenten in fremden Repositories. Das Symptom: Ein Agent sollte ein einfaches Projekt bearbeiten, begann aber plötzlich, global auf dem Host-System wild Verzeichnisse zu scannen, las Regeln "doppelt und dreifach" und benahm sich "schizophren".

**Die Ursachen-Forschung (Der Deep Merge):**
Wir haben herausgefunden, dass die OpenCode-Engine beim Booten nach dem **Opt-Out-Prinzip** arbeitet. Sie führt einen "Deep Merge" zwischen der globalen User-Konfiguration (`~/.config/opencode/opencode.json` und `AGENTS.md`) und dem lokalen Projekt durch. 
Schlimmer noch: Die integrierte "Context Engine" (Schicht 4) nutzt Tree-sitter, um ungefragt eine Workspace-Map des gesamten Verzeichnisses in das Token-Fenster des Agenten zu pressen. 

**Das Learning:** Ein Agent kann nicht durch einen simplen User-Prompt ("Ignoriere alles andere") gesteuert werden. Ein User-Prompt verliert *immer* gegen zehntausende Tokens an hart injizierten System-Direktiven. Die Kontrolle muss auf der physikalischen Konfigurationsebene (`opencode.json` als Firewall) erzwungen werden.

---

## 2. Der architektonische Paradigmenwechsel
Ursprünglich sollte dieses Repo (`opencode-core`) ein passives "Template" werden, das man einfach in neue Projekte kopiert. 

Im Diskurs haben wir das Modell komplett gedreht: Das Repo wurde zur **Control Node (Dem Master-Orchestrator)**.
*   Das Repo ist das aktive "Gehirn" (Hauptquartier).
*   Wenn ein Ziel-Repo (z. B. `Viron-Server`) OpenCode-ready gemacht werden soll, wird der Agent in *diesem* Root-Verzeichnis gestartet.
*   Er analysiert das fremde Repo, baut in seinem eigenen `templates/playgrounds/` Verzeichnis einen maßgeschneiderten Payload aus dem Master-Template und schießt ihn (nach menschlichem Approval) in das Ziel-Repo.

---

## 3. Der Kampf gegen die KI-Armada (Die doppelte Firewall)
Ein kritischer Moment war die Erkennung der "versteckten Feinde". In Entwickler-Umgebungen existieren dutzende Ordner von konkurrierenden KI-Tools (`.claude`, `.roo`, `.cursor`, `.goose` etc.). Wenn der Tree-sitter diese Ordner scannt, fließen fremde Agenten-Regeln in den Kontext und zerstören die Integrität.

Wir haben eine "doppelte Verriegelung" in der Root-`opencode.json` eingebaut:
1.  `"~/.claude/**"`: Sperrt das globale User-Verzeichnis aus dem Context-Sandwich.
2.  `"**/.claude/**"`: Sperrt den Ordner rekursiv, falls er tief im Ziel-Repo vergraben liegt.
(Diese Liste umfasst über 24 IDEs und Agenten-Frameworks).

---

## 4. Die Reconnaissance-Strategie (Die 33 Perplexity-Skills)
Um das Problem zu lösen, dass der Orchestrator beim Scannen eines gigantischen Monorepos sein 120k-Token-Limit durch Build-Dateien sprengt, haben wir einen Marktplatz an "Reconnaissance Skills" (Aufklärungs-Skills) integriert. 
Diese wurden extern über Perplexity.ai generiert und liegen in `.opencode/skills/`.
Jeder Skill (z.B. `react-vite-analyzer.md`) enthält "Black Hole"-Definitionen: Er sagt dem Agenten exakt, welche Ordner (z.B. `.next`, `target/`) er beim Betreten des fremden Repos *physisch ignorieren muss*, um am Leben zu bleiben.

---

## 5. Das "Crime Scene Clean-Up" & Die Tier-Evolution
Das alte Repository (`quiet-panda`) war ein monolithischer Dschungel. In einem mehrstufigen "Deep Clean" Workflow (siehe `WORKFLOW_ITERATIVE_DEEP_CLEAN.md`) haben wir das Wissen extrahiert.

**Warum Tier 3 als Fundament?**
Wir hatten die Wahl, sofort mit komplexen Graphen-Architekturen (Tier 2: DAG Engine, paralleles Routing) oder AST-Code-RAG (Tier 1) zu starten.
Die bewusste Entscheidung dagegen: "Garbage In, Garbage Out". Ohne ein narrensicheres, deterministisches Fundament (Tier 3: Lineares Event-Sourcing in `.hive`, 7-Gates QA-Pipeline mit `biome` und `semgrep`) hätten parallele Agenten das Ziel-Repo mit Halluzinationen geflutet.

Wir haben das Tier-3-System aus dem alten Repo geborgen und in `templates/base_payload/` gekapselt.
Es waren mehrere Iterationen nötig, um zu erkennen, dass neben dem Quellcode auch scheinbar unbedeutende Dinge wie Slash-Commands (`.opencode/commands/swarm-plan.md`) und das SQLite-Projektions-Skript (`generate-plan.js`) absolut kritisch für das Funktionieren des Payloads sind.

Zusätzlich haben wir den inaktiven Tier-2 TypeScript-Code (XState Machines, Swarm Mail via SQLite, Semantic Router) als "Architektur-Gold" unter `docs/architecture_reference/tier2_reference_src/` abgelegt, damit zukünftige Agenten dieses Wissen nicht neu erfinden müssen.

---

## 6. Zusammenfassung für zukünftige Agenten
Dieses Repository ist in **Zonen** unterteilt:
*   **Root (`/`):** Dein Arbeitsbereich. Hier bist du der Deployment-Operator.
*   **`templates/base_payload/`:** Dein Werkzeugkoffer. Der Code hierdrin wird *nicht* von dir ausgeführt, sondern in Ziel-Repos kopiert.
*   **`templates/playgrounds/`:** Dein Entwurfstisch. Hier modifizierst du Payloads, bevor du sie auslieferst.
*   **`docs/architecture_reference/`:** Die Bibliothek. Hier liegt das historische Wissen, das du nur konsultierst, wenn du das System *an sich* (Tier 2/Tier 1) weiterentwickelst.

Bitte konsultiere immer die dedizierten Boot-Prompts (`docs/BOOT_PHASE_*.md`), bevor du eine Aufgabe in diesem Repo startest.