import {MigrationInterface, QueryRunner} from "typeorm";

export class Banner1717889696932 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "banner_item" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "start" datetime NOT NULL, "end" datetime, "link" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "assetId" integer, "mobileId" integer, "bannerId" integer)`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e2d9d9feadbfd6f4e348fe1220" ON "banner_item" ("bannerId") `, undefined);
        await queryRunner.query(`CREATE TABLE "banner" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "slug" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, CONSTRAINT "UQ_5e888b030b21515eb2aecb3a00d" UNIQUE ("slug"))`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e2d9d9feadbfd6f4e348fe1220"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_banner_item" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "start" datetime NOT NULL, "end" datetime, "link" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "assetId" integer, "mobileId" integer, "bannerId" integer, CONSTRAINT "FK_daf20aba251c246fb02fe2a52dc" FOREIGN KEY ("assetId") REFERENCES "asset" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cd55c4d470a2be0dc1cdeb55d37" FOREIGN KEY ("mobileId") REFERENCES "asset" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_e2d9d9feadbfd6f4e348fe1220f" FOREIGN KEY ("bannerId") REFERENCES "banner" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_banner_item"("createdAt", "updatedAt", "start", "end", "link", "id", "assetId", "mobileId", "bannerId") SELECT "createdAt", "updatedAt", "start", "end", "link", "id", "assetId", "mobileId", "bannerId" FROM "banner_item"`, undefined);
        await queryRunner.query(`DROP TABLE "banner_item"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_banner_item" RENAME TO "banner_item"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e2d9d9feadbfd6f4e348fe1220" ON "banner_item" ("bannerId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_e2d9d9feadbfd6f4e348fe1220"`, undefined);
        await queryRunner.query(`ALTER TABLE "banner_item" RENAME TO "temporary_banner_item"`, undefined);
        await queryRunner.query(`CREATE TABLE "banner_item" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "start" datetime NOT NULL, "end" datetime, "link" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "assetId" integer, "mobileId" integer, "bannerId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "banner_item"("createdAt", "updatedAt", "start", "end", "link", "id", "assetId", "mobileId", "bannerId") SELECT "createdAt", "updatedAt", "start", "end", "link", "id", "assetId", "mobileId", "bannerId" FROM "temporary_banner_item"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_banner_item"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e2d9d9feadbfd6f4e348fe1220" ON "banner_item" ("bannerId") `, undefined);
        await queryRunner.query(`DROP TABLE "banner"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e2d9d9feadbfd6f4e348fe1220"`, undefined);
        await queryRunner.query(`DROP TABLE "banner_item"`, undefined);
   }

}
