-- CreateTable
CREATE TABLE "Challenges" (
    "challenge" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Challenges_pkey" PRIMARY KEY ("challenge")
);

-- CreateTable
CREATE TABLE "Users" (
    "username" TEXT NOT NULL,
    "credential_id" TEXT NOT NULL,
    "public_key" TEXT NOT NULL,
    "algorithm" TEXT NOT NULL,
    "wallet_address" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_credential_id_key" ON "Users"("credential_id");
