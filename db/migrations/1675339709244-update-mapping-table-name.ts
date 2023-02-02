import { MigrationInterface, QueryRunner } from "typeorm";

export class updateMappingTableName1675339709244 implements MigrationInterface {
    name = 'updateMappingTableName1675339709244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hashtag_book" ("hashtagId" character varying NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_295f194d528e634e92ed7872c0b" PRIMARY KEY ("hashtagId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_991138c353df56146a1ed0026e" ON "hashtag_book" ("hashtagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c3dd010651cb49471640738a3" ON "hashtag_book" ("bookId") `);
        await queryRunner.query(`ALTER TABLE "hashtag_book" ADD CONSTRAINT "FK_991138c353df56146a1ed0026e3" FOREIGN KEY ("hashtagId") REFERENCES "hashtag"("hashtagId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hashtag_book" ADD CONSTRAINT "FK_2c3dd010651cb49471640738a3f" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hashtag_book" DROP CONSTRAINT "FK_2c3dd010651cb49471640738a3f"`);
        await queryRunner.query(`ALTER TABLE "hashtag_book" DROP CONSTRAINT "FK_991138c353df56146a1ed0026e3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c3dd010651cb49471640738a3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_991138c353df56146a1ed0026e"`);
        await queryRunner.query(`DROP TABLE "hashtag_book"`);
    }

}
