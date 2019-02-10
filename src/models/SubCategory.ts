import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "expense_sub_category"})
export default class SubCategoryDAO {
    
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    @Column()
    private description: string;

    @Column({name: "maincategoryid"})
    private main_category_id: number;

    public get $id(): number {
        return this.id;
    }

    public set $id(value: number) {
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

    public get $main_category_id(): number {
        return this.main_category_id;
    }

    public set $main_category_id(value: number) {
        this.main_category_id = value;
    }

    public static newMainCategory(obj: {id?: number, name?: string, description?: string, main_category_id?: number}) {
        const subCategory = new SubCategoryDAO();
        
        if (obj.id) subCategory.id = obj.id;
        if (obj.name) subCategory.name = obj.name;
        if (obj.description) subCategory.description = obj.description;
        if (obj.main_category_id) subCategory.main_category_id = obj.main_category_id;

        return subCategory;
    }
}