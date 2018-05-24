window.addEventListener('load', function() {

	web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/0PB64JcYkClAGFOPMY4s"));

	CallContract();

});

function CallContract() {

var abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "creator",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "USD",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "_token",
        "type": "string"
      },
      {
        "name": "eth",
        "type": "uint256"
      },
      {
        "name": "usd",
        "type": "uint256"
      },
      {
        "name": "eur",
        "type": "uint256"
      },
      {
        "name": "gbp",
        "type": "uint256"
      }
    ],
    "name": "update",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tokens",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "eth",
        "type": "uint256"
      },
      {
        "name": "usd",
        "type": "uint256"
      },
      {
        "name": "eur",
        "type": "uint256"
      },
      {
        "name": "gbp",
        "type": "uint256"
      },
      {
        "name": "block",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "GBP",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "deleteToken",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "sender",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "ETH",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_creator",
        "type": "address"
      }
    ],
    "name": "changeCreator",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_sender",
        "type": "address"
      }
    ],
    "name": "changeSender",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      },
      {
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "execute",
    "outputs": [
      {
        "name": "_r",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "requestUpdate",
    "outputs": [],
    "payable": true,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "updatedAt",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "EUR",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "donate",
    "outputs": [],
    "payable": true,
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "type": "constructor"
  },
  {
    "payable": true,
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "token",
        "type": "string"
      }
    ],
    "name": "NewPrice",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "DeletePrice",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "UpdatedPrice",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "RequestUpdate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "from",
        "type": "address"
      }
    ],
    "name": "Donation",
    "type": "event"
  }
];

var fiatContract = web3.eth.contract(abi);
var price = fiatContract.at('0x8055d0504666e2B6942BeB8D6014c964658Ca591');

FetchUSD(price, function() {
	FetchEUR(price, function() {
		FetchGBP(price, function() {
			lastUpdate(price, function() {
				RunnerBalance();
			});
		});
	});
});

}


function RunnerBalance() {

	var trx_cost = 0.000125158;
	var day_cost = trx_cost * 24;

	console.log("Running fiat contract costs: "+day_cost+" ETH per day.")

	web3.eth.getBalance("0x004F3E7fFA2F06EA78e14ED2B13E87d710e8013F", function(e, r) {
		var value = web3.fromWei(r.toNumber(), 'ether');
		console.log("Balance for Mainnet contract owner: "+value+" ETH. Donate today! 0x004F3E7fFA2F06EA78e14ED2B13E87d710e8013F");

		var days_expire = value / day_cost;

		console.log("The wallet that runs fiat contract will run out of ether in "+Math.floor(days_expire)+" days!");

		$("#donate_days").html("Donations run out in "+Math.floor(days_expire)+" Days")

		$("#account_cost").html("Updating every 1 hour costs -"+day_cost+" ETH per day.")

	});

}


function FetchUSD(price, callback){
	price.USD(0, function(e, r){
		var ethUSD = r.valueOf();
		var toEth = web3.fromWei(ethUSD, 'ether');
		$("#ethusd").html(toEth+" ETH");
		callback();
	});
}


function FetchEUR(price, callback){
	price.EUR(0, function(e, r){
		var ethUSD = r.valueOf();
		var toEth = web3.fromWei(ethUSD, 'ether');
		$("#etheur").html(toEth+" ETH");
		callback()
	});
}

function FetchGBP(price, callback){
	price.GBP(0, function(e, r){
		var ethUSD = r.valueOf();
		var toEth = web3.fromWei(ethUSD, 'ether');
		$("#ethgbp").html(toEth+" ETH");
		callback();
	});
}

function lastUpdate(price, callback){
	price.updatedAt(0, function(e, r){
		var block = r.valueOf();

			web3.eth.getBlockNumber(function(e, b) {
				var current = b.valueOf();

				var minutes_block = 0.25;
				var minutes_ago = (current-block) * minutes_block;

				$("#last_update").html((current-block)+" blocks ago");

				$("#block_minutes").html(Math.floor(minutes_ago));
				
				callback();

			})

	});
}
