pragma solidity 0.4.15;

/*

    Crypto Price Example Contract with FiatContract.com

    This contract will force the sender to send $5.00 USD
    worth of ETH.

*/

contract FiatContract {
  function ETH(uint _id) constant returns (uint256);
  function USD(uint _id) constant returns (uint256);
  function EUR(uint _id) constant returns (uint256);
  function GBP(uint _id) constant returns (uint256);
  function updatedAt(uint _id) constant returns (uint);
}

contract Example {

    FiatContract public price;
    event NewPayment(address sender, uint256 amount);

    function Example(address marketPriceContract) {
        price = FiatContract(marketPriceContract);
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
