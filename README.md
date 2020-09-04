![H4ckernews](./public/logo.png)

This project is meant to be a playground to have some fun with **Recoil**, **Tailwind CSS** and the **Hackernews API**. **H4ckernews** is a PWA inspired by the [HNPWA](https://hnpwa.com/) project and an attempt to make hackernews more beautiful by enriching stories with preview images and descriptions.

The app is available at [h4ckernews.vercel.app](https://h4ckernews.vercel.app/).

### Features

**Story Metadata**

In order to show a preview images and a description of each story html-metadata is used to scrape the story url and lazy load the data. Since the scraping can take up to a few seconds, Vercel's Edge Caching is used to cache the results.

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
- [quicklink](https://github.com/GoogleChromeLabs/quicklink)
