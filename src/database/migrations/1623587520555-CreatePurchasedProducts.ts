import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePurchasedProducts1623587520555 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "purchased_products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "imageSrc",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                    },
                    {
                        name: "purchase_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "quantity",
                        type: "number",
                    },
                    {
                        name: "profitability",
                        type: "varchar",
                    },
                    {
                        name: "price",
                        type: "number",
                    },
                    {
                        name: "originalPrice",
                        type: "number",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKProduct',
                        referencedTableName: 'products',
                        referencedColumnNames: ['id'],
                        columnNames: ['product_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKPurchase',
                        referencedTableName: 'purchases',
                        referencedColumnNames: ['id'],
                        columnNames: ['purchase_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('purchased_products');
    }

}
