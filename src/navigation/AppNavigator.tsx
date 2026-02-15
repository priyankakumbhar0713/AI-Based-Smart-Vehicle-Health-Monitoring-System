import React from 'react';
import useAuth from '../hooks/useAuth';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';

export default function AppNavigator() {
  const { user } = useAuth();

  return <>{user ? <BottomTabNavigator /> : <AuthNavigator />}</>;
}
