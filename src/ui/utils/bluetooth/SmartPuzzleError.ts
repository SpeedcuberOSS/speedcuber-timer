export class SmartPuzzleError extends Error {
  code: SmartPuzzleErrorCode;

  // @ts-ignore
  constructor(code: SmartPuzzleErrorCode, ...params) {
    super(...params);
    this.code = code;
  }
}
export enum SmartPuzzleErrorCode {
  LOCATION_PERMISSION_DENIED,
  LOCATION_PERMISSION_NEVER_ASK_AGAIN,
  LOCATION_DISABLED,
  BLUETOOTH_PERMISSION_DENIED,
  BLUETOOTH_PERMISSION_NEVER_ASK_AGAIN,
  BLUETOOTH_DISABLED,
  PUZZLE_CONNECTION_FAILED,
}
