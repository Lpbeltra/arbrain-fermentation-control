export type FermentationStatus = "InStandard" | "Warning" | "OutOfStandard";

export interface FermentationRecord {
  id: string;
  recordedAt: string;
  batchNumber: string;
  temperature: number;
  ph: number;
  extract: number;
  observation?: string | null;
  status: FermentationStatus;
  beerId: string;
  beerName: string;
  tankId: string;
  tankName: string;
}