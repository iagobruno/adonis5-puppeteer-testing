import test from 'japa'
import { expect } from 'chai'
import type { Page } from 'puppeteer'

test.group('/ (Home page)', (group) => {
  let page: Page

  group.beforeEach(async () => {
    page = await global.BROWSER?.newPage()!
  })

  group.afterEach(async () => {
    await page?.close()
  })

  test('Should be able to render the home page', async () => {
    await page.goto(global.SERVER_HOST!)

    const h1Text = await page.$eval('h1.title', (h1) => h1.textContent)

    expect(h1Text).to.contain('It Works!')
  })

  test('Must link the about page', async () => {
    await page.goto(global.SERVER_HOST!)

    await Promise.all([
      page.waitForNavigation(),
      page.click('#about-link')
    ])

    expect(page.url()).to.contain('/about')

    const h1Text = await page.$eval('h1', (h1) => h1.textContent)
    expect(h1Text).to.equal('ABOUT PAGE')

    const pText = await page.$eval('p', (p) => p.textContent)
    expect(pText).to.contain('Lorem ipsum dolor')
  })

})
