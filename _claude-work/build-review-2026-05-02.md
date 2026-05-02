# Build Review — 2026-05-02

Review of the sixtybpm-rocks React app. Items are grouped as **Problems** (bugs, correctness issues, accessibility) and **Improvements** (cleanup, maintenance, nice-to-haves).

---

## Problems

### 1. `outline: none` on submit button — accessibility bug
**File:** `src/css/Form.css` line 32  
**Issue:** The submit button has `outline: none` with no replacement focus style. Keyboard and assistive technology users get no visible focus indicator when the button is focused, which fails WCAG 2.1 SC 2.4.7.  
**Fix:** Remove `outline: none` and add a `:focus-visible` rule instead:
```css
#form .field-set input[type="submit"]:focus-visible {
  outline: 3px solid #333;
  outline-offset: 2px;
}
```
**Note:** Deferred — will be revisited.

---

### 2. `dangerouslySetInnerHTML` on API-sourced content
**File:** `src/components/Stone.js` lines 11–12  
**Issue:** Both `stone.title` and `stone.location` are rendered via `dangerouslySetInnerHTML`. Since the data originates from your own WordPress instance the risk is currently low, but if WP is ever compromised or any field becomes user-editable, this is a direct XSS vector.  
**Fix:** Either render as plain text (if HTML formatting isn't actually required in those fields), or sanitize with a library like DOMPurify before rendering.  
**Note:** Under investigation — this pattern likely exists across multiple React projects and warrants a broader fix.

---

## Improvements

### 3. Axios is on 0.26.x — three major versions old
**File:** `package.json` line 9  
**Issue:** Axios 1.0 shipped in 2022 and is now at 1.x. The 0.x branch is no longer receiving security or maintenance updates.  
**Fix:** Run `npm install axios@latest`. The API is compatible for the basic GET usage in this project.

---

### 4. Spinner CSS comments are copy-pasted boilerplate
**File:** `src/css/Spinner.css` lines 9–10  
**Issue:** The inline comments say `/* Light grey */` and `/* Blue */` but the actual colors are `#fff` (white) and `#333` (dark grey). These are leftover from a boilerplate spinner snippet and are misleading.  
**Fix:** Delete the two incorrect comments.

---

### 5. Vendor-prefixed flexbox is IE 10-era
**File:** `src/css/Stones.css` lines 9–15  
**Issue:** `-ms-flexbox` and `-webkit-flex` target browsers well below the project's `browserslist` threshold (`>0.2%, not dead`). These prefixes add dead weight to the stylesheet.  
**Fix:** Remove the prefixed lines and rely on the standard `display: flex` and `flex-flow` declarations.

---

### 6. Create React App (`react-scripts`) is officially unmaintained
**File:** `package.json` line 8  
**Issue:** The React team deprecated CRA in 2023. It is no longer receiving tooling, security, or dependency updates. The `mini-css-extract-plugin` override in `package.json` is already a symptom of this — a workaround for a CRA dependency conflict.  
**Fix:** No immediate action required — the app still builds and runs. However, a migration to Vite (a straightforward drop-in for a project this size) is worth planning to get off the deprecated toolchain.

---

## Status

| # | Item | Priority | Status |
|---|------|----------|--------|
| 1 | Submit button focus style | High | Deferred |
| 2 | dangerouslySetInnerHTML / XSS | Medium | Under investigation |
| 3 | Axios upgrade 0.x → 1.x | Medium | Open |
| 4 | Spinner CSS comments | Low | Open |
| 5 | Remove legacy flexbox prefixes | Low | Open |
| 6 | CRA deprecation / Vite migration | Low | Open |

---

## Completed

### ~~1. Spinner never stops on API failure~~
**File:** `src/components/App.js`  
Added `error` state and a `.catch()` handler that sets an error message, passed as a prop to `Stones` and rendered in place of the spinner on failure. ✓

---

### ~~2. `map()` returns `undefined` for TBD items — React anti-pattern~~
**File:** `src/components/Stones.js`  
Replaced the conditional inside `map()` with a chained `.filter().map()` pattern, cleanly excluding TBD stones without leaving `undefined` holes in the rendered array. ✓

---

### ~~3. Key prop uses array index instead of `stone.id`~~
**File:** `src/components/Stones.js`  
Resolved by the filter+map refactor — keys now use `stone.id`. ✓

---

### ~~4. Loose equality `!=` instead of `!==`~~
**File:** `src/components/Stones.js`  
Resolved by the filter+map refactor — comparison removed entirely in favour of `.filter()`. ✓

---

### ~~6. Copyright year is 3 years stale~~
**File:** `src/components/Footer.js`  
Updated to use `{new Date().getFullYear()}` for a dynamic year. ✓

---

### ~~8. Component named `StonesLoading` but imported/used as `Spinner`~~
**File:** `src/components/Spinner.js`  
Renamed the internal function declaration from `StonesLoading` to `Spinner` to match the file name and import convention. ✓
