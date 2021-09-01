import request from 'supertest'
import App from '@/app'
import { fakeAccount } from '@/tests/mockData'
import { wait } from '@/tests/mockUtils'

const app = new App()
let testAccount

test('app starts ok', async () => {
  await app.start()
})

test('app handles a create action', async () => {
  const account = fakeAccount()
  const response = await request(app.getServer())
    .post('/api/accounts')
    .send(account)
  expect(response.statusCode).toBe(200)
  expect(response.headers['content-type']).toEqual(
    expect.stringContaining('json'),
  )
  expect(response.body.id).toBeDefined
  expect(response.body.createdAt).toBeDefined
  expect(response.body.updatedAt).toEqual(response.body.createdAt)
  expect(response.body.deletedAt).toBeNull()

  testAccount = { ...response.body }
})

test('app handles get single entity by id', async () => {
  const response = await request(app.getServer()).get(
    `/api/accounts/${testAccount.id}`,
  )
  expect(response.statusCode).toBe(200)
  expect(response.headers['content-type']).toEqual(
    expect.stringContaining('json'),
  )
  expect(response.body.id).toBeDefined
  expect(response.body.createdAt).toBeDefined
  expect(response.body.updatedAt).toEqual(response.body.createdAt)
  expect(response.body.deletedAt).toBeNull()

  testAccount = { ...response.body }
})

test('app handles a soft delete - affects 1', async () => {
  await wait(1500) // arbitrary delay so that timestamps differ
  const response = await request(app.getServer()).delete(
    `/api/accounts/${testAccount.id}`,
  )
  expect(response.statusCode).toBe(200)
  expect(response.headers['content-type']).toEqual(
    expect.stringContaining('json'),
  )
  expect(response.body.affected).toEqual(1)
})

test('app handles a soft delete - item no longer returned by ORM', async () => {
  const response = await request(app.getServer()).get(`/api/accounts/`)
  const accountIds = response.body.map(_ => _.id)
  expect(accountIds.includes(testAccount.id)).toBe(false)
})

test('app stops ok', async () => {
  await app.stop()
})
