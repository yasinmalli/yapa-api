import { IRouterContext } from 'koa-router';
import { Inject } from 'typescript-ioc';
import MainCategoryRepository from '../repositories/MainCategoryRepository';
import MainCategoryDAO from '../models/MainCategory';
import SubCategoryDAO from '../models/SubCategory';

export default class MainCategoryController {

    constructor( 
        @Inject private repository: MainCategoryRepository,        
    ) {}

    public async getAll(ctx: IRouterContext) {
        try {            
            ctx.body = await this.repository.getAll();            
        } catch (e) {
            ctx.throw(404, e);
        }
    }

    public async add(ctx: IRouterContext) {
        try {            
            const mainCategory: MainCategoryDAO = MainCategoryDAO.newMainCategory(ctx.request.body);
            
            const result = await this.repository.create(mainCategory);
            ctx.body = result;
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }

    public async getAllSubCategories(ctx: IRouterContext) {
        try {
            const subCategories: SubCategoryDAO[] = await this.repository.getSubCategories(ctx.params.id);
            ctx.body = subCategories;
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }
}