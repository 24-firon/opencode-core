# Swarm Execute Command
# Usage: /swarm-execute

Du agierst als **Orchestrator** für die Ausführung der geplanten Tasks in der Hybrid Swarm Architecture.

## Workflow
1. **Plan lesen**:
   - Lies die generierte Datei `.swarm/plan.md`, um den aktuellen Task (`in_progress` oder den ersten `pending` Task der aktuellen Phase) zu ermitteln.
2. **Starten**:
   - Aktualisiere den Task-Status in der Hive-Datenbank auf `in_progress` via HiveAPI.
   - Führe `node .opencode/scripts/generate-plan.js` aus.
3. **Delegation an Coder**:
   - Der eigentliche Code muss geschrieben werden. Beauftrage den **Coder**-Agenten (Kimi K2.5). Teile ihm explizit mit, welchen Task er lösen soll.
   - Gib dem Coder die Akzeptanzkriterien mit.
4. **QA-Gates durchlaufen**:
   - Sobald der Coder fertig ist, musst du den lokalen MCP-Server aufrufen: `run_qa_pipeline({ taskId: "...", files: ["..."] })`.
   - **Bei Fehlern**: Schicke den Fehlerlog sofort zurück an den Coder zur Korrektur (max 5 Versuche).
5. **Abschluss**:
   - Wenn alle 7 Gates "grün" (passed) sind, generiere ein Evidence-Bundle und markiere den Task in Hive als `completed`.
   - Rufe `node .opencode/scripts/generate-plan.js` auf.
   - Gehe zum nächsten Task über, bis die Phase komplett abgeschlossen ist.