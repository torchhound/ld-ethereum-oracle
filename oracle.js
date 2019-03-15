require('dotenv').config();

const DeadDropOracle = require('./build/contracts/DeadDropOracle.json');

const LaunchDarkly = require('ldclient-node');
const Web3 = require('web3');

const ldClient = LaunchDarkly.init(process.env.LD_API_KEY);
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_ADDRESS));
const abi = DeadDropOracle.abi;
const address = process.env.ORACLE_ADDRESS;
const contract = new web3.eth.Contract(abi, address);

ldClient.once('ready', () => {
    ldClient.on('update:dead-drop-bool', (value, previous) => {
        if(value.on !== previous.on) {
            return new Promise((resolve, reject) => {
                contract.methods.setFeatureFlag(!value.on).send(
                    { from: address }, (err, res) => {
                        if (err === null) {
                        	console.log('Successfully called Oracle!');
                        	console.log(res);
                        } else {
                        	console.log('Oracle call failed...');
                            reject(err);
                        }
                    }
                );
            });
        }
    });
});
