import { api } from "./api";
import type { FermentationRecord } from "../models/FermentationRecord";

export interface FermentationRecordRequest {
  beerId: string;
  tankId: string;
  batchNumber: string;
  temperature: number;
  ph: number;
  extract: number;
  observation?: string;
}

export async function getFermentationRecords(): Promise<FermentationRecord[]> {
  const response = await api.get<FermentationRecord[]>("/FermentationRecord");

  return response.data;
}

export async function createFermentationRecord(
  data: FermentationRecordRequest
): Promise<FermentationRecord> {
  const response = await api.post<FermentationRecord>(
    "/FermentationRecord",
    data
  );

  return response.data;
}

export async function updateFermentationRecord(
  id: string,
  data: FermentationRecordRequest
): Promise<void> {
  await api.put(`/FermentationRecord/${id}`, data);
}

export async function deleteFermentationRecord(id: string): Promise<void> {
  await api.delete(`/FermentationRecord/${id}`);
}

export async function getFermentationRecordsByBatch(
  batchNumber: string
): Promise<FermentationRecord[]> {
  const response = await api.get<FermentationRecord[]>(
    `/FermentationRecord/batch/${batchNumber}`
  );

  return response.data;
}