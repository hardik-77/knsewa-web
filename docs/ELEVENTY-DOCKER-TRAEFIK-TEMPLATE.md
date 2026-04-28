# Eleventy + Docker + Traefik Static Site Template

> **Usage**: Replace all `{{PLACEHOLDER}}` values with your project-specific values.
> This template sets up a production-ready static site with hot reload development.

---

## Placeholders to Replace

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{PROJECT_NAME}}` | NPM package name (lowercase, hyphens) | `my-website` |
| `{{PROJECT_CONTAINER_DEV}}` | Docker dev container name | `my-website-dev` |
| `{{PROJECT_CONTAINER_PROD}}` | Docker prod container name | `my-website-prod` |
| `{{DOMAIN}}` | Production domain | `example.com` |
| `{{DEV_DOMAIN}}` | Development domain | `dev.example.com` |
| `{{TRAEFIK_ROUTER_NAME}}` | Unique Traefik router name | `my-website` |
| `{{GTM_ID}}` | Google Tag Manager ID (optional) | `GTM-XXXXXXX` |
| `{{LETSENCRYPT_EMAIL}}` | Email for SSL certificates | `admin@example.com` |

---

## Project Structure

```
{{PROJECT_NAME}}/
├── src/                          # Source files (Eleventy input)
│   ├── _includes/
│   │   ├── layouts/
│   │   │   └── base.liquid       # Main layout wrapper
│   │   ├── header.liquid         # Site header component
│   │   ├── footer.liquid         # Site footer component
│   │   ├── mobile-nav.liquid     # Mobile navigation
│   │   └── hls-init.liquid       # HLS.js for Cloudflare Stream (optional)
│   ├── _data/                    # JSON data files
│   │   └── site.json             # Global site data
│   ├── css/                      # Global CSS files
│   ├── media/                    # Images, videos, assets
│   └── index.liquid              # Homepage template
│
├── _site-dev/                    # Dev build output (auto-generated, writable)
├── _site-prod/                   # Prod build output (root-owned, protected)
│
├── .eleventy.js                  # Eleventy configuration
├── package.json                  # NPM dependencies
├── docker-compose.yml            # Production Docker config
├── docker-compose.dev.yml        # Development Docker config
├── nginx.conf                    # Nginx configuration
└── deploy.sh                     # Production deployment script
```

---

## File Contents

### 1. package.json

```json
{
  "name": "{{PROJECT_NAME}}",
  "version": "1.0.0",
  "scripts": {
    "start": "eleventy --serve",
    "build": "eleventy",
    "debug": "DEBUG=Eleventy* eleventy"
  },
  "devDependencies": {
    "@11ty/eleventy": "^3.1.2"
  }
}
```

---

### 2. .eleventy.js

```javascript
module.exports = function(eleventyConfig) {
  // Copy static assets directly (no processing)
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/media");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch for changes during development
  eleventyConfig.addWatchTarget("src/css");
  eleventyConfig.addWatchTarget("src/media");
  eleventyConfig.addWatchTarget("src/assets");

  // Expose environment variable to templates (for noindex in dev)
  eleventyConfig.addGlobalData("env", process.env.ELEVENTY_ENV || 'production');

  // Dev server configuration
  eleventyConfig.setServerOptions({
    port: 8080,
    host: '0.0.0.0',  // Allow connections from outside container
    showAllHosts: true,
    watch: ['src/**/*'],
    liveReload: true
  });

  // Environment-specific output directory
  const isDev = process.env.ELEVENTY_ENV === 'development';
  const defaultOutputDir = isDev ? '_site-dev' : '_site-prod';
  const outputDir = process.env.ELEVENTY_OUTPUT_DIR || defaultOutputDir;

  return {
    dir: {
      input: "src",
      output: outputDir,
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html", "liquid"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid"
  };
};
```

---

### 3. docker-compose.dev.yml

```yaml
version: '3.8'

services:
  eleventy-dev:
    image: node:18
    container_name: {{PROJECT_CONTAINER_DEV}}
    restart: unless-stopped
    working_dir: /app
    command: sh -c "npm install && npm start"

    volumes:
      - .:/app
      - /app/node_modules  # Anonymous volume prevents conflicts

    environment:
      - NODE_ENV=development
      - ELEVENTY_ENV=development

    networks:
      - {{PROJECT_NAME}}-network
      - hosting  # Connect to Traefik

    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=hosting"
      - "traefik.http.routers.{{TRAEFIK_ROUTER_NAME}}-dev-secure.entrypoints=websecure"
      - "traefik.http.routers.{{TRAEFIK_ROUTER_NAME}}-dev-secure.rule=Host(`{{DEV_DOMAIN}}`) || Host(`www.{{DEV_DOMAIN}}`)"
      - "traefik.http.routers.{{TRAEFIK_ROUTER_NAME}}-dev-secure.tls=true"
      - "traefik.http.routers.{{TRAEFIK_ROUTER_NAME}}-dev-secure.tls.certresolver=letsencrypt"
      - "traefik.http.services.{{TRAEFIK_ROUTER_NAME}}-dev.loadbalancer.server.port=8080"

    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:8080', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

networks:
  {{PROJECT_NAME}}-network:
    driver: bridge
  hosting:
    external: true  # Shared Traefik network
```

---

### 4. docker-compose.yml (Production)

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    container_name: {{PROJECT_CONTAINER_PROD}}
    restart: unless-stopped
    # NO EXPOSED PORTS - Traefik handles 80/443

    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./_site-prod:/usr/share/nginx/html:ro

    networks:
      - {{PROJECT_NAME}}-network
      - hosting

    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=hosting"

      # HTTPS routing
      - "traefik.http.routers.{{TRAEFIK_ROUTER_NAME}}-secure.entrypoints=websecure"
      - "traefik.http.routers.{{TRAEFIK_ROUTER_NAME}}-secure.rule=Host(`{{DOMAIN}}`) || Host(`www.{{DOMAIN}}`)"
      - "traefik.http.routers.{{TRAEFIK_ROUTER_NAME}}-secure.tls=true"
      - "traefik.http.routers.{{TRAEFIK_ROUTER_NAME}}-secure.tls.certresolver=letsencrypt"
      - "traefik.http.routers.{{TRAEFIK_ROUTER_NAME}}-secure.service={{TRAEFIK_ROUTER_NAME}}"

      # HTTP to HTTPS redirect
      - "traefik.http.routers.{{TRAEFIK_ROUTER_NAME}}.entrypoints=web"
      - "traefik.http.routers.{{TRAEFIK_ROUTER_NAME}}.rule=Host(`{{DOMAIN}}`) || Host(`www.{{DOMAIN}}`)"
      - "traefik.http.routers.{{TRAEFIK_ROUTER_NAME}}.middlewares=https-redirect"
      - "traefik.http.routers.{{TRAEFIK_ROUTER_NAME}}.service={{TRAEFIK_ROUTER_NAME}}"

      # HTTPS redirect middleware
      - "traefik.http.middlewares.https-redirect.redirectscheme.scheme=https"
      - "traefik.http.middlewares.https-redirect.redirectscheme.permanent=true"

      # Service port
      - "traefik.http.services.{{TRAEFIK_ROUTER_NAME}}.loadbalancer.server.port=80"

    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s

networks:
  {{PROJECT_NAME}}-network:
    driver: bridge
  hosting:
    external: true
```

---

### 5. nginx.conf

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Homepage
    location = / {
        try_files /index.html =404;
    }

    # General location - return 404 for non-existent URLs
    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static assets (30 days)
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|avif|webp)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Video files
    location ~* \.(mp4|webm|ogg|ogv|mov|avi)$ {
        expires 30d;
        add_header Cache-Control "public";
        add_header Accept-Ranges bytes;
    }

    # Don't cache HTML (for fresh content)
    location ~* \.html$ {
        add_header Cache-Control "no-cache, must-revalidate";
        expires 0;
    }

    # Deny hidden files (except .well-known for SSL)
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml application/json
               application/javascript image/svg+xml;
}
```

---

### 6. deploy.sh

```bash
#!/bin/bash

# Production Deployment Script
# Builds site with production settings and deploys with root protection

set -e

echo "======================================"
echo "Production Deployment"
echo "======================================"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${YELLOW}Step 1: Building production site...${NC}"
rm -rf _site-prod-temp/
ELEVENTY_ENV=production ELEVENTY_OUTPUT_DIR=_site-prod-temp npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build successful${NC}"

echo -e "${YELLOW}Step 2: Deploying (requires root password)...${NC}"

su -c "
    rm -rf '$SCRIPT_DIR/_site-prod/' && \
    mv '$SCRIPT_DIR/_site-prod-temp/' '$SCRIPT_DIR/_site-prod/' && \
    chown -R root:root '$SCRIPT_DIR/_site-prod/' && \
    chmod -R 755 '$SCRIPT_DIR/_site-prod/'
"

if [ $? -ne 0 ]; then
    echo -e "${RED}Deployment failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Permissions set${NC}"

echo -e "${YELLOW}Step 3: Recreating container...${NC}"
docker-compose up -d --force-recreate

echo -e "${GREEN}======================================"
echo "✓ Deployment Complete!"
echo "======================================${NC}"
echo ""
echo "Production: https://{{DOMAIN}}"
echo "Development: https://{{DEV_DOMAIN}}"
```

**Make executable:** `chmod +x deploy.sh`

---

### 7. src/_includes/layouts/base.liquid

```liquid
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Optional: Google Tag Manager -->
    <!-- <script>(function(w,d,s,l,i){...})(window,document,'script','dataLayer','{{GTM_ID}}');</script> -->

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    {% if env == 'development' %}
    <!-- Prevent search engine indexing in development -->
    <meta name="robots" content="noindex, nofollow">
    {% endif %}

    <title>{{ title | default: "{{DOMAIN}}" }}</title>
    <meta name="description" content="{{ description | default: 'Your site description' }}">
    <link rel="icon" type="image/x-icon" href="/media/favicon.ico">

    <!-- Google Fonts (customize as needed) -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Global CSS -->
    <link rel="stylesheet" href="/css/global.css">
    <link rel="stylesheet" href="/css/typography.css">
    <link rel="stylesheet" href="/css/layout.css">
    <link rel="stylesheet" href="/css/components.css">
    <link rel="stylesheet" href="/css/utilities.css">

    {% if hasHlsVideos %}
    {% include "hls-init.liquid" %}
    {% endif %}
</head>
<body>
    {% include "header.liquid" %}
    {% include "mobile-nav.liquid" %}

    {{ content }}

    {% include "footer.liquid" %}
</body>
</html>
```

---

### 8. src/_includes/hls-init.liquid (Optional - for Cloudflare Stream)

```liquid
<!-- HLS.js for adaptive video streaming (Cloudflare Stream) -->
<script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const videos = document.querySelectorAll('video source[type="application/x-mpegURL"]');

        videos.forEach(function(source) {
            const video = source.parentElement;
            const hlsUrl = source.getAttribute('src');

            // Safari has native HLS support
            if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = hlsUrl;
            } else if (Hls.isSupported()) {
                // Chrome/Firefox/Edge need HLS.js
                const hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: true,
                    backBufferLength: 90
                });
                hls.loadSource(hlsUrl);
                hls.attachMedia(video);
            }
        });
    });
</script>
```

**Usage in templates:**
```html
<video autoplay muted loop playsinline>
    <source src="https://customer-XXXX.cloudflarestream.com/VIDEO_UID/manifest/video.m3u8" type="application/x-mpegURL">
</video>
```

---

### 9. src/_data/site.json

```json
{
  "name": "Your Site Name",
  "url": "https://{{DOMAIN}}",
  "description": "Your site description",
  "author": "Your Name",
  "email": "contact@{{DOMAIN}}",
  "hasHlsVideos": true
}
```

---

### 10. src/index.liquid (Example Homepage)

```liquid
---
layout: layouts/base.liquid
title: Welcome to My Site
description: Homepage description for SEO
---

<section id="hero">
    <h1>{{ title }}</h1>
    <p>Welcome to {{ site.name }}</p>
</section>

<section id="content">
    <h2>About</h2>
    <p>Your content here...</p>
</section>
```

---

### 11. src/_includes/header.liquid (Starter)

```liquid
<!-- Header -->
<header>
    <div class="header-container">
        <a href="/" class="logo">
            <img src="/media/logo.png" alt="Site Logo">
        </a>
        <nav class="nav-links">
            <a href="/">Home</a>
            <a href="/about/">About</a>
            <a href="/contact/">Contact</a>
        </nav>
        <button class="hamburger" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</header>
```

---

### 12. src/_includes/footer.liquid (Starter)

```liquid
<!-- Footer -->
<footer>
    <div class="footer-content">
        <p>&copy; {{ "now" | date: "%Y" }} {{ site.name }}. All rights reserved.</p>
    </div>
</footer>
```

---

### 13. src/_includes/mobile-nav.liquid (Starter)

```liquid
<!-- Mobile Navigation -->
<div class="mobile-nav">
    <div class="mobile-nav-links">
        <a href="/">Home</a>
        <a href="/about/">About</a>
        <a href="/contact/">Contact</a>
    </div>
</div>
```

---

## Traefik Prerequisite

This setup requires a centralized Traefik reverse proxy. Set up once per server.

**Location:** `/home/devuser/traefik/docker-compose.yml`

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v2.10
    container_name: traefik
    restart: unless-stopped
    command:
      - "--api.dashboard=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge=true"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.letsencrypt.acme.email={{LETSENCRYPT_EMAIL}}"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./letsencrypt:/letsencrypt
    networks:
      - hosting

networks:
  hosting:
    driver: bridge
```

**Initial setup:**
```bash
# Create the shared network (once per server)
docker network create hosting

# Start Traefik
cd /home/devuser/traefik
docker-compose up -d
```

---

## Setup Commands (New Project)

```bash
# 1. Create project directory
mkdir {{PROJECT_NAME}} && cd {{PROJECT_NAME}}

# 2. Create all files from this template (replace placeholders)

# 3. Install dependencies
npm install

# 4. Create required directories
mkdir -p src/_includes/layouts src/_data src/css src/media

# 5. Start development (hot reload)
docker-compose -f docker-compose.dev.yml up -d

# 6. View dev logs
docker-compose -f docker-compose.dev.yml logs -f

# 7. Make deploy script executable
chmod +x deploy.sh

# 8. Deploy to production (when ready)
./deploy.sh
```

---

## Key Architecture Features

| Feature | Implementation |
|---------|----------------|
| **Hot reload** | Eleventy dev server in Node.js container |
| **Separate builds** | `_site-dev/` (writable) vs `_site-prod/` (root-owned) |
| **No exposed ports** | All traffic routes through Traefik |
| **Permission protection** | Production files owned by root |
| **SSL automation** | Let's Encrypt via Traefik |
| **Dev noindex** | Automatic `<meta name="robots">` in development |
| **Fast rebuilds** | ~50ms per page change |
| **Video streaming** | Cloudflare Stream with HLS.js |

---

## CSS Architecture (Three-Tier)

1. **Global CSS** (`src/css/`) - Styles used on EVERY page (header, footer, variables)
2. **Component CSS** (inline in `.liquid` includes) - Styles for reusable components
3. **Page CSS** (inline in page templates) - Styles for a single page only

**Rule:** If it's not on every page, don't put it in global CSS.

---

## Liquid Template Quick Reference

```liquid
{{ variable }}                    <!-- Output variable -->
{{ title | default: "Fallback" }} <!-- Default value -->
{% include "component.liquid" %}  <!-- Include component -->
{% if condition %}...{% endif %}  <!-- Conditional -->
{% for item in items %}...{% endfor %} <!-- Loop -->

---
layout: layouts/base.liquid       <!-- Front matter (YAML) -->
title: Page Title
---
```

---

## Security Model (Dev vs Prod Protection)

This architecture separates development (free access) from production (protected).

| Environment | Who Can Access | Protection Mechanism |
|-------------|----------------|----------------------|
| **Development** | Any developer | None - free to edit, hot reload works |
| **Production** | Root only | `su -c` in deploy.sh requires root password |

### Why This Matters

- **Developers** (Hardik, Anish, Manjila, etc.) can freely work on dev environment
- **Production deployments** require root password - prevents accidental deploys
- **`_site-prod/`** directory is owned by `root:root` - can't be edited directly
- **`_site-dev/`** directory is writable by anyone - safe for experimentation

### Deployment Workflow

```
1. Developer edits src/ files
   ↓
2. Dev site updates instantly (hot reload) - no password needed
   ↓
3. When ready for production → run ./deploy.sh
   ↓
4. Script prompts for ROOT PASSWORD
   ↓
5. Only authorized deploys succeed
```

### What Gets Protected

```bash
# In deploy.sh - this block requires root password
su -c "
    rm -rf '_site-prod/' && \
    mv '_site-prod-temp/' '_site-prod/' && \
    chown -R root:root '_site-prod/' && \
    chmod -R 755 '_site-prod/'
"
```

**Result:** Production files are owned by root, immutable without root access.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Container won't start | Check `docker network ls` for `hosting` network |
| SSL not working | Verify DNS points to server, check Traefik logs |
| Hot reload not working | Check dev container logs: `docker-compose -f docker-compose.dev.yml logs -f` |
| Deploy permission denied | Run `./deploy.sh` with root password |
| 404 on pages | Check `nginx.conf` has location block for that path |
