import { getManager } from 'typeorm';
import MainCategory from '../models/MainCategory';
import SubCategory from '../models/SubCategory';
import Expense from '../models/Expense';

export default abstract class IRepository {

    protected getMainCategoryRepository() {
        return getManager().getRepository(MainCategory);
    }

    protected getSubCategoryRepository() {
        return getManager().getRepository(SubCategory);
    }

    protected getExpenseRepository() {
        return getManager().getRepository(Expense);
    }
}