# Throuple of Vibes — Static Website

This folder is a complete static website you can host for free (GitHub Pages) and then embed into Google Sites.

## Quick start (local preview)
Open `index.html` in your browser. (Double-click it.)

## Customize content (super easy)
Open `scripts.js` and update:
- `videos` (titles + YouTube links + thumbnails)
- `photos` (image paths + captions)
- `shows` (upcoming concerts list)

Replace social links in `index.html` (search for `Replace these with your real links`).

## Host for free (GitHub Pages)
1. Create a GitHub repo (example: `throupleofvibes`)
2. Upload *everything* in this folder (keep structure)
3. Repo Settings → Pages
4. Source: Deploy from branch → `main` / `(root)`
5. Your site will be live at: `https://YOURNAME.github.io/throupleofvibes/`

## Use your domain (ThroupleofVibes.com)
In GitHub Pages → Custom domain:
- Enter `throupleofvibes.com`
Then in your domain DNS add:
- A records to GitHub Pages IPs, and/or
- CNAME for `www` to `YOURNAME.github.io`

## Embed in Google Sites
Google Sites → Insert → Embed → By URL
Paste your hosted URL (GitHub Pages or similar).

If you want the site to be your *main* website on your domain (not just embedded), you can skip Google Sites entirely.

## Want the submit form to actually work?
Tell me which one you want:
- Google Forms (fastest)
- Airtable
- Email via Formspree
- Serverless endpoint
