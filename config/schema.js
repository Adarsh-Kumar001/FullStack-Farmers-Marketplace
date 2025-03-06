
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const ItemListing = pgTable('itemListing',{
    id:serial('id').primaryKey(),
    productName:varchar('productName').notNull(),
    description:varchar('description'),
    sellingPrice:varchar('sellingPrice').notNull(),
    category:varchar('category').notNull(),
    condition:varchar('condition').notNull(),



})