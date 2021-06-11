import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Costumer } from "./Costumer";
import { PurchasedProduct } from "./PurchasedProduct";

@Entity("purchases")
class Purchase {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @ManyToOne(() => Costumer )
    @JoinColumn({name: "costumer_id"})
    costumer: Costumer;

    @OneToMany(() => PurchasedProduct, purchasedProduct => purchasedProduct.purchase_id)
    products: PurchasedProduct[];

    @Column()
    profitability: string;

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

export { Purchase }