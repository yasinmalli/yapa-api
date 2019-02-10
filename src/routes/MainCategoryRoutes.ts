import { Inject } from 'typescript-ioc';
import IRoutes from "./IRoutes";
import MainCategoryController from '../controllers/MainCategoryController';
import { IRouterContext } from 'koa-router';

export default class MainCategoryRoutes extends IRoutes {
    constructor( @Inject private mainCategoryController: MainCategoryController) {
        super();
    }

    protected getRoutes(): any[] {
        return [
            { path: "maincategory", method: "get", action: (ctx: IRouterContext) => this.mainCategoryController.getAll(ctx) }
        ]
    }

    
}