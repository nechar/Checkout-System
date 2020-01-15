export interface Item {
  sku: string;
  name: string;
  price: number;
  offerCode: "3for2" | "bulk-discount" | "freeVGAAdapter" | null;
  quantity?: number;
}
