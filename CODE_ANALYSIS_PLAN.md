# Expenzo Frontend Code Analysis Plan
**Created:** August 4, 2026  
**Analyst Role:** Senior React Native Developer (10+ years experience)  
**Objective:** Comprehensive code review to identify vulnerabilities, bugs, optimization opportunities, and code quality issues

---

## Analysis Strategy Overview

This plan breaks down the frontend codebase analysis into **10 systematic phases**, each targeting specific aspects of the application. Each phase builds upon the previous one to ensure thorough coverage without overwhelming scope.

### Analysis Approach
- **Structured**: Logical grouping of related concerns
- **Systematic**: Each phase has clear scope and deliverables
- **Actionable**: Findings categorized by severity with concrete fixes
- **Non-Overlapping**: Minimal redundancy between phases

---

## Phase 1: Project Structure & Architecture
**Focus:** Foundation and organization

### Scope
- `/src` directory structure analysis
- Configuration files (`package.json`, `babel.config.js`, `metro.config.js`)
- Asset organization (`/assets`, `/constants`)
- Third-party library choices and versions
- Build configurations (Android/iOS)

### What We'll Look For
- ✅ Proper separation of concerns
- ❌ Circular dependencies
- ❌ Unused dependencies
- ❌ Outdated packages with known vulnerabilities
- ❌ Inconsistent folder naming conventions
- 🔧 Missing absolute path aliases
- 🔧 Unnecessary nested folder structures

### Deliverables
- Dependency tree analysis
- Folder structure recommendations
- Library upgrade suggestions
- Configuration optimization tips

---

## Phase 2: Navigation & Routing
**Focus:** User flow and screen transitions

### Scope
- `/src/navigations/*` (all stack navigators)
- Deep linking configuration
- Navigation patterns (stack, tab, drawer)
- Screen transitions and animations

### What We'll Look For
- ❌ Navigation prop drilling
- ❌ Incorrect navigation patterns (`navigate` vs `replace` vs `reset`)
- ❌ Missing screen options (headers, animations)
- ❌ Deep linking not handling all routes
- 🔧 Redundant navigation stacks
- 🔧 Memory leaks from improper screen cleanup
- ✅ Proper use of `React.memo` for tab icons

### Deliverables
- Navigation flow diagram
- Navigation anti-patterns list
- Deep linking coverage report
- Memory leak prevention checklist

---

## Phase 3: State Management & Data Flow
**Focus:** Zustand stores and data persistence

### Scope
- `/src/store/*` (all Zustand stores)
- MMKV storage implementation
- Store subscriptions and side effects
- Async state updates

### What We'll Look For
- ❌ State mutations instead of immutable updates
- ❌ Missing error handling in async actions
- ❌ Race conditions in concurrent state updates
- ❌ Overly large store objects (should be split)
- ❌ Derived state stored instead of computed
- 🔧 Unnecessary re-renders from store subscriptions
- 🔧 Missing store cleanup on logout
- 🔧 MMKV data not validated on read
- ✅ Proper use of selectors to prevent re-renders

### Deliverables
- State flow diagrams
- Store optimization recommendations
- Data persistence strategy review
- Re-render optimization guide

---

## Phase 4: API & Network Layer
**Focus:** External communication and data fetching

### Scope
- `/src/api/apiClient.js`
- Request/response interceptors
- Error handling patterns
- Token refresh logic
- API endpoint organization

### What We'll Look For
- ❌ Hardcoded API URLs (should use environment config)
- ❌ Missing request timeouts
- ❌ No retry logic for failed requests
- ❌ Token refresh race conditions
- ❌ Unhandled network errors
- 🔧 No request/response logging in dev mode
- 🔧 Missing request deduplication
- 🔧 API response not validated (should use schemas)
- 🔧 Missing offline handling

### Deliverables
- API error handling review
- Network resilience recommendations
- Token management security audit
- Retry strategy implementation guide

---

## Phase 5: Component Architecture
**Focus:** Reusable UI building blocks

### Scope
- `/src/components/*` (all reusable components)
- Component prop types
- Component composition patterns
- Styling approaches

### What We'll Look For
- ❌ Missing prop validation (PropTypes or TypeScript)
- ❌ Components doing too much (violating Single Responsibility)
- ❌ Inline functions in JSX (performance issue)
- ❌ Direct DOM/native manipulation
- ❌ Missing `key` props in lists
- 🔧 Unused props being passed
- 🔧 Inconsistent styling patterns (inline vs StyleSheet)
- 🔧 Missing `React.memo` where beneficial
- 🔧 Large components that should be split

### Deliverables
- Component refactoring suggestions
- Performance optimization targets
- Reusability improvement plan
- Styling consistency guide

---

## Phase 6: Screen-by-Screen Analysis
**Focus:** Feature implementation and screen-specific logic

### Scope
All screens grouped by stack:

#### Auth Stack
- Login, Signup, OTP verification screens

#### Home Stack
- Dashboard, notifications

#### Add Transaction Stack
- Transaction forms, transfer screens

#### History Stack
- Transaction list, filtering, search

#### Plan Stack
- Budget management screens

#### Setting Stack
- Profile, accounts, preferences, manage categories

### What We'll Look For (Per Screen)
- ❌ Missing loading states
- ❌ Missing error handling
- ❌ Form validation gaps
- ❌ Memory leaks (missing cleanup in `useEffect`)
- ❌ Uncontrolled components (should be controlled)
- 🔧 Redundant API calls
- 🔧 Heavy computations not memoized
- 🔧 Poor UX (missing feedback, confusing flow)

### Deliverables
- Screen-by-screen bug report
- UX improvement suggestions per screen
- Per-screen optimization plan
- Form validation completeness report

---

## Phase 7: Performance & Optimization
**Focus:** Speed, efficiency, and resource usage

### Scope
- Re-render analysis across all components
- List rendering performance (FlatList optimization)
- Image loading and caching
- Bundle size analysis
- Memory usage patterns

### What We'll Look For
- ❌ Unnecessary re-renders
- ❌ Missing `keyExtractor` optimization in FlatLists
- ❌ Large images not compressed
- ❌ Missing `initialNumToRender` optimization
- ❌ Heavy computations on main thread
- 🔧 Missing `useMemo`/`useCallback` where needed
- 🔧 Bundle not optimized (code splitting opportunities)
- 🔧 Missing lazy loading for heavy screens
- 🔧 Unoptimized FlatList props

### Deliverables
- Performance bottleneck report
- Optimization priority matrix (impact vs effort)
- Bundle size reduction plan
- FlatList optimization checklist
- Re-render audit report

---

## Phase 8: Security & Data Safety
**Focus:** Protection of user data and app integrity

### Scope
- Authentication flow
- Token storage (MMKV security)
- Sensitive data handling
- Input validation and sanitization
- API request authentication

### What We'll Look For
- ❌ Tokens stored insecurely
- ❌ Sensitive data logged to console in production
- ❌ Missing input sanitization (XSS potential)
- ❌ Weak password validation
- ❌ No biometric authentication option
- 🔧 Missing session timeout
- 🔧 No certificate pinning for API requests
- 🔧 Sensitive data in navigation params (visible in logs)
- 🔧 Missing data encryption for sensitive fields

### Deliverables
- Security vulnerability report
- Data protection recommendations
- Compliance checklist (GDPR, data privacy)
- Auth flow security audit
- Token management best practices

---

## Phase 9: Error Handling & Edge Cases
**Focus:** App resilience and edge case coverage

### Scope
- Error boundaries implementation
- Loading and empty states
- Network error handling
- Form validation errors
- Edge case coverage (boundary values, null/undefined, race conditions)

### What We'll Look For
- ❌ Missing error boundaries (app crashes instead of graceful degradation)
- ❌ Generic error messages (not user-friendly)
- ❌ Missing empty states for lists
- ❌ No retry mechanism for failed operations
- ❌ Edge cases not handled (e.g., negative amounts, very large numbers, special characters)
- 🔧 Poor offline experience
- 🔧 Missing loading skeletons
- 🔧 Inconsistent error UI across screens
- 🔧 No timeout handling for long operations

### Deliverables
- Edge case test scenarios
- Error UX improvement plan
- Resilience enhancement checklist
- Error boundary implementation guide
- Offline experience recommendations

---

## Phase 10: Code Quality & Maintainability
**Focus:** Long-term code health and developer experience

### Scope
- Code duplication analysis
- Naming conventions consistency
- Comment quality and documentation
- Code complexity metrics
- Test coverage
- Dead code detection

### What We'll Look For
- ❌ Duplicate code across multiple files
- ❌ Inconsistent naming (mix of conventions)
- ❌ Magic numbers/strings (should be constants)
- ❌ Complex functions (should be split, high cyclomatic complexity)
- ❌ Missing JSDoc comments for complex logic
- 🔧 Dead code (unused imports, functions, variables)
- 🔧 Console.logs left in production code
- 🔧 Missing unit tests for critical logic
- 🔧 Overly long files (>500 lines)
- 🔧 Inconsistent code formatting

### Deliverables
- Code quality scorecard
- Refactoring priority list
- Documentation gaps report
- Dead code cleanup checklist
- Complexity reduction recommendations
- Testing strategy recommendations

---

## Issue Severity Classification

### 🔴 Critical
- App crashes
- Security vulnerabilities
- Data loss or corruption
- Complete feature failure
- **Action Required:** Immediate fix

### 🟡 Major
- Performance degradation
- Significant UX problems
- Memory leaks
- Inconsistent behavior
- **Action Required:** Fix in next sprint

### 🟢 Minor
- Code quality issues
- Small optimizations
- Naming inconsistencies
- Missing comments
- **Action Required:** Fix when convenient

---

## Execution Methodology

### For Each Phase:

1. **Initial Scan**
   - Use `glob` to identify relevant files
   - Use `grep` to search for patterns and anti-patterns
   - Generate file/function inventory

2. **Deep Read**
   - Read flagged files thoroughly
   - Analyze logic, hooks, side effects
   - Check for common mistakes

3. **Cross-Reference**
   - Trace data flow between files
   - Check component usage across screens
   - Identify coupling issues

4. **Document Findings**
   - List issues with file paths and line numbers
   - Provide code snippets showing the problem
   - Categorize by severity (🔴🟡🟢)

5. **Suggest Fixes**
   - Provide concrete refactoring code examples
   - Explain why the fix improves the codebase
   - Estimate effort (small/medium/large)

---

## Analysis Report Structure (Per Phase)

### Summary
- Files analyzed: X
- Issues found: Y (🔴 Critical: A, 🟡 Major: B, 🟢 Minor: C)
- Positive findings: Z

### Critical Issues 🔴
For each issue:
- **File:** `path/to/file.js:lineNumber`
- **Issue:** Description of the problem
- **Impact:** What could go wrong
- **Example:** Code snippet showing the issue
- **Fix:** Recommended solution with code example
- **Effort:** Small / Medium / Large

### Major Issues 🟡
(Same structure as Critical)

### Minor Issues 🟢
(Same structure as Critical)

### Positive Findings ✅
- Things done well that should be maintained or replicated

### Recommendations
- High-level suggestions for this phase
- Best practices to adopt going forward

---

## Tools & Techniques

### Static Analysis
- Manual code review
- Pattern matching with grep
- Dependency analysis
- Bundle size inspection

### Dynamic Analysis (If Needed)
- React DevTools Profiler
- Memory profiling
- Network inspection
- Performance monitoring

### Documentation
- Markdown reports per phase
- Code snippets with before/after examples
- Visual diagrams where helpful (navigation, state flow)

---

## Next Steps

### Before Starting Analysis
1. **Prioritize Phases**: Determine which phases are most critical
2. **Set Depth Level**: Quick scan vs medium vs deep dive
3. **Identify Known Issues**: Any specific concerns to focus on
4. **Define Review Cadence**: Review after each phase or batch review

### During Analysis
- Generate phase-specific markdown reports
- Flag blockers or critical issues immediately
- Provide progress updates per phase

### After Analysis
- Consolidated findings summary
- Prioritized fix roadmap
- Effort estimation for fixes
- Implementation timeline recommendation

---

## Timeline Estimate (Per Phase)

Assuming **medium depth** analysis:

- **Phase 1-2**: ~2-3 hours each (foundational)
- **Phase 3-5**: ~3-4 hours each (complex state/component logic)
- **Phase 6**: ~6-8 hours (largest scope, multiple screens)
- **Phase 7**: ~4-5 hours (performance requires profiling)
- **Phase 8**: ~3-4 hours (security audit)
- **Phase 9**: ~2-3 hours (edge case enumeration)
- **Phase 10**: ~3-4 hours (code quality metrics)

**Total Estimated Time**: 30-40 hours for comprehensive analysis

---

## Success Criteria

### Analysis Complete When:
- ✅ All 10 phases executed
- ✅ All issues documented with severity
- ✅ Concrete fixes provided for each issue
- ✅ Prioritized roadmap created
- ✅ Quick wins identified for immediate impact

### High-Quality Analysis Includes:
- Specific file paths and line numbers
- Code examples showing issues
- Before/after refactoring examples
- Clear reasoning for each recommendation
- Effort estimates for implementation

---

## Notes

- **No AI Slop**: Every finding must be specific, actionable, and backed by code examples
- **Real Issues Only**: No generic advice; only issues found in actual codebase
- **Practical Fixes**: Solutions must be implementable, not theoretical
- **Balanced Perspective**: Acknowledge what's done well, not just problems
- **Context Aware**: Consider project constraints (timeline, team size, business needs)

---

## Questions to Answer Before Starting

1. **Priority**: Which phases are most important?
2. **Depth**: Quick scan, medium depth, or deep dive per phase?
3. **Known Issues**: Any specific areas of concern to focus on?
4. **Review Cadence**: Review after each phase or batch review?
5. **Time Constraints**: Any deadlines or urgency?

---

**Ready to begin Phase 1: Project Structure & Architecture**

---

# LAUNCH-READINESS FINDINGS (2026-10-04)

Practical issues found in a full scan of both frontend (`Expenzo`) and backend (`Expenzo-Backend`). Focused on things that must work for launch — not deep refactors.

## 🔴 Critical — must fix before launch

### Frontend
1. **API URL hardcoded to emulator** — `src/services/apiClient.js:8` uses `http://10.0.2.2:3000/api`; the `ENV.BASE_URL` line is commented out. Breaks every API call on a real device, and release builds block cleartext HTTP anyway.
2. **Release build has no ARM support** — `android/gradle.properties:26` sets `reactNativeArchitectures=x86,x86_64` (emulator only). A release build won't run on real phones. Switch to `armeabi-v7a,arm64-v8a`.
3. **Release keystore missing** — `android/app/build.gradle:97-103` + `gradle.properties:49` point to `my-expenzo-app.keystore`, which doesn't exist in `android/app/`. Release build will fail until placed.
4. **APP_ENV still `development`** — `.env` resolves BASE_URL to LAN IP `192.168.18.100`. Must flip to the production value AND restart Metro with `--reset-cache` before bundling (react-native-dotenv inlines at build time).
5. **"Fund with Debt Money" silently broken** — `src/services/transactionService.js:3-22` drops the `debtId` that `AddTransactionScreen.js:241` passes, so the feature does nothing (backend supports it).

### Backend
6. **Hardcoded forgot-password OTP `786000`** — `src/controllers/authController.js:123`. Anyone can reset ANY user's password = full account takeover.
7. **Hardcoded signup OTP `000000`** — `authController.js:35, 50, 251`. Email verification is a no-op.
8. **All email sending is stubbed out** — `src/config/email.js:11-35` just console.logs. OTP, welcome, debt reminders, and CSV export-by-email (`exportController.js:75` claims success) send nothing.
9. **Debt payments can modify other users' accounts** — `debtController.js:406` (recordPayment) and `:494` (settleDebt) take `accountId` from the request body with no ownership check → user A can change user B's balance.
10. **Editing a transaction never adjusts balances** — `transactionController.js:174-184` updates the record only; account balances go permanently wrong.
11. **Deleting a transaction never reverts the balance** — `transactionController.js:187-198`.
12. **Deleting a primary account crashes (500)** — `accountController.js:153-154` references `nextAccount` outside its `if`-block scope → ReferenceError, after the archive already committed.

## 🟡 Major — fix soon (bad UX / real risk)

### Frontend
13. **No 401/expired-token handling** — `apiClient.js:27-34` never clears the token or logs out; expired-JWT users reopen into a broken app.
14. **`IS_DEV` is always false** — `src/config/env.js:28` compares APP_ENV against the wrong string (`'BASE_URL_DEV'`), so Sentry is always on and dev errors pollute production Sentry.
15. **PostHog never initialized** — key is wired in env but no `PostHogProvider`/client exists anywhere. You'd launch with zero analytics.
16. **Dead "Continue with Google" buttons** — `LoginScreen.js:118-130`, `SignUpScreen.js:186` have `onPress={() => {}}`. Hide or wire up before launch.
17. **Dashboard failure is silent** — `HomeScreen.js:46-59` only console.errors; no error/retry UI. No offline detection (NetInfo) anywhere despite being fully server-dependent.
18. **Keystore passwords committed to git** — `android/gradle.properties:49-52` are tracked in plaintext. Move to untracked `keystore.properties`.
19. **`sendDefaultPii: true` in Sentry** — `src/services/sentry.js:7` sends IPs/device IDs; must be declared in Play Store Data Safety form or turned off.
20. **`isExpense` used before declaration** — `AddTransactionScreen.js:104-138` reference it before the `const` at line 140; works on Hermes today but is a latent bug with stale values on first render.
21. **Error messages lost** — `VerifyOTPScreen.js:60`, `useAccountStore.js:28,44` read `err.response?.data?.message`, but the interceptor rejects a flattened object with no `.response`; users always get generic errors.

### Backend
22. **No rate limiting** — login/forgot-password/OTP verify are freely brute-forceable (6-digit OTP, no attempt counter). Add `express-rate-limit` at least on auth routes.
23. **No helmet; bare `cors()`** — `src/app.js:23`. Lock down before launch.
24. **No amount validation on money writes** — `transactionController.js:98-154`, `investmentController.js:20-70` accept negative/zero/NaN; a negative "expense" inflates the balance.
25. **Password length never actually validated** — `authController.js:49` hashes before save, so `minlength: 6` checks the bcrypt hash; a 1-char password passes. No email-format check; missing password → raw 500.
26. **No env validation at boot** — missing `JWT_SECRET` 500s all auth; no `CLOUDINARY_*` in `.env`, so avatar upload breaks unless set on the host.
27. **protect.js gaps** — `middleware/protect.js:19`: deleted user → `req.user` null but `next()` still runs; the 15-min password-reset token passes as a full access token (purpose never checked).
28. **`unhandledRejection` kills the process** — `server.js:6-9` does `process.exit(1)` on any stray rejection; no graceful shutdown. Relies entirely on host auto-restart.

## 🟢 Minor — cleanup when convenient

### Frontend
29. `env.js:20-21` console.logs APP_ENV + full BASE_URL on every launch; no `transform-remove-console` babel plugin for release.
30. Dead UI: "Default Currency" row (`SettingsScreen.js:145`), investment list items (`InvestmentsScreen.js:133`) have empty `onPress`.
31. Login submits with empty email/password — `LoginScreen.js:39-51` has no client-side validation (SignUp validates fine).
32. WatermelonDB fully initialized but unused (`src/database/`) — hooks were rewritten to REST; dead native dependency adding APK size.
33. `DatabaseTestScreen.js` dev screen ships in bundle but isn't in any navigator.
34. Directory typo: `src/screens/tabs/AddTrasaction/`.

### Backend
35. Auth controller console.logs emails and OTP values (`authController.js:25, 41, 64, 125, 255`).
36. Account enumeration: `authController.js:244` resend-OTP returns 404 "User not found" while forgot-password is deliberately vague.
37. Swagger UI (`/api-docs`) public in production — `src/app.js:25`.
38. Raw user input in `$regex` search — `transactionController.js:39`, `debtController.js:41` (special chars break search).
39. `deleteDebt` (`debtController.js:546-558`) soft-deletes but never reverses balance/linked transactions — confirm intended.
40. No balance validation in `updateBalance/updateAccount` (`accountController.js:94, 107`).
41. CSV export has no formula-injection escaping (`exportController.js:24-34`) — `=HYPERLINK(...)` executes in Excel.
42. `ToDo.txt` confirms unfinished items: forgot-password integration, Sentry/PostHog; `.env` holds unused RESEND/MAILEROO keys (email provider switch unfinished).

## ✅ Verified working (no action needed)
- All backend routes mount `protect` correctly; controllers consistently filter by `req.user._id` (except the debt-payment issue above).
- `.env` files are gitignored and never committed in either repo.
- Money flows on create/transfer/debt/investment use Mongoose sessions (atomic); error handler hides stack traces in production.
- Frontend: Sentry error boundary with fallback UI, proguard + shrinkResources with correct keep rules, only INTERNET permission, `allowBackup=false`, signup + add-expense validate input, main screens have loading/empty states.

## Fix-first order (launch blockers)
1. Hardcoded OTPs (#6, #7) + re-enable email sending (#8)
2. `apiClient.js` → use `ENV.BASE_URL` (#1) + set APP_ENV for production (#4)
3. ARM architectures in gradle.properties (#2) + place release keystore (#3)
4. Transaction update/delete balance reconciliation (#10, #11)
5. Debt-payment account ownership check (#9) + deleteAccount crash (#12)
6. debtId dropped in transactionService (#5)
