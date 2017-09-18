var FiatContract = artifacts.require("./FiatContract.sol");
var Example = artifacts.require("./Example.sol");

module.exports = function(deployer) {
  deployer.deploy(FiatContract).then(function() {
		return deployer.deploy(Example, FiatContract.address);
	});
};
