require('dotenv').config();

const DeadDrop = artifacts.require("../contracts/DeadDrop.sol");

contract("DeadDrop", accounts => {
	it("should get dead drop data", () => {
		DeadDrop.deployed()
			.then(instance => instance.getDeadDropData.call(process.env.CONTRACT_ADDRESS))
			.then(data => {
				assert.equal(
		          data,
		          "Data unavailable",
		          "unable to get dead drop data"
		        );
			});
	});
});
