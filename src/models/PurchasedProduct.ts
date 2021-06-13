import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Product } from "./Product";
import { Purchase } from "./Purchase";

@Entity("purchased_products")
class PurchasedProduct {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    imageSrc: string;

    @Column()
    product_id: string;

    @Column()
    purchase_id: string;

    @ManyToOne(() => Product)
    @JoinColumn({name: "product_id"})
    product: Product;

    @ManyToOne(() => Purchase, purchase => purchase.products)
    @JoinColumn({name: "purchase_id"})
    purchase: Purchase;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    originalPrice: number;

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