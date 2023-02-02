import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksModule } from "./books/books.module";
import { dataSoureOptions } from "../db/data-source";

@Module({
  imports: [TypeOrmModule.forRoot(dataSoureOptions), BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
