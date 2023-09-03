import * as actualfs from 'react-native-fs';

jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: 'DocumentDirectoryPath',
  ExternalDirectoryPath: 'ExternalDirectoryPath',
  exists: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn(),
  copyFile: jest.fn(),
  unlink: jest.fn(),
}));

export const fs = jest.mocked(actualfs);