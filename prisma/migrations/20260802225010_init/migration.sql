/*
  Warnings:

  - You are about to drop the column `nationality` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Workspace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkspaceUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserToWorkspace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "_UserToWorkspace" DROP CONSTRAINT "_UserToWorkspace_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToWorkspace" DROP CONSTRAINT "_UserToWorkspace_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "nationality";

-- DropTable
DROP TABLE "Workspace";

-- DropTable
DROP TABLE "WorkspaceUsers";

-- DropTable
DROP TABLE "_UserToWorkspace";

-- DropEnum
DROP TYPE "Roles";
