var MarketPrice = artifacts.require("./MarketPrice.sol");
var Example = artifacts.require("./Example.sol");

module.exports = function(deployer) {
  deployer.deploy(MarketPrice).then(function() {
		return deployer.deploy(Example, MarketPrice.address);
	});
};
