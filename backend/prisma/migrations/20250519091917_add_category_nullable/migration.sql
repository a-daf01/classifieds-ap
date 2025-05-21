-- 1) Add category as nullable
ALTER TABLE "Listing" ADD COLUMN "category" TEXT;

-- 2) Backfill existing rows with a default category
--    (e.g. 'services'—pick whatever makes sense for your seed data)
UPDATE "Listing" SET "category" = 'services' WHERE category IS NULL;

-- 3) Now make it non-nullable
ALTER TABLE "Listing" ALTER COLUMN "category" SET NOT NULL;
