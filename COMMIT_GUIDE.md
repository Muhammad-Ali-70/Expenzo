# Commit Guide for Expenzo

This guide helps you (and AI assistants) create well-structured commits following the project's conventions.

## Commit Message Format

```
<type>(<scope>): <short description>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring (no functional changes)
- `chore`: Maintenance tasks, dependencies
- `docs`: Documentation changes
- `style`: Code style/formatting changes
- `perf`: Performance improvements
- `test`: Adding or updating tests

### Scopes (common examples)
- `accounts`: Account management features
- `auth`: Authentication and authorization
- `transaction`: Transaction features
- `transfer`: Transfer functionality
- `category`: Category management
- `budget`: Budget features
- `debt`: Debt tracking
- `investment`: Investment features
- `history`: Transaction history
- `profile`: User profile
- `navigation`: Navigation changes
- `health`: Health check and monitoring
- `lint`: Linting and code quality

## Commit Workflow

### 1. Check Current Changes
```bash
git status
git diff
```

### 2. Review Modified Files
Group related changes together. Don't mix unrelated features in one commit.

### 3. Stage and Commit by Feature

**Example: Account Management Feature**
```bash
# Frontend
git add src/components/accounts/ src/components/modals/accounts/ src/screens/tabs/SettingStack/ManageAccountsScreen.js src/navigations/SettingStack.js src/screens/tabs/SettingStack/SettingsScreen.js src/store/useAccountStore.js
git commit -m "feat(accounts): add manage accounts screen with edit, archive, and empty state"

# Backend
git add src/controllers/accountController.js src/models/Account.js
git commit -m "feat(accounts): add edit, archive, and limit enforcement for accounts"
```

**Example: Bug Fix**
```bash
git add src/screens/tabs/HistoryStack/HistoryScreen.js
git commit -m "fix(history): show all transactions by default without date range"
```

**Example: Refactoring**
```bash
git add src/components/transaction/TransactionTypeHeader.js src/components/transaction/TransferLink.js src/screens/tabs/AddTransaction/AddTransactionScreen.js
git commit -m "refactor(transaction): extract TransactionTypeHeader and TransferLink components"
```

**Example: Code Formatting**
```bash
git add src/screens/tabs/SettingStack/TransferScreen.js
git commit -m "fix(transfer): improve code formatting and default description"
```

## Grouping Rules

### ✅ Group Together:
- Files that implement the same feature
- Components and their related modals
- Store updates and the screens that use them
- Route configuration and new screens
- Related frontend and backend changes (separate commits, same feature)

### ❌ Don't Group:
- Unrelated features
- Bug fixes with new features
- Linting changes with functional changes
- Multiple distinct features

## Common Patterns from Project History

```bash
# Adding new features
feat(investment): add investment service, store defaults, modals, screens and navigation
feat(categories): add custom user categories across add, history, and plan
feat(transfer): add transfer screen, settings entry, and quick link in add transaction

# Fixing bugs
fix(history): remove duplicate renderEmpty function definition
fix(accounts): strip bank- and wallet- prefixes from sourceId for image lookup
fix(navigation): pass onBellPress to HomeHeader on all screens for notification navigation

# Improvements
fix(activity): improve transfer subtitle arrow icon and styling
fix(lint): clean up RecentActivityItem warnings and improve transfer subtitle

# Refactoring
refactor(transaction): extract TransactionTypeHeader and TransferLink components
```

## AI Assistant Instructions

When asked to commit changes:

1. **Run `git status`** to see all modified/untracked files
2. **Run `git diff`** on each file to understand changes
3. **Group related changes** by feature/scope
4. **Create separate commits** for:
   - Each distinct feature
   - Bug fixes
   - Formatting/linting (if significant)
5. **Use conventional commit format**: `<type>(<scope>): <description>`
6. **Keep descriptions concise** but descriptive (50-70 chars)
7. **Stage files explicitly** - avoid `git add .`
8. **Don't create too many micro-commits** - group logically related work

## Quick Reference

```bash
# Check status
git status

# See changes
git diff <file>

# Stage specific files
git add <file1> <file2> <file3>

# Commit with message
git commit -m "type(scope): description"

# Amend last commit (if not pushed)
git commit --amend --no-edit

# Reset last commit (keep changes)
git reset --soft HEAD~1

# Unstage file
git reset HEAD <file>

# View commit history
git log --oneline -10
```

## Notes

- Keep commits focused and atomic
- Each commit should represent a complete, working change
- Commit messages should be clear enough to understand without seeing the code
- Don't commit broken code or work-in-progress unless necessary
- Frontend and backend changes for the same feature should be separate commits
