# Task 1 Report: Modal — prop `mobileFullScreen`

## Status: DONE

## Implementation Summary

Successfully implemented the `mobileFullScreen` prop for the shared `Modal` component (`src/components/modal/`) to support rendering auth flows as full-screen pages on mobile (<1024px / `lg` breakpoint) while keeping desktop modal-card behavior unchanged.

### Files Modified

1. **src/components/modal/types.ts**
   - Added `mobileFullScreen?: boolean` prop to `IModalProps` interface (default: `false`)
   - Positioned after `padded` prop as specified
   - Includes comprehensive JSDoc comment explaining mobile vs. desktop behavior

2. **src/components/modal/index.tsx**
   - Replaced entire file with new implementation per brief specification
   - Added `mobileFullScreen = false` parameter to component destructuring
   - Updated outer wrapper className: `mobileFullScreen ? 'p-0 lg:p-4' : 'p-4'`
     - Removes padding on mobile, restores on desktop
   - Updated inner panel className with conditional full-screen styling:
     - Mobile: `h-full max-h-none rounded-none shadow-none` (full viewport height, no max-height, no rounded corners, no shadow)
     - Desktop: `lg:h-auto lg:max-h-[90vh] lg:rounded-lg lg:shadow-lg` (restores auto height, max-height, rounded corners, shadow)
   - Handles padded mode on mobile: `overflow-y-auto flex flex-col items-center justify-center p-6 lg:block lg:p-8`

3. **src/components/modal/modal.stories.tsx**
   - Added new story `PainelMobileFullScreen` after existing `Painel` story
   - Story name: "Painel — Full Screen no Mobile"
   - Demonstrates mobile full-screen behavior with two-column layout (form + proof panel)
   - Configuration: `size="xl"`, `padded={false}`, `mobileFullScreen={true}`
   - Includes instructional text explaining test method (resize browser window)

## Verification Results

### Build Verification
**Command:** `pnpm build`
**Result:** ✓ Success (exit 0)
- TypeScript check: PASS (no errors)
- Vite build: PASS (150 modules transformed, 7.28s)
- Output: dist/index.html, assets/index-*.css, assets/index-*.js

### Storybook Build Verification
**Command:** `pnpm storybook:build`
**Result:** ✓ Success (exit 0)
- Storybook build: 18.39s
- Modal stories bundle generated without errors
- All existing stories verified to compile:
  - Small
  - Medium
  - Large
  - SemBotaoFechar
  - Painel

### No Regressions
- Pre-existing stories remain unchanged (no modifications)
- New story follows established file patterns
- Backward compatible (default `false` preserves existing behavior)

## Self-Review Checklist

- [x] **Completeness:** All 3 steps implemented (types.ts, index.tsx, modal.stories.tsx)
- [x] **JSDoc:** New prop has full documentation
- [x] **Pattern Consistency:**
  - Stories follow existing patterns (Story type, args structure)
  - Component uses twMerge for className composition
  - Boolean prop shorthand in JSX
  - No new hardcoded values (only existing Tailwind utilities)
- [x] **Discipline:** Implemented exactly per brief, no extras
- [x] **TypeScript:** Strict mode, no errors
- [x] **Testing:**
  - `pnpm build` exit 0 ✓
  - `pnpm storybook:build` exit 0 ✓
  - No existing story regressions ✓

## Code Quality

- Exact implementation match to brief specification
- Mobile-first approach: `lg:` prefixes (1024px breakpoint)
- Accessibility attributes preserved (role, aria-modal, aria-labelledby)
- Clean conditional logic for padded/unpadded modes
- Scrim and close button styling unchanged

## Commit Details

- **SHA:** `9effbfc`
- **Message:** `feat(modal): adiciona modo full screen no mobile (mobileFullScreen)`
- **Branch:** feature/mobile-logged-area-polish
- **Files staged:** 3 (types.ts, index.tsx, modal.stories.tsx)
- **Changes:** +47 insertions, -3 deletions

## Task Foundation

This task is the foundation for Tasks 2-7 (LoginScreen, CadastroScreen, RecuperaSenhaScreen, RedefineSenhaScreen, ConfirmacaoEmailScreen, AuthTerminalModal). The prop is backward-compatible; existing usage unaffected.

---

## Post-Review Fix

Reviewer approved Task 1 but flagged two Important findings before 6 downstream tasks can consume `mobileFullScreen`. Both are fixed in this follow-up commit (`src/components/modal/index.tsx` only — no other file touched).

### Finding 1 — `SIZE_MAP[size]` applied unconditionally, even in `mobileFullScreen` mode

**Problem:** line 72 applied `SIZE_MAP[size]` (a hard max-width cap: sm=400px, md=480px, lg=560px, xl=960px) with no responsive variant, at *all* viewport widths — including mobile. On a viewport wider than the chosen size's cap but still under the 1024px `lg` breakpoint (e.g. `size="md"` at 700px), the panel would render as a 480px-wide card with the scrim visible on both sides instead of full screen, defeating the purpose of `mobileFullScreen`. This would have hit `AuthTerminalModal` (`size="md"`, no `className` max-width override) directly.

**Fix:** added a second static lookup map so Tailwind's compiler (which requires literal class strings, not runtime-interpolated ones) can generate the responsive variant:

```tsx
const SIZE_MAP_MOBILE_FULLSCREEN: Record<ModalSize, string> = {
	sm: 'max-w-none lg:max-w-[400px]',
	md: 'max-w-none lg:max-w-[480px]',
	lg: 'max-w-none lg:max-w-[560px]',
	xl: 'max-w-none lg:max-w-[960px]',
}
```

and changed the panel's className build from `SIZE_MAP[size]` to `mobileFullScreen ? SIZE_MAP_MOBILE_FULLSCREEN[size] : SIZE_MAP[size]`. Full diff:

```diff
+const SIZE_MAP_MOBILE_FULLSCREEN: Record<ModalSize, string> = {
+	sm: 'max-w-none lg:max-w-[400px]',
+	md: 'max-w-none lg:max-w-[480px]',
+	lg: 'max-w-none lg:max-w-[560px]',
+	xl: 'max-w-none lg:max-w-[960px]',
+}
+
 export function Modal({ ... }) {
   ...
-					SIZE_MAP[size],
+					mobileFullScreen ? SIZE_MAP_MOBILE_FULLSCREEN[size] : SIZE_MAP[size],
 					className,
```

**`twMerge` precedence check:** re-read `src/lib/tw-merge.ts` — it's `extendTailwindMerge` from `tailwind-merge` with only classGroup additions for custom font-size/color tokens; conflict-resolution order is untouched, so standard `tailwind-merge` semantics apply (later class in the merged arg list wins within the same conflict group). In `index.tsx`, `className` (the caller override) is passed *after* `SIZE_MAP_MOBILE_FULLSCREEN[size]`/`SIZE_MAP[size]` in the `twMerge(...)` call, so any caller-supplied `max-w-*` override (e.g. the auth screens' future `className="max-w-none lg:max-w-[912px] ..."`) still wins. This fix is therefore a no-op for consumers that already override max-width via `className`, and only changes behavior for consumers that don't (exactly the gap being closed).

### Finding 2 — missing verification evidence

Original report only cited `pnpm storybook:build` (static compile). Redone with concrete evidence:

**1. `pnpm build` — exit 0.** `tsc -b && vite build`: TypeScript check passed with no errors, Vite build passed (150 modules transformed, 5.65s), `dist/` produced normally.

**2. Live dev-server verification (no headless-browser tool was available — checked via ToolSearch; only Figma-design tools and a generic non-JS-executing `WebFetch` are registered, neither can load/resize a local Vite/Storybook server. Per the reviewer's fallback instruction, used the strongest available alternative: pulled the actually-compiled output from the running dev server instead of reasoning from the source alone.)**

- A Storybook instance was already running on `:6006` (from an earlier session in this environment). `GET http://localhost:6006/index.json` confirmed all 6 Modal stories are registered, including `overlays-modal--painel-mobile-full-screen`.
- `GET http://localhost:6006/src/components/modal/index.tsx` (the Vite-transformed module served live) was fetched and confirmed to contain the exact post-fix source — `SIZE_MAP_MOBILE_FULLSCREEN` with the literal `lg:max-w-[…]` strings and the ternary — proving the dev server had picked up this fix via HMR.
- `GET http://localhost:6006/src/index.css` (the live-compiled Tailwind CSS) was fetched, decoded out of its Vite/HMR JS-string wrapper into real CSS, and grepped. Confirmed rules (line numbers from the decoded CSS):
  - `.max-w-none { max-width: none; }` — line 1401 (unconditional, **no** media query)
  - `.lg\:max-w-\[400px\] { @media (width >= 64rem) { max-width: 400px; } }` — line 4048
  - `.lg\:max-w-\[480px\] { @media (width >= 64rem) { max-width: 480px; } }` — line 4053
  - `.lg\:max-w-\[560px\] { @media (width >= 64rem) { max-width: 560px; } }` — line 4058
  - `.lg\:max-w-\[960px\] { @media (width >= 64rem) { max-width: 960px; } }` — line 4063
  - Bare (unconditional, pre-existing) rules also still generated for all 4 sizes: `.max-w-\[400px\]` (1326), `.max-w-\[480px\]` (1338), `.max-w-\[560px\]` (1350), `.max-w-\[960px\]` (1380) — these are exactly what the 5 pre-existing stories resolve to.
  - `64rem` = 1024px at the default 16px root font size = Tailwind's `lg` breakpoint, matching the project's documented divisor.

  This is real observation of the compiled artifact (not a guess about what Tailwind *should* emit) — it directly confirms the literal-string requirement in the brief was satisfied and that the compiler actually produced every needed class.

- **Cascade order, confirmed from the same decoded stylesheet:** `.max-w-none` (line 1401) is defined *before* all four `.lg\:max-w-[…]` rules (lines 4048–4067). Both selector forms have identical specificity (single class each), so per standard CSS cascade rules the later rule wins when both match — this is the same mechanism that makes every Tailwind responsive utility (`w-16 md:w-32`, etc.) work, and is confirmed here by direct line-order inspection rather than assumed.

  **Viewport-by-viewport for `mobileFullScreen=true`** (computed from the confirmed rules/order above):

  | Viewport | `size="md"` → `max-w-none lg:max-w-[480px]` | `size="xl"` → `max-w-none lg:max-w-[960px]` |
  |---|---|---|
  | 375px (phone) | media query false → only `.max-w-none` applies → **max-width: none** (full bleed) | **max-width: none** (full bleed) |
  | 700px (tablet, <1024) | media query still false → **max-width: none** (full bleed) — this is exactly the viewport Finding 1 said was broken pre-fix (was capped at 480px with scrim margins visible); now confirmed full-bleed | **max-width: none** (full bleed) |
  | 1023px (just under breakpoint) | `width >= 64rem` is false (1023 < 1024) → **max-width: none** (full bleed) | **max-width: none** (full bleed) |
  | 1024px+ (desktop) | media query now true; `.lg\:max-w-[480px]` (later in cascade) overrides `.max-w-none` → **max-width: 480px** (capped centered card) | **max-width: 960px** (capped centered card) |

  This confirms the fix delivers true full-bleed (no visible scrim margin) below 1024px for every `size` value, and preserves the capped desktop card above it — closing exactly the gap the reviewer described for the future `AuthTerminalModal` (`size="md"`, no `className` override).

**3. No regression on the 5 pre-existing stories** (`Small`, `Medium`, `Large`, `SemBotaoFechar`, `Painel` — read directly from `src/components/modal/modal.stories.tsx`): none pass `mobileFullScreen`, so it defaults to `false` (`mobileFullScreen = false` in the destructured props). The ternary `mobileFullScreen ? SIZE_MAP_MOBILE_FULLSCREEN[size] : SIZE_MAP[size]` therefore always evaluates to `SIZE_MAP[size]` for all 5 — byte-identical to the class string used before this fix and before Task 1 ever touched this line. The bare `.max-w-\[Npx\]` rules these resolve to were confirmed still compiled (see line numbers above), with no media query and no interaction with the new `SIZE_MAP_MOBILE_FULLSCREEN` map. No regression.

### Files changed

- `src/components/modal/index.tsx` — +8/-1 (new `SIZE_MAP_MOBILE_FULLSCREEN` map + one-line ternary change; no other logic touched)
- `.superpowers/sdd/task-1-report.md` — this section

### Commit

- Message: `fix(modal): garante full screen no mobile independente do size`
- Branch: `feature/mobile-logged-area-polish`
- New commit (original `9effbfc` untouched, not amended)
