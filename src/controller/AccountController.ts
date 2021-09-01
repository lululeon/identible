import { getRepository, UpdateResult } from 'typeorm'
import { NextFunction, Request, Response } from 'express'
import { Account } from '@entity/Account'

// TODO: trycatch / handle orm methods failing.
export default class AccountController {
  private accountRepository = getRepository(Account)

  public all = async (
    _request: Request,
    _response: Response,
    _next: NextFunction,
  ): Promise<Account[]> => {
    return this.accountRepository.find()
  }

  public one = async (
    request: Request,
    _response: Response,
    _next: NextFunction,
  ): Promise<Account> => {
    return this.accountRepository.findOne(request.params.id)
  }

  public save = async (
    request: Request,
    _response: Response,
    _next: NextFunction,
  ): Promise<unknown> => {
    return this.accountRepository.save(request.body)
  }

  public remove = async (
    request: Request,
    _response: Response,
    _next: NextFunction,
  ): Promise<UpdateResult> => {
    return this.accountRepository.softDelete(request.params.id)
  }
}
