import { getManager } from 'typeorm';
import MainCategory from '../models/MainCategory';
import SubCategory from '../models/SubCategory';

export default abstract class IRepository {

    protected getMainCategoryRepository() {
        return getManager().getRepository(MainCategory);
    }

    protected getSubCategoryRepository() {
        return getManager().getRepository(SubCategory);
    }
}