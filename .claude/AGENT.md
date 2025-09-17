# Bruno Krebs Blog - Project Information

## Overview
This is Bruno Krebs' personal blog for BK Sistemas de Informação LTDA, a software engineering consultancy specializing in solutions for US startups.

## Technology Stack
- **Framework**: Hexo (v7.2.0) - Static site generator
- **Theme**: Cactus (dark colorscheme)
- **Deployment**: GitHub Pages via GitHub Actions
- **URL**: http://brunokrebs.com
- **Language**: English
- **Timezone**: America/Sao_Paulo

## Business Info
- **Company**: BK Sistemas de Informação LTDA
- **Tagline**: Expert Software Engineering for US Startups
- **Author**: Bruno Krebs
- **Services**: Software development, consulting, contractor services, web development, backend, fullstack
- **Target Market**: American startups and growing businesses

## Current Analytics Setup
- Google Analytics configured but disabled (ID: G-4LMB35W1T4)
- Baidu Analytics disabled
- Cloudflare Analytics disabled
- Umami Analytics disabled

## Development Commands
```bash
npm install          # Install dependencies
npm run server       # Start dev server (http://localhost:4000)
npm run new "Title"  # Create new article
npm run build        # Build for production
```

## Content Structure
- Posts located in: `source/_posts/`
- Static pages in: `source/`
- Theme files in: `themes/cactus/`
- Images in: `images/`

## Social Links
- GitHub: http://github.com/brunokrebs
- LinkedIn: https://www.linkedin.com/in/brunokrebs/
- Twitter: https://twitter.com/brunoskrebs
- Email: krebs.bruno@gmail.com
- Phone: +55-51-981218-8604

## PostHog Analytics Evaluation
**Recommendation**: Yes, PostHog would be an excellent choice for this blog.

### Why PostHog fits well:
1. **Privacy-focused**: Configurable tracking with cookieless options
2. **Professional image**: Better for consulting business than Google Analytics
3. **Detailed insights**: Session recording, heatmaps, user behavior tracking
4. **Developer-friendly**: Easy integration with Hexo theme
5. **Free tier**: Likely sufficient for personal blog traffic
6. **Compliance**: GDPR/privacy-conscious tracking options

### Implementation notes:
- Theme already supports multiple analytics platforms
- Can easily add PostHog similar to existing Google Analytics integration
- Should disable Google Analytics if implementing PostHog
- Consider adding to `themes/cactus/_config.yml` and creating partial template