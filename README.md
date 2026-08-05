# SJACSOAA

Static website for the SJACSOAA alumni association. Built with plain HTML, CSS, and vanilla JavaScript — no build step required.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage, including upcoming events |
| `directory.html` | Searchable alumni directory |
| `gallery.html` | Photo gallery |

## Data

There's no `fetch()` or build step — event and directory records are hardcoded directly in `js/main.js` as the `EVENTS_DATA` and `DIRECTORY_DATA` arrays, which is the single source of truth for both. To add or edit an event or alumni record, edit that file.

`data/directory.json` is a hand-maintained mirror of `DIRECTORY_DATA` kept for reference; it isn't loaded by the site.

## Development

Open any `.html` file in a browser, or serve the directory with any static file server:

```bash
npx serve .
# or
python3 -m http.server
```
