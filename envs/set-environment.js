// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Code taken from this great article on Medium:
// https://itnext.io/the-easiest-way-to-setup-multiple-environments-on-react-native-67b33d073390

const fs = require('fs');

function setEnvironmentConfig(environment) {
  const envFileContent = require(`../envs/${environment}/config.json`);
  fs.writeFileSync(
    'envs/_env.json',
    JSON.stringify(envFileContent, undefined, 2),
  );
}

function setEnvironmentApp(environment) {
  fs.copyFileSync(`envs/${environment}/App.js`, 'index.js');
}

// MAIN
const environment = process.argv[2]; // Obtain the environment string passed to the node script
setEnvironmentConfig(environment);
setEnvironmentApp(environment);
