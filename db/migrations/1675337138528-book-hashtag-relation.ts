import { MigrationInterface, QueryRunner } from "typeorm";

export class bookHashtagRelation1675337138528 implements MigrationInterface {
    name = 'bookHashtagRelation1675337138528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hashtag" DROP CONSTRAINT "FK_4e0a0f2f245f43bad2f4cc15558"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "status" character varying NOT NULL, "registerDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hashtag_books_book" ("hashtagHashtagId" character varying NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_4e3e64336f62710f142a894f370" PRIMARY KEY ("hashtagHashtagId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_01b6ec17592a250bea021bb9cf" ON "hashtag_books_book" ("hashtagHashtagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_76b8673e043e3a55242657c951" ON "hashtag_books_book" ("bookId") `);
        await queryRunner.query(`ALTER TABLE "hashtag" DROP COLUMN "bookIdId"`);
        await queryRunner.query(`ALTER TABLE "hashtag_books_book" ADD CONSTRAINT "FK_01b6ec17592a250bea021bb9cfe" FOREIGN KEY ("hashtagHashtagId") REFERENCES "hashtag"("hashtagId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hashtag_books_book" ADD CONSTRAINT "FK_76b8673e043e3a55242657c9516" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hashtag_books_book" DROP CONSTRAINT "FK_76b8673e043e3a55242657c9516"`);
        await queryRunner.query(`ALTER TABLE "hashtag_books_book" DROP CONSTRAINT "FK_01b6ec17592a250bea021bb9cfe"`);
        await queryRunner.query(`ALTER TABLE "hashtag" ADD "bookIdId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_76b8673e043e3a55242657c951"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01b6ec17592a250bea021bb9cf"`);
        await queryRunner.query(`DROP TABLE "hashtag_books_book"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "hashtag" ADD CONSTRAINT "FK_4e0a0f2f245f43bad2f4cc15558" FOREIGN KEY ("bookIdId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
