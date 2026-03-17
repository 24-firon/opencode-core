import { HiveAPI } from '../dist/hive/index.js';
import { generatePlan } from '../.opencode/scripts/generate-plan.js';

async function runTest() {
  console.log("🚀 Starte Test für /swarm-plan Simulation...\n");
  
  // 1. API initialisieren
  const api = new HiveAPI();
  console.log("✅ HiveAPI initialisiert.");

  // 2. Simulierte Tasks erstellen (z.B. User fordert "JWT Auth System" an)
  console.log("📝 Erstelle Tasks in der SQLite Datenbank...");
  
  const task1 = api.createTask({
    title: "Setup JWT dependencies and environment variables",
    description: "Install jsonwebtoken, types, and setup JWT_SECRET in config.",
    phase: 1,
    size: "small",
    assignedAgent: "coder"
  });
  console.log(`  -> Task erstellt: ${task1.id}`);

  const task2 = api.createTask({
    title: "Implement JWT generation and verification logic",
    description: "Create auth util functions for signing and verifying tokens.",
    phase: 1,
    size: "medium",
    dependencies: [task1.id],
    assignedAgent: "coder"
  });
  console.log(`  -> Task erstellt: ${task2.id}`);

  // 3. SME Guidance simulieren
  console.log("📝 Speichere SME Guidance...");
  api.logEvent(task1.id, "sme_guidance", {
    content: "Make sure to set expiration time to 15 minutes for access tokens.",
    tags: "security, jwt"
  });

  // 4. Projection aufrufen (wie in generate-plan.js)
  console.log("\n🔄 Führe Projektion aus (.hive -> .swarm/plan.md)...");
  await generatePlan();
  
  console.log("\n🎉 Test erfolgreich! Schau dir .swarm/plan.md an.");
}

runTest().catch(console.error);
