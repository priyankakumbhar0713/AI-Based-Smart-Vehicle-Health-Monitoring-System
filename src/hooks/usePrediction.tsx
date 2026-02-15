import { useState } from 'react';
import aiService, { PredictionRequest, PredictionResponse } from '../services/aiService';

export function usePrediction() {
  const [loading, setLoading] = useState(false);

  async function predict(payload: PredictionRequest): Promise<PredictionResponse | null> {
    setLoading(true);
    try {
      const res = await aiService.predictHealth(payload);
      return res;
    } catch (err) {
      console.error('Prediction error', err);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { predict, loading } as const;
}

export default usePrediction;
