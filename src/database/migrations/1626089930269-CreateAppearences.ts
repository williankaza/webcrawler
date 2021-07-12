import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppearences1626089930269 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "appearences",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "url",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "level",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "appearences",
                    type: "varchar",
                    isNullable: false
                }
            ]            
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appearences")
    }

}
