# 🧠 VIRON META-LEARNINGS: Iteration, Extraktion & Regel-Design

**Zweck:** Dieses Dokument fängt die schmerzhaften, aber extrem wertvollen Meta-Learnings aus der "Viron V4 Architecture Pivot" Session (März 2026) ein. Es definiert, wie Agenten im Context Dispatcher System arbeiten, aufräumen und sich selbst regulieren müssen, um nicht an "Aktionismus" zugrunde zu gehen.

---

## 1. Das "Gold Nugget" Extraktions-Protokoll (Der Anti-Waste Workflow)

Wenn ein Agent ein Repository aufräumt oder Dateien in ein Archiv / den "Mülleimer" verschiebt, weil sie für den aktuellen Scope (z.B. Context Dispatcher) "nicht relevant" sind, greift dieses Protokoll.

**Die Regel:** Niemals blind wegwerfen. Jedes Dokument ist das Resultat von teurer Rechenzeit und menschlicher Denkarbeit.
**Der Workflow:**
1. **Sichtung vor Löschung:** Bevor eine Datei ins Archiv wandert, muss sie auf "Gold Nuggets" (Konzepte, Patterns, nützliche Code-Snippets) gescannt werden.
2. **Abstraktion:** Kann das Konzept (z.B. ein altes CrewAI-Skript) vielleicht nicht 1:1, aber als *abstraktes Architektur-Pattern* für das neue System genutzt werden?
3. **Anreicherung:** Das extrahierte Wissen wird in die globale Knowledge-Base (z.B. als FinOps-Regel oder Architektur-Konzept) eingepflegt. Erst *danach* darf die Originaldatei ins kalte Archiv verschoben werden.

---

## 2. Die Iterations-Schleife (Das Anti-Hektik Gesetz)

KI-Modelle haben den inhärenten Drang, einen Task im allerersten Versuch "abschließen" zu wollen (Fast Completion Bias). Das führt bei komplexen Systemen unweigerlich zu fatalen Fehlern (z.B. gelöschte Ordner, vergessene Variablen).

**Die Regel:** Geschwindigkeit ist der Feind der Architektur. Iteration ist der Weg zur Perfektion.
**Der Workflow:**
1. **Der First-Draft (Drafting):** Der erste Wurf eines Plans oder Codes ist *niemals* das Endprodukt. Er dient nur als Diskussionsgrundlage.
2. **Die Reflektions-Schleife:** Der Agent ist gezwungen, innezuhalten und sich selbst zu fragen: *"Was habe ich übersehen? Wenn ich das jetzt ausführe, welche 3 Dinge könnten das System zerstören?"*
3. **Mehrmaliges Thematisieren:** Komplexe Architektur-Entscheidungen (wie RAG-Trennung) müssen zwingend mehrfach im Chat mit dem Operator validiert und aus verschiedenen Blickwinkeln beleuchtet werden, bevor Code geschrieben wird. Die Qualität steigt mit jedem Iterations-Loop exponentiell.

---

## 3. Gewichtung im Import-Kanal (Die Angebots-Logik)

Der `_IMPORT/` Ordner ist eine Inbox für Agenten. Aber nicht alles darin ist ein harter Befehl. Agenten müssen lernen, die "Intention" hinter einem Import zu bewerten.

**Die Regel (Wie man Regeln schreibt & bewertet):**
Wenn Wissen aus dem Import-Ordner in System-Regeln oder den Code-Base überführt wird, muss zwingend ein "Gewichtungs-Tag" vergeben werden. Eine Regel ist nur so gut wie ihr Kontext.
Jedes neue Konzept muss klassifiziert werden:
*   🔴 **[MANDATORY / URGENT]**: Vom Operator explizit und hart eingefordert (z.B. "Nutze niemals to_thread für File I/O"). Muss sofort in die Kern-Sicherheitsregeln.
*   🟡 **[RECOMMENDED]**: Eine Best-Practice, die sich im Verlauf der Session als sinnvoll erwiesen hat (z.B. "Nutze das Prefix viron- für Custom-Skills").
*   🟢 **[GOOD IDEA / BACKLOG]**: Ein Konzept aus einer archivierten Datei, das aktuell nicht zwingend ist, aber wertvoll für die Zukunft sein könnte (z.B. SGLang Integration). Landet im Future-Plan.

---

## 4. Orchestrierung durch das "Regel-Workflow" Raster

Damit Agenten in einer Fabrik funktionieren, müssen Regeln und Workflows eine untrennbare Symbiose bilden.

*   **Regeln** sind die Leitplanken (z.B. "Kein rm -rf").
*   **Workflows** definieren, *wann* welche Regel greift.

**Die Architektur:**
Ein Agent bekommt nicht einfach 50 Regeln hingeworfen. Er bekommt einen Workflow (z.B. "Führe ein Server-Audit durch"). Der Workflow verweist an den kritischen Stellen dynamisch auf die Regeln:
*Schritt 2: Lösche alte Container -> [ACHTUNG: Hier greift Regel 00_DESTRUCTIVE_ACTION_SAFEGUARD].*

Das Context Dispatcher System muss exakt darauf getrimmt werden: Es serviert dem ausführenden Agenten nicht nur den Code, sondern webt die passenden Überlebensregeln passgenau in den Workflow-Prompt ein.
EOF