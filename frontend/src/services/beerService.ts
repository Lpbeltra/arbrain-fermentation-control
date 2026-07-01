import { api } from "./api";
import type { Beer } from "../models/Beer";

export interface BeerRequest {
  name: string;
  style: string;
  minTemperature: number;
  maxTemperature: number;
  minPh: number;
  maxPh: number;
  minExtract: number;
  maxExtract: number;
}

export async function getBeers(): Promise<Beer[]> {
  const response = await api.get<Beer[]>("/Beer");

  return response.data;
}

export async function createBeer(data: BeerRequest): Promise<Beer> {
  const response = await api.post<Beer>("/Beer", data);

  return response.data;
}

export async function updateBeer(
  id: string,
  data: BeerRequest
): Promise<void> {
  await api.put(`/Beer/${id}`, data);
}

export async function deleteBeer(id: string): Promise<void> {
  await api.delete(`/Beer/${id}`);
}