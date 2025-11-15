export enum notifyType {
  success = "success",
  error = "error",
  warn = "warn",
  info = "info",
}

export enum notifyPositionMap {
  topCenter = "top-center",
  topLeft = "top-left",
  topRight = "top-right",
  bottomLeft = "bottom-left",
  bottomRight = "bottom-right",
  bottomCenter = "bottom-center",
}

export const orderStatus = [
  "open",
  "in_progress",
  "waiting",
  "cancelled",
  "suspended",
] as const;

export type StatusType =
  | "open"
  | "in_progress"
  | "waiting"
  | "cancelled"
  | "suspended";

export enum role {
  admin = "admin",
  technician = "technician",
  client = "client",
}

export type Client = {
  id: number | undefined;
  address: string;
  email: string;
  name: string;
  phone: string;
};

export type Service = {
  id: number | undefined;
  name: string;
  description: string;
  time: number;
  price: number;
};

export type Equipment = {
  id: number | undefined;
  name: string;
  model: string;
  serialNumber: string;
  description: string;
};
export type User = {
  id: number | undefined;
  token: string;
  email: string;
  role: role;
};

export type Part = {
  id?: number | undefined;
  name: string;
  description: string;
  quantity: number;
  price: number;
};

export type Technician = {
  email: string | undefined;
  id: number;
  name: string;
  phone: string;
};

export type Order = {
  id: number | undefined;
  date: string;
  status: string;
  comment: string;
  clientId: string;
  technicianId: string;
  services: Service[];
  parts: Part[];
};

export type OrderResponse = {
  id: number;
  // Datas da OS
  openingDate: Date;
  forecastDate: Date;
  closingDate?: string | null;
  // Informações principais
  status: StatusType;
  comment: string;
  // Relações
  client: Client;
  technician: Technician;
  services: Service[];
  parts: Part[];
};

export type PageParam = {
  pageParam: number;
};

export enum TitleMapType {
  "/app/client" = "/app/client",
  "/app/technician" = "/app/technician",
  "/app" = "/app",
}
