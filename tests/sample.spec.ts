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

  test('Deve conseguir renderizar a página inicial', async () => {
    await page.goto(global.SERVER_HOST!)

    const h1Text = await page.evaluate(() => document.querySelector('h1.title')!.textContent)

    expect(h1Text).to.contain('It Works!')
  })

  test('Deve conseguir ir para a página sobre', async () => {
    await page.goto(global.SERVER_HOST!)

    const link = await page.$('#about-link')
    await link!.click()

    await page.waitForNavigation()

    expect(page.url()).to.contain('/about')

    await page.evaluate(() => document.querySelector('h1')!.textContent).then(text => {
      expect(text).to.equal('ABOUT PAGE')
    })

    await page.evaluate(() => document.querySelector('p')!.textContent).then(text => {
      expect(text).to.contain('Lorem ipsum dolor')
    })
  })

})
