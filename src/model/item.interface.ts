export enum ItemSKU {
  ipd,
  mbp,
  atv,
  vga
}

/**
 * Why do I prefer using `type` over `enum`?
 * Because, type has all the benefits, auto-complete and typechecking of `enum` plus the following:
 * 1. no need to export and import enums
 * 2. the code looks much readable
 * 3. the code looks much cleaner
 *
 * Which means, if I had used
 * type ItemSKU = "ipd" | "mbp" | "atv" | "vga";
 * then, i could have used
 * cart.scan('ipd') instead of cart.scan(ItemSKU.ipd), not to mention that I need to import ItemSKU
 */
type offerCode = "3for2" | "bulk-discount" | "freeItem" | null;

export interface Item {
  sku: ItemSKU;
  name: string;
  price: number;
  offerCode: offerCode;
  quantity?: number;
  discountPrice?: number;
  freeItemSKU?: ItemSKU;
}
