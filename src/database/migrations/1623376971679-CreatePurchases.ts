import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePurchases1623376971679 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "purchases",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "costumer_id",
                        type: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "price",
                        type: "number",
                        isNullable: false,
                    },
                    {
                        name: "multiple",
                        type: "number",
                        isNullable: true,
                    },
                    {
                        name: "imageSrc",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKCostumer',
                        referencedTableName: 'costumers',
                        referencedColumnNames: ['id'],
                        columnNames: ['costumer_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('purchases');
    }

}
