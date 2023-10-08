// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

export class JsonLinesReader<T> {
  _dataCallbacks: ((data: T) => void)[] = [];
  _data: string = '';
  constructor() {}
  public onData(callback: (data: T) => void) {
    this._dataCallbacks.push(callback);
  }
  public write(data: string) {
    if (data.includes('\n')) {
      const lines = data.split('\n');
      lines[0] = this._data + lines[0];
      this._data = lines.pop() ?? '';
      lines.forEach(line => {
        this._dataCallbacks.forEach(callback =>
          callback(JSON.parse(line) as T),
        );
      });
    } else {
      this._data += data;
    }
  }
}
