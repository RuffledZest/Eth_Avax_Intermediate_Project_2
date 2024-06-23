# Crypto Address Book

This is an Address Book based on solidity, in which user can add or remove a name with their address on command.

## Description

The application has the following functionality:

* If Metamask is installed, the Button "Please connect your Metamask wallet" will be available. 
* If account is connected, three options will be available, Add Contact, Get Contacts and Disconnect Wallet
* Add Contact: To add a particular 'Name and Address' to the list
* Get Contacts: To see the list of Contacts added, along with the remove contact button.
* Disconnect Wallet: To disconnect the account associated. 

* Add Contact: This will open a popup form asking for 'Name' and 'Address'. Once fields are filled and submitted. A Contract Interaction Request will commence, once confirmed from Metamask by the user, the Contact is added to the list.
* Any modifications needed to be made to files/fold

# Starter Next/Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

