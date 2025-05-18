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

export enum role {
  admin = "admin",
  technician = "technician",
  client = "client",
}

export type User = {
  id: number;
  token: string;
  email: string;
  role: role;
};

export type Client = {
  address: string;
  email: string;
  id: number;
  name: string;
  phone: string;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  time: number;
  price: number;
};

export type Part = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
};
export type Technician = {
  email: string;
  id: number;
  name: string;
  phone: string;
};

export type Order = {
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
  date: string;
  status: string;
  comment: string;
  clientId: string;
  technicianID: string;
};
