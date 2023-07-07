# David Witt's personal site

## Built with [Space Madness](https://spacemadness.dev/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/e1f557e6-6107-4042-92ad-e18336c50b77/deploy-status)](https://app.netlify.com/sites/david-witt-space-madness/deploys)

[davidwitt.me](https://davidwitt.me/)

[content.davidwitt.me](https://content.davidwitt.me/)

A turbo repo that includes everything you need to run your backend in Sanity and your frontend in Astro.

The monorepo is configured with apps as the primary hosted sites.

Packages are code that is shared across the sites.

```bash
.
├── apps
│   ├── site-astro
│   └── site-sanity
└── packages
    ├── content-models
    └── sanity-zod-types
```

Navigate to each folder's `README.md` for more details.

## Getting Started

See the [Space Madness Docs](https://spacemadness.dev/docs/) for detailed instructions on installing and runnig your app.

1. `export SANITY_STUDIO_PROJECT_ID=<sanity-id>`

   or

   `set SANITY_STUDIO_PROJECT_ID=<sanity-id>`

1. `turbo dev`

## Deploying

This site is hosted on [Netlify](https://app.netlify.com/)

## Hosting the Astro site

### Build command

`turbo build --filter=site-david-witt-me`

### Publish directory

`/apps/site-astro/dist/`

## Hosting the Sanity site

The Sanity Studio for this site is hosted on [Netlify](https://app.netlify.com/)

### Build command

`turbo build --filter=site-david-witt-me-sanity`

### Publish directory

`/apps/site-sanity/dist/`

## Contributing

Contributions are welcome.

If your code editor does not support Pretier out of the box, you can run `npm run format` from the `site-astro` directory before committing your changes.

Please make all pull requests to `main`.
