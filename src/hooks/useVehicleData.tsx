import { useVehicles } from '../context/VehicleContext';

export function useVehicleData() {
  return useVehicles();
}

export default useVehicleData;
