# Episode Brief

## Working title
**Hermes Agent: Your First Useful Workflow (Setup, Skills, Profiles, and Cron)**

## Hook
Installing an agent is not the finish line. The useful moment is when the same agent can remember a workflow, keep projects isolated, and run a repeatable task without you babysitting every prompt.

## Audience
Developers and technical creators who have heard of Hermes Agent but have only run the installer—or who have a working chat but no reliable operating pattern.

## Outcome
A verified Hermes baseline plus a reusable “research brief” profile pattern. No secrets are shown. The tutorial favors a safe order: setup → real chat → skill → profile → cron.

## Editorial guardrails
- Use official Hermes docs and live CLI evidence.
- Do not claim a provider is configured merely because the binary is installed.
- Label the terminal cards as privacy-safe visualizations; they are not a substitute for a viewer running the commands.
- Explain that cron jobs run in fresh sessions and can be pinned to a provider/model.
- Distinguish profiles from sessions: profiles isolate config, memory, skills, cron, and state.
- Keep the demo harmless: scheduled output goes local; no outbound posting or paid action.

## Tested command pattern
The cron scene uses a complete, runnable shape. Replace the schedule and prompt for your own task:

```bash
hermes cron create "every weekday at 09:00" "Write a three-bullet research brief to C:/Users/you/hermes-output/research-brief.md"
```

The CLI creates the job; verify it with `hermes cron list`, trigger it with `hermes cron run <job_id>`, then inspect the local artifact. Provider/model pinning is configured through the job options or cron tool/API for unattended LLM work; do not assume the visual card alone has pinned a model.

## Chapters (4:00 master)
1. 00:00 Why the first workflow matters
2. 00:34 Install and verify
3. 01:08 Get one clean chat working
4. 01:42 Add a skill
5. 02:16 Isolate work with profiles
6. 02:50 Schedule a safe recurring task
7. 03:25 The operating rule
