## SSG Exercise (Eleventy)

The path to the SSG exercise folder is `ssg-exercise/` (with source templates in `ssg-exercise/src/` and configuration in `ssg-exercise/eleventy.config.js`)
The two pages to preview are Home (`/index.html`) and About (`/about.html`).
Read `ssg-exercise/README.md` for further instructions.

## `<fact-panel>` Design Note

A visitor wants to read an interesting fact, and read another one when they are done. The visitor also wants choose if they want to read the fact by itself, or the fact with its source. They should be able to do all of that without the page reloading, and they should always be able to tell whether the panel is working, finished, or stuck.

**Action** 
Clicking the "Next fact" button inside `<fact-panel>` triggers a fetch request to the Useless Facts API throught `loadFact()`. After the click, `loadFact()` first returns early if a request is already running. Then it disables the button and sets the status line to "Loading a fact...". 

The component then sends a `GET` request with `fetch()` to `https://uselessfacts.jsph.pl/api/v2/facts/random`, asking for JSON. When it receives a response, it checks `response.ok`, parses the JSON, and confirms the `text` field is a non-empty string. Any problem throws an error, which jumps to the `catch` block. 

On success the component sets `factText.textContent` to the text from the random fact endpoint, and `factDetail.textContent` to the source. The status line then reads "Fact #[currIndex] loaded."

Lastly, a `finally` block always re-enables the button, whether the request succeeded or failed. If the button had keyboard focus, focus is returned to it, since a disabled button loses focus.



### What the visitor sees
 
- **While waiting:** the status line says "Loading a fact..." and the button is disabled so the request can't be sent twice. The previous fact stays on screen.
- **On success:** the new fact and its source replace the old ones, and the status line shows "Fact #N". The status element has `role="status"` and `aria-live="polite"`, so screen readers announce each message without interrupting.
- **On failure:** the previous fact stays visible, the status line says "Could not load a fact. Try again.", and the button label changes to "Try again". Pressing it repeats the same steps with no page reload. A successful retry replaces the error message with the new fact's status and restores the "Next fact" label. The rest of the portfolio keeps working throughout.

 

