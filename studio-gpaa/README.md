# Sanity Studio for G-Paa

This is the Sanity Studio for managing content for the Timothy Adebayo Adeku Memorial website.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Your Project

Before running the studio, you need to:

1. Add your Sanity Project ID to `sanity.config.ts`:
   - Replace `YOUR_PROJECT_ID` with your actual project ID from Sanity

2. Make sure you have the correct dataset name (default is `production`)

### 3. Run the Studio

```bash
npm run dev
```

The studio will be available at `http://localhost:3333`

## Content Types

This studio manages two content types:

### Testimonials
- **Name**: Person's name
- **Relationship**: Relationship to Pastor Bayo
- **Message**: Memory or message about Pastor Bayo
- **Date**: Date submitted (format: mm/dd/yy)
- **Image**: Optional profile picture

### Gallery Images
- **Title**: Image title
- **Image**: The photograph
- **Caption**: Optional description
- **Date**: When the photo was taken
- **Alt Text**: Accessibility description

## Deployment

To deploy this studio to the web:

```bash
npm run build
npm run deploy
```

This will make your studio available at `https://[projectid].sanity.studio`

## Documentation

For more information, visit [Sanity documentation](https://www.sanity.io/docs)
