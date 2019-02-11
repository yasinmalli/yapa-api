import { Inject } from 'typescript-ioc';
import ExpenseRepository from '../repositories/ExpenseRepository';
import { IRouterContext } from 'koa-router';

export default class ExpenseController {
    constructor( @Inject private repository: ExpenseRepository ) {}

    public async getAll(ctx: IRouterContext) {
        try {            
            ctx.body = await this.repository.getAll();            
        } catch (e) {
            ctx.throw(404, e);
        }
    }
}