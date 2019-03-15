require('dotenv').config();

const DeadDrop = artifacts.require("../contracts/DeadDrop.sol");
const DeadDropOracle = artifacts.require("../contracts/DeadDropOracle.sol");

const LaunchDarkly = require('ldclient-node');

const ldClient = LaunchDarkly.init(process.env.LD_API_KEY);
var featureFlag = false;

contract('LaunchDarkly', accounts => {
	before((done) => {
		ldClient.once('ready', () => {
			ldClient.variation('dead-drop-bool', {key: 'anonymous'}, false, (error, result) =>{
		    	if(error) {
		    		console.log(`Error: ${error}`);
		    	}
		    	featureFlag = !result.on;
		    	done()
		    });
		});
	});

  	it('should be able to put feature flag and get dead drop data', async () => {
  		DeadDropOracle.deployed()
			.then(instance => instance.setFeatureFlag(featureFlag).send(process.env.ORACLE_ADDRESS))
			.then(() => {
				DeadDrop.deployed()
					.then(instance => instance.getDeadDropData.call(process.env.CONTRACT_ADDRESS))
					.then(data => {
						assert.equal(
							data,
							'secret',
							'Failed to get secret'
						)
					})
			})
	});
});
