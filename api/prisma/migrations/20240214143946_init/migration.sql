-- CreateTable
CREATE TABLE "wallet" (
    "address" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "updatedTime" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "latestTx" TEXT NOT NULL,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "transaction" (
    "txHash" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "contract" TEXT NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("txHash")
);
