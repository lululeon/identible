import AccountController from '@controller/AccountController'

export type AppController = AccountController // | other controllers to be added here

export interface RouteConfig {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  route: string
  controller: AppController
}

const Routes = [
  {
    method: 'get',
    route: '/api/accounts',
    controller: AccountController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/accounts/:id',
    controller: AccountController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/accounts',
    controller: AccountController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/accounts/:id',
    controller: AccountController,
    action: 'remove',
  },
]

export default Routes
