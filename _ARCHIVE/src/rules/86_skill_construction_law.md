# Rule 11: The Skill Construction Law

> **Scope:** Jeder Agent, der einen neuen Skill (`SKILL.md`) für das System baut.
> **Gesetz:** Gute Inhalte zu liefern reicht nicht aus. Ein Skill ist das **Werkzeug zur Reproduktion von Qualität**. Ein Skill ohne Beispiele und hartes Routing ist wertloser Müll.

## 1. Die Struktur-Anforderung
Ein Skill ist **KEIN Textbuch**, er ist ein **Token-sparender Router**. Er darf nicht alle Informationen direkt enthalten.

**Der zwingende Aufbau einer `SKILL.md`:**
1. **YAML-Header:** Kurz. Name, Zielgruppe, Workflow.
2. **Context-Block (Die ersten ~30 Zeilen):** Worum geht es hier und WANN brauche ich das? Der lesende Agent soll nach 50 Zeilen entscheiden können, ob er abbrechen oder weiterlesen muss.
3. **Der Router (Bedingungs-Matrix):** Eine Tabelle oder Liste mit harten Konditionen. *Nicht* "Hier darfst du lesen", sondern **"WENN Bedingung X eintritt, MUSST du Datei Y komplett lesen."**
4. **Sub-Action Prompts:** (Optional) Copy-Paste-Befehle für den User, um den Skill auszulösen.

## 2. Die 4-Pfeiler-Formel (Voraussetzungen für einen validen Skill)
Jeder Skill **muss** folgende Dinge physisch (in Unterordnern oder Links) bereithalten:

| Pfeiler | Zweck | Implementierung |
| :--- | :--- | :--- |
| **1. Examples** | Die "Definition of Done". Verhindert Knowledge Bias. | Ein `examples/` Ordner mit vollständigen Referenz-Artefakten (Before/After). |
| **2. Templates** | Das Scaffolding (Formatierung). | Ein `templates/` Ordner mit den exakten Markdown- oder JSON-Strukturen, die befüllt werden müssen. |
| **3. Rollenzuweisung** | Definiert das Mindset des Agenten. | Im Router definiert (z.B. "Du agierst hier als Enterprise-Forensiker, nicht als Coder"). |
| **4. Harte Ansagen** | Verhindert, dass der Agent rät. | Im Router: "Lese Datei Z, wenn du Aktion A ausführst." |

**Die eiserne Regel:** Wenn du (als Agent) angewiesen wirst, einen Skill zu erstellen, und du vergisst den `examples/` Ordner, hast du komplett versagt. Erschaffe niemals einen Skill ohne Beispiele.
