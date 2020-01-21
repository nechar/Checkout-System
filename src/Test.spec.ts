import { CartService } from "./Checkout";
import { ItemSKU } from "./data/item.interface";

test("should be able to scan an existing item- Eg: Super iPad", () => {
  const cartService = new CartService();
  expect(cartService.scan(ItemSKU.ipd)).toBeTruthy();
});

test("should be able to scan multiple items", () => {
  const cartService = new CartService();
  cartService.scan(ItemSKU.ipd);
  expect(cartService.scan(ItemSKU.ipd)).toBeTruthy();
});

test("when an item is added into the cart, the total should be greater than zero", () => {
  const cartService = new CartService();
  cartService.scan(ItemSKU.ipd);
  const total = cartService.getTotal();
  expect(total).toBeGreaterThan(0);
});

test("should NOT be able checkout without adding an item", () => {
  const cartService = new CartService();
  expect(cartService.checkout()).toBeFalsy();
});

test("should be able checkout after adding at least one item", () => {
  const cartService = new CartService();
  cartService.scan(ItemSKU.ipd);
  expect(cartService.checkout()).toBeTruthy();
});

test("should be able checkout after adding at multiple item", () => {
  const cartService = new CartService();
  cartService.scan(ItemSKU.ipd);
  cartService.scan(ItemSKU.ipd);
  expect(cartService.checkout()).toBeTruthy();
});

test("Scanning Super iPad should cost 1099.98", () => {
  const cartService = new CartService();
  cartService.scan(ItemSKU.ipd);
  cartService.scan(ItemSKU.ipd);
  const item = cartService.findItem(ItemSKU.ipd);
  const total = cartService.getTotal();
  expect(total).toBe(item.price * 2); // $1099.98
});

test("Scanning FIVE Super iPad should automatically apply a discount. Total cost should be 2499.95", () => {
  const cartService = new CartService();
  cartService.scan(ItemSKU.ipd);
  cartService.scan(ItemSKU.ipd);
  cartService.scan(ItemSKU.ipd);
  cartService.scan(ItemSKU.ipd);
  cartService.scan(ItemSKU.ipd);
  const item = cartService.findItem(ItemSKU.ipd);
  const total = cartService.getTotal();
  expect(total).toBe(item.discountPrice * 5); // $2499.95
});

test("Scanning a Mac Book pro should automatically add an item - VGA adapter", () => {
  const cartService = new CartService();
  cartService.scan(ItemSKU.mbp);
  expect(cartService.findCartItem(ItemSKU.vga)).toBeTruthy();
});

test("Scanning an Apple TV should result in having only 1 apple TV on the cart", () => {
  const cartService = new CartService();
  cartService.scan(ItemSKU.atv);
  expect(cartService.findCartItem(ItemSKU.atv).quantity === 1).toBeTruthy();
});

test("Scanning TWO apple TV should have THREE apple TVs on the cart", () => {
  const cartService = new CartService();
  cartService.scan(ItemSKU.atv);
  cartService.scan(ItemSKU.atv);
  expect(cartService.findCartItem(ItemSKU.atv).quantity === 3).toBeTruthy();
});

test("Scanning THREE apple TV should have FOUR apple TVs on the cart", () => {
  const cartService = new CartService();
  cartService.scan(ItemSKU.atv);
  cartService.scan(ItemSKU.atv);
  cartService.scan(ItemSKU.atv);
  expect(cartService.findCartItem(ItemSKU.atv).quantity === 4).toBeTruthy();
});

test("Scanning FOUR apple TV should have SIX apple TVs on the cart", () => {
  const cartService = new CartService();
  cartService.scan(ItemSKU.atv);
  cartService.scan(ItemSKU.atv);
  cartService.scan(ItemSKU.atv);
  cartService.scan(ItemSKU.atv);
  expect(cartService.findCartItem(ItemSKU.atv).quantity === 6).toBeTruthy();
});
