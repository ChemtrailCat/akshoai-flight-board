# AkshoAI Flight Board - LLM Integration Guide

## Overview

This guide enables AI assistants (Claude, GPT, etc.) to read and write tasks to the AkshoAI Flight Board - a PWA-themed Kanban board for team task management.

**Live Board:** https://chemtrailcat.github.io/akshoai-flight-board/
**Repository:** https://github.com/ChemtrailCat/akshoai-flight-board
**Password:** `PwA-Flight46!`

---

## Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ChemtrailCat/akshoai-flight-board.git
```

Or if already cloned, pull latest:
```bash
cd path/to/akshoai-flight-board && git pull origin main
```

### 2. File Structure

```
akshoai-flight-board/
├── tasks.json      ← EDIT THIS FILE to add/modify tasks
├── PRD.md          ← Product Requirements Document
├── index.html      ← Board UI (don't edit unless changing features)
├── styles.css      ← Styling (don't edit unless changing features)
└── app.js          ← Logic (don't edit unless changing features)
```

---

## Task Data Format

All tasks live in `tasks.json`. Here's the structure:

```json
{
  "board": {
    "name": "AkshoAI - Dev Tasks",
    "lastUpdated": "2025-01-29T00:00:00.000Z"
  },
  "columns": [
    { "id": "boarding", "name": "Boarding" },
    { "id": "gate-ready", "name": "Gate Ready" },
    { "id": "in-flight", "name": "In Flight" },
    { "id": "landed", "name": "Landed" }
  ],
  "team": [
    { "id": "ale", "name": "Ale", "role": "CEO" },
    { "id": "baron", "name": "Baron", "role": "COO" },
    { "id": "chem", "name": "Chem", "role": "CTO" },
    { "id": "stefan", "name": "Stefan", "role": "Team" },
    { "id": "emi", "name": "Emi", "role": "AI Assistant" }
  ],
  "tasks": [
    {
      "id": "PWA-001",
      "title": "Task Title",
      "description": "Task description here.",
      "column": "boarding",
      "priority": "medium",
      "assigned": "chem",
      "created": "2025-01-29",
      "tags": ["feature", "ui"]
    }
  ]
}
```

### Task Fields

| Field | Required | Values |
|-------|----------|--------|
| `id` | Yes | `PWA-XXX` format (auto-increment) |
| `title` | Yes | Short task name |
| `description` | No | Detailed description |
| `column` | Yes | `boarding`, `gate-ready`, `in-flight`, `landed` |
| `priority` | Yes | `low`, `medium`, `high` |
| `assigned` | No | Team member id: `ale`, `baron`, `chem`, `stefan`, `emi`, or `""` |
| `created` | Yes | `YYYY-MM-DD` format |
| `tags` | No | Array of lowercase strings |
| `completed` | No | `YYYY-MM-DD` (add when moving to landed) |
| `summary` | No | Completion summary (for landed tasks) |

### Column Mapping (Flight Board Metaphor)

| Column | Meaning | Icon |
|--------|---------|------|
| `boarding` | Backlog | 🛫 |
| `gate-ready` | Todo / Ready to start | 🎫 |
| `in-flight` | In Progress | ✈️ |
| `landed` | Done / Completed | 🛬 |

---

## LLM Commands

When a user asks you to interact with the Flight Board, use these patterns:

### Add a New Task

```
User: "Add task: Build login page - assigned to Stefan"
```

**Steps:**
1. Read `tasks.json`
2. Find the highest `PWA-XXX` number
3. Create new task with incremented ID
4. Add to `tasks` array
5. Commit and push

**Example task to add:**
```json
{
  "id": "PWA-006",
  "title": "Build login page",
  "description": "",
  "column": "boarding",
  "priority": "medium",
  "assigned": "stefan",
  "created": "2025-01-29",
  "tags": []
}
```

**Git commands:**
```bash
git add tasks.json
git commit -m "Add task PWA-006: Build login page

Co-Authored-By: [Your AI Name] <noreply@example.com>"
git push origin main
```

### Move a Task

```
User: "Move PWA-003 to in-flight"
```

**Steps:**
1. Read `tasks.json`
2. Find task by ID
3. Update `column` field
4. Commit and push

### Complete a Task

```
User: "Mark PWA-005 as done"
```

**Steps:**
1. Find task by ID
2. Set `column` to `landed`
3. Add `completed` date
4. Optionally add `summary`
5. Commit and push

### View Tasks

```
User: "Show me all in-flight tasks"
```

**Steps:**
1. Read `tasks.json`
2. Filter tasks by column
3. Display to user

### View Board Status

```
User: "What's the board status?"
```

**Response format:**
```
Flight Board Status:
- Boarding: X tasks
- Gate Ready: X tasks
- In Flight: X tasks
- Landed: X tasks

In Flight:
- PWA-XXX: Task title (assigned to Name)
```

---

## Git Workflow

**Always pull before editing:**
```bash
git pull origin main
```

**After editing tasks.json:**
```bash
git add tasks.json
git commit -m "Brief description of change"
git push origin main
```

**Commit message format:**
```
[Action] task PWA-XXX: Brief description

Examples:
- Add task PWA-006: Build login page
- Move PWA-003 to in-flight
- Complete PWA-005: API integration done
- Update PWA-002 priority to high
```

---

## Important Notes

1. **Always increment IDs** - Check existing tasks for the highest PWA-XXX number
2. **Use lowercase for assigned** - Match team member `id` field exactly
3. **Pull before push** - Avoid merge conflicts with other team members
4. **Keep descriptions concise** - Board has limited space
5. **Use tags consistently** - Common tags: `feature`, `bug`, `ui`, `api`, `docs`, `infrastructure`

---

## Troubleshooting

**Push rejected:**
```bash
git pull origin main --rebase
git push origin main
```

**Merge conflict in tasks.json:**
- Open tasks.json
- Resolve conflicts (keep both task arrays merged)
- Commit the resolution

---

## Team Contacts

- **Ale (CEO)** - Project vision, priorities
- **Baron (COO)** - Operations, processes
- **Chem (CTO)** - Technical decisions
- **Stefan** - Development
- **Emi** - AI Assistant

---

*Last updated: January 29, 2025*
*Flight Board v1.1*
