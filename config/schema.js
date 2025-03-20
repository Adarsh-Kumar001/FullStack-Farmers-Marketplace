
import { integer } from "drizzle-orm/gel-core";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const ItemListing = pgTable('itemListing',{
    id:serial('id').primaryKey(),
    productName:varchar('productName').notNull(),
    description:varchar('description'),
    sellingPrice:varchar('sellingPrice').notNull(),
    category:varchar('category').notNull(),
    condition:varchar('condition').notNull(),
    postedBy:varchar('postedBy').notNull(),
    postedDate:varchar('postedDate').notNull(),
})

export const ItemImages = pgTable('itemImages',{
    id:serial('id').primaryKey(),
    imageUrl:varchar('ImageUrl').notNull(),
    ItemListingId:integer('ItemListingId').notNull().references(()=>ItemListing.id)
})