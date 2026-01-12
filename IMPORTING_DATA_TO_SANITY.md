# Importing Data to Sanity CMS

This guide explains how to import your testimonials and gallery data from the static data files into Sanity CMS.

## What Will Be Imported

- **Testimonials**: All testimonials from `/data/testimonials.js` (45+ testimonies)
- **Gallery Images**: All gallery metadata from `/data/gallery.js` (17 items with captions and dates)

## Prerequisites

Before importing, you need:

1. ✅ Sanity Project created (Project ID: `gryktxua`)
2. ✅ Sanity API Token with "Editor" permissions
3. ✅ Environment variables configured

## Step 1: Generate a Sanity API Token

1. Go to [Sanity Manage Dashboard](https://manage.sanity.io/projects)
2. Select your project (`gryktxua`)
3. Navigate to **Settings** → **API** → **Tokens**
4. Click **Add API Token**
5. Name it: `Import Token`
6. Select role: **Editor**
7. Copy the token

## Step 2: Add Token to Environment

Add your token to `.env.local`:

```bash
SANITY_API_TOKEN=your_token_here
```

Your `.env.local` should now have:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=gryktxua
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

## Step 3: Run the Import Script

Open your terminal and run:

```bash
npm run import:data
```

This will:
1. Read all testimonials from `/data/testimonials.js`
2. Read all gallery data from `/data/gallery.js`
3. Create documents in your Sanity project
4. Display progress as it imports
5. Show any errors if they occur

### Example Output

```
========================================
📊 Sanity Data Import Tool
========================================

🚀 Starting testimonials import...
📝 Found 45 testimonials to import
✅ Imported 45/45 testimonials
✅ Successfully imported 45 testimonials!

🚀 Starting gallery import...
📸 Found 17 gallery images to import
✅ Imported 17/17 gallery items
✅ Successfully imported 17 gallery items!

========================================
✅ Import completed successfully!
========================================
```

## Step 4: Verify in Sanity Studio

1. Start your dev server: `npm run dev`
2. Go to `http://localhost:3000/studio`
3. You should see your testimonials and gallery items in the studio
4. Click on any item to edit it

## Step 5: Upload Images

The import script only imports text data. To add actual images:

### For Testimonials
1. Go to `/studio` → **Testimonials**
2. Click on a testimonial
3. Scroll to the **Profile Image** field
4. Click to upload or select an image

### For Gallery
1. Go to `/studio` → **Gallery Images**
2. Click on a gallery item
3. Scroll to the **Image** field
4. Click to upload the actual photo

Sanity will automatically optimize and CDN-deliver your images.

## What's Next

### Your Pages Now Support Both Sources:

**Testimonials Page** (`/testimonials`)
- Tries to fetch from Sanity first
- Falls back to static data if Sanity unavailable
- Shows dynamic testimonial count and statistics

**Gallery Page** (`/gallery`)
- Tries to fetch from Sanity first
- Falls back to static data if Sanity unavailable
- Shows dynamic photo count and collection stats

### Workflow

1. **Add new testimonials** → Use the form on `/testimonials` page → Appears in Sanity
2. **Edit testimonials** → Update in Sanity Studio → Changes appear on site
3. **Add gallery photos** → Upload in Sanity Studio `/studio` → Appear on `/gallery`
4. **Manage content** → Sanity Studio provides full editing interface

## Troubleshooting

### Error: "NEXT_PUBLIC_SANITY_PROJECT_ID not set"
- Make sure `.env.local` has the project ID
- Restart your dev server after adding it

### Error: "SANITY_API_TOKEN not set"
- Generate a new token in Sanity Manage
- Add it to `.env.local` as shown above

### Error: "Unauthorized" during import
- Check that the token has "Editor" role
- Generate a new token and try again

### Some testimonials didn't import
- Check the error messages in the output
- The script continues importing even if some fail
- You can manually add missing ones in Sanity Studio

### Images not showing
- Upload images in Sanity Studio for each item
- The import script only handles text data
- Images need to be uploaded separately

## Running the Import Again

You can run the import multiple times:

```bash
npm run import:data
```

This will create **duplicate documents**. If you want to reimport:

1. Delete existing documents in Sanity Studio
2. Run `npm run import:data` again

Or, to just update specific items, edit them directly in Sanity Studio.

## Sanity Studio Location

Your studio is available at:
- **Local**: `http://localhost:3000/studio`
- **Production**: `https://gryktxua.sanity.studio` (requires Sanity login)

## Next Steps

1. ✅ Import data using the script above
2. ✅ Upload images in Sanity Studio
3. ✅ Edit and organize content as needed
4. ✅ Your pages will automatically show the latest data from Sanity

## Questions?

- Sanity Docs: https://www.sanity.io/docs
- Project Settings: https://manage.sanity.io/projects
- Your Studio: http://localhost:3000/studio

---

**Happy managing!** Your content is now in Sanity CMS and ready to scale. 🎉
