import { CheckoutService } from "./Checkout";

test("should be able to scan an existing item- Eg: Super iPad", () => {
  const checkout = new CheckoutService();
  expect(checkout.scan("ipd")).toBeTruthy();
});

test("should be able to scan multiple items", () => {
  const checkout = new CheckoutService();
  checkout.scan("ipd");
  expect(checkout.scan("ipd")).toBeTruthy();
});

test("when an item is added into the cart, the total should be greater than zero", () => {
  const checkout = new CheckoutService();
  checkout.scan("ipd");
  const total = checkout.getTotal();
  expect(total).toBeGreaterThan(0);
});

test("should NOT be able checkout without adding an item", () => {
  const checkout = new CheckoutService();
  expect(checkout.checkout()).toBeFalsy();
});

test("should be able checkout after adding at least one item", () => {
  const checkout = new CheckoutService();
  checkout.scan("ipd");
  expect(checkout.checkout()).toBeTruthy();
});

test("should be able checkout after adding at multiple item", () => {
  const checkout = new CheckoutService();
  checkout.scan("ipd");
  checkout.scan("ipd");
  expect(checkout.checkout()).toBeTruthy();
});

test("Scanning Super iPad should cost 1099.98", () => {
  const checkout = new CheckoutService();
  checkout.scan("ipd");
  checkout.scan("ipd");
  const item = checkout.findItem("ipd");
  const total = checkout.getTotal();
  expect(total).toBe(item.price * 2); // $1099.98
});

test("Scanning FIVE Super iPad should automatically apply a discount. Total cost should be 2499.95", () => {
  const checkout = new CheckoutService();
  checkout.scan("ipd");
  checkout.scan("ipd");
  checkout.scan("ipd");
  checkout.scan("ipd");
  checkout.scan("ipd");
  const item = checkout.findItem("ipd");
  const total = checkout.getTotal();
  expect(total).toBe(item.discountPrice * 5); // $2499.95
});

test("Scanning a Mac Book pro should automatically add an item - VGA adapter", () => {
  const checkout = new CheckoutService();
  checkout.scan("mbp");
  expect(checkout.findCartItem("vga")).toBeTruthy();
});

test("Scanning an Apple TV should result in having only 1 apple TV on the cart", () => {
  const checkout = new CheckoutService();
  checkout.scan("atv");
  expect(checkout.findCartItem("atv").quantity === 1).toBeTruthy();
});

test("Scanning TWO apple TV should have THREE apple TVs on the cart", () => {
  const checkout = new CheckoutService();
  checkout.scan("atv");
  checkout.scan("atv");
  expect(checkout.findCartItem("atv").quantity === 3).toBeTruthy();
});

test("Scanning THREE apple TV should have FOUR apple TVs on the cart", () => {
  const checkout = new CheckoutService();
  checkout.scan("atv");
  checkout.scan("atv");
  checkout.scan("atv");
  expect(checkout.findCartItem("atv").quantity === 4).toBeTruthy();
});

test("Scanning FOUR apple TV should have SIX apple TVs on the cart", () => {
  const checkout = new CheckoutService();
  checkout.scan("atv");
  checkout.scan("atv");
  checkout.scan("atv");
  checkout.scan("atv");
  expect(checkout.findCartItem("atv").quantity === 6).toBeTruthy();
});
