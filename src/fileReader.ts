import fs from "fs";
import path from "path";
import { Order, PriceList } from "./models";

export const readOrders = (): Order[] => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, "../data/orders.json"),
      "utf8"
    );
    const parsedData = JSON.parse(data);

    return parsedData.orders as Order[];
  } catch (error) {
    throw new Error("Failed to read or parse orders.json");
  }
};

export const readPrices = (): PriceList => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, "../data/prices.json"),
      "utf8"
    );
    return JSON.parse(data) as PriceList;
  } catch (error) {
    throw new Error("Failed to read or parse prices.json");
  }
};
