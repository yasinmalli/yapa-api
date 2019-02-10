import { Inject } from 'typescript-ioc';
import IRoutes from "./IRoutes";
import MainCategoryController from '../controllers/MainCategoryController';
import { IRouterContext } from 'koa-router';

export default class MainCategoryRoutes extends IRoutes {
    constructor( @Inject private mainCategoryController: MainCategoryController) {
        super();
    }

    private resource: string = "maincategory"; 
    protected getRoutes(): any[] {
        return [
            { path: `${this.resource}`, method: "get", action: (ctx: IRouterContext) => this.mainCategoryController.getAll(ctx) },
            { path: `${this.resource}`, method: "post", action: (ctx: IRouterContext) => this.mainCategoryController.add(ctx) },
            { path: `${this.resource}/:id/subcategories`, method: "get", action: (ctx: IRouterContext) => this.mainCategoryController.getAllSubCategories(ctx) }
        ]
    }    
}