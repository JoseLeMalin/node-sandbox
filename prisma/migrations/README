// npx prisma generate creates the prisma folder including the schema.prisma
npx prisma generate

// If the DB is empty => Fill the data model/schema in schema.prisma
// Run: npx prisma db push to create tables in the DB matching the schema
npx prisma db push

// MIGRATIONS
https://www.prisma.io/docs/orm/prisma-migrate/getting-started

// If the DB already exists and has tables prisma db pull makes sure that your Prisma schema is up-to-date
prisma db pull

// To create a baseline migration:
mkdir -p prisma/migrations/0_init

// Create an initial SQL file which contains all the code to recreate the DB
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
