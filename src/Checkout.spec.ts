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

test("Cannot checkout without adding an item", () => {
  const checkout = new CheckoutService();
  expect(checkout.checkout()).toBeFalsy();
});
