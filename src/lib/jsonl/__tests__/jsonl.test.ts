// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import { JsonLinesReader } from '..';

describe('reader', () => {
  let callback: jest.Mock;
  let reader: JsonLinesReader<string | number | boolean | object | null>;
  beforeEach(() => {
    callback = jest.fn();
    reader = new JsonLinesReader();
    reader.onData(callback);
  });

  it('does not emit a value without a newline', () => {
    reader.write('"foo"');
    expect(callback).not.toHaveBeenCalled();
  });
  it('emits a value when a line is written', () => {
    reader.write('"foo"\n');
    expect(callback).toHaveBeenCalledWith('foo');
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it('only emits complete lines', () => {
    reader.write('"foo"\n"bar"');
    expect(callback).toHaveBeenCalledWith('foo');
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it('emits one line when written in two chunks', () => {
    reader.write('"fo');
    reader.write('o"\n');
    expect(callback).toHaveBeenCalledWith('foo');
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it('emits one line when written in many chunks', () => {
    reader.write('"');
    reader.write('f');
    reader.write('o');
    reader.write('o');
    reader.write('"');
    reader.write('\n');
    expect(callback).toHaveBeenCalledWith('foo');
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it('only emits complete lines, even when written in two chunks', () => {
    reader.write('"fo');
    reader.write('o"\n"bar"');
    expect(callback).toHaveBeenCalledWith('foo');
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it('emits multiple lines when written in one chunk', () => {
    reader.write('"foo"\n"bar"\n"baz"\n');
    expect(callback).toHaveBeenNthCalledWith(1, 'foo');
    expect(callback).toHaveBeenNthCalledWith(2, 'bar');
    expect(callback).toHaveBeenNthCalledWith(3, 'baz');
    expect(callback).toHaveBeenCalledTimes(3);
  });
  it.each([
    ['17\n', 17],
    ['-15\n', -15],
    ['3.45E-5\n', 3.45e-5],
  ])('emits numbers correctly: %p', (value, expected) => {
    reader.write(value);
    expect(callback).toHaveBeenCalledWith(expected);
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it.each([
    '\n',
    'unquoted text\n',
    '["unterminated array"\n',
    '{"unterminated": "object"\n',
  ])('raises an error when a line contains invalid JSON: %p', value => {
    expect(() => reader.write(value)).toThrowError();
    expect(callback).not.toHaveBeenCalled();
  });
});
