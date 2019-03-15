require('dotenv').config();

const DeadDrop = require('./build/contracts/DeadDrop.json');
const DeadDropOracle = require('./build/contracts/DeadDropOracle.json');

const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_ADDRESS));

const oracleAbi = DeadDrop.abi;
const oracleAddress = process.env.ORACLE_ADDRESS;
const oracleContract = new web3.eth.Contract(oracleAbi, oracleAddress);

const contractAbi = DeadDropOracle.abi;
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractContract = new web3.eth.Contract(contractAbi, contractAddress);

//oracleContract.methods.getFeatureFlag.call(console.log);

oracleContract.methods.getFeatureFlag().call({from: oracleAddress},
    (err, res) => {
        if (err === false || err === null) {
            console.log(`Feature Flag: ${res.args}`);
        } else {
            console.log(err);
            process.exit();
        }
    }
);

contractContract.methods.getDeadDropData().call({from: contractAddress},
    (err, res) => {
        if (err === false) {
            console.log(`Dead Drop Data: ${res.args}`);
            process.exit();
        } else {
            console.log(err);
            process.exit();
        }
    }
);
