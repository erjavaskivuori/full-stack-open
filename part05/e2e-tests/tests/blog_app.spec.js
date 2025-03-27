const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
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
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong_pswd')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Blog created by Playwright', 'Test Author', 'https://playwright.dev')
      await expect(page
        .getByRole(
          'heading',
          { name: 'Blog created by Playwright by Test Author' }))
        .toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'Blog created by Playwright', 'Test Author', 'https://playwright.dev')

      await page.getByText('view').click()
      await page.getByText('like').click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })
  })
})