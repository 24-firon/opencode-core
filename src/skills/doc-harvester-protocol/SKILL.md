---
name: doc-harvester-protocol
description: Tier-1 SOP zur Überführung unstrukturierter Doku in ein hochdichtes RAG-Verzeichnis und ein Management-Dashboard (mit Community Reality Checks).
license: MIT
compatibility: opencode
metadata:
  audience: orchestrator-agents, researcher
  workflow: documentation-ingestion
---

# 🧠 Skill: Knowledge Harvesting Protocol

### 🎯 Kontext & Rollenzuweisung (Wann und wie du das liest)
Dieser Skill wird genutzt, wenn offizielle Dokumentationen (die oft lügen oder zu flach sind) in ein **Enterprise-fähiges Format** destilliert werden müssen.
**DEINE ROLLE:** Du agierst hier als **Enterprise-Forensiker**, nicht als Dokumentar. Flache Zusammenfassungen sind verboten.

**🛑 HARTER STOPP (ROUTER-REGEL):**
Lies diese Datei *nicht* weiter, wenn deine aktuelle Aufgabe nichts mit dem Analysieren und Strukturieren von Dokumentationen zu tun hat. Verlasse den Skill jetzt.

---

## 🚦 Der Router (Bedingungs-Matrix)
Wenn du hier bist, um das Protokoll auszuführen, folge strikt diesen Routing-Regeln. **Du darfst keinen Schritt ausführen, ohne vorher das entsprechende Example gelesen zu haben (Rule 10 & 11).**

| WENN du diesen Schritt ausführst... | MUSST du zwingend lesen: | Was du dort findest: |
| :--- | :--- | :--- |
| **Phase 1 & 2:** RAG-Dateien (`clusters/`) aus der rohen Doku generieren. | [`examples/RAG_CLUSTER_EXAMPLE_OPENCODE.md`](./examples/RAG_CLUSTER_EXAMPLE_OPENCODE.md) | Unser eigenes Gold Standard. Community Reality Checks AM ANFANG, Precedence-Order als Tabelle, JSON-Snippets, Proxy/Cert-Pfade. |
| **Phase 3:** Das Management-Dashboard (`user_manual/`) schreiben. | [`examples/USER_MANUAL_EXAMPLE_OPENCODE.md`](./examples/USER_MANUAL_EXAMPLE_OPENCODE.md) | Das exakte Layout: Emojis, Matrix-Tabelle, Coach-Ecke (Blockquote), Meta-Ebene Links, 3 fertige Copy-Paste-Prompts mit JSON-Hinweisen. |
| **Phase 4:** Die Community-Schatten-Recherche starten. | [`templates/03_shadow_research_prompts.md`](./templates/03_shadow_research_prompts.md) | Die fertigen Perplexity-Prompts für Bugs UND Hidden Gems. |
| **Phase 5:** Die Recherche in die bestehenden Dateien einweben. | [`templates/04_injection_rules.md`](./templates/04_injection_rules.md) | Das exakte Format für den `> ⚠️ COMMUNITY REALITY CHECK` Block. |

> **Optional (Frameworkspezifische Tiefe):** Die Dateien `RAG_CLUSTER_EXAMPLE_AGENTZERO.md` und `USER_MANUAL_EXAMPLE_AGENTZERO.md` im `examples/` Ordner zeigen, wie ein extrem framework-spezifisches Ergebnis aussieht (Ollama 405 Crash, Dual-Ollama Docker-Compose). Sie sind nützlich, wenn die Quelldokumentation sehr tiefgehend ist.

> **Feedback Integrity Protocol (Rule 12):** Wenn dir die Quelldoku zu dünn erscheint, um das Level des Examples zu erreichen, STOPPE sofort und melde dem User einen "Blocker Report". 

---

## 📋 Sub-Action-Prompts (Copy-Paste für den User)

*(Lieber Mensch, nutze diese Prompts, um deinen Agenten durch diesen Skill zu steuern).*

#### 🚀 Trigger für Phase 1 & 2 (RAG-Extraktion)
```text
@build Lade den Skill "doc-harvester-protocol" (lies den Router!).
Wir müssen die Dokumentation von [TOOL NAME] (URL: [DOKU URL]) in unser System überführen.
Führe Phase 1 (Triage) und Phase 2 (RAG-Extraktion) durch. 
WICHTIG: Lese zwingend `examples/RAG_CLUSTER_EXAMPLE_OPENCODE.md` via `read` Tool, BEVOR du anfängst zu schreiben. Der Fokus liegt auf Enterprise-Forensik (Configs, Limits, Architekturen).
```

#### 🚀 Trigger für Phase 3 (Das Management Dashboard)
```text
@build Führe Phase 3 des "doc-harvester-protocol" aus.
Übersetze die RAG-Dateien in scannbare Management-Dashboards unter `docs/user_manual/`.
WICHTIG: Lese zwingend `examples/USER_MANUAL_EXAMPLE_OPENCODE.md` via `read` Tool, bevor du schreibst. Halte dich exakt an dieses visuelle Layout!
```

#### 🚀 Trigger für Phase 4 & 5 (Schattenwissen)
```text
@build Ich habe das Protokoll ausgeführt. Zeige mir nun die Such-Prompts für Perplexity aus Phase 4 (`templates/03_shadow_research_prompts.md`), angereichert mit unseren spezifischen Keywords.
[Warte auf meine Recherche-Ergebnisse].
Anschließend führst du Phase 5 aus (`templates/04_injection_rules.md`) und injizierst die Fehler/Hacks direkt in die Cluster-Dateien.
```