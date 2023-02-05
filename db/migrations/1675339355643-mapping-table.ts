import { MigrationInterface, QueryRunner } from "typeorm";

export class mappingTable1675339355643 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("hashtag_books_book");
  }
}
