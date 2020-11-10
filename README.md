![H4ckernews](./public/logo.png)

**H4ckernews** is a Hackernews Client App inspired by the [HNPWA](https://hnpwa.com/) project and an attempt to make hackernews more beautiful by enriching stories with preview images and descriptions.

The app is available at [www.h4ckernews.com](https://h4ckernews.com/).

### Features

**Story Metadata**

In order to show a preview images and a description for each story [cheerio](https://cheerio.js.org/) is used to scrape each story's page and lazy loads the information. Since the scraping can take up to a few seconds, Vercel's Edge Caching is used to cache the results.

**Infinite Scroll**

More stories are loaded when scrolling to the bottom.

**Link Prefetching**

External links are prefetched on hover using [quicklink](https://github.com/GoogleChromeLabs/quicklink).

**Installable PWA**

The app is a PWA and can be installed.

### Tech

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recoil](https://recoiljs.org/)
- [Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)
- [cheerio](https://cheerio.js.org/)
- [quicklink](https://github.com/GoogleChromeLabs/quicklink)
- [Headroom.js](https://wicky.nillia.ms/headroom.js/)
- [Contextualweb - Image Search API](https://contextualweb.io/image-search-api/)

## Run locally

- Provide a `.env.local` file from `.env.example`.
- Run `yarn install` to install dependencies.
- Run `yarn dev` to run **h4ckernews** locally.
