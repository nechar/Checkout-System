export enum ItemSKU {
  ipd,
  mbp,
  atv,
  vga
}
export interface Item {
  sku: ItemSKU;
  name: string;
  price: number;
  offerCode: "3for2" | "bulk-discount" | "freeItem" | null;
  quantity?: number;
  discountPrice?: number;
  freeItemSKU?: ItemSKU;
}
