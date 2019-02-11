import IRepository from "./IRepository";
import ExpenseDAO from "../models/Expense";

export default class ExpenseRepository extends IRepository {

    public async getAll(): Promise<ExpenseDAO[]> {
        return this.getExpenseRepository().find();
    }

}