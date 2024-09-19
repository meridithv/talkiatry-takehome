import { processOrder } from "../src/services/processOrder";
import { Order, PriceList, SKU } from "../src/models";

const testDayPrices: PriceList = {
  [SKU.Balloon]: 5,
  [SKU.StuffedAnimal]: 10,
  [SKU.Crayon]: 3,
};

describe("Process Order", () => {
  test("Order balloons with some credits left over", () => {
    const order: Order = { customerId: 1, sku: SKU.Balloon, credits: 53 };
    const shipment = processOrder(order, testDayPrices);
    expect(shipment).toEqual({
      customerId: 1,
      shipment: [{ sku: SKU.Balloon, quantity: 10 }],
      remainingCredits: 3,
    });
  });

  test("Order balloons with exact number of credits", () => {
    const order: Order = { customerId: 2, sku: SKU.Balloon, credits: 50 };
    const shipment = processOrder(order, testDayPrices);
    expect(shipment).toEqual({
      customerId: 2,
      shipment: [{ sku: SKU.Balloon, quantity: 10 }],
      remainingCredits: 0,
    });
  });

  test("Not enough credits to buy anything", () => {
    const order: Order = { customerId: 3, sku: SKU.Balloon, credits: 2 };
    const shipment = processOrder(order, testDayPrices);
    expect(shipment).toEqual({
      customerId: 3,
      shipment: [],
      remainingCredits: 2,
    });
  });

  test("Order five stuffed animals, get one for free", () => {
    const order: Order = { customerId: 4, sku: SKU.StuffedAnimal, credits: 50 };
    const shipment = processOrder(order, testDayPrices);
    expect(shipment).toEqual({
      customerId: 4,
      shipment: [
        { sku: SKU.StuffedAnimal, quantity: 5 },
        { sku: SKU.StuffedAnimal, quantity: 1 },
      ],
      remainingCredits: 0,
    });
  });

  test("Order six stuffed animals, still only get one for free", () => {
    const order: Order = { customerId: 5, sku: SKU.StuffedAnimal, credits: 60 };
    const shipment = processOrder(order, testDayPrices);
    expect(shipment).toEqual({
      customerId: 5,
      shipment: [
        { sku: SKU.StuffedAnimal, quantity: 6 },
        { sku: SKU.StuffedAnimal, quantity: 1 },
      ],
      remainingCredits: 0,
    });
  });

  test("Order two crayon boxes, get one free balloon", () => {
    const order: Order = { customerId: 6, sku: SKU.Crayon, credits: 6 };
    const shipment = processOrder(order, testDayPrices);
    expect(shipment).toEqual({
      customerId: 6,
      shipment: [
        { sku: SKU.Crayon, quantity: 2 },
        { sku: SKU.Balloon, quantity: 1 },
      ],
      remainingCredits: 0,
    });
  });

  test("Order four crayon boxes, get two free balloons", () => {
    const order: Order = { customerId: 7, sku: SKU.Crayon, credits: 12 };
    const shipment = processOrder(order, testDayPrices);
    expect(shipment).toEqual({
      customerId: 7,
      shipment: [
        { sku: SKU.Crayon, quantity: 4 },
        { sku: SKU.Balloon, quantity: 2 },
      ],
      remainingCredits: 0,
    });
  });

  test("Get a 10% discount for ordering more than five crayon boxes", () => {
    const order: Order = { customerId: 8, sku: SKU.Crayon, credits: 20 };
    const shipment = processOrder(order, testDayPrices);
    expect(shipment).toEqual({
      customerId: 8,
      shipment: [
        { sku: SKU.Crayon, quantity: 6 },
        { sku: SKU.Balloon, quantity: 3 },
      ],
      remainingCredits: 2,
    });
  });

  test("Get no discount for ordering exactly five crayon boxes", () => {
    const order: Order = { customerId: 9, sku: SKU.Crayon, credits: 15 };
    const shipment = processOrder(order, testDayPrices);
    expect(shipment).toEqual({
      customerId: 9,
      shipment: [
        { sku: SKU.Crayon, quantity: 5 },
        { sku: SKU.Balloon, quantity: 2 },
      ],
      remainingCredits: 0,
    });
  });

  test("Edge case: Zero credits", () => {
    const order: Order = { customerId: 12, sku: SKU.StuffedAnimal, credits: 0 };
    const shipment = processOrder(order, testDayPrices);
    expect(shipment).toEqual({
      customerId: 12,
      shipment: [],
      remainingCredits: 0,
    });
  });
});
