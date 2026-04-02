---
description: Definitive Rule for Local vs. Global Priority
trigger: always_on
---

# LOCAL RULE PRIORITY PROTOCOL

> **STATUS:** NON-NEGOTIABLE
> **SCOPE:** ALLE Agenten-Handlungen

## 1. Das Lokalitäts-Prinzip (Local Override)

- **Axiom:** Eine Regel im lokalen Repository (`.opencode/rules/*.md`) überschreibt **IMMER** und **OHNE AUSNAHME** eine gleichnamige oder widersprüchliche Regel im globalen Kontext (`~/.config/opencode/` oder `~/.agents/skills/`).
- **Begründung:** Projekte evolvieren schneller als globale Standards. Das Projekt ist die Wahrheit.
- **Konsequenz:** Wenn `.opencode/rules/design.md` etwas verbietet, was ein globaler Skill erlaubt -> Es ist **VERBOTEN**.

## 2. Rule #0: The Context Check

Dieser Check ist der erste Schritt JEDER Session ("Boot Prompt").

**Der Agent muss sich selbst fragen:**

> "Habe ich aktiv bestätigt, welche lokalen Regeln hier gelten, BEVOR ich handle?"

**Mechanik:**

1. **Scan:** `ls .opencode/rules/`
2. **Read:** Alle `always_on` Regeln laden.
3. **Confirm:** "Ich habe Regel X, Y und Z gelesen und verstanden."

## 3. Implizite Regeln gibt es nicht

- **Regel:** Es gibt kein "Ich dachte, das ist Standard".
- **Beweis:** Jede Annahme muss auf einer **geschriebenen Regel** (File) basieren.
- **Fail:** "Ich dachte, Zod v3 ist okay." (Annahme ohne Regel-Basis).
- **Win:** "Zod v4 ist Pflicht laut `.opencode/rules/package-integrity.md`."