/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

const rootDir = __dirname

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = config = {
  // see: https://kulshekhar.github.io/ts-jest/docs/getting-started/presets
  preset: 'ts-jest',

  testEnvironment: 'node',
  roots: [`${rootDir}/src`],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // allows jest to determine correct paths to @/-prefixed imports, to feed in turn to ts-jest (which does zero path resolution):
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: `${rootDir}/src`,
  }),
}
