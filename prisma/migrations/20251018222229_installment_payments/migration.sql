-- AlterEnum
ALTER TYPE "EnrollmentStatus" ADD VALUE 'PARTIALLY_PAID';

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "agreedFeeMinor" INTEGER,
ADD COLUMN     "amountPaidMinor" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "feeCurrency" TEXT DEFAULT 'GHS';

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "isInstallment" BOOLEAN NOT NULL DEFAULT false;
