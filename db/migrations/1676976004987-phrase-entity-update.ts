import { MigrationInterface, QueryRunner } from "typeorm";

export class phraseEntityUpdate1676976004987 implements MigrationInterface {
    name = 'phraseEntityUpdate1676976004987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phrase" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phrase" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

}
