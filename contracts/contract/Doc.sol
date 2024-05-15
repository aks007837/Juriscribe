// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Doc {
  mapping(address=>string[]) value;
  function add(address _user,string memory url) external {
      value[_user].push(url);
  }

}
