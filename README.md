<!-- ![H4ckernews](./public/logo.png) -->

<br />
  <h1 align="center">H4ckernews</h1>

  <p align="center">
    A beautiful hackernews client build with NextJS and Tailwind CSS.
    <br />
    <br />
    <a href="https://h4ckernews.com/">View App</a>
    ·
    <a href="https://github.com/olerichter00/h4ckernews/issues">Report Bug</a>
    ·
    <a href="https://github.com/olerichter00/h4ckernews/issues">Request Feature</a>
  </p>
  <br />
</p>

## About The Project

[**H4ckernews**](https://h4ckernews.com/) is a Hackernews client app inspired by the [HNPWA](https://hnpwa.com/) project and an attempt to make hackernews more beautiful by enriching stories with preview images and descriptions.

[![DeepScan grade](https://deepscan.io/api/teams/11955/projects/14907/branches/288655/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=11955&pid=14907&bid=288655)

## Build With

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

#### Metadata

Each story is enriched with a preview image and a description. If no open graph meta tags are provided, several fallback strategies are used to make sure every story has an image.

**Note:** The code has been moved to a separate npm package ([page-meta-scraper](https://www.npmjs.com/package/page-meta-scraper)).

#### Database

H4ckernews uses a MongoDB to store stories. The newest stories can be loaded with a cron job scheduler using the endpoint `/api/stories/[type]/refresh`.

#### Link Prefetching

External links are prefetched on hover using [quicklink](https://github.com/GoogleChromeLabs/quicklink).

#### Installable PWA

The app is a PWA and can be installed.

#### Infinite Scroll

More stories are loaded when scrolling to the bottom of the page.

## Development

#### Installation

Clone the repository:

```sh
https://github.com/olerichter00/h4ckernews.git
```

Provide environment variables:

```sh
cp .env.example .env.local
```

Install dependencies:

```sh
yarn install
```

Run the project:

```sh
yarn dev
```

#### Testing

Run Tests with jest:

```sh
yarn test
yarn test:watch

```

#### Code Style

Run prettier:

```sh
yarn lint
yarn lint:fix
```

#### Deploy

Create the project with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Folerichter00%2Fh4ckernews&project-name=h4ckernews&repository-name=h4ckernews)

Deploy on staging:

```sh
yarn deploy:staging
```

Deploy on production:

```sh
yarn deploy
```
