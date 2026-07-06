# Cross-Platform Handoff Contract

**Last updated:** 2026-07-06

Defines how work is handed off between the AI operating-system roles and across
agent sessions/platforms. Source of truth for authority: `~/AGENTS.md` and
`AI_AGENT_OS.md`.

---

## Authority hierarchy

| Role | Authority | May | May NOT |
|---|---|---|---|
| **Open Design** | Design | Own the visual source of truth | — |
| **Implementation agent** (Claude Code / equivalent) | Implementation | Build, refactor, fix, run tests, verify localhost, deploy approved releases | Override approved designs |
| **Audit agent** (Codex / equivalent) | Audit | Compare impl vs Open Design, verify a11y/responsiveness/perf, identify debt/gaps | Redesign; propose alternative UI |
| **Planning agent** (AntiGravity / equivalent) | Planning | Sprint/release planning, docs, handoffs, backlog, risk, orchestration | Redesign; implement |

If Open Design exports are unavailable for a design task: **STOP** and output
`OPEN DESIGN EXPORTS NOT FOUND`. Do not invent replacement screens.

## Design rules (non-negotiable)
- All approved designs originate from `$OPEN_DESIGN_EXPORTS`.
- Never redesign approved screens or replace approved layouts without explicit instruction.
- For this project (TUB), the locked design tokens live as CSS variables inside
  `public/tub/tub-app.html` — colors, type, spacing are frozen.

## Required handoff format
Every handoff (between agents, sessions, or platforms) must include:

```
Objective:
Current State:
Files Changed:
Known Risks:
Verification Status:
Next Action:
```

## Git discipline
Before commit: remove temporary files, debug scripts, test artifacts, obsolete
sprint plans. Commit only verified work.

## Verification requirements (in order)
1. Local preview
2. Build verification
3. Deployment verification
4. Smoke testing

**Never claim completion without verification evidence.**

## Documentation policy
Retain only these planning artifacts (avoid sprint-document sprawl):
- `docs/PROJECT_INDEX.html`
- `docs/CURRENT_SPRINT.md`
- `docs/NEXT_3_SPRINTS_PLAN.md`
- `docs/BUILD_PHASE_BEACON.md`
- `docs/CROSS_PLATFORM_HANDOFF_CONTRACT.md` (this file)

Superseded planning artifacts are archived in git history, not in HEAD.

## Universal rule
Open Design owns design. Implementation agents build. Audit agents verify.
Planning agents coordinate. No agent overrides approved Open Design exports
without explicit instruction.
