![H4ckernews](./public/logo.png)

**H4ckernews** is a Hackernews client app inspired by the [HNPWA](https://hnpwa.com/) project and an attempt to make hackernews more beautiful by enriching stories with preview images and descriptions.

The project started as a playground to try out new technology and play around with [Recoil.js](https://recoiljs.org/) and [Tailwind CSS](https://tailwindcss.com/).

The app is available at [www.h4ckernews.com](https://h4ckernews.com/).

![CI status](https://github.com/olerichter00/h4ckernews/workflows/CI/badge.svg)

## Tech Stack

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recoil State Management](https://recoiljs.org/)
- [Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)
- [Cheerio](https://cheerio.js.org/)
- [Quicklink](https://github.com/GoogleChromeLabs/quicklink)
- [Headroom.js](https://wicky.nillia.ms/headroom.js/)

## Features

**Metadata**

Per default the Open Graph protocol is used to enrich the stories. If no metadata is provided, [cheerio](<[https://cheerio.js.org/](https://cheerio.js.org/)>) is used to scrape the page and provide a suitable image and text that can be shown as a description.

Since some pages don't show any images, [ContextualWeb Image Search API](<[https://contextualweb.io/image-search-api/](https://contextualweb.io/image-search-api/)>) and [Unsplash Image API](<[https://unsplash.com/developers](https://unsplash.com/developers)>) are used as fallback solutions.

**Caching**

To compensate the long loading time due to scraping the pages for metadata, a mix of [stale-while-invalid](https://vercel.com/docs/serverless-functions/edge-caching#stale-while-revalidate) and [Russian doll caching](https://blog.appsignal.com/2018/04/03/russian-doll-caching-in-rails.html) is used. With this technique instant page load can be achieved without any backend database. An external cronjob service is used to refresh the content in order to not show outdated stale data.

**Link Prefetching**

External links are prefetched on hover using [quicklink](https://github.com/GoogleChromeLabs/quicklink).

**Installable PWA**

The app is a PWA and can be installed.

**Infinite Scroll**

More stories are loaded when scrolling to the bottom.

## Development

- Provide a `.env.local` file from `.env.example`.
- Run `yarn install` to install dependencies.
- Run `yarn dev` to run **h4ckernews** locally.

**Test**

Run `yarn test` or `yarn test:watch` to run the test suite.

**Code Style**

Run `yarn lint` or `yarn lint:fix` to run prettier.

**Deploy**

Create a project with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Folerichter00%2Fh4ckernews&project-name=h4ckernews&repository-name=h4ckernews)

Run `yarn deploy` or `yarn deploy:staging` to deploy to Vercel.
