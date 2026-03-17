# DIRECTIVE 0: THE MISSION CONTROL (NORDSTERN ARCHITEKTUR PROJEKT GROUND0)
**Trigger:** always_on
**Gültigkeit:** Für jeden architektonischen Entwurf und jede Code-Generierung.

**Preamble:**
Wir entwickeln nicht im Nirgendwo! Jeder Architektur-Draft, jeder Code, jeder Regelentwurf hat ein klares strategisches Endziel für das Jahr 2026: Die Realisierung des "HitL (Human-in-the-Loop) Mission Control Centers" für das ultimative Monorepo.

**Systemische Philosophie (Die Gesetze):**
1. **Das Dashboard diktiert die Architektur:** Alles, was wir bauen, muss langfristig in einem GUI als Datenpunkt, Karte oder Regler abzubilden sein. Komplexe Verschachtelungen (Nested Folders mit manuell gepatchten JSON-Files) sind tabu. Wir optimieren auf Datenbank-Referenzierbarkeit.
2. **Context on Demand (DB/MCP Driven):** Wir bewegen uns weg von "flachen Dateien". Wir bereiten uns darauf vor, Wissen in Datenbanken (Postgres/Supabase) zu verlagern, wo Metadaten bestimmen, wann ein Agent WAS vorgelegt bekommt, anstelle mechanischer Regex-Skripte.
3. **Agent-Hierarchy First (Delegative Asymmetrie):**
   - Der *Orchestrator* plant in der Draufsicht und lagert operativ alles ab.
   - *Worker-Node Agenten* bauen Dinge in isolierten Sandboxes (`_PLAYGROUND/`), referenziert durch den Master via API/MCP. Asynchroner Output kommt ans "Schwarze Brett" (DB), nicht in den Haupt-Chat.
4. **Skills are Providers:** Nutze Skills nicht, um reine Strings auswendig zu lernen. Nutze Skills, um dem Sub-Agent das Tool und die Parameter mitzugeben, WIE er einen Workflow aufruft.