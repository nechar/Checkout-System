type OfferCode = "3for2" | "bulk-discount" | "freeItem" | null;
export type ItemSKU = "ipd" | "mbp" | "freeItem" | "atv" | "vga";

export interface iItem {
  sku: ItemSKU;
  name: string;
  price: number;
  offerCode: OfferCode;
  quantity?: number;
  discountPrice?: number;
  freeItemSKU?: ItemSKU;
}
