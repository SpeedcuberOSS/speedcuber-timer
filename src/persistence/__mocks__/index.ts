import * as actualfs from 'react-native-fs';

jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: 'DocumentDirectoryPath',
  ExternalDirectoryPath: 'ExternalDirectoryPath',
  appendFile: jest.fn(),
  copyFile: jest.fn(),
  exists: jest.fn(),
  mkdir: jest.fn(),
  readFile: jest.fn(),
  unlink: jest.fn(),
  writeFile: jest.fn(),
}));

export const fs = jest.mocked(actualfs);