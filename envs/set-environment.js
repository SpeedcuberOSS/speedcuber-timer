// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Code taken from this great article on Medium:
// https://itnext.io/the-easiest-way-to-setup-multiple-environments-on-react-native-67b33d073390

const fs = require('fs');
//Obtain the environment string passed to the node script
const environment = process.argv[2];
//read the content of the json file
const envFileContent = require(`../envs/${environment}.json`);
//copy the json inside the env.json file
fs.writeFileSync(
  'envs/_env.json',
  JSON.stringify(envFileContent, undefined, 2),
);
