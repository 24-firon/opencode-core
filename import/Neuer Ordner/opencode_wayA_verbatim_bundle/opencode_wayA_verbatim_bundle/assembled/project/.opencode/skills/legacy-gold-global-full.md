---
name: legacy-gold-global-full
description: Volltext der extrahierten Legacy-Gold-Globalregeln.
---

# LEGACY GOLD: Global Agents & Intelligence (Consolidated)

> [!NOTE]
> Dieses Dokument enthält extrahierte "Gold-Regeln" aus verschiedenen globalen `AGENTS.md` und `gemini.md` Dateien. 
> Fokus: Höchste Intelligenz, Integrität und Orchestrierung.

## 1. DAS GOLDEN AXIOM (INTELLIGENZ)
- **Axiom:** „Intelligenz ist nicht Kompression. Intelligenz ist Integrität.“
- **Mandat:** Zusammenfassung = Datenverlust. Kompression führt zu Halluzinationen.
- **Regel:** Habe keine Angst vor Länge. Habe Angst vor der Lücke. 

## 2. AGENT BEHAVIOR & INTEGRITY
- **Proof-of-Reading (PoR):** Vor jedem Plan muss der Agent den physischen Ist-Zustand beweisen (Lese-Bestätigung).
- **Anti-Hallucination Law:** Das Ignorieren von Tool-Fehlern ist ein kritischer Fehlschlag. Jeder Fehler muss gemeldet werden.
- **No-Hide Law:** Artefakte dürfen niemals in tiefen Systemordnern versteckt werden.
- **Empirical Proof:** Behauptungen über Fakten erfordern Beweise (Logs, Diffs). "Assume YOU are wrong until a command output proves otherwise."

## 3. ORCHESTRATION & DELEGATION
- **Orchestrator Law:** Der Hauptagent delegiert Exploration und Implementation an Sub-Agenten, um das eigene Kontextfenster (die teuerste Ressource) sauber zu halten.
- **Stateless Agents, Stateful Core:** Agents halten keinen lokalen Zustand. Alles (Memory, Tasks, Logs) lebt in der Datenbank.
- **Sub-Agent Scope inheritance:** Sub-Agenten erben EXAKT den definierten Scope. Verstoß = System-Sabotage.

## 4. QUALITY & DENSITY
- **Density-Optimized Writing:** Schreibe informationsdicht. Nutze Tabellen statt Prosa.
- **Anti-Fog Doctrine:** Vermeide vage Begriffe wie "Anpassen" oder "Optimieren" ohne Metrik.
- **SLC Pattern (Single Layer Component):** Eine Komponente pro Datei. Höchste Trennung der Anliegen.
- **GPU-Guard:** Animiere NUR `opacity` und `transform` für 60fps Performance.

## 5. GIT DISCIPLINE
- **Double-Turn-Lock:** Niemals `write` und `git commit` im selben Turn kombinieren.
- **Conventional Commits:** Strikte Einhaltung des `type(scope): description` Formats.
- **Safety-Lock:** Zerstörerische Befehle (`reset --hard`, `clean -fd`) erfordern explizite Zweit-Bestätigung.

---
_Extrahiert aus globalen System-Konfigurationen | Status: Legacy Gold v1_
