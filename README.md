# hello-ethereum-oracle

Use LaunchDarkly to feature flag on the blockchain! `oracle.js` listens for feature flag changes and pushes them to `contracts/DeadDropOracle.sol`. When `getDeadDropData()` in `contracts/DeadDrop.sol` is called it checks `getFeatureFlag()` in `contracts/DeadDropOracle.sol` and returns the "secret" data if the feature flag is true.

## Install

NOTE: `web3` is specifically `1.0.0-beta.37`, newer beta versions have critical bugs.

`npm i -g truffle ganache-cli`

`npm i`

## Run

You'll need Ganache or `ganache-cli` running. If you use `ganache-cli` put it in a separate bash tab or background it.

`truffle compile`

`truffle migrate`

This is a continous process so put it in a separate bash tab or background it: `node oracle.js`

`node deadDropTest.js`

## Test

`truffle test test/deadDropUnitTests.js`

`truffle test test/oracleUnitTests.js`

`truffle test test/launchDarklyUnitTests.js`