import { IRouterContext } from 'koa-router';

export default class MainCategoryController {

    public async getAll(ctx: IRouterContext) {
        try {            
            ctx.body = "MainCategory getAll";
        } catch (e) {
            ctx.throw(404, e);
        }
    }

}