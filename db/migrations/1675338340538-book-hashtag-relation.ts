import { MigrationInterface, QueryRunner } from "typeorm";

export class bookHashtagRelation1675338340538 implements MigrationInterface {
    name = 'bookHashtagRelation1675338340538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book_user" ("hashtagId" character varying NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_c6828fea61fa01db57435f92d97" PRIMARY KEY ("hashtagId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d123fb32ed73ffae9212dd0e55" ON "book_user" ("hashtagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8260e34e80466ecd278d90dbee" ON "book_user" ("bookId") `);
        await queryRunner.query(`ALTER TABLE "book_user" ADD CONSTRAINT "FK_d123fb32ed73ffae9212dd0e551" FOREIGN KEY ("hashtagId") REFERENCES "hashtag"("hashtagId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_user" ADD CONSTRAINT "FK_8260e34e80466ecd278d90dbee2" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_user" DROP CONSTRAINT "FK_8260e34e80466ecd278d90dbee2"`);
        await queryRunner.query(`ALTER TABLE "book_user" DROP CONSTRAINT "FK_d123fb32ed73ffae9212dd0e551"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8260e34e80466ecd278d90dbee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d123fb32ed73ffae9212dd0e55"`);
        await queryRunner.query(`DROP TABLE "book_user"`);
    }

}
