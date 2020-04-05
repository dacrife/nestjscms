import {MigrationInterface, QueryRunner} from "typeorm";

export class bookEntityAdded1586123082417 implements MigrationInterface {
    name = 'bookEntityAdded1586123082417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(500) NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_books" ("usersId" integer NOT NULL, "booksId" integer NOT NULL, CONSTRAINT "PK_961956f2dfd99f08f8053cf4950" PRIMARY KEY ("usersId", "booksId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e8384931aac8ac91dda9d1f83c" ON "user_books" ("usersId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_feb9d8083aefec5c5cc9208263" ON "user_books" ("booksId") `, undefined);
        await queryRunner.query(`ALTER TABLE "user_books" ADD CONSTRAINT "FK_e8384931aac8ac91dda9d1f83c8" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_books" ADD CONSTRAINT "FK_feb9d8083aefec5c5cc9208263c" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_books" DROP CONSTRAINT "FK_feb9d8083aefec5c5cc9208263c"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_books" DROP CONSTRAINT "FK_e8384931aac8ac91dda9d1f83c8"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_feb9d8083aefec5c5cc9208263"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e8384931aac8ac91dda9d1f83c"`, undefined);
        await queryRunner.query(`DROP TABLE "user_books"`, undefined);
        await queryRunner.query(`DROP TABLE "books"`, undefined);
    }

}
