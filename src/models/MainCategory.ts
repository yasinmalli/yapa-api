import {Entity, PrimaryGeneratedColumn, Column, Index, OneToMany} from "typeorm";
import SubCategoryDAO from './SubCategory';
import ExpenseDAO from './Expense'

@Entity({name: "expense_main_category"})
export default class MainCategoryDAO {
    
    @PrimaryGeneratedColumn()
    @Index({ unique: true })
    private id: bigint;

    @Column({ type: "varchar", length: 400, nullable: false })
    private name: string;

    @Column({ type: "varchar", length: 4000, nullable: true })
    private description: string;

    @OneToMany(type => SubCategoryDAO, subCategory => subCategory.mainCategory)
    public subCategories: SubCategoryDAO[];

    @OneToMany(type => ExpenseDAO, expense => expense.mainCategory)
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

    public static newMainCategory(obj: {id?: bigint, name?: string, description?: string}) {
        const mainCategory = new MainCategoryDAO();
        
        if (obj.id) mainCategory.id = obj.id;
        if (obj.name) mainCategory.name = obj.name;
        if (obj.description) mainCategory.description = obj.description;

        return mainCategory;
    }
}