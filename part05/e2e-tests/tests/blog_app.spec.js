const { test, expect, beforeEach, describe } = require('@playwright/test')


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const header = page.getByRole('heading', { name: 'Login' })
    const usernameField = page.getByLabel('username')
    const passwordField = page.getByLabel('password')
    const loginButton = page.getByRole('button', { name: 'login' })

    await expect(header).toBeVisible()
    await expect(usernameField).toBeVisible()
    await expect(passwordField).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('wrong_pswd')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByLabel('title').fill('Blog created by Playwright')
      await page.getByLabel('author').fill('Test Author')
      await page.getByLabel('url').fill('https://playwright.dev')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page
        .getByRole(
          'heading',
          { name: 'Blog created by Playwright by Test Author' }))
        .toBeVisible()
    })
  })
})