// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;

    event ContactAdded(string name, address _address);
    event ContactRemoved(string name, address _address);

    constructor() payable {
        owner = payable(msg.sender);
    }

    struct Contact {
        string name;
        address _address;
    }

    Contact[] public contacts;

    function addContact(string memory _name, address _address) public {
        require(msg.sender == owner, "You are not the owner of this account");
        contacts.push(Contact(_name, _address));
        emit ContactAdded(_name, _address);
    }

    function removeContact(string memory _name, address _address) public {
        require(msg.sender == owner, "You are not the owner of this account");
        for (uint i = 0; i < contacts.length; i++) {
            if (keccak256(abi.encodePacked(contacts[i].name)) == keccak256(abi.encodePacked(_name)) && contacts[i]._address == _address) {
                contacts[i] = contacts[contacts.length - 1];
                contacts.pop();
                emit ContactRemoved(_name, _address);
                break;
            }
        }
    }

    function getContacts() public view returns (Contact[] memory) {
        return contacts;
    }
}
