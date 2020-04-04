import {MigrationInterface, QueryRunner} from "typeorm";

export class fixDetail1586029496989 implements MigrationInterface {
    name = 'fixDetail1586029496989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "name" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "lastname" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "created_at" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "updated_at" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "updated_at" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "created_at" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "lastname" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "name" SET NOT NULL`, undefined);
    }

}
