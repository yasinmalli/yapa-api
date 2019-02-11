import { getManager } from 'typeorm';
import { MainCategoryDAO } from '../models/MainCategory';
import { SubCategoryDAO } from '../models/SubCategory';
import { ExpenseDAO } from '../models/Expense';

export default abstract class IRepository {

    protected getMainCategoryRepository() {
        return getManager().getRepository(MainCategoryDAO);
    }

    protected getSubCategoryRepository() {
        return getManager().getRepository(SubCategoryDAO);
    }

    protected getExpenseRepository() {
        return getManager().getRepository(ExpenseDAO);
    }
}