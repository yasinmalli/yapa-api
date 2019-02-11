import { Inject } from 'typescript-ioc';
import IRoutes from "./IRoutes";
import { IRouterContext } from 'koa-router';
import ExpenseController from '../controllers/ExpenseController';

export default class ExpenseRoutes extends IRoutes {
    constructor( @Inject private expenseController: ExpenseController) {
        super();
    }

    private resource: string = "expense"; 
    protected getRoutes(): any[] {
        return [
            { path: `${this.resource}`, method: "get", action: (ctx: IRouterContext) => this.expenseController.getAll(ctx) },
            { path: `${this.resource}`, method: "post", action: (ctx: IRouterContext) => this.expenseController.add(ctx) }
        ]
    }    
}