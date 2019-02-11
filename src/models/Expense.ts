import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    Index,
    ManyToOne,
    JoinColumn
} from "typeorm";
import MainCategoryDAO from './MainCategory';
import SubCategoryDAO from './SubCategory';
import { Guid } from 'guid-typescript';
import {JsonObject, JsonProperty} from 'json2typescript';

export enum ExpenseType {
    single = "single",
    reoccuringMonthly = "reoccuringMonthly",
    reoccuringYearly = "reoccuringYearly"
}

@JsonObject("Expense")
@Entity({name: "expenses"})
export default class ExpenseDAO {
    @PrimaryGeneratedColumn({name: "id"})
    @Index({ unique: true })
    @JsonProperty("Id", String, false)
    private _id: bigint;
    get Id() { return this._id; }
    set Id(value) { this._id = value }

    @Column({ type: "uuid", name: "expenseid", nullable: false })
    private _expenseId: Guid;
    get ExpenseId() { return this._expenseId; }
    set ExpenseId(value) { this._expenseId = value }

    @Column({ type: "double precision", name: "price"})
    private _price: number;
    get Price() { return this._price; }
    set Price(value) { this._price = value }

    @Column({ name: "time" })
    private _time: Date;
    get Time() { return this._time; }
    set Time(value) { this._time = value }

    @Column({ name: "createdon"})
    private _createdOn: Date;
    get CreatedOn() { return this._createdOn; }
    set CreatedOn(value) { this._createdOn = value }

    @Column({ name: "spentat"})
    private _spentAt: string;
    get SpentAt() { return this._spentAt; }
    set SpentAt(value) { this._spentAt = value }

    @Column({ type: "varchar", name: "description", length: 4000, nullable: true })
    private _description: string;
    get Description() { return this._description; }
    set Description(value) { this._description = value }

    @Column({ type: "enum", enum: ExpenseType, default: ExpenseType.single, name: "expensetype" })
    private _expenseType: ExpenseType
    get ExpenseType() { return this._expenseType; }
    set ExpenseType(value) { this._expenseType = value }

    @Column({name: "maincategoryid"})
    private _mainCategoryId: bigint;
    get MainCategoryId() { return this._mainCategoryId; }
    set MainCategoryId(value) { this._mainCategoryId = value }

    @Column({name: "subcategoryid"})
    private _subCategoryId: bigint;
    get SubCategoryId() { return this._subCategoryId; }
    set SubCategoryId(value) { this._subCategoryId = value }

    @ManyToOne(type => MainCategoryDAO, mainCategory => mainCategory.expenses)
    @JoinColumn({name: "maincategoryid", referencedColumnName: "id"})
    public mainCategory: MainCategoryDAO;

    @ManyToOne(type => SubCategoryDAO, subCategory => subCategory.expenses)
    @JoinColumn({name: "subcategoryid", referencedColumnName: "id"})
    public subCategory: SubCategoryDAO;
}