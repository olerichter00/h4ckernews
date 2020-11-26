import metadataScraper from '../lib/pageMetaScraper/metadataScraper'
import fs from 'fs'

const fetcherMock = () => ({
  text: async (_: string) => fs.readFileSync(testFile),
})

let testFile = ''

const url = 'www.test.test'
const keywords = ['key1', 'key2']

const metadata = async () => metadataScraper(url, keywords, fetcherMock)

describe('description', () => {
  test('with og metadata', async () => {
    testFile = 'tests/fixtures/open-graph-meta.html'

    expect(await metadata()).toEqual({
      description: 'og description',
      favicon: 'favicon.png',
      imageUrls: ['www.test.test/og-image.jpg'],
      title: 'og title',
    })
  })

  test('with description meta tag', async () => {
    testFile = 'tests/fixtures/meta-description.html'

    expect((await metadata()).description).toEqual('description')
  })

  test('with title tag', async () => {
    testFile = 'tests/fixtures/title-tag.html'

    expect((await metadata()).title).toEqual('title')
  })

  test('with p text', async () => {
    testFile = 'tests/fixtures/paragraph-text.html'

    expect((await metadata()).description).toEqual('a description')
  })

  test('with pre text', async () => {
    testFile = 'tests/fixtures/pre-text.html'

    expect((await metadata()).description).toEqual('a description')
  })
})

describe('imageUrls', () => {
  test('with og metadata', async () => {
    testFile = 'tests/fixtures/images.html'

    expect((await metadata()).imageUrls).toEqual([
      'www.test.test/meta-image.jpg',
      'www.test.test/meta-image.jpg',
      'www.test.test/meta-image.jpg',
      'www.test.test/meta-image.jpg',
      'www.test.test/meta-image.jpg',
      'www.test.test/meta-image.jpg',
      'www.test.test/article-image',
      'www.test.test/content-image',
      'www.test.test/an-image',
    ])
  })
})
