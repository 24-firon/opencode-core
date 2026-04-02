# Phase 5: Injection (Das Schattenwissen einweben)

> **Zweck dieser Datei:** Regelt, WIE die Community-Ergebnisse (Bugs, Workarounds, Hidden Gems) in die bestehenden RAG-Cluster und User Manuals eingefügt werden. Niemals als separate Dateien — immer INLINE an der relevanten Stelle.

Wenn der User dir die Ergebnisse aus der Community-Recherche (aus Phase 4) liefert, erstelle **keine separaten Community-Dateien**. 
Das Wissen muss direkt in die RAG-Dateien (Phase 2) und die User-Manuals (Phase 3) injiziert werden, damit Agent und Mensch sofort darüber stolpern.

**Zwingendes Format für die Injection:**
Nutze auffällige Blockquotes mit einem Warndreieck.

```markdown
> ### ⚠️ COMMUNITY REALITY CHECK (Monat/Jahr)
> **Die Doku sagt:** [Was offiziell versprochen wird].
> **Die Realität:** [Was in der Community passiert, z.B. Bug, OOM Crash, Limit]. (Quelle: GitHub Issue #123)
> **Workaround:** [Die konkrete Lösung, z.B. Setze die Env-Var X auf Y].
```

**Positionierung:**
- In **RAG-Clustern:** Platziere den Block als `## 0.` ganz am **Anfang** der Datei, VOR allen anderen Sektionen.
- In **User Manuals:** Platziere den Block direkt **unter** der Coach-Ecke (💡), weil dort der Kontrast zwischen Theorie und Praxis am höchsten ist.

> **Beispiel für eine korrekte Injection (RAG-Cluster):**
> ```markdown
> # Cluster 01: Architecture & Setup
> 
> ## 0. ⚠️ COMMUNITY REALITY CHECKS (März 2026)
> > **Die Doku sagt:** Background-Jobs werden automatisch retryed.
> > **Die Realität:** Wenn der Worker crasht, gehen Jobs im "Processing"-Status permanent verloren (Redis Data-Loss).
> > **Workaround:** Nutze persistente Queues via QUEUE_DRIVER=postgres, nicht Redis.
> 
> ## 1. Storage Backend Architecture
> Das System unterscheidet strikt zwischen Hot-Storage (Redis) und Cold-Storage (S3).
> ```