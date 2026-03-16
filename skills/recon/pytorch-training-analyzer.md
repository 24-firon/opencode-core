---
name: pytorch-training-analyzer
description: Reconnaissance rules for analyzing Pytorch repositories. DO NOT modify code.
---

# Reconnaissance Protocol: pytorch-training-analyzer

Identifiziert Deep-Learning-Repos durch Imports oder `requirements.txt`. Scannt gezielt nach `dataset.py` (Dataloader), `model.py` (Architektur) und `train.py` (Training-Loop). Ignoriert `.pt`/`.pth` Modell-Gewichte und `runs/` Tensorboard-Logs.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
