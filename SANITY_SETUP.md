# Sanity CMS Setup Guide

This project is configured to use Sanity CMS for managing testimonials and gallery images.

## Setup Instructions

### 1. Create a Sanity Project

If you don't have a Sanity account, create one at [sanity.io](https://www.sanity.io)

Then create a new project:
```bash
npm create sanity@latest
```

Select "Create new project" and follow the prompts. Note your **Project ID**.

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and add your Sanity project credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Install Sanity Dependencies

```bash
npm install next-sanity @sanity/image-url sanity @sanity/vision
```

### 4. Deploy Sanity Studio

```bash
cd studio-gpaa
npm install
npm run dev
```

This will start your Sanity Studio on `http://localhost:3333`

### 5. Update Pages to Use Sanity

The new pages are ready to use:
- Replace `/app/testimonials/page.js` with `/app/testimonials/page-with-sanity.js`
- Replace `/app/gallery/page.js` with `/app/gallery/page-with-sanity.js`

Or keep using the static JavaScript data files if you prefer.

## Schema Structure

### Testimonial
- **name** (string): Person's name
- **relationship** (string): Relationship to Pastor Bayo
- **message** (text): The memory or message
- **date** (string): Format mm/dd/yy
- **image** (image): Optional profile picture

### Gallery
- **title** (string): Image title
- **image** (image): The photo
- **caption** (text): Optional description
- **date** (string): When photo was taken
- **alt** (string): Accessibility text

## Benefits of Using Sanity

✅ **Content Management**: Update testimonials and gallery without code changes
✅ **Image Optimization**: Automatic image optimization and CDN delivery
✅ **Scalability**: Easily handle hundreds of testimonials
✅ **Collaboration**: Multiple people can manage content
✅ **Real-time**: Changes appear instantly (with CDN cache)

## Staying with Current Setup

If you prefer to keep using JavaScript data files (no backend needed), you can continue using:
- `/app/testimonials/page.js` (current)
- `/app/gallery/page.js` (current)

This works perfectly fine for a smaller site with static content.
