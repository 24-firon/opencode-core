---
name: java-spring-analyzer
description: Reconnaissance rules for analyzing Java repositories. DO NOT modify code.
---

# Reconnaissance Protocol: java-spring-analyzer

Identifiziert Spring-Boot-Apps durch `pom.xml` (Maven) oder `build.gradle` (Gradle). Instruiert den Scan von `src/main/resources/application.properties` für Konfigurationen und sucht nach `@SpringBootApplication`. Blockiert `target/` und `.gradle/` absolut, um riesige JAR/CLASS-Binaries zu meiden.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
