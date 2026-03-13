/**
 * Jest setup file
 * This file is automatically required by Jest before running tests
 */

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => {
  const mockImpl = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    mergeItem: jest.fn(),
    multiGet: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
    multiMerge: jest.fn(),
    useAsyncStorage: jest.fn(),
  };
  return mockImpl;
});

// Mock Expo modules
jest.mock('expo-constants', () => ({
  appName: 'Relay',
  appVersion: '1.0.0',
  appOwnership: 'expo',
  nativeAppVersion: '1.0.0',
  nativeBuildVersion: '1',
  deviceName: 'Test Device',
  systemFont: 'System',
  isDevice: false,
  platform: {
    osName: 'ios',
    osVersion: '16.0',
  },
}));

// Mock Expo Router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    navigate: jest.fn(),
  }),
  Link: ({ children, ...props }) => children,
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

// Mock React Native components
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Platform.select = jest.fn((obj) => obj.default || obj.ios);
  return RN;
});

// Enable act() for testing
import { act } from '@testing-library/react-native';

global.act = act;
