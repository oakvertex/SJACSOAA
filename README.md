# SJACSOAA

Static website for the SJACSOAA alumni association. Built with plain HTML, CSS, and vanilla JavaScript — no build step required.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage |
| `directory.html` | Searchable alumni directory |
| `events.html` | Upcoming events and reunions |
| `gallery.html` | Photo gallery |
| `about.html` | About the organization and contact form |

## Data

JSON files under `data/` are loaded at runtime by `js/main.js`:

- `data/directory.json` — alumni records
- `data/events.json` — event listings

## Development

Open any `.html` file in a browser, or serve the directory with any static file server:

```bash
npx serve .
# or
python3 -m http.server
```
