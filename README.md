# Proud to be a Town - Reading, UK

A modern, single-page website celebrating Reading as the largest town in the UK and advocating for maintaining its town status.

## Features

- Modern, responsive design
- Smooth scrolling navigation
- Elegant animations and transitions
- Optimized for Cloudflare Pages hosting
- Clean, semantic HTML
- Vanilla JavaScript (no dependencies)

## Deployment to Cloudflare Pages

1. Push this repository to GitHub/GitLab
2. Go to Cloudflare Dashboard → Pages
3. Connect your repository
4. Build settings:
   - Build command: (leave empty - static site)
   - Build output directory: `/` (root)
5. Deploy!

## Local Development

Simply open `index.html` in a browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Customization

- Colors: Edit CSS variables in `styles.css` (`:root` section)
- Content: Edit `index.html`
- Animations: Modify `script.js`

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) with CSS Grid and Flexbox support.

