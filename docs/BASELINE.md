# Baseline Snapshot

## What The Project Is Today

The current application is an admin-managed blogging platform.

Public users can:

- Browse published blogs
- Search and filter blogs by category
- Read blog details
- Submit comments for review

Admin users can:

- Log in with a single admin credential pair stored in environment variables
- Create blogs with a rich text editor
- Upload cover images through ImageKit
- Generate article draft content with Gemini
- Publish or unpublish blogs
- Delete blogs
- Approve or delete comments
- View top-level counts on an admin dashboard

## Technical Base

Frontend:

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Quill editor

Backend:

- Express
- Mongoose
- JWT
- Multer
- ImageKit
- Gemini API

## Why It Still Looks Like A Starter

- Generic branding and tutorial structure
- Placeholder and demo data inside client assets
- Minimal authentication model
- Limited authorization rules
- Several UI actions are not backed by real APIs
- No top-level documentation explaining decisions or architecture

## What We Want It To Become

A product with:

- A distinct name and identity
- Real end-to-end auth and authorization
- Multi-user ownership
- Stronger backend safety
- Product-specific user flows
- Clean GitHub presentation

## Working Product Name

The selected product name for the transformation is **DevInk**.
