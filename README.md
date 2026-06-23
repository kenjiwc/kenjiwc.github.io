# kenjiwc.github.io

# Kenji's MySpace-Style Profile

## Files
- `index.html` — page structure/content
- `style.css` — all visual styling
- `script.js` — music player logic
- `assets/` — put your photo and MP3 files here

## How to customize

**Your photo:**
Replace the `src` on the `<img>` inside `.photo-frame` in `index.html` with
`assets/yourphoto.jpg` once you've added a photo to the `assets` folder.

**Your info:**
Edit the text directly in `index.html` — name, tagline, About Me, Top 8 names,
interests table, and comments are all plain HTML you can edit like a text file.

**Music player:**
1. Drop MP3 files into `assets/` (e.g. `assets/track1.mp3`).
2. Open `script.js` and edit the `playlist` array at the top:
   ```js
   const playlist = [
     { title: "Song Name", artist: "Artist Name", src: "assets/track1.mp3" },
     ...
   ];
   ```
3. That's it — play/pause, next/prev, seek bar, and volume all just work.

Note: most browsers block audio from auto-playing until the user clicks
something on the page first. That's normal and not a bug — just hit play once.

## Running it
No server needed. Just open `index.html` in a browser. If you want to host it,
any static host (GitHub Pages, Netlify, etc.) works since it's plain HTML/CSS/JS.