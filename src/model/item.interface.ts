/**
 * Why do I prefer using `type` over `enum`?
 * Because, type has all the benefits, auto-complete and typechecking of `enum` plus the following:
 * 1. no need to export and import enums
 * 2. the code looks much readable
 * 3. the code looks much cleaner
 */
type offerCode = "3for2" | "bulk-discount" | "freeItem" | null;
export type ItemSKU = "ipd" | "mbp" | "freeItem" | "atv" | "vga";

export interface iItem {
  sku: ItemSKU;
  name: string;
  price: number;
  offerCode: offerCode;
  quantity?: number;
  discountPrice?: number;
  freeItemSKU?: ItemSKU;
}
