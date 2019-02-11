import IRepository from "./IRepository";
import { ExpenseDAO } from "../models/Expense";

export default class ExpenseRepository extends IRepository {

    public async getAll(): Promise<ExpenseDAO[]> {
        return this.getExpenseRepository().find();
    }

    public async create(dao: ExpenseDAO): Promise<ExpenseDAO> {
        return this.getExpenseRepository().save(dao);
    }
}