import { iItem, ItemSKU } from "../model/item.interface";

export const sampleItems: iItem[] = [
  {
    sku: ItemSKU.ipd,
    name: "Super iPad",
    price: 549.99,
    offerCode: "bulk-discount",
    discountPrice: 499.99
  },
  {
    sku: ItemSKU.mbp,
    name: "MacBook Pro",
    price: 1399.99,
    offerCode: "freeItem",
    freeItemSKU: ItemSKU.vga
  },
  {
    sku: ItemSKU.atv,
    name: "Apple TV",
    price: 109.5,
    offerCode: "3for2"
  },
  {
    sku: ItemSKU.vga,
    name: "VGA adapter",
    price: 30.0,
    offerCode: null
  }
];
