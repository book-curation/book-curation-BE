import { MigrationInterface, QueryRunner } from "typeorm";

export class newSchema1675586666523 implements MigrationInterface {
    name = 'newSchema1675586666523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "status" character varying NOT NULL, "registerAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "phrase" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL, "bookId" integer, "userId" uuid, CONSTRAINT "PK_c62abf17177643294ade6f1a42b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "isbn" character varying NOT NULL, "title" character varying NOT NULL, "subject" character varying NOT NULL, "publisher" character varying NOT NULL, "author" character varying NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "curation" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "isPublic" boolean NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" uuid, CONSTRAINT "PK_de0e4d1c645b4bc2e9a26b9a3f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hashtag" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_cb36eb8af8412bfa978f1165d78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "curation_booklist" ("curationId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_98a1d580b1b1b691eda1feabc25" PRIMARY KEY ("curationId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_907f2cbe6e177e2132e134aa84" ON "curation_booklist" ("curationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_74ee15140312dbab519408ee03" ON "curation_booklist" ("bookId") `);
        await queryRunner.query(`CREATE TABLE "hashtag_book" ("hashtagId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_295f194d528e634e92ed7872c0b" PRIMARY KEY ("hashtagId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_991138c353df56146a1ed0026e" ON "hashtag_book" ("hashtagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c3dd010651cb49471640738a3" ON "hashtag_book" ("bookId") `);
        await queryRunner.query(`CREATE TABLE "hashtag_user" ("hashtagId" integer NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_9a9edf82fe8d3becd1e15e8cf7b" PRIMARY KEY ("hashtagId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8d18b8400abf3d1c33e5740056" ON "hashtag_user" ("hashtagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_47d2b385f4ef8bdde6a949c3ac" ON "hashtag_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "phrase" ADD CONSTRAINT "FK_1fa0bfcc8a3ed666df92f17a0d7" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phrase" ADD CONSTRAINT "FK_7f09824c359bfae828f4f9b90c5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "curation" ADD CONSTRAINT "FK_2d96271c65f68abee85b67a850a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "curation_booklist" ADD CONSTRAINT "FK_907f2cbe6e177e2132e134aa84a" FOREIGN KEY ("curationId") REFERENCES "curation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "curation_booklist" ADD CONSTRAINT "FK_74ee15140312dbab519408ee031" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hashtag_book" ADD CONSTRAINT "FK_991138c353df56146a1ed0026e3" FOREIGN KEY ("hashtagId") REFERENCES "hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hashtag_book" ADD CONSTRAINT "FK_2c3dd010651cb49471640738a3f" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hashtag_user" ADD CONSTRAINT "FK_8d18b8400abf3d1c33e5740056c" FOREIGN KEY ("hashtagId") REFERENCES "hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hashtag_user" ADD CONSTRAINT "FK_47d2b385f4ef8bdde6a949c3acc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hashtag_user" DROP CONSTRAINT "FK_47d2b385f4ef8bdde6a949c3acc"`);
        await queryRunner.query(`ALTER TABLE "hashtag_user" DROP CONSTRAINT "FK_8d18b8400abf3d1c33e5740056c"`);
        await queryRunner.query(`ALTER TABLE "hashtag_book" DROP CONSTRAINT "FK_2c3dd010651cb49471640738a3f"`);
        await queryRunner.query(`ALTER TABLE "hashtag_book" DROP CONSTRAINT "FK_991138c353df56146a1ed0026e3"`);
        await queryRunner.query(`ALTER TABLE "curation_booklist" DROP CONSTRAINT "FK_74ee15140312dbab519408ee031"`);
        await queryRunner.query(`ALTER TABLE "curation_booklist" DROP CONSTRAINT "FK_907f2cbe6e177e2132e134aa84a"`);
        await queryRunner.query(`ALTER TABLE "curation" DROP CONSTRAINT "FK_2d96271c65f68abee85b67a850a"`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP CONSTRAINT "FK_7f09824c359bfae828f4f9b90c5"`);
        await queryRunner.query(`ALTER TABLE "phrase" DROP CONSTRAINT "FK_1fa0bfcc8a3ed666df92f17a0d7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_47d2b385f4ef8bdde6a949c3ac"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8d18b8400abf3d1c33e5740056"`);
        await queryRunner.query(`DROP TABLE "hashtag_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c3dd010651cb49471640738a3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_991138c353df56146a1ed0026e"`);
        await queryRunner.query(`DROP TABLE "hashtag_book"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_74ee15140312dbab519408ee03"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_907f2cbe6e177e2132e134aa84"`);
        await queryRunner.query(`DROP TABLE "curation_booklist"`);
        await queryRunner.query(`DROP TABLE "hashtag"`);
        await queryRunner.query(`DROP TABLE "curation"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "phrase"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
