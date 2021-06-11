import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1623372089522 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
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
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
