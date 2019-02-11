import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Index, JoinColumn} from "typeorm";
import MainCategoryDAO from './MainCategory';
import ExpenseDAO from './Expense';

@Entity({name: "expense_sub_category"})
@Index(["id", "main_category_id"], { unique: true })
export default class SubCategoryDAO {
    
    @PrimaryGeneratedColumn()
    @Index({ unique: true })
    private id: bigint;

    @Column({ type: "varchar", length: 400, nullable: false })
    private name: string;

    @Column({ type: "varchar", length: 4000, nullable: true })
    private description: string;

    @Column({name: "maincategoryid"})
    private main_category_id: bigint;

    @ManyToOne(type => MainCategoryDAO, mainCategory => mainCategory.subCategories)
    @JoinColumn({name: "maincategoryid", referencedColumnName: "id"})
    public mainCategory: MainCategoryDAO;

    @OneToMany(type => ExpenseDAO, expense => expense.subCategory)
    public expenses: ExpenseDAO[]

    public get $id(): bigint {
        return this.id;
    }

    public set $id(value: bigint) {
        this.id = value;
    }

    public get $name(): string {
        return this.name;
    }

    public set $name(value: string) {
        this.name = value;
    }

    public get $description(): string {
        return this.description;
    }

    public set $description(value: string) {
        this.description = value;
    }

    public get $main_category_id(): bigint {
        return this.main_category_id;
    }

    public set $main_category_id(value: bigint) {
        this.main_category_id = value;
    }

    public static newMainCategory(obj: {id?: bigint, name?: string, description?: string, main_category_id?: bigint}) {
        const subCategory = new SubCategoryDAO();
        
        if (obj.id) subCategory.id = obj.id;
        if (obj.name) subCategory.name = obj.name;
        if (obj.description) subCategory.description = obj.description;
        if (obj.main_category_id) subCategory.main_category_id = obj.main_category_id;

        return subCategory;
    }
}