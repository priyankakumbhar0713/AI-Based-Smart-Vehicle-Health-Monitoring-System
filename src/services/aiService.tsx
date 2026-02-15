import api from './api';

export type PredictionRequest = {
  vehicleId?: string;
  telemetry?: Record<string, any>;
};

export type PredictionResponse = {
  riskScore: number;
  recommendations?: string[];
};

export async function predictHealth(payload: PredictionRequest): Promise<PredictionResponse> {
  const res = await api.post('/ai/predict', payload);
  return res.data;
}

export default { predictHealth };
