import { MigrationInterface, QueryRunner } from "typeorm";

export class createTable1675081878928 implements MigrationInterface {
    name = 'createTable1675081878928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phrase" DROP CONSTRAINT "FK_4482189324790df0c343be515e7"`);
        await queryRunner.query(`ALTER TABLE "hashtag" DROP CONSTRAINT "FK_acfca02c1ba702b9e2164d9a76d"`);
        await queryRunner.query(`ALTER TABLE "phrase" RENAME COLUMN "bookIdISBN" TO "bookIdId"`);
        await queryRunner.query(`ALTER TABLE "hashtag" RENAME COLUMN "bookIdISBN" TO "bookIdId"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "PK_7459018069b9c93b1d66ec013a4"`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "PK_16bb342c93afb11e659113f372c" PRIMARY KEY ("ISBN", "id")`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP COLUMN "bookIdId"`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD "bookIdId" integer`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "PK_16bb342c93afb11e659113f372c"`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "hashtag" DROP COLUMN "bookIdId"`);
        await queryRunner.query(`ALTER TABLE "hashtag" ADD "bookIdId" integer`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD CONSTRAINT "FK_9e10be142b185dac9bc8265bda0" FOREIGN KEY ("bookIdId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hashtag" ADD CONSTRAINT "FK_4e0a0f2f245f43bad2f4cc15558" FOREIGN KEY ("bookIdId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hashtag" DROP CONSTRAINT "FK_4e0a0f2f245f43bad2f4cc15558"`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP CONSTRAINT "FK_9e10be142b185dac9bc8265bda0"`);
        await queryRunner.query(`ALTER TABLE "hashtag" DROP COLUMN "bookIdId"`);
        await queryRunner.query(`ALTER TABLE "hashtag" ADD "bookIdId" character varying`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4"`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "PK_16bb342c93afb11e659113f372c" PRIMARY KEY ("ISBN", "id")`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP COLUMN "bookIdId"`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD "bookIdId" character varying`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "PK_16bb342c93afb11e659113f372c"`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "PK_7459018069b9c93b1d66ec013a4" PRIMARY KEY ("ISBN")`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "hashtag" RENAME COLUMN "bookIdId" TO "bookIdISBN"`);
        await queryRunner.query(`ALTER TABLE "phrase" RENAME COLUMN "bookIdId" TO "bookIdISBN"`);
        await queryRunner.query(`ALTER TABLE "hashtag" ADD CONSTRAINT "FK_acfca02c1ba702b9e2164d9a76d" FOREIGN KEY ("bookIdISBN") REFERENCES "book"("ISBN") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD CONSTRAINT "FK_4482189324790df0c343be515e7" FOREIGN KEY ("bookIdISBN") REFERENCES "book"("ISBN") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
