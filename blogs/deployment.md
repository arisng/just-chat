# Deploying Your Chat Widget to jsDelivr

This guide walks through the process of building, versioning, and publishing your just-chat widget to jsDelivr, enabling you to easily integrate it into any website via CDN.

## Prerequisites

- Node.js 18+ installed
- pnpm (or npm/yarn) installed
- An [npm account](https://www.npmjs.com/signup)
- Git installed

## Step 1: Preparing Your Project

Before deployment, ensure your project meets best practices:

1. Update your version number in `package.json`:

```json
{
  "name": "@arisng/just-chat",
  "version": "0.1.3", // Increment this following semantic versioning
  // ...other fields
}
```

2. Make sure you have proper build scripts in your `package.json`:

```json
"scripts": {
  "build": "vite build",
  "preview": "vite preview"
}
```

3. Configure your build output in `vite.config.ts` to generate UMD and ES modules:

```typescript
export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'JustChat',
      formats: ['es', 'umd'],
      fileName: (format) => `just-chat.${format}.js`
    },
    minify: true,
    sourcemap: true
  }
})
```

## Step 2: Building Your Widget

Run the build process to generate distribution files:

```bash
# First install dependencies if you haven't already
pnpm install

# Then build the project
pnpm build
```

This will create optimized files in your `dist/` directory:
- `just-chat.es.js` - ES module version
- `just-chat.umd.js` - UMD version for direct browser use
- Associated source maps

## Step 3: Testing Your Build

Before publishing, verify your build works correctly:

1. Start a preview server:
```bash
pnpm preview
```

2. Test the widget functionality in your browser

3. Test the UMD build by including it directly in an HTML file:
```html
<script src="./dist/just-chat.umd.js" 
        data-webhook-url="https://your-test-endpoint.com/chat"
        defer>
</script>
```

## Step 4: Versioning Your Package

Follow [Semantic Versioning](https://semver.org/) principles:

- **MAJOR** version (1.0.0): incompatible API changes
- **MINOR** version (0.1.0): add functionality in a backward-compatible manner
- **PATCH** version (0.0.1): backward-compatible bug fixes

Example workflow:

1. Update the version in `package.json`
2. Create a Git tag for the release:
```bash
git add .
git commit -m "Prepare release v0.1.3"
git tag v0.1.3
git push origin main --tags
```

## Step 5: Publishing to npm

jsDelivr pulls packages from npm, so you need to publish there first:

1. Login to npm (first time only):
```bash
npm login
```

2. Publish your package:
```bash
npm publish --access public
```

3. Deprecate old versions if necessary:
We cannot delete old versions from npm once they are published. npm has a policy against deleting published versions to ensure stability and prevent breaking dependencies for other projects that might rely on those versions. However, you can deprecate old versions to warn users against using them.

```bash
npm deprecate @arisng/just-chat@0.1.2 "This version is deprecated, please use 0.1.3 instead."
```

> Note: If this is your first time publishing this package, you'll need to use the `--access public` flag since it has a scope (`@arisng`).

## Step 6: Using Your Widget from jsDelivr

Once published to npm, jsDelivr automatically makes your package available. You can reference it in several ways:

### Latest Version

```html
<script src="https://cdn.jsdelivr.net/npm/@arisng/just-chat/dist/just-chat.umd.js"
        data-webhook-url="https://your-backend.com/chat"
        data-theme-color="#1E40AF"
        defer>
</script>
```

### Specific Version (Recommended for Production)

```html
<script src="https://cdn.jsdelivr.net/npm/@arisng/just-chat@0.1.3/dist/just-chat.umd.js"
        data-webhook-url="https://your-backend.com/chat"
        defer>
</script>
```

### Using ES Module Version

```html
<script type="module">
  import { initChatPopup } from 'https://cdn.jsdelivr.net/npm/@arisng/just-chat@0.1.3/dist/just-chat.es.js';
  
  initChatPopup({
    webhookUrl: 'https://your-backend.com/chat',
    themeColor: '#1E40AF'
  });
</script>
```

## Step 7: Cache Purging (If Needed)

jsDelivr caches files for performance. If you need to purge the cache:

1. Visit: https://www.jsdelivr.com/tools/purge
2. Enter your file URL, e.g., `https://cdn.jsdelivr.net/npm/@arisng/just-chat@0.1.3/dist/just-chat.umd.js`
3. Click "Purge"

## Automating Releases with GitHub Actions

To automate the build and publish process, create a GitHub workflow file at `.github/workflows/publish.yml`:

```yaml
name: Publish Package

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Publish to npm
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

With this workflow, whenever you push a tag starting with 'v', it will automatically build and publish your package.

## Best Practices for CDN Deployment

1. **Always use specific versions in production** to prevent unexpected changes
2. **Include integrity hashes** for enhanced security:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@arisng/just-chat@0.1.3/dist/just-chat.umd.js"
           integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
           crossorigin="anonymous"
           data-webhook-url="https://your-backend.com/chat"
           defer>
   </script>
   ```
   You can generate integrity hashes using tools like [SRI Hash Generator](https://www.srihash.org/)

3. **Document each release** with a GitHub release and changelog

4. **Test across browsers** before each release

5. **Keep old versions available** to support users who haven't upgraded

## Troubleshooting Common Issues

### Package Not Appearing on jsDelivr

- Ensure your package is correctly published to npm
- Wait a few minutes for jsDelivr to cache your package
- Check if you can access your package via npm: `npm view @arisng/just-chat`

### Wrong Files Being Served

- Verify your `package.json` has correct `main`, `module`, and `files` fields:
  ```json
  {
    "main": "dist/just-chat.umd.js",
    "module": "dist/just-chat.es.js",
    "files": ["dist"]
  }
  ```

### Version Conflicts

- Always increment your version number before publishing
- Use `npm deprecate` to mark problematic versions

## Conclusion

By following this guide, you've successfully published your chat widget to jsDelivr, making it easily accessible for websites worldwide. Your users can now include your widget with a simple script tag, benefiting from jsDelivr's global CDN performance.

For additional support or questions about deployment, reach out through the project's GitHub issues or contact hoang@arisng.io.vn.