import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "expense_main_category"})
export default class MainCategoryDAO {
    
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    @Column()
    private description: string;

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

    public static newMainCategory(obj: {id?: number, name?: string, description?: string}) {
        const mainCategory = new MainCategoryDAO();
        
        if (obj.id) mainCategory.id = obj.id;
        if (obj.name) mainCategory.name = obj.name;
        if (obj.description) mainCategory.description = obj.description;

        return mainCategory;
    }
}