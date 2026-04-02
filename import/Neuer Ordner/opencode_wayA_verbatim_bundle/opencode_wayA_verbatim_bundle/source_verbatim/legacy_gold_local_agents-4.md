# LEGACY GOLD: Local Project Governance (Consolidated)

> [!NOTE]
> Dieses Dokument enthält extrahierte "Gold-Regeln" aus verschiedenen lokalen `.agent/AGENTS.md` und `gemini.md` Dateien.
> Fokus: Projektspezifische Kontrolle und Workflow-Stabilität.

## 1. PROJECT ENTRY PROTOCOL
- **Scenario Triggers:** Jeder Task-Start erfordert das Lesen der spezifischen Szenario-Einstiegspunkte (Coding, Dokumentation, Git, 3D).
- **PoR (Proof-of-Reading):** Der Agent muss vor jedem Plan bestätigen: „Ich habe [Datei X] gelesen und [Regel Y] verstanden.“

## 2. WORKFLOW STABILITY
- **Double-Turn-Lock (Local):** Verhindere Race-Conditions zwischen Agenten-Writes und Git-Commits.
- **Tenant Isolation Rule:** Keine hardcodeten kundenspezifischen Inhalte in generischen Komponenten.
- **Config-Driven Development:** Jede Änderung muss über zentrale Configs steuerbar sein (Config > Code).
- **Checklist-Update Mandatory:** `task.md` und `implementation_plan.md` müssen zwingend aktuell gehalten werden.

## 3. TECHNICAL BOUNDARIES
- **Port Governance:** Standard-Ports (3000, 8080) sind VERBOTEN (Pollution-Vermeidung). Nutze projektspezifische Ports (z.B. 3005).
- **No-CSS Law:** Vermeide CSS-Keyframes, wo Framework-Animationen (z.B. Framer Motion, Remotion spring) den State kontrollieren sollen.
- **Supabase Auto-Usage:** Wenn eine DB existiert, muss sie genutzt werden. Keine lokalen JSON-Mockups für persistente Daten.

## 4. SECURITY & SECRETS
- **Vault/Secret Injection:** Secrets werden dynamisch injiziert, niemals in `.env` Dateien gespeichert.
- **Input-Validation at Boundaries:** Zod (oder Pydantic) Validierung an jeder Systemgrenze (API-Entry).
- **Outbound HTTP Timeout:** Jeder externe API-Call MUSS einen Timeout haben.

## 5. DOCUMENTATION DUTY
- **Decision Log Mandatory:** Jede architektonische Entscheidung muss dokumentiert werden. Ohne Log-Eintrag ist die Ausführung verboten.
- **Knowledge Item (KI) Pflicht:** Research-Ergebnisse müssen in formale KIs kondensiert werden, statt im Chat zu sterben.

---
_Extrahiert aus lokalen Projekt-Konfigurationen | Status: Legacy Gold v1_
