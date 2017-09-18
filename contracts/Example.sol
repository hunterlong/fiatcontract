pragma solidity 0.4.15;

/*

    Crypto Price Example Contract

    This contract will force the sender to send $5.00 USD
    worth of STORJ in ETH. If the sender sends the correct
    amount in ETH, then the contract will send $5.00 of
    STORJ tokens to the sender.

    $5.00 in ETH => Sends $5.00 of STORJ tokens

*/

import "./MarketPriceAPI.sol";

contract Example {

    MarketPriceAPI public price;
    event NewPayment(address sender, uint256 amount);

    function Example(address marketPriceContract) {
        price = MarketPriceAPI(marketPriceContract);
    }

    // returns $5.00 worth of STORJ in ETH wei.
    function FiveETHUSD() constant returns (uint256) {
        // returns $0.01 of STORJ in ETH wei
        uint256 ethCent = price.USD(0);
        // $0.01 * 500 = $5.00
        return ethCent * 500;
    }

    function PriceAddress() constant returns (address) {
        return price;
    }

}
