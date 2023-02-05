import { MigrationInterface, QueryRunner } from "typeorm";

export class userHashtagRelation1675337977342 implements MigrationInterface {
    name = 'userHashtagRelation1675337977342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hashtag_user" ("hashtagId" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_9a9edf82fe8d3becd1e15e8cf7b" PRIMARY KEY ("hashtagId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8d18b8400abf3d1c33e5740056" ON "hashtag_user" ("hashtagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_47d2b385f4ef8bdde6a949c3ac" ON "hashtag_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "hashtag_user" ADD CONSTRAINT "FK_8d18b8400abf3d1c33e5740056c" FOREIGN KEY ("hashtagId") REFERENCES "hashtag"("hashtagId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "hashtag_user" ADD CONSTRAINT "FK_47d2b385f4ef8bdde6a949c3acc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hashtag_user" DROP CONSTRAINT "FK_47d2b385f4ef8bdde6a949c3acc"`);
        await queryRunner.query(`ALTER TABLE "hashtag_user" DROP CONSTRAINT "FK_8d18b8400abf3d1c33e5740056c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_47d2b385f4ef8bdde6a949c3ac"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8d18b8400abf3d1c33e5740056"`);
        await queryRunner.query(`DROP TABLE "hashtag_user"`);
    }

}
