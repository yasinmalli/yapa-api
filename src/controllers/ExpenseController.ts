import { Inject } from 'typescript-ioc';
import ExpenseRepository from '../repositories/ExpenseRepository';
import { IRouterContext } from 'koa-router';
import { Expense, ExpenseDAO } from '../models/Expense';

export default class ExpenseController {
    constructor( @Inject private repository: ExpenseRepository ) {}

    public async getAll(ctx: IRouterContext) {
        try {            
            let expenses = await this.repository.getAll();
            ctx.body = expenses.map(e => Expense.FromDAO(e));
        } catch (e) {
            ctx.throw(404, e);
        }
    }

    public async add(ctx: IRouterContext) {
        try {     
            let expenseResource: Expense = ctx.request.body;            
            // todo: do some validation
            const dao: ExpenseDAO = Expense.ToDAO(expenseResource);            
            await this.repository.create(dao);

            ctx.body = Expense.FromDAO(dao);
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }
}