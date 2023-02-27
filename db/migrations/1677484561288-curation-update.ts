import { MigrationInterface, QueryRunner } from "typeorm";

export class curationUpdate1677484561288 implements MigrationInterface {
    name = 'curationUpdate1677484561288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hashtag_book" DROP CONSTRAINT "FK_2c3dd010651cb49471640738a3f"`);
        await queryRunner.query(`ALTER TABLE "hashtag_user" DROP CONSTRAINT "FK_47d2b385f4ef8bdde6a949c3acc"`);
        await queryRunner.query(`ALTER TABLE "curation" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "curation" ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "hashtag_book" ADD CONSTRAINT "FK_2c3dd010651cb49471640738a3f" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hashtag_user" ADD CONSTRAINT "FK_47d2b385f4ef8bdde6a949c3acc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hashtag_user" DROP CONSTRAINT "FK_47d2b385f4ef8bdde6a949c3acc"`);
        await queryRunner.query(`ALTER TABLE "hashtag_book" DROP CONSTRAINT "FK_2c3dd010651cb49471640738a3f"`);
        await queryRunner.query(`ALTER TABLE "curation" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "curation" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hashtag_user" ADD CONSTRAINT "FK_47d2b385f4ef8bdde6a949c3acc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hashtag_book" ADD CONSTRAINT "FK_2c3dd010651cb49471640738a3f" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
