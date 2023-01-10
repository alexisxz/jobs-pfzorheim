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
    CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("companyId", "field", "id", "location", "postedDate", "role", "shortDescription", "startingDate", "status", "title", "workingTime") SELECT "companyId", "field", "id", "location", "postedDate", "role", "shortDescription", "startingDate", "status", "title", "workingTime" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
