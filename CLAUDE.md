# CLAUDE.md — Radio Vox Ecclesiae Landing Page (`radiovoxecclesiae.cm`)

## Project Overview

Landing page statique pour **Radio Vox Ecclesiae** (radio catholique du Diocèse de Bafoussam, Cameroun).

- **Objectif** : Hub de redirection pour les liens partagés depuis l'app mobile
- **Stack** : HTML + CSS + JS vanilla — fichier unique `index.html`, zéro dépendance build
- **Déploiement cible** : hébergement statique (Netlify / Render / GitHub Pages)
- **Source de données** : `https://api.radiovoxecclesiae.cm/api/v1/app-config`
- **App web** : `https://app.radiovoxecclesiae.cm/`
- **Langues** : Français (défaut) + Anglais (switch Fr/En)

### Fichiers clés

| Fichier | Rôle |
|---|---|
| `index.html` | Page principale — structure, CSS, JS embarqués |
| `privacy.html` | Page Politique de confidentialité |
| `terms.html` | Page Conditions d'utilisation |
| `tasks/` | Spécifications des tâches de développement |

### Palette Brand

| Variable CSS | Valeur | Usage |
|---|---|---|
| `--brand-primary` | `#011449` | Fond principal |
| `--brand-primary-container` | `#1A2A5E` | Fond dégradé |
| `--brand-secondary-container` | `#FDC656` | CTA principal (or) |
| `--brand-icon` | `#C8972A` | Icônes, accents |
| `--brand-on-primary` | `#FFFFFF` | Texte sur fond sombre |

---

## Conventions

### TypeScript
- Pas de `any` — utiliser `unknown` + narrowing
- Props de composant en `interface` nommée
- Types exportés depuis `constants/radio.ts` : `ScheduleItem`, `DaySchedule`, `ScheduleSlot`

### Git
- Commits conventionnels : `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`
- Branches feature depuis `main`, PRs obligatoires

---

## Config Claude Code (`.claude/`)

### Agents disponibles

| Agent | Modèle | Rôle |
|---|---|---|
| `planner` | sonnet | Planification, décomposition en phases |
| `architect` | opus | Décisions architecturales |
| `tdd-guide` | sonnet | Workflow test-first (RED→GREEN→REFACTOR) |
| `code-reviewer` | sonnet | Revue qualité, patterns, best practices |
| `security-reviewer` | sonnet | OWASP, secrets, vulnérabilités |
| `build-error-resolver` | sonnet | Diagnostic et correction d'erreurs build |
| `e2e-runner` | sonnet | Tests E2E Maestro |
| `refactor-cleaner` | sonnet | Nettoyage code mort |
| `doc-updater` | sonnet | Mise à jour documentation |

### Commandes slash (`.claude/commands/`)

| Commande | Description |
|---|---|
| `/plan` | Planifier une feature avant de coder (attend confirmation avant d'agir) |
| `/tdd` | Workflow test-first pour un nouveau comportement |
| `/e2e` | Générer un flow Maestro |
| `/code-review` | Revue d'un composant ou module |
| `/build-fix` | Diagnostiquer et corriger des erreurs de build |

### Skills (`.claude/skills/`)

| Skill | Commande | Quand l'utiliser |
|---|---|---|
| `frontend-patterns` | `/frontend-design` | Composants UI, mise en page, design system |
| `tdd-workflow` | `/tdd` | Patterns de test React Native |
| `e2e-testing` | `/e2e` | Tests Maestro |
| `security-review` | `/security-review` | Analyse sécurité, secrets, OWASP |

### Règles chargées automatiquement (`.claude/rules/`)

- `common/coding-style.md` — immutabilité, taille des fichiers, gestion d'erreurs
- `common/development-workflow.md` — Research → Plan → TDD → Review → Commit
- `common/git-workflow.md` — format des commits, PR process
- `common/testing.md` — couverture 80%+, TDD obligatoire
- `common/security.md` — checklist sécurité pré-commit
- `common/agents.md` — orchestration et parallélisation des agents
- `common/code-review.md` — niveaux CRITICAL/HIGH/MEDIUM/LOW
- `common/performance.md` — sélection de modèle (Haiku/Sonnet/Opus)
- `typescript/coding-style.md` — types, interfaces, Zod, pas de `any`

---

## Core Philosophy

Agent-first, test-driven, security-first.

1. **Plan avant de coder** — utiliser `/plan` pour toute feature non triviale
2. **Agents en parallèle** — déléguer et paralléliser les tâches indépendantes
3. **TDD** — écrire les tests avant l'implémentation
4. **Revue systématique** — `/code-review` après chaque modification significative
5. **Sécurité non négociable** — aucun secret en dur, validation à toutes les frontières
