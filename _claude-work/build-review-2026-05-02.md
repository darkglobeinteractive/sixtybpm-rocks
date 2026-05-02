# Build Review — 2026-05-02

Review of the sixtybpm-rocks React app. Items are grouped as **Problems** (bugs, correctness issues, accessibility) and **Improvements** (cleanup, maintenance, nice-to-haves).

---

## Problems

### 1. Spinner never stops on API failure
**File:** `src/components/App.js` lines 31–48  
**Issue:** The Axios `.then()` call has no `.catch()`. If the WordPress API returns an error, `stones` stays as an empty array, the spinner renders indefinitely, and the user receives no feedback that something went wrong.  
**Fix:** Add an `error` state and a `.catch()` handler that sets it, then render an error message in place of the spinner.

---

### 2. `map()` returns `undefined` for TBD items — React anti-pattern
**File:** `src/components/Stones.js` lines 10–17  
**Issue:** `renderStonesGrid` uses a conditional inside `map()` without returning `null` for the excluded case. The resulting array contains `undefined` holes that React silently skips, but this can generate runtime warnings and is considered bad practice.  
**Fix:** Chain `.filter()` before `.map()` to cleanly exclude TBD stones:
```js
renderStonesGrid(stones) {
  return stones
    .filter(stone => stone.location !== 'TBD')
    .map(stone => <Stone key={stone.id} stone={stone} />);
}
```
This also resolves items #3 and #4.

---

### 3. Key prop uses array index instead of `stone.id`
**File:** `src/components/Stones.js` line 13  
**Issue:** `key={index}` is a React anti-pattern. React uses the key to reconcile list changes; using index means any future reorder or removal will cause unnecessary re-renders or subtle state bugs.  
**Fix:** Use the unique ID provided by the API: `key={stone.id}`. (Resolved by the refactor in item #2.)

---

### 4. Loose equality `!=` instead of `!==`
**File:** `src/components/Stones.js` line 12  
**Issue:** `stone.location != 'TBD'` uses loose equality. ESLint flags this as an error, and it can mask type coercion bugs.  
**Fix:** Use strict equality `!==`. (Resolved by the refactor in item #2.)

---

### 5. `outline: none` on submit button — accessibility bug
**File:** `src/css/Form.css` line 32  
**Issue:** The submit button has `outline: none` with no replacement focus style. Keyboard and assistive technology users get no visible focus indicator when the button is focused, which fails WCAG 2.1 SC 2.4.7.  
**Fix:** Remove `outline: none` and add a `:focus-visible` rule instead:
```css
#form .field-set input[type="submit"]:focus-visible {
  outline: 3px solid #333;
  outline-offset: 2px;
}
```

---

### 6. Copyright year is 3 years stale
**File:** `src/components/Footer.js` line 7  
**Issue:** Footer displays `Copyright © 2023 60bpm.com`. Current year is 2026.  
**Fix:** Either update the static year, or make it dynamic:
```jsx
<p>Copyright &copy; {new Date().getFullYear()} 60bpm.com</p>
```

---

### 7. `dangerouslySetInnerHTML` on API-sourced content
**File:** `src/components/Stone.js` lines 11–12  
**Issue:** Both `stone.title` and `stone.location` are rendered via `dangerouslySetInnerHTML`. Since the data originates from your own WordPress instance the risk is currently low, but if WP is ever compromised or any field becomes user-editable, this is a direct XSS vector.  
**Fix:** Either render as plain text (if HTML formatting isn't actually required in those fields), or sanitize with a library like DOMPurify before rendering.

---

### 8. Component named `StonesLoading` but imported/used as `Spinner`
**File:** `src/components/Spinner.js` line 5  
**Issue:** The internal function declaration is `StonesLoading`, but the file is `Spinner.js` and every import uses the name `Spinner`. This inconsistency is confusing for maintainers and will cause issues with React DevTools display.  
**Fix:** Rename the function to `Spinner` to match the file name and import convention.

---

## Improvements

### 9. Axios is on 0.26.x — three major versions old
**File:** `package.json` line 9  
**Issue:** Axios 1.0 shipped in 2022 and is now at 1.x. The 0.x branch is no longer receiving security or maintenance updates.  
**Fix:** Run `npm install axios@latest`. The API is compatible for the basic GET usage in this project.

---

### 10. Spinner CSS comments are copy-pasted boilerplate
**File:** `src/css/Spinner.css` lines 9–10  
**Issue:** The inline comments say `/* Light grey */` and `/* Blue */` but the actual colors are `#fff` (white) and `#333` (dark grey). These are leftover from a boilerplate spinner snippet and are misleading.  
**Fix:** Delete the two incorrect comments.

---

### 11. Vendor-prefixed flexbox is IE 10-era
**File:** `src/css/Stones.css` lines 9–15  
**Issue:** `-ms-flexbox` and `-webkit-flex` target browsers well below the project's `browserslist` threshold (`>0.2%, not dead`). These prefixes add dead weight to the stylesheet.  
**Fix:** Remove the prefixed lines and rely on the standard `display: flex` and `flex-flow` declarations.

---

### 12. Create React App (`react-scripts`) is officially unmaintained
**File:** `package.json` line 8  
**Issue:** The React team deprecated CRA in 2023. It is no longer receiving tooling, security, or dependency updates. The `mini-css-extract-plugin` override in `package.json` is already a symptom of this — a workaround for a CRA dependency conflict.  
**Fix:** No immediate action required — the app still builds and runs. However, a migration to Vite (a straightforward drop-in for a project this size) is worth planning to get off the deprecated toolchain.

---

## Status

| # | Item | Priority | Status |
|---|------|----------|--------|
| 1 | API error handling | High | Open |
| 2 | filter+map refactor | High | Open |
| 3 | Key prop: index → id | High | Open (resolved by #2) |
| 4 | Loose equality `!=` | Medium | Open (resolved by #2) |
| 5 | Submit button focus style | High | Open |
| 6 | Copyright year | Low | Open |
| 7 | dangerouslySetInnerHTML / XSS | Medium | Open |
| 8 | Spinner naming inconsistency | Low | Open |
| 9 | Axios upgrade 0.x → 1.x | Medium | Open |
| 10 | Spinner CSS comments | Low | Open |
| 11 | Remove legacy flexbox prefixes | Low | Open |
| 12 | CRA deprecation / Vite migration | Low | Open |
