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
  token: string;
  email: string;
  role: role;
};

export type Technician = {
  email: string;
  id: number;
  name: string;
  phone: string;
}