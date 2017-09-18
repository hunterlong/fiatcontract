<p align="center">
  <img width="560" src="https://i.imgur.com/AGgUuW8.jpg"><br>
    <b>Coin Market Contract</b><br>
  <a href="https://ropsten.etherscan.io/address/0xc119e802e99c1f66dc78fd11f9d21773c9b053d4#code">Testnet</a> |
  <a href="https://etherscan.io/address/0x2138FfE292fd0953f7fe2569111246E4DE9ff1DC#code">Mainnet</a> |
  <a href="#implementing-inside-contracts">Implement</a>
  <br>
  MarketPrice(<b>0x2138FfE292fd0953f7fe2569111246E4DE9ff1DC</b>)
  <br>
  <br>
</p>

# Coin Market Price Smart Contract [![Build Status](https://travis-ci.org/hunterlong/marketprice.svg?branch=master)](https://travis-ci.org/hunterlong/marketprice)

Retrieve Ethereum market price by referencing this smart contract! 
Finally a way for smart contracts to get how much $1.00 is in ETH. 
By referencing this contracts you can even automatically convert 
other ERC20's market prices and convert it back into ETH.

This contract doesn't need any calls, all you need to do is reference it and start converting ETH to multiple crypto's. 
All return values are measure in Ethereum's WEI amount, the lowest possible value. You can convert USD, EUR, and even GBP.

```
price = MarketPrice(0x2138FfE292fd0953f7fe2569111246E4DE9ff1DC) // MAINNET ADDRESS
price = MarketPrice(0x97d63Fe27cA359422C10b25206346B9e24A676Ca) // TESTNET ADDRESS (ROPSTEN)
```

## Market Price Update Rate
- MAINNET - Every 2 hours
- TESTNET - Every 15 minutes

Donating to the contract will help support the gas used for updating the exchange prices.

Send ETH to address `0x2138FfE292fd0953f7fe2569111246E4DE9ff1DC` with data: `0xed88c68e` gas limit: `50000`. You can also send ETH or any other ERC20 directly to the contract address. Thank you for donating!

## Market Rate inside Smart Contract
This contract holds multiple market rates for multiple cryptocurrencies, the contract automatically converts back into ETH value.

### Simple to Use Methods
```
uint256 coin = price.ETH(0);    // returns ETH value for 1 OMG. ETH/OMG
uint256 cent = price.USD(0);    // returns $0.01 worth of ETH in USD.
uint256 cent = price.EUR(0);    // returns $0.01 worth of OMG in Euro.
uint256 cent = price.GBP(0);    // returns $0.01 worth of OMG in British Pound.
```

### Implement in your Contract
First you must include the Pricing Contract on the top of your contract.
```
contract MarketPrice {
    function ETH(uint _id) constant returns (uint256);
    function USD(uint _id) constant returns (uint256);
    function EUR(uint _id) constant returns (uint256);
    function GBP(uint _id) constant returns (uint256);
    function updatedAt(uint _id) constant returns (uint);
}

MarketPrice public price;

function Example() {
  //price = MarketPrice(0x2138FfE292fd0953f7fe2569111246E4DE9ff1DC) // MAINNET ADDRESS
  price = MarketPrice(0x97d63Fe27cA359422C10b25206346B9e24A676Ca) // TESTNET ADDRESS
}

```
Here's an example of getting $5.00 USD worth of ETH valued as USD. 

```
// $0.01 * 500 = $5.00
function FiveUSDinETH() constant returns (uint256) {
    uint256 cents = price.USD(0);
    return cents * 500;
}
```

### Get Market Price Changed Block
```
uint updatedBlock = price.updatedAt(0); // 4,109,482

if (block.number - updatedBlock > 100) {
  // the price hasn't been updated in 100 blocks.
}
```

Once you have the value of $5.00 worth of OMG in ETH, you can have a function to 
require the exact amount of ETH that is worth $5.00 of OMG. 
```
function TradeOMG() constant returns (uint256) {
    require(msg.value == FiveUSDtoOMG());
    // Awesome! The sender sent $5.00 worth of OMG based in ETH value (OMG/ETH)
}
```

# Supported Cryptos

- ETH - `price.ETH(0);`
- more too come very very soon

# Market Price Update Rate
Updating the contract requires the wallet to pay the Gas for the transaction.

# Donatation Based Update Timeline
This contract can accept donatation, the updater address can update market 
rates at a higher frequency if there was more community support.

Times a Day | Supported Coins | Supported Fiat | Each Cost | Daily Cost | Monthly Total
----------- | --------------- | -------------- | --------- | ---------- | --------------
1           |       5         |        3       | 63,000    |   315,000  |   9,450,000
24          |       5         |        3       | 63,000    | 1,512,000  |  45,300,000
48          |       5         |        3       | 63,000    | 3,024,000  |  90,720,000

# More Examples
Some examples are not yet implemented on the current version.
```
uint256 weiAmount = (price.USD(0) * 450)       // $4.50 worth of ETH

uint256 weiAmount = (price.USD(9) * 723)       // $7.23 worth of STORJ

uint256 weiAmount = (price.USD(5) * 5793)      // $57.93 worth of LITECOIN

uint256 weiAmount = (price.USD(1) * 100000)    // $1,000 worth of BTC

uint256 weiAmount = (price.USD(0) * 10000)     // $1000 worth of ETH

uint256 weiAmount = (price.EUR(12) * 10000)    // 1000 EURO's worth of OMG
```

# Testing
```
  Contract: MarketPrice
    ✓ should insert new ETH price (48ms)
    ✓ should insert new OMG price (38ms)
    ✓ should insert new STORJ price
    ✓ should get 0.01 USD worth of ETH
    ✓ should get 0.01 EURO worth of ETH
    ✓ should get 0.01 GBP worth of ETH
    ✓ should get 0.01 USD worth of OMG
    ✓ should get $105.75 USD worth of ETH
    ✓ should get 1.00 EURO worth of STORJ
    ✓ should get $100.00 USD worth of OMG
    ✓ should change Creator address (41ms)
    ✓ should change Sender address (47ms)
    ✓ should delete STORJ token from database (43ms)
    ✓ should donate to contract
    ✓ should request to update price
    ✓ should be MarketPrice contract address
    ✓ should test $5.00 worth of ETH

  17 passing (596ms)
  ```
