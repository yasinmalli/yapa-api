import IRepository from "./IRepository";
import MainCategoryDAO from '../models/MainCategory';
import SubCategoryDAO from '../models/SubCategory';

export default class MainCategoryRepository extends IRepository {

    public async getAll(): Promise<MainCategoryDAO[]> {
        return this.getMainCategoryRepository().find();
    }

    public async create(dao: MainCategoryDAO): Promise<MainCategoryDAO> {
        return this.getMainCategoryRepository().save(dao);
    }

    public async getSubCategories(main_category_id: number): Promise<SubCategoryDAO[]> {
        return this.getSubCategoryRepository()
                    .find({ 
                        where: { main_category_id: main_category_id },
                        // order: { name: "ASC" }
                    });
    }
}