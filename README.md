# DevInk

DevInk is the transformation workspace for a full-stack publishing platform focused on developer writing and AI-assisted drafting.

This codebase started from a purchased blog CMS starter and is being rebuilt into an original product with:

- a distinct product identity
- stronger authentication and authorization
- multi-author publishing workflows
- safer content handling
- portfolio-ready documentation and deployment

## Stack

- React + Vite + Tailwind on the client
- Express + MongoDB on the server
- ImageKit for image uploads
- Gemini for AI-assisted content generation

## Baseline

What exists in the current base:

- Public blog listing and blog detail pages
- Category filtering and text search on the frontend
- Admin login with JWT token
- Admin dashboard with blog and comment management
- Blog creation with rich text editor and image upload
- AI-generated draft content from a title prompt
- Comment submission with admin approval flow

## Product Direction

DevInk is being shaped into a **multi-author developer publishing platform**.

Target capabilities:

- user signup, login, logout, and profile management
- role-based authorization for authors and admins
- author-owned draft and publishing workflows
- public article discovery with stronger search and filtering
- logged-in commenting with moderation
- AI-assisted outlining, drafting, and summaries

## Current Gaps

What still needs to change:

- Single admin login only, no real user accounts
- No role-based authorization beyond admin token verification
- Tutorial-era branding and placeholder content are still being removed
- Newsletter and share actions are UI-only
- Content sanitization and validation are incomplete
- Limited testing and deployment documentation

## Phase Plan

### Phase 0: Baseline and Repo Setup

- Create a clean git history
- Remove tutorial fingerprints
- Add project documentation
- Define product identity and naming

### Phase 1: Product Rebrand

- Rename app and replace branding
- Rewrite copy and product messaging
- Redesign key public-facing pages

### Phase 2: Auth and Authorization

- Add real user accounts
- Add password hashing and JWT expiry
- Add role and ownership checks
- Protect client and server routes

### Phase 3: Core Product Features

- Multi-author posts
- Draft/publish workflow
- Author profiles
- Slug-based routing
- Real comment ownership and moderation

### Phase 4: Quality and Deployment

- Validation and sanitization
- Tests for critical flows
- Deployment setup
- Portfolio-ready README and screenshots

## Working Notes

Daily progress is tracked around:

- What changed
- What is complete
- What is blocked
- What is next
