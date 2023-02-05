import { MigrationInterface, QueryRunner } from "typeorm";

export class phraseUserBookRelation1675582648377 implements MigrationInterface {
    name = 'phraseUserBookRelation1675582648377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phrase" DROP CONSTRAINT "FK_9e10be142b185dac9bc8265bda0"`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP CONSTRAINT "FK_6a50a08862fd24540c787c86338"`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP CONSTRAINT "UQ_9e10be142b185dac9bc8265bda0"`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP COLUMN "bookIdId"`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP CONSTRAINT "UQ_6a50a08862fd24540c787c86338"`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD "bookId" integer`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD CONSTRAINT "UQ_1fa0bfcc8a3ed666df92f17a0d7" UNIQUE ("bookId")`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD CONSTRAINT "UQ_7f09824c359bfae828f4f9b90c5" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD CONSTRAINT "FK_1fa0bfcc8a3ed666df92f17a0d7" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD CONSTRAINT "FK_7f09824c359bfae828f4f9b90c5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phrase" DROP CONSTRAINT "FK_7f09824c359bfae828f4f9b90c5"`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP CONSTRAINT "FK_1fa0bfcc8a3ed666df92f17a0d7"`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP CONSTRAINT "UQ_7f09824c359bfae828f4f9b90c5"`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP CONSTRAINT "UQ_1fa0bfcc8a3ed666df92f17a0d7"`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP COLUMN "bookId"`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD CONSTRAINT "UQ_6a50a08862fd24540c787c86338" UNIQUE ("userIdId")`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD "bookIdId" integer`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD CONSTRAINT "UQ_9e10be142b185dac9bc8265bda0" UNIQUE ("bookIdId")`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD CONSTRAINT "FK_6a50a08862fd24540c787c86338" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD CONSTRAINT "FK_9e10be142b185dac9bc8265bda0" FOREIGN KEY ("bookIdId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
