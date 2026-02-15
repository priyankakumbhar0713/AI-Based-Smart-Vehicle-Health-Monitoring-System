import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { VehicleProvider } from '../context/VehicleContext';
import AppNavigator from '../navigation/AppNavigator';

export default function Page() {
  return (
    <AuthProvider>
      <VehicleProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </VehicleProvider>
    </AuthProvider>
  );
}

