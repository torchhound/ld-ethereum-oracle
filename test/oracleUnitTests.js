require('dotenv').config();

const DeadDropOracle = artifacts.require("../contracts/DeadDropOracle.sol");

contract("DeadDropOracle", accounts => {
	it("should get a feature flag", () => {
		DeadDropOracle.deployed()
			.then(instance => instance.getFeatureFlag.call(process.env.ORACLE_ADDRESS))
			.then(featureFlag => {
				assert.equal(
		          featureFlag,
		          false,
		          "unable to get feature flag"
		        );
			});
	});

	it("should put a feature flag", () => {
		DeadDropOracle.deployed()
			.then(instance => instance.setFeatureFlag(true).send(process.env.ORACLE_ADDRESS))
			.then(instance => instance.getFeatureFlag.call(process.env.ORACLE_ADDRESS))
			.then(featureFlag => {
				assert.equal(
		          featureFlag,
		          true,
		          "feature flag wasn't put"
		        );
			});
	});
});
