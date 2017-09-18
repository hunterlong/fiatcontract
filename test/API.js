var MarketPrice = artifacts.require("./MarketPrice.sol");
var Example = artifacts.require("./Example.sol");

  var account_one;
  var account_two;
  var account_three;
  var account_four;
  var priceAddress;
  var market;
  var metaExample;
  var storjFiveBucks;
  var USDdollar;

contract('MarketPrice', function(accounts) {

  account_one = accounts[0];
  account_two = accounts[1];
  account_three = accounts[2];
  account_four = accounts[3];

  it("should insert new ETH price", function() {
    return MarketPrice.deployed().then(function(instance) {
      market = instance;
      priceAddress = instance.address;
      return market.update(0, "ETH", 1000000000000000000, 33652131190000, 40154176530000, 44664290720000, {from: account_one});
    });
  });


  it("should insert new OMG price", function() {
    return MarketPrice.deployed().then(function(instance) {
      return market.update(1, "OMG", 39051897400000000, 34586757420000, 41366227000000, 45945555490000, {from: account_one});
    });
  });


  it("should insert new STORJ price", function() {
    return MarketPrice.deployed().then(function(instance) {
      return market.update(2, "STORJ", 1835596500000000, 34672380679999, 41468633560000, 46059298670000, {from: account_one});
    });
  });


  it("should get 0.01 USD worth of ETH", function() {
    return MarketPrice.deployed().then(function(instance) {
      return instance.USD(0);
    }).then(function(amount) {
    	USDdollar = amount * 100;
      assert.equal(amount, 33652131190000, "Ethereum USD Price was set correctly");
    });
  });


  it("should get 0.01 EURO worth of ETH", function() {
    return MarketPrice.deployed().then(function(instance) {
      return market.EUR(0);
    }).then(function(amount) {
      assert.equal(amount, 40154176530000, "Ethereum EURO Price was set correctly");
    });
  });


  it("should get 0.01 GBP worth of ETH", function() {
    return MarketPrice.deployed().then(function(instance) {
      return market.GBP(0);
    }).then(function(amount) {
      assert.equal(amount, 44664290720000, "Ethereum GBP Price was set correctly");
    });
  });


  it("should get 0.01 USD worth of OMG", function() {
    return MarketPrice.deployed().then(function(instance) {
      return market.USD(1);
    }).then(function(amount) {
      assert.equal(amount, 34586757420000, "OMG EURO Price was set correctly");
    });
  });


  it("should get $105.75 USD worth of ETH", function() {
    return MarketPrice.deployed().then(function(instance) {
      return market.USD(0);
    }).then(function(amount) {
      var dollars = amount * 10575;
      assert.equal(dollars, 355871287334250000, "Ethereum USD conversion is correct");
    });
  });


  it("should get 1.00 EURO worth of STORJ", function() {
    return MarketPrice.deployed().then(function(instance) {
      return market.EUR(2);
    }).then(function(amount) {
    	var dollar = amount * 100
      assert.equal(dollar, 4146863356000000, "STORJ EURO Price was set correctly");
    });
  });


  it("should get $100.00 USD worth of OMG", function() {
    return MarketPrice.deployed().then(function(instance) {
      return market.USD(0);
    }).then(function(amount) {
      var dollars = amount * 10000;
      assert.equal(dollars, 336521311900000000, "OMG USD conversion is correct");
    });
  });


  it("should change Creator address", function() {
    return MarketPrice.deployed().then(function(instance) {
      return market.changeCreator(account_three, {from: account_one});
    }).then(function() {
      return market.creator.call();
    }).then(function(creator) {
      assert.equal(creator, account_three, "New Creator was set");
    });
  });


  it("should change Sender address", function() {
    return MarketPrice.deployed().then(function(instance) {
      return market.changeSender(account_two, {from: account_three});
    }).then(function() {
      return market.sender.call();
    }).then(function(sender) {
      assert.equal(sender, account_two, "New Sender was set");
    });
  });



  it("should delete STORJ token from database", function() {
    return MarketPrice.deployed().then(function(instance) {
      return market.deleteToken(2, {from: account_three});
    }).then(function(tx) {
      assert.equal(tx.logs[0].event, "DeletePrice", "Token was removed from contract");
    });
  });


  it("should donate to contract", function() {
    return MarketPrice.deployed().then(function(instance) {
      return market.donate({from: account_four, value: 275000000000});
    }).then(function(tx) {
      assert.equal(tx.logs[0].event, "Donation", "Donation transfers ETH to wallet");
    });
  });


  it("should request to update price", function() {
    return MarketPrice.deployed().then(function(instance) {
    	var sendVal = USDdollar / 2;
      return market.requestUpdate(0, {from: account_four, value: sendVal});
    }).then(function(tx) {
      assert.equal(tx.logs[0].event, "RequestUpdate", "Contract can request new updated price from call");
    });
  });


	it("should be MarketPrice contract address", function() {
	  return Example.deployed().then(function(instance) {
	    return instance.PriceAddress.call()
	  }).then(function(address) {
	    assert.equal(address, priceAddress, "Example has MarketPrice contract correct");
	  });
	});


	it("should test $5.00 worth of ETH", function() {
	  return Example.deployed().then(function(instance) {
	    return instance.FiveETHUSD.call()
	  }).then(function(amount) {
	    assert.equal(amount.toNumber(), 16826065595000000, "$5.00 USD worth of ETH is correct");
	  });
	});

});
