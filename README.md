# Project Title: Crypto Address Book

This is an Address Book based on solidity, in which user can add or remove a name with their address on command.

![Description](https://drive.google.com/file/d/1v4axYMfjBvFhQe-wAGZ1MBms2mm_W7-r/view?usp=sharing)

## Description

The application has the following functionality:

* If Metamask is installed, the Button "Please connect your Metamask wallet" will be available. 
* If account is connected, three options will be available, Add Contact, Get Contacts and Disconnect Wallet
* Add Contact: To add a particular 'Name and Address' to the list
* Get Contacts: To see the list of Contacts added, along with the remove contact button.
* Disconnect Wallet: To disconnect the account associated. 

* Add Contact: This will open a popup form asking for 'Name' and 'Address'. Once fields are filled and submitted. A Contract Interaction Request will commence, once confirmed from Metamask by the user, the Contact is added to the list.
* Remove Contact: This button will be associated with the each contact Index. And will appear once 'Get Contact' is called. On clicking Remove contact, it will fetch the name and the address of that index, then another contract intreaction will take place, upon conforming the trasaction from Metamask, the 'Name' and 'Address' will be compared to the Contacts list in storage, if matched it will be replaced with the last entry and contact will be poped out.


## Getting Started

### Installing

* User can clone this repository to there local system or can dowload zip file.
* User is required to install Node.js prior before executing the program.

### Executing program / Starter Next/Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.


1. Inside the project directory, install dotenv, also create an .env file in the root folder, inside .env type:

```shell
WALLET_PRIVATE_KEY = <enter your private key here> 
SEPOLIA_URL = "enter your url your here"

```
**note: ensure your .gitignore file has .env in it**

2. Inside the project directory, in the terminal type:

```shell
npm i
```
3. Open two additional terminals in your VS code
4. In the second terminal type: 

```shell
npx hardhat node
```
5. In the third terminal, type: 

```shell
npx hardhat run --network localhost scripts/sepolia.js
```
6. Back in the first terminal, to launch the front-end enter the command:

```shell
npm run dev
```
After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Help

To Understand the Hardhat commands on can use this command in terminal:

```
npx hardhat help
```

## Authors

* Name: Vibhansh Alok
* MetacrafterID: RuffledZest (vibhanshalok@gmail.com)
* Loom Video Link: https://www.loom.com/share/4eefa1aff70a42508106374801b3e69d


## License

This project is licensed under the MIT License - see the LICENSE.md file for details.