import { api } from "./api";
import type { Tank } from "../models/Tank";

export interface TankRequest {
  name: string;
  capacityLiters: number;
}

export async function getTanks(): Promise<Tank[]> {
  const response = await api.get<Tank[]>("/Tank");

  return response.data;
}

export async function createTank(data: TankRequest): Promise<Tank> {
  const response = await api.post<Tank>("/Tank", data);

  return response.data;
}

export async function updateTank(
  id: string,
  data: TankRequest
): Promise<void> {
  await api.put(`/Tank/${id}`, data);
}

export async function deleteTank(id: string): Promise<void> {
  await api.delete(`/Tank/${id}`);
}