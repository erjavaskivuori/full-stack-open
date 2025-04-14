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
      await expect(
        page.getByRole('heading', { name: 'Blog created by Playwright by Test Author' })
      ).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByText('view').click()

      const likesElement = page.getByTestId('like-count')
      const likesText = await likesElement.innerText()
      const likesBeginning = parseInt(likesText.split(' ')[1], 10)

      await page.getByRole('button', { name: 'like' }).click()

      await expect(likesElement).toHaveText(`likes ${likesBeginning + 1}`)
    })

    test('a blog can be removed', async ({ page }) => {
      await createBlog(page, 'Blog created by Playwright', 'Test Author', 'https://playwright.dev')
      const newBlog = page
        .getByTestId('blog-container')
        .filter({
          has: page.getByRole('heading', { name: 'Blog created by Playwright by Test Author' })
        })
      await expect(newBlog).toBeVisible()
      page.reload()
      await newBlog.getByText('view').click()
      page.on('dialog', (dialog) => dialog.accept())
      await newBlog.getByText('remove').click()
      await expect(page.getByText('Blog deleted successfully')).toBeVisible()
      await expect(newBlog).toHaveCount(0)
    })

    test('remove button is not shown for blogs created by other users', async ({ page }) => {
      await createBlog(page, 'Blog created by Playwright', 'Test Author', 'https://playwright.dev')

      const newBlog = page
        .getByTestId('blog-container')
        .filter({
          has: page.getByRole('heading', { name: 'Blog created by Playwright by Test Author' })
        })
      await expect(newBlog).toBeVisible()
      page.reload()

      const initialBlog = page
        .getByTestId('blog-container')
        .filter({ has: page.getByRole('heading', { name: 'React patterns by Michael Chan' }) })

      await initialBlog.getByText('view').click()
      await newBlog.getByText('view').click()
      await expect(initialBlog.getByText('remove')).not.toBeVisible()
      await expect(newBlog.getByText('remove')).toBeVisible()
    })

    test('blogs are ordered by likes', async ({ page }) => {
      await createBlog(page, 'Blog created by Playwright', 'Test Author', 'https://playwright.dev')

      const newBlog = page
        .getByTestId('blog-container')
        .filter({
          has: page.getByRole('heading', { name: 'Blog created by Playwright by Test Author' })
        })
      await expect(newBlog).toBeVisible()

      const initialOrder = await page.getByTestId('blog-container').allInnerTexts()
      await newBlog.getByText('view').click()

      const likeButton = newBlog.getByRole('button', { name: 'like' })
      for (let i = 0; i < 5; i++) {
        await likeButton.click()
      }
      await newBlog.getByText('hide').click()
      const updatedOrder = page.getByTestId('blog-container').allInnerTexts()
      expect(updatedOrder).not.toEqual(initialOrder)
    })
  })
})
