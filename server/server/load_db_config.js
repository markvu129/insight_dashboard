'use strict';

const path = require("path");
const filename = "config.json";
const jsonPath = path.resolve(path.join(__dirname, filename));

const fs = require('fs');

const rawConfig = fs.readFileSync(jsonPath);

// Get the env variables
const ENV = process.env['NODE_ENV'] || 'development';

const DBCONFIG_DEV = JSON.parse(rawConfig)[ENV];

module.exports = DBCONFIG_DEV;