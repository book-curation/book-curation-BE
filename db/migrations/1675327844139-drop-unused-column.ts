import { MigrationInterface, QueryRunner } from "typeorm";

export class dropUnusedColumn1675327844139 implements MigrationInterface {
    name = 'dropUnusedColumn1675327844139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "publicationDate"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "numberOfPages"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "numberOfPages" integer`);
        await queryRunner.query(`ALTER TABLE "book" ADD "language" character varying`);
        await queryRunner.query(`ALTER TABLE "book" ADD "publicationDate" TIMESTAMP`);
    }

}
