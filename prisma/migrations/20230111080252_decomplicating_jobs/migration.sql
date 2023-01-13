/*
  Warnings:

  - You are about to drop the `Benefit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `benefits` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tasks` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Benefit";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Profile";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Task";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT,
    "companyId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "location" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "postedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startingDate" DATETIME,
    "workingTime" TEXT NOT NULL,
    "tasks" TEXT NOT NULL,
    "benefits" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("companyId", "field", "id", "location", "postedDate", "role", "shortDescription", "startingDate", "status", "title", "workingTime") SELECT "companyId", "field", "id", "location", "postedDate", "role", "shortDescription", "startingDate", "status", "title", "workingTime" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
