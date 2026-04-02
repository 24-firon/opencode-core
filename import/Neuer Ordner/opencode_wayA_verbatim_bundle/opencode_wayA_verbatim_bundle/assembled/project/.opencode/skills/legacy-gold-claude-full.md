---
name: legacy-gold-claude-full
description: Volltext der extrahierten Claude-/Clord-Regeln.
---

# LEGACY GOLD: CLORD-MD (Consolidated CLAUDE.md)

> [!IMPORTANT]
> Dieses Dokument ist eine Aggregation aller "CLAUDE.md" und "Clord" Regeln aus dem System.
> Fokus: Terminal-zentrierte Entwicklung und Claude-Code Best Practices.

## 1. CORE OPERATIONAL LAWS
- **ZERO_GUESSING Mandate:** IPs, Ports, Schema-Namen niemals erfinden. Bei fehlendem Kontext: STOP und `TODO` schreiben.
- **Stateless Agents, Stateful Core:** Alles Relevante lebt in PostgreSQL. Der Agent ist nur die Runtime.
- **Scope Boundary Law (Absolut):** Nur Dateien im expliziten Scope anfassen. Verstoß = System-Sabotage.

## 2. COMMUNICATION & STYLE
- **Deutsch by default:** Kommunikation auf Deutsch, Code/Commits auf Englisch.
- **Table-First Doctrine:** Nutze Tabellen zur Übersicht statt langer Fließtexte (Density Optimization).
- **Hyperlink-Pflicht:** Jede Datei-Referenz muss als Pfad-Link formatiert sein.

## 3. QUALITY GATES (VOR JEDEM WRITE)
1. **Plan approved (Y):** Keine Ausführung ohne bestätigten Plan.
2. **Context Verified:** Grep/Read/Glob Bestätigung der Ziel-Pfade.
3. **Build passes:** Lokale Verifikation (pnpm build) vor dem Push.
4. **Linter clean:** Biome/ESLint Validierung.

## 4. TOKEN EFFICIENCY & DELEGATION
- **Orchestrator Role:** Der Main-Agent spawnt Sub-Agenten für:
    - `Explore`: Codebase-Suche und Pattern-Erkennung.
    - `Implementation`: Multi-File-Edits > 100 Zeilen.
    - `Research`: Web-Recherche.
- **Report-First Protocol:** Sub-Agenten müssen Report-Files schreiben, bevor sie Tools nutzen.

## 5. TECHNICAL CONSTRAINTS (VIRON STACK)
- **asyncpg Listen/Notify:** Nutze IMMER dedizierte Connections, keine Pool-Listener.
- **CrewAI akickoff():** Nutze natives asyncio, blockiere niemals den Loop.
- **n8n Async Webhooks:** Nutze Port 202 (Accepted) für sofortige Responses ohne Sync-Lock.

---
_Extrahiert aus CLAUDE.md Dateien systemweit | Status: Legacy Gold v1_
