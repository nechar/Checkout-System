export interface Item {
  sku: string;
  name: string;
  price: number;
  offerCode: "3for2" | "bulk-discount" | "freeItem" | null;
  quantity?: number;
  discountPrice?: number;
  freeItemSKU?: string;
}
