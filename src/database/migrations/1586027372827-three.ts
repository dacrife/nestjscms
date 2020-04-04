import {MigrationInterface, QueryRunner} from "typeorm";

export class three1586027372827 implements MigrationInterface {
    name = 'three1586027372827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "usarname" TO "username"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_59196ae18215db4911fc36f4395" TO "UQ_fe0bb3f6520ee0469504521e710"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" TO "UQ_59196ae18215db4911fc36f4395"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "username" TO "usarname"`, undefined);
    }

}
