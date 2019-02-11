import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Index, JoinColumn} from "typeorm";
import { MainCategoryDAO } from './MainCategory';
import { ExpenseDAO } from './Expense';

@Entity({name: "expense_sub_category"})
@Index(["id", "main_category_id"], { unique: true })
export class SubCategoryDAO {
    
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

    @Column({name: "maincategoryid"})
    private main_category_id: bigint;
    public get MainCategoryId(): bigint { return this.main_category_id; }
    public set MainCategoryId(value: bigint) { this.main_category_id = value; }

    @ManyToOne(type => MainCategoryDAO, mainCategory => mainCategory.subCategories)
    @JoinColumn({name: "maincategoryid", referencedColumnName: "id"})
    public mainCategory: MainCategoryDAO;

    @OneToMany(type => ExpenseDAO, expense => expense.subCategory)
    public expenses: ExpenseDAO[]    
}

export class SubCategory {
    public Id: bigint;    
    public Name: string;    
    public Description: string;
    public MainCategoryId: bigint;

    public static FromDAO(dao: SubCategoryDAO): SubCategory {
        return {
            Id: dao.Id,
            Name: dao.Name,
            Description: dao.Description,
            MainCategoryId: dao.MainCategoryId
        };
    }

    public static ToDAO(resource: SubCategory): SubCategoryDAO {
        let dao = new SubCategoryDAO();
        
        dao.Name = resource.Name;
        if (resource.Description) dao.Description = resource.Description;
        dao.MainCategoryId = resource.MainCategoryId;
 
        return dao;
    }
}