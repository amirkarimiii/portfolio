# ADR-0001 --- Migration from Editor.js to Tiptap

-   **Status:** Accepted
-   **Date:** 2026-07-02

## Context

The project used Next.js 16, React 19 and Editor.js 2.31.6.

Unexpected development behavior was observed:

-   React StrictMode executed `useEffect` twice.
-   Multiple editor instances were created.
-   Cleanup interfered with the new instance.
-   Calling `editor.destroy()` removed the rendered editor.
-   The editor required client-side rendering through Dynamic Import.

## Investigation

Several experiments were performed:

-   Removing `editor.destroy()`
-   Inspecting `holder.innerHTML`
-   Using both DOM element and holder ID
-   Waiting for `isReady`
-   Tracing the cleanup lifecycle

The logs showed that the first instance eventually destroyed the shared
DOM after becoming ready, affecting the second instance as well.

## Decision

Migrate from Editor.js to Tiptap.

Reasons:

-   Better React integration
-   Predictable StrictMode behavior
-   Cleaner lifecycle management
-   Better multi-instance support
-   Better compatibility with the Next.js ecosystem

## Consequences

Pros:

-   Fewer lifecycle-related bugs
-   Easier maintenance
-   Better developer experience

Cons:

-   Migration effort
-   Partial editor rewrite

## Lessons Learned

-   Always test DOM-heavy libraries under React StrictMode.
-   Evaluate SSR and hydration behavior before adopting an editor.
-   Dynamic Import solves SSR issues but does not fix lifecycle
    incompatibilities.
