# Sub-Agent State Management & Task IDs

## 1. The Context Amnesia Problem
When the primary agent (e.g., `build`) delegates a task to a sub-agent (e.g., `@CodeReviewer`) via tool execution, the sub-agent starts with an empty context.

## 2. The Task ID Rule
**MANDATORY**: Whenever you (the Primary Agent) start a Sub-Agent, the execution host returns a unique `task_id`.
- You MUST log this `task_id`.
- Every subsequent call or interaction with that same Sub-Agent for the same task MUST include this specific `task_id`.
- Failure to pass the `task_id` will result in the Sub-Agent losing all previous state, causing redundant loops and burning tokens.

## 3. Delegation Rules
- If an agent is not assigned to a task (e.g. Architect delegates to Coder), the delegating agent MUST provide a complete, robust prompt to the sub-agent.
- Provide all necessary context or precise file paths for the sub-agent to operate efficiently.
