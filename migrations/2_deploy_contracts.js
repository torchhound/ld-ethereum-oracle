const DeadDrop = artifacts.require("../contracts/DeadDrop.sol");
const DeadDropOracle = artifacts.require("../contracts/DeadDropOracle.sol");

module.exports = function(deployer) {
	require('dotenv').config();
    deployer.deploy(DeadDrop, process.env.CONTRACT_ADDRESS, process.env.SECRET);
    deployer.deploy(DeadDropOracle, process.env.ORACLE_ADDRESS, false);
};
