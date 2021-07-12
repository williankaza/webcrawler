import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUrlRelations1626094456727 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "url_relations",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "origin",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "destination",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "quantity",
                    type: "int",
                    default: 1
                }
            ]            
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("url_relations")
    }

}
