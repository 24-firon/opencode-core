# Weg A — Echte Vollübernahme

## Was dieses Paket jetzt anders macht
Dieses Paket enthält **nicht nur rekonstruierte Kurzfassungen**, sondern die hochgeladenen Quelldateien zusätzlich **1:1 als Rohkopien** unter `source_verbatim/`.

Zusätzlich gibt es unter `assembled/` eine für OpenCode aufgeteilte Struktur:
- eine schlanke globale `AGENTS.md`,
- eine schlanke lokale `AGENTS.md`,
- und Skill-Dateien, deren Body jeweils den vollständigen Originaltext der zugehörigen Quelldatei enthält.

## Größenprüfung
- Summe der originalen Quelltexte in `source_verbatim/`: **56036 Bytes**.
- Summe der erzeugten `assembled/`-Dateien: **58721 Bytes**.
- Damit ist die Vollübernahme diesmal physisch im Bundle nachprüfbar.

## Struktur
```text
opencode_wayA_verbatim_bundle/
├── source_verbatim/
│   ├── AGENTS.md
│   ├── all_in_one.md
│   ├── all_in_one-5.md
│   ├── all_in_one-6.md
│   ├── legacy_gold_global_agents-3.md
│   ├── legacy_gold_local_agents-4.md
│   └── legacy_gold_claude_consolidated-2.md
├── assembled/
│   ├── global/AGENTS.md
│   └── project/
│       ├── AGENTS.md
│       └── .opencode/skills/
│           ├── repo-current-agents-full.md
│           ├── identity-governance-full.md
│           ├── organization-methodology-full.md
│           ├── global-core-full.md
│           ├── legacy-gold-global-full.md
│           ├── legacy-gold-local-full.md
│           └── legacy-gold-claude-full.md
└── docs/
    ├── SOURCE_AUDIT.csv
    └── ASSEMBLED_AUDIT.csv
```

## Leselogik
- Wenn du maximale Integrität willst, verwende `source_verbatim/` als Referenz- und Prüfpfad.
- Wenn du OpenCode-kompatible Nachladepakete willst, verwende `assembled/project/.opencode/skills/`.
- Die beiden schlanken `AGENTS.md` sind absichtlich klein; die **Vollmasse** lebt in den Rohkopien und Full-Skills.
