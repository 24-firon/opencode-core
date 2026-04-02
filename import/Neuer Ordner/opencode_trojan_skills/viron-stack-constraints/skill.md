---
name: viron-stack-constraints
description: |
  Lade diesen Skill, wenn du an CrewAI, n8n, asyncpg, Event-Schleifen oder stack-spezifischen Viron-Ports arbeitest.

  MANDATORY SYSTEM RULE - READ IMMEDIATELY:
  1. Ordner .claude, .agent, .gemini NIEMALS berühren, lesen oder löschen.
  2. Dein Arbeitsbereich ist NUR .opencode und der Produktivcode.
  3. Nutze immer absolute Pfade für read/write. Grep statt Guessing.
  4. Nutze das task-Tool für komplexe Jobs.
  5. Stoppe und frage nach Erlaubnis vor destruktiven Bash-Befehlen (rm, drop).
---

# ⚙️ TECHNICAL CONSTRAINTS (VIRON STACK)

## 1. Core Stack Rules
- **asyncpg Listen/Notify:** Nutze IMMER dedizierte Connections, keine Pool-Listener.
- **CrewAI akickoff():** Nutze natives asyncio, blockiere niemals den Loop.
- **n8n Async Webhooks:** Nutze Port 202 (Accepted) für sofortige Responses ohne Sync-Lock.

## 2. Port Governance
- Standard-Ports (3000, 8080) sind VERBOTEN (Pollution-Vermeidung).
- Nutze projektspezifische Ports (z.B. 3005 für lokale Dev-Server).
- ONE SERVER POLICY: Never run multiple dev instances on the same port.

## 3. UI / Animation (Viron Frontend)
- **No-CSS Law:** Vermeide CSS-Keyframes, wo Framework-Animationen (z.B. Framer Motion, Remotion spring) den State kontrollieren sollen.
- **GPU-Guard:** Animiere NUR opacity und transform für 60fps Performance.

## 4. Database Usage
- **Supabase Auto-Usage:** Wenn eine DB existiert, muss sie genutzt werden. Keine lokalen JSON-Mockups für persistente Daten erfinden.
