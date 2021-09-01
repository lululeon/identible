import 'reflect-metadata'
import faker from 'faker'
import { Account } from '@entity/Account'

export const fakeAccount = (): Account => {
  const account = new Account()
  account.firstName = faker.name.firstName()
  account.lastName = faker.name.lastName()
  account.age = faker.datatype.number(100)
  return account
}
