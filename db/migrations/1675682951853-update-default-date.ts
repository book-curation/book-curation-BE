import { MigrationInterface, QueryRunner } from "typeorm";

export class updateDefaultDate1675682951853 implements MigrationInterface {
    name = 'updateDefaultDate1675682951853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "registerAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "registerAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "registerAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "registerAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

}
