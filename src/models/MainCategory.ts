import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm";
import { SubCategoryDAO } from './SubCategory';
import { ExpenseDAO } from './Expense'

@Entity({name: "expense_main_category"})
export class MainCategoryDAO {
    
    @PrimaryGeneratedColumn()
    @Index({ unique: true })
    private id: bigint;
    public get Id(): bigint { return this.id; }
    public set Id(value: bigint) { this.id = value; }

    @Column({ type: "varchar", length: 400 })
    private name: string;
    public get Name(): string { return this.name; }
    public set Name(value: string) { this.name = value; }

    @Column({ type: "varchar", length: 4000, nullable: true })
    private description: string;
    public get Description(): string { return this.description; }
    public set Description(value: string) { this.description = value; }

    @OneToMany(type => SubCategoryDAO, subCategory => subCategory.mainCategory)
    public subCategories: SubCategoryDAO[];

    @OneToMany(type => ExpenseDAO, expense => expense.mainCategory)
    public expenses: ExpenseDAO[]
}

export class MainCategory {    
    public Id: bigint;    
    public Name: string;    
    public Description: string;

    public static FromDAO(dao: MainCategoryDAO): MainCategory {
        return {
            Id: dao.Id,
            Name: dao.Name,
            Description: dao.Description
        };
    }

    public static ToDAO(resource: MainCategory): MainCategoryDAO {
        let dao = new MainCategoryDAO();
        
        dao.Name = resource.Name;
        if (resource.Description) dao.Description = resource.Description;
 
        return dao;
    }
}