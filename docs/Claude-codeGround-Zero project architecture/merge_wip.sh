#!/bin/bash
# -----------------------------------------------------------------------------
# 3-Zone Workflow Enforcer (WIP -> ORIGINAL)
# -----------------------------------------------------------------------------
set -e

echo "🔒 Starting strict merge process from src/wip to src/"

# Step 1: Run Full QA Gates locally on the WIP code
echo "⏳ Running QA Pipeline (qafull)..."
if ! npm run qafull; then
  echo "❌ CRITICAL: QA Gates failed. Merge aborted."
  echo "👉 ACTION REQUIRED: Fix the errors in src/wip before trying to merge again."
  exit 1
fi
echo "✅ QA Gates passed."

# Step 2: Ensure Event Sourcing Log (.hive) is updated
# (Placeholder for potential node script that verifies the .hive log)
# node .opencode/scripts/verify-hive-state.js

# Step 3: Perform the merge
echo "⏳ Merging files..."
rsync -a --exclude='node_modules' src/wip/ src/

# Step 4: Cleanup & Git
echo "✅ Merge successful. Original code updated."
git add src/
git status
echo "🎉 Ready for commit. The Reviewer agent has fulfilled its duty."
exit 0
