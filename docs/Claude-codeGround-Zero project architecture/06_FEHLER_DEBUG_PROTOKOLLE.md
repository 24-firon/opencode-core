# 06 – FEHLER & DEBUG PROTOKOLLE (Ground-Zero)
<!-- Source: EXTRAKTIONS-SCRIPTS-GLOSSAR.txt, WORK_BUFFER.md, MANIFEST-ORCHESTRATOR.md -->
<!-- Protokoll-Struktur: Fehlerbild → Analyse → Lösung → Lesson Learned -->
<!-- VERIFIZIERT: ✅ = aus Quelldateien | Stand: 2025-11-27 ULTIMATE v3 -->

---START BLOCK-10-FEHLER-DEBUG---

## Fehler-Protokoll-Format

Für jeden Fehler wird dokumentiert:
1. **Fehlerbild:** Was ist passiert?
2. **Analyse:** Wie wurde die Ursache gefunden?
3. **Lösung:** Was wurde getan?
4. **Lesson Learned:** Was muss getan werden, um es künftig zu vermeiden?

---

### FEHLER #1: Docker Port-Konflikt
| Feld | Inhalt |
|---|---|
| **Fehlerbild** | `Port already in use` für Port 8080 (Zeile 2820) |
| **Analyse** | Alter, nicht sauber beendeter Container belegte Port |
| **Lösung** | Verwaisten Prozess beendet; auf Port 8888 gewechselt |
| **Lesson Learned** | Pre-Start-Check für Ports einbauen; 8888 als Standard dokumentieren |
| **Status** | ✅ GELÖST |

---

### FEHLER #2: MCP Startup – Konfigurations-Mismatch
| Feld | Inhalt |
|---|---|
| **Fehlerbild** | MCP-Server startet nicht – Schema-Mismatch zwischen Registry und Runtime (Zeile 2881) |
| **Analyse** | Registry-Struktur passte nicht zur MCP-API-Erwartung |
| **Lösung** | Registry-Schema manuell angepasst |
| **Lesson Learned** | Strikte Typisierung (TypeScript) + automatisierter Test nach jeder Registry-Änderung |
| **Status** | ⚠️ TEILWEISE GELÖST – Validierungs-Logik noch ausstehend |

---

### FEHLER #3: Agent Zero Healthcheck – Docker nicht bereit
| Feld | Inhalt |
|---|---|
| **Fehlerbild** | Agent Zero Healthcheck schlug fehl; Docker war nicht bereit; E2B API-Key fehlte (Zeile 7430) |
| **Analyse** | Abhängigkeitskette nicht eingehalten (Docker → E2B → Agent Zero) |
| **Lösung** | Pre-Flight-Check-Script erstellen, das alle Abhängigkeiten prüft |
| **Lesson Learned** | Blocker-First: Docker 4.5 muss laufen BEVOR Agent Zero gestartet wird |
| **Status** | 🚨 OFFEN – Docker-Installation noch Blocker |

---

### FEHLER #4: UnicodeEncodeError – Windows Konsole
| Feld | Inhalt |
|---|---|
| **Fehlerbild** | `UnicodeEncodeError: charmap codec can't encode character` (Windows Konsole) |
| **Analyse** | Windows Konsole nutzt CP1252 statt UTF-8 |
| **Lösung** | `sys.stdout.reconfigure(encoding='utf-8', errors='replace')` am Skript-Anfang |
| **Lesson Learned** | Encoding-Fix ist Pflicht für alle Python-Skripte unter Windows |
| **Code** | `sys.stdout.reconfigure(encoding='utf-8', errors='replace')` |
| **Status** | ✅ GELÖST |

---

### FEHLER #5: Unix-Befehle auf Windows fehlgeschlagen
| Feld | Inhalt |
|---|---|
| **Fehlerbild** | `ls`, `grep` etc. auf Windows fehlgeschlagen |
| **Analyse** | Agent nutzte Unix-Syntax ohne Plattform-Check |
| **Lösung** | `sys.platform == 'win32'` Check vor Befehlsausführung; `dir /s /b` statt `ls` |
| **Lesson Learned** | OS-Awareness ist Pflicht: immer Plattform prüfen bevor Shell-Befehle ausgeführt werden |
| **Status** | ✅ GELÖST – Lesson: `sys.platform` Check einbauen |

---

### FEHLER #6: Extraktor V1 – Datenverlust (94% Kompression)
| Feld | Inhalt |
|---|---|
| **Fehlerbild** | `extractdocs.py` V1 produzierte nur Inhaltsverzeichnis – 94% der Informationen verloren |
| **Analyse** | Kompression zu aggressiv – Metadaten, Emojis, Struktur wurden vernichtet |
| **Lösung** | V2 Extraktor (`extractv2.py`) mit Chunking und max. 70% Kompression |
| **Lesson Learned** | Kompression-Ziel: 70-80% NICHT 95%. SED (Emojis, Marker, Hierarchie) sind Primärdaten! |
| **Status** | ✅ GELÖST – V1 deprecated, V2 aktiv |

---

### FEHLER #7: Request interrupted by user for tool use
| Feld | Inhalt |
|---|---|
| **Fehlerbild** | `Request interrupted by user for tool use` – User unterbrach Agenten |
| **Analyse** | Agent arbeitete blind weiter ohne Bestätigung zu warten |
| **Lösung** | Striktes Feedback-Protokoll: STOP nach jeder Phase, auf OK warten |
| **Lesson Learned** | Blindflug ist verboten – Agent MUSS nach jeder Phase auf Freigabe warten |
| **Status** | ✅ DOKUMENTIERT |

---

### FEHLER #8: "File has not been read yet" Agent-Fehler
| Feld | Inhalt |
|---|---|
| **Fehlerbild** | `File has not been read yet` – Agent versuchte Datei zu bearbeiten ohne sie vorher gelesen zu haben |
| **Analyse** | Sicherheitsmechanismus greift – Datei muss erst gelesen werden |
| **Lösung** | Kontext-First-Regel: Immer zuerst relevante Dateien lesen |
| **Lesson Learned** | Regel: `Read` vor `Edit` – niemals Dateien bearbeiten ohne Inhalt zu kennen |
| **Status** | ✅ DOKUMENTIERT |

---

### FEHLER #9: Docker 4.6 Update – Nvidia-Treiber Chaos
| Feld | Inhalt |
|---|---|
| **Fehlerbild** | Update auf Docker 4.6 verursachte schwere Kompatibilitätsprobleme mit RTX 4080 unter WSL2 (Zeile 970) |
| **Analyse** | Neuere Docker-Version bricht Nvidia-WSL2-Integration |
| **Lösung** | Rollback auf Docker Desktop 4.5; Auto-Update deaktiviert |
| **Lesson Learned** | Docker 4.5 = einzige stabile Version für dieses Setup. AUTO-UPDATE AUS! 2 Stunden verloren. |
| **Status** | ✅ GELÖST – Docker 4.5 bleibt eingefroren |

---

### FEHLER #10: E2B Health-Check Falscher Alarm
| Feld | Inhalt |
|---|---|
| **Fehlerbild** | E2B Server wurde als offline gemeldet, lief aber bereits lokal |
| **Analyse** | Health-Check-Script erkannte laufenden E2B-Server nicht korrekt |
| **Lösung** | Health-Check-Script fixen |
| **Lesson Learned** | Health-Checks brauchen exakte Endpoint-Definitionen und Timeout-Werte |
| **Status** | 🚨 OFFEN – Health-Check fixen |

---

### FEHLER #11: Auto-Compact Bug (Claude Code v1.0.84)
| Feld | Inhalt |
|---|---|
| **Fehlerbild** | Auto-Compact triggerte bei 8-12% Context-Auslastung statt 95% → faktisch unbenutzbar |
| **Analyse** | Bug in spezifischer Release-Version von Claude Code |
| **Lösung** | Update auf gepatchte Version; oder Auto-Compact via `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=0` deaktivieren |
| **Lesson Learned** | Auto-Compact Threshold immer nach Updates prüfen. Fallback: manuell `/clear` + Plan-Dokument |
| **Status** | ✅ DOKUMENTIERT (Version spezifisch) |

---

## Wiederkehrende Muster (Mustererkennung)

1. **Port-Konflikte** → Pre-Start-Check für alle Ports implementieren
2. **Docker-Versions-Chaos** → Version einfrieren, Auto-Update abschalten
3. **OS-Awareness** → Windows vs. Linux Check vor jedem Shell-Befehl
4. **Encoding-Probleme** → UTF-8 Fix als Standard am Skript-Anfang
5. **Blindflug** → STOP-Kultur: nach jeder Phase auf OK warten

---END BLOCK-10-FEHLER-DEBUG---
