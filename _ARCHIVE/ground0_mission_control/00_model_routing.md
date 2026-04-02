# 🧠 MODEL ROUTING POLICY

## Regel: Modell-Zuweisung nach Aufgabentyp

| Aufgabentyp                   | Modell              | Grund                                             |
| ----------------------------- | ------------------- | ------------------------------------------------- |
| **Backend-Architektur**       | Opus (stark)        | Komplexe Logik, Clean Architecture, Domain-Design |
| **Planung & Strategie**       | Opus (stark)        | Tiefe Analyse, Trade-offs, Entscheidungen         |
| **Skills-Patching**           | Opus (stark)        | Erfordert Cross-Referenz-Analyse                  |
| **Frontend & Design**         | Gemini 3.0 Pro High | Visuell, iterativ, tokenschonend                  |
| **Einfache Korrekturen**      | Schwaches Modell    | String-Replacements, Kommentar-Cleanups           |
| **Vendor-Skill-Installation** | Schwaches Modell    | Routine CLI-Arbeit                                |
| **Tiefe Web-Recherche**       | Perplexity (extern) | Kostenlos, aktueller, kein Token-Verbrauch        |

## Pflicht: Modellwechsel-Handoff (STRICT)

**Regel:** Ein Modell darf NIEMALS über eine markierte Modellgrenze im Plan hinweg arbeiten.

**Handoff-Ablauf:**

1.  **Stopp-Pflicht:** Sobald das Ende eines Arbeitsblocks erreicht ist, der für das aktuelle Modell vorgesehen war, MUSS die Arbeit sofort eingestellt werden.
2.  **Mitteilung:** Der Agent schreibt: `>>> [MODELLWECHSEL ERFORDERLICH: [Ziel-Modell]] <<<`
3.  **Handoff-Prompt:** Der Agent generiert einen präzisen Prompt für das _neue_ Modell, der den aktuellen Status und die nächsten Schritte zusammenfasst.
4.  **Übergabe an User:** Der Agent ruft `notify_user` auf, übergibt die Kontrolle explizit an den User und wartet auf den manuellen Modellwechsel.
5.  **Warten:** Keine weiteren Aktionen, bis der User das neue Modell bestätigt oder den nächsten Prompt sendet.

**Verboten:** Eigenmächtiges Fortfahren ohne explizite Übergabe an den User und dessen Bestätigung.