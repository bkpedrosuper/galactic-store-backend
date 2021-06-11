import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity("products")
class Product {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    imageSrc: string;

    @Column()
    multiple: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { Product }