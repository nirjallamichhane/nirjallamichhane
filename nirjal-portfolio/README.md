# Nirjal Lamichhane portfolio

A static site with no build step. Open `index.html` through any web server, or upload the folder to any static host
(Netlify, Vercel, GitHub Pages, cPanel `public_html`, Cloudflare Pages).

## Files
- `index.html`: page shell, header, light/dark toggle, script tags
- `css/style.css`: design tokens (the northern-lights palette for dark and light mode at the top), layout and motion
- `js/data.js`: all content (projects, experience, papers, skills, links). Edit this to update text
- `js/app.js`: pages (Home, Work, project case studies, Research, About, Contact), the hash router, and the motion engine (parallax, tilt)
- `js/scene.js`: the 3D aurora background (Three.js r128, loaded from cdnjs)
- `js/art.js`: the six project schematic illustrations (SVG)
- `img/`: photos and the reviewer certificate

## Local preview
    cd nirjal-portfolio
    python3 -m http.server 8000
    # open http://localhost:8000

## Notes
- Pages are hash routes (`#work`, `#project-hab`, `#about`), so the site works on any static host with no server config.
- Light/dark mode follows the visitor's system setting first, then remembers their toggle in localStorage.
- Visitors with reduced motion turned on get a still version.
