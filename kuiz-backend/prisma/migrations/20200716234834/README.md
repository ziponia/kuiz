# Migration `20200716234834`

This migration has been generated by ziponia at 7/16/2020, 11:48:34 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."tbl_user" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"id" text  NOT NULL ,
"userName" text  NOT NULL ,
    PRIMARY KEY ("id"))
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200716234834
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,16 @@
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id        String   @default(uuid()) @id
+  userName  String
+  createdAt DateTime @default(now())
+
+  @@map("tbl_user")
+}
```

