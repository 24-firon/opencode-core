# Phase 4: Reality Check (Die Perplexity Prompts)

> **Zweck dieser Datei:** Der Agent generiert hier die zwei Copy-Paste-Prompts, die der User in Perplexity/Google ausführt. Die Prompts sind bereits mit den technischen Keywords aus Phase 2 vorbefüllt, damit die Suchmaschine exakt weiß, wonach sie suchen muss.

Die offizielle Doku lügt oft durch Auslassung. Generiere für den User zwei detaillierte Prompts, die er in Perplexity/Google ausführen muss. Setze für `<TOOL_NAME>` das aktuelle Tool ein (z.B. Docker, OpenCode, LangChain).

Fülle den Prompt **zwingend** mit den identifizierten Clustern/Keywords aus Phase 2 (RAG-Extraktion), damit die KI exakt weiß, wonach sie suchen muss.

## Prompt 1: Die dunkle Seite (Bugs & Crashes)
*Findet undokumentierte Limits, OOM-Crashes, Sicherheits-Lücken und fehlschlagende Setups. Das Ergebnis wird in Phase 5 als `⚠️ COMMUNITY REALITY CHECK` in die Cluster-Dateien injiziert.*

```text
Rolle: Du bist ein forensischer Deep-Tech-Analyst und "Reverse Engineer". 
Deine Aufgabe ist es, die "Schatten-Dokumentation" (Shadow Knowledge) für das Framework "<TOOL_NAME>" zu erstellen. 

Hintergrund: Offizielle Dokumentationen beschreiben immer den "Happy Path". In der Realität gibt es Bugs, undokumentierte Restriktionen und Flaschenhälse.
Deine Mission: Durchsuche GitHub Issues, Reddit, Hacker News und StackOverflow.

Fokussiere deine Tiefenrecherche auf folgende technische Vektoren (basierend auf unserer Architektur):
1. [Füge hier Cluster 1 + Keywords aus Phase 2 ein] (Gesucht: Crasht es bei großen Datenmengen?)
2. [Füge hier Cluster 2 + Keywords ein] (Gesucht: Gibt es undokumentierte Timeouts?)
...

AUSGABE: Erstelle einen Brain Dump in Markdown. Nenne Symptom, Auswirkung, und vor allem den COMMUNITY-WORKAROUND (Wie fixen die User das, da die Doku es nicht tut?). Verlinke die Quelle.
```

## Prompt 2: Das pure Gold (Hidden Gems & Power-User Hacks)
*Findet Must-Have Community-Plugins, Custom Tools und Workflow-Hacks. Das Ergebnis wird als positive Anreicherung in die Cluster- und Manual-Dateien injiziert.*

```text
Rolle: Du bist ein Tech-Evangelist und Productivity-Hacker.
Deine Aufgabe ist es, die "Hidden Gems" (Community-Tricks, Plugins, Custom Tools) für "<TOOL_NAME>" zusammenzutragen.

Mission: Durchsuche das Web nach Power-User Setups. Wie nutzen die echten Profis das System? Welche inoffiziellen Skripte oder Plugins sind absolute Gamechanger?

Fokussiere dich auf:
1. Geniale Custom Workflows: (Wie automatisieren User <Keyword X>?)
2. Community Plugins/Erweiterungen: (Was sind die Must-Haves auf GitHub?)
3. Performance/Memory-Hacks: (Wie umgehen Profis <Keyword Y>?)

AUSGABE: Erstelle einen Markdown-Report. Für jeden Hack: Name, Enterprise-Vorteil, konkrete Anwendung (Code/Env-Var) und Quelle.
```