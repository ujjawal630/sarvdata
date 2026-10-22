# Sarv Data

Sarv Data is a responsive B2B wholesale marketplace and business SaaS concept, using a navy-blue and light-orange visual identity.

## Current implementation

This repository starter is a front-end MVP built with plain HTML, CSS, and JavaScript. It includes:

- Responsive homepage and navigation
- Product discovery cards with category, popular/new filters and search
- Product favorites (in-memory for the current session)
- RFQ, join, sign-in, and supplier inquiry modal interfaces
- Supplier/product sample data
- Business tools dashboard preview
- Mobile navigation, toast feedback, scroll reveal animations
- Accessible labels and reduced-motion support

**Important:** Listings are illustrative demo data. Forms do not submit to a live backend. Authentication, database persistence, real supplier verification, messaging, billing, and production SaaS workflows are not implemented yet.

## Run locally

No build step is required.

1. Download or clone this repository.
2. Open `index.html` in a browser, or serve the folder with a local web server.

For example, with Python installed:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

This static MVP can be hosted on GitHub Pages, Netlify, or Vercel static hosting. For real marketplace operations, add a secure backend, database, authentication, image storage, email delivery, moderation, and server-side authorization before launch.

## Suggested next phase

- Backend API and PostgreSQL database
- Buyer/supplier authentication and organization roles
- Product and supplier CRUD
- RFQ and quotation workflows
- Messaging, inventory, CRM, and purchase orders
- Admin verification and moderation
- Tests, security review, and deployment configuration

## Brand

- Name: Sarv Data
- Primary navy: `#102747`
- Secondary navy: `#183B61`
- Light orange: `#FFE1C2`
- Accent orange: `#F5A45D`
- Background: `#F5F8FC`

## GitHub repository target

Intended repository: `https://github.com/ujjawal630/sarvdata`

If you have created that repository on GitHub and are signed in on your computer, run these commands from this project folder:

```bash
git remote add origin https://github.com/ujjawal630/sarvdata.git
git push -u origin main
```

If `origin` already exists, inspect it with `git remote -v` before changing it. GitHub authentication and repository creation must be completed by the account owner if not already configured.
