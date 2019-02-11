import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    Index,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { MainCategoryDAO } from './MainCategory';
import { SubCategoryDAO } from './SubCategory';
import { Guid } from 'guid-typescript';

export enum ExpenseType {
    single = "single",
    reoccuringMonthly = "reoccuringMonthly",
    reoccuringYearly = "reoccuringYearly"
}

@Entity({name: "expenses"})
export class ExpenseDAO {
    @PrimaryGeneratedColumn()
    @Index({ unique: true })    
    private id: bigint;
    get Id() { return this.id; }
    set Id(value) { this.id = value }

    @Column({ type: "uuid", name: "expenseid", nullable: false })    
    private expense_id: string;
    get ExpenseId() { return this.expense_id; }
    set ExpenseId(value) { this.expense_id = value }

    @Column({ type: "double precision" })
    private price: number;
    get Price() { return this.price; }
    set Price(value) { this.price = value }

    @Column()
    private time: Date;
    get Time() { return this.time; }
    set Time(value) { this.time = value }

    @Column({ name: "createdon"})
    private createdOn: Date;
    get CreatedOn() { return this.createdOn; }
    set CreatedOn(value) { this.createdOn = value }

    @Column({ name: "spentat", nullable: true})
    private spent_at: string;
    get SpentAt() { return this.spent_at; }
    set SpentAt(value) { this.spent_at = value }

    @Column({ type: "varchar", length: 4000, nullable: true })
    private description: string;
    get Description() { return this.description; }
    set Description(value) { this.description = value }

    @Column({ type: "enum", enum: ExpenseType, default: ExpenseType.single, name: "expensetype", nullable: true })
    private expense_type: ExpenseType
    get ExpenseType() { return this.expense_type; }
    set ExpenseType(value) { this.expense_type = value }

    @Column({name: "maincategoryid"})
    private main_category_id: bigint;
    get MainCategoryId() { return this.main_category_id; }
    set MainCategoryId(value) { this.main_category_id = value }

    @Column({name: "subcategoryid"})
    private sub_category_id: bigint;
    get SubCategoryId() { return this.sub_category_id; }
    set SubCategoryId(value) { this.sub_category_id = value }

    @ManyToOne(type => MainCategoryDAO, mainCategory => mainCategory.expenses)
    @JoinColumn({name: "maincategoryid", referencedColumnName: "id"})
    public mainCategory: MainCategoryDAO;

    @ManyToOne(type => SubCategoryDAO, subCategory => subCategory.expenses)
    @JoinColumn({name: "subcategoryid", referencedColumnName: "id"})
    public subCategory: SubCategoryDAO;
}

export class Expense {
    public Id: bigint;
    public ExpenseId: string;
    public Price: number;
    public Time: string;
    public CreatedOn: string;
    public SpentAt: string;
    public Description: string;
    public ExpenseType: ExpenseType;
    public MainCategoryId: bigint;
    public SubCategoryId: bigint;

    public static FromDAO(dao: ExpenseDAO): Expense {
        return {
            Id: dao.Id,
            ExpenseId: dao.ExpenseId,
            Price: dao.Price,
            Time: dao.Time.toISOString(),
            CreatedOn: dao.CreatedOn.toISOString(),
            SpentAt: dao.SpentAt,
            Description: dao.Description,
            ExpenseType: dao.ExpenseType,
            MainCategoryId: dao.MainCategoryId,
            SubCategoryId: dao.SubCategoryId
        };
    }

    public static ToDAO(resource: Expense): ExpenseDAO {
        var now = new Date(Date.now());
        let dao = new ExpenseDAO();

        dao.ExpenseId = Guid.create().toString();
        dao.Price = resource.Price;
        dao.Time = now;
        dao.CreatedOn = (resource.CreatedOn) ? new Date(resource.CreatedOn) : now;
        dao.ExpenseType = (resource.ExpenseType) ? resource.ExpenseType : ExpenseType.single;
        if (resource.Description) dao.Description = resource.Description;
        if (resource.SpentAt) dao.SpentAt = resource.SpentAt;
        if (resource.ExpenseType) dao.ExpenseType = resource.ExpenseType;
        dao.MainCategoryId = resource.MainCategoryId;
        dao.SubCategoryId = resource.SubCategoryId;

        return dao;
    }
}