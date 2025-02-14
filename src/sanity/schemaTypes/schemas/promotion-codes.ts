import { defineField, defineType } from "sanity";

export const promotionCodes = defineType({
  name: "promotionCodes",
  title: "Promotion Codes",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Code",
      type: "string",
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "number",
    }),
    defineField({
      name: "expirationDate",
      title: "Expiration Date",
      type: "date",
    }),
  ],
});
