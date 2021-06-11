import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Purchase } from "./Purchase";

@Entity("purchased_product")
class PurchasedProduct {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    product_id: string;

    @ManyToOne(() => Purchase, purchase => purchase.products)
    purchase_id: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    profitability: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { PurchasedProduct }