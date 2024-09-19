import fs from "fs";
import { readOrders, readPrices } from "../src/services/fileReader";
import { SKU } from "../src/models";

jest.mock("fs");

describe("FileReader", () => {
  const mockOrders = JSON.stringify({
    orders: [{ customerId: 1, sku: SKU.Balloon, credits: 50 }],
  });

  const mockPrices = JSON.stringify({
    [SKU.Balloon]: 5,
    [SKU.StuffedAnimal]: 10,
    [SKU.Crayon]: 3,
  });

  beforeEach(() => {
    (fs.readFileSync as jest.Mock).mockReset();
  });

  test("readOrders should return parsed order data", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(mockOrders);

    const orders = readOrders("mock/path/to/orders.json");

    expect(fs.readFileSync).toHaveBeenCalledWith(
      expect.stringContaining("mock/path/to/orders.json"),
      "utf8"
    );
    expect(orders).toEqual([{ customerId: 1, sku: SKU.Balloon, credits: 50 }]);
  });

  test("readPrices should return parsed price data", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(mockPrices);

    const prices = readPrices("mock/path/to/prices.json");

    expect(fs.readFileSync).toHaveBeenCalledWith(
      expect.stringContaining("mock/path/to/prices.json"),
      "utf8"
    );
    expect(prices).toEqual({
      [SKU.Balloon]: 5,
      [SKU.StuffedAnimal]: 10,
      [SKU.Crayon]: 3,
    });
  });

  test("readOrders should throw an error if file reading fails", () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error("File not found");
    });

    expect(() => readOrders("mock/path/to/orders.json")).toThrow(
      "Failed to read or parse mock/path/to/orders.json"
    );
  });

  test("readPrices should throw an error if file reading fails", () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error("File not found");
    });

    expect(() => readPrices("mock/path/to/prices.json")).toThrow(
      "Failed to read or parse mock/path/to/prices.json"
    );
  });
});
