---
name: viron-stack-constraints
description: Lade diesen Skill, wenn du an CrewAI, n8n, asyncpg, Event-Schleifen oder stack-spezifischen Viron-Ports arbeitest.
---

# ⚙️ TECHNICAL CONSTRAINTS (VIRON STACK)

## 1. Core Stack Rules
- **asyncpg Listen/Notify:** Nutze IMMER dedizierte Connections, keine Pool-Listener.
- **CrewAI akickoff():** Nutze natives asyncio, blockiere niemals den Loop.
- **n8n Async Webhooks:** Nutze Port 202 (Accepted) für sofortige Responses ohne Sync-Lock.

## 2. Port Governance
- **Standard-Ports (3000, 8080) sind VERBOTEN** (Pollution-Vermeidung).
- Nutze projektspezifische Ports (z.B. 3005 für lokale Dev-Server).
- **ONE SERVER POLICY:** Never run multiple dev instances on the same port.

## 3. UI / Animation (Viron Frontend)
- **No-CSS Law:** Vermeide CSS-Keyframes, wo Framework-Animationen (z.B. Framer Motion, Remotion spring) den State kontrollieren sollen.
- **GPU-Guard:** Animiere NUR `opacity` und `transform` für 60fps Performance.

## 4. Database Usage
- **Supabase Auto-Usage:** Wenn eine DB existiert, muss sie genutzt werden. Keine lokalen JSON-Mockups für persistente Daten erfinden.
