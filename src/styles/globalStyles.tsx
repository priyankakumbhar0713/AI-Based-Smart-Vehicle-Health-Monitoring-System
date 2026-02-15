import { StyleSheet } from 'react-native';
import { Colors } from './theme';

export const createStyles = (mode: 'light' | 'dark' = 'light') =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: Colors[mode].background,
      padding: 16,
    },
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: Colors[mode].text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: Colors[mode].muted,
      marginBottom: 12,
    },
    card: {
      backgroundColor: Colors[mode].card,
      borderRadius: 8,
      padding: 12,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default createStyles;
