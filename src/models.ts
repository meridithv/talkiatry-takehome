export interface Order {
  customerId: number;
  sku: SKU;
  credits: number;
}

export interface PriceList {
  [sku: string]: number;
}

export interface Shipment {
  sku: string;
  quantity: number;
}

export interface PurchaseSummary {
  customerId: number;
  shipment: Shipment[];
  remainingCredits: number;
}

export enum SKU {
  Balloon = "balloon",
  StuffedAnimal = "stuffedanimal",
  Crayon = "crayon",
}
