import { api } from "./api";

export interface DashboardResponse {
  totalRecords: number;
  inStandardRecords: number;
  warningRecords: number;
  outOfStandardRecords: number;
}

export async function getDashboard(): Promise<DashboardResponse> {
  const response = await api.get<DashboardResponse>("/Dashboard");

  return response.data;
}