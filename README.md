![H4ckernews](./public/logo.png)

**H4ckernews** is a Hackernews client app inspired by the [HNPWA](https://hnpwa.com/) project and an attempt to make hackernews more beautiful by enriching stories with preview images and descriptions.

The project started as a playground to try out new technology and play around with [Recoil.js](https://recoiljs.org/) and [Tailwind CSS](https://tailwindcss.com/).

The app is available at [www.h4ckernews.com](https://h4ckernews.com/).

![CI status](https://github.com/olerichter00/h4ckernews/workflows/CI/badge.svg)
[![DeepScan grade](https://deepscan.io/api/teams/11955/projects/14907/branches/288655/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=11955&pid=14907&bid=288655)

## Tech Stack

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)
- [Recoil State Management](https://recoiljs.org/)
- [Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)
- [Cheerio](https://cheerio.js.org/)
- [Quicklink](https://github.com/GoogleChromeLabs/quicklink)
- [Headroom.js](https://wicky.nillia.ms/headroom.js/)
- [mongoose](https://mongoosejs.com/)

## Features

**Metadata**

Per default the Open Graph protocol is used to enrich the stories. If no metadata is provided, [cheerio](<[https://cheerio.js.org/](https://cheerio.js.org/)>) is used to scrape the page and provide a suitable image and text that can be shown as a description.

Since some pages don't show any images, [ContextualWeb Image Search API](https://contextualweb.io/image-search-api/) and [Unsplash Image API](https://unsplash.com/developers) are used as fallback solutions.

**Note:** The code has been moved to a separate npm package ([page-meta-scraper](https://www.npmjs.com/package/page-meta-scraper))/

**Database**

H4ckernews uses a MongoDB to store the stories.

**Link Prefetching**

External links are prefetched on hover using [quicklink](https://github.com/GoogleChromeLabs/quicklink).

**Installable PWA**

The app is a PWA and can be installed.

**Infinite Scroll**

More stories are loaded when scrolling to the bottom of the page.

## Development

**Install dependencies:**

- Provide a `.env.local` file from `.env.example`.
- Run `yarn install` to install dependencies.
- Run `yarn dev` to run **h4ckernews** locally.

**Test**

Run `yarn test` or `yarn test:watch` to run the test suite.

**Code Style**

Run `yarn lint` or `yarn lint:fix` to run prettier.

**Deploy**

Create the project with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Folerichter00%2Fh4ckernews&project-name=h4ckernews&repository-name=h4ckernews)

Run `yarn deploy` or `yarn deploy:staging` to deploy to Vercel.
