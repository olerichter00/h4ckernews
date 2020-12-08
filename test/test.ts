import metadataScraper from '../lib/metadataScraper'

describe('test', () => {
  test('test', async () => {
    expect(await metadataScraper.scrape('a-url', [], () => {})).toEqual({ imageUrls: [] })
  })
})
