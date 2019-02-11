import { IRouterContext } from 'koa-router';
import { Inject } from 'typescript-ioc';
import MainCategoryRepository from '../repositories/MainCategoryRepository';
import { MainCategory, MainCategoryDAO } from '../models/MainCategory';
import { SubCategoryDAO, SubCategory } from '../models/SubCategory';

export default class MainCategoryController {

    constructor( 
        @Inject private repository: MainCategoryRepository,        
    ) {}

    public async getAll(ctx: IRouterContext) {
        try {
            const categories = await this.repository.getAll();
            ctx.body = categories.map(c => MainCategory.FromDAO(c));
        } catch (e) {
            ctx.throw(404, e);
        }
    }

    public async add(ctx: IRouterContext) {
        try {     
            let mainCategoryResource: MainCategory = ctx.request.body;            
            // todo: do some validation
            const dao: MainCategoryDAO = MainCategory.ToDAO(mainCategoryResource);            
            await this.repository.create(dao);

            ctx.body = MainCategory.FromDAO(dao);
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }

    public async getAllSubCategories(ctx: IRouterContext) {
        try {
            const subCategories: SubCategoryDAO[] = await this.repository.getSubCategories(ctx.params.id);
            ctx.body = subCategories.forEach(c => SubCategory.FromDAO(c));
        } catch (e) {
            ctx.throw(400, e.message);
        }
    }
}