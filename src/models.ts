export interface Order {
  customerId: number;
  sku: SKU;
  credits: number;
}

export interface Shipment {
  sku: SKU;
  quantity: number;
}

export interface PurchaseSummary {
  customerId: number;
  shipment: Shipment[];
  remainingCredits: number;
}

export type PriceList = Record<SKU, number>;

export enum SKU {
  Balloon = "balloon",
  StuffedAnimal = "stuffedanimal",
  Crayon = "crayon",
}
