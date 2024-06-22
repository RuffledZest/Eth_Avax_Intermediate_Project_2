import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts[0]);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts[0]);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (name && address) {
      addContact(name, address);
      setName("");
      setAddress("");
      setButtonPopup(false);
    } else {
      alert("There is some error");
    }
  };

  function Popup(props) {
    return (props.trigger) ? (
      <div className="popup">
        <form className="popup" onSubmit={submitForm}>
          <div className="popup-inner">
              <h2>ADD CONTACT</h2>
            <div>
              <label htmlFor='text'>Name: </label>
              <br />
              <input type="text" value={name} autoComplete='off' onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor='address'>Address: </label>
              <br />
              <input type="text" value={address} autoComplete='off' onChange={(e) => setAddress(e.target.value)} />
            </div>
            <button type='submit'>Add Contact</button>
            <button className="close-btn" onClick={() => setButtonPopup(false)} >Close</button>
            {props.children}
          </div>
        </form>
        <style jsx>{`
          .popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.7);
            color: black;
            display: flex;

            justify-content: center;
            align-items: center;
          }
          .popup-inner {
            position: relative;
            padding: 20px;
            width: 60%;
            color: white;

            background-image: url('https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
          }
          input {
              width: 100vh;
              padding: 10px;
              border-radius: 10px;
          }
          .close-btn {
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 0 5px 0 5px;
            background: red;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
          }
            button {
              background-color: #25217e;
              color: white;
              border: 2px solid white;
              border-radius: 5px;
              padding: 10px 20px;
              margin: 10px;
              cursor: pointer;
              transition: 0.3s;
            }
            button:hover {
              background-color: black;
              color: white;
              scale: 1.1;
            }
        `}</style>
      </div>
    ) : "";
  }

  const addContact = async (name, address) => {
    if (atm) {
      await atm.addContact(name, address);
      alert("Contact added!");
      getContacts();
    }
  };

  const getContacts = async () => {
    if (atm) {
      const cont = await atm.getContacts();
      setContacts(cont);
    }
  };

  const showAllContacts = () => {
    return (
      contacts.map((contact, index) => (
        <div key={index}>
          <h1>Name is: {contact[0]}: Address is:{contact[1]}
            <button onClick={removeContact(contact)}>Remove</button>
          </h1>
          <style jsx>{`
            h1 {
              color: white;
            }
          `}</style>
        </div>
      ))
    );
  };

  const removeContact = (contact) => {
    return async () => {
      if (atm) {
        await atm.removeContact(contact[0], contact[1]);
        alert("Contact removed!");
        getContacts();
      }
    };
  }




  const disconnect = async () => {
    if (atm) {
      setAccount(undefined);
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return (
        <>
          <br />
          <button onClick={connectAccount}>Please connect your Metamask wallet</button>
          <style jsx>{`
            button {
              background-color: #25217e;
              color: white;
              border: 2px solid white;
              border-radius: 5px;
              padding: 10px 20px;
              margin: 10px;
              cursor: pointer;
              transition: 0.3s;
            }
            button:hover {
              background-color: black;
              color: white;
              scale: 1.1;
            }
          `}</style>
        </>
      );
    }

    return (
      <>
        <div className="account">
          <p className="account-no">Your Account: {account}</p>
          <img className="profile-img" src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnhoaGU3dm12bXBpOW5xNWg1czdibGw4dHh0MDFya2VuaHFxa3k4ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tHIRLHtNwxpjIFqPdV/giphy.webp" alt="ATM" />
          <div>
            <button onClick={() => setButtonPopup(true)}>Add Contact</button>
            <button onClick={() => { getContacts(); setShowContacts(!showContacts); }}>Get Contacts</button>
            <button onClick={disconnect}>Disconnect Wallet</button>
            <section>
              {showContacts && showAllContacts()}
            </section>
          </div>
          <style jsx>{`
            .profile-img {
              border-radius: 50%;
            }
            .account {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              gap: 20px;
              align-items: center;
            }
            .account-no {
              color: white;
            }
            button {
              background-color: #25217e;
              color: white;
              border: 2px solid white;
              border-radius: 5px;
              padding: 10px 20px;
              margin: 10px;
              cursor: pointer;
              transition: 0.3s;
            }
            button:hover {
              background-color: black;
              color: white;
              scale: 0.9;
            }
          `}</style>
        </div>
      </>
    );
  };

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Vib's Crypto Address Book</h1></header>
      {initUser()}
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3>My popup</h3>
      </Popup>
      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background-image: url('https://img.freepik.com/premium-photo/dark-blue-grainy-gradient-texture-background_573550-758.jpg');
          background-size: cover;
          background-repeat: no-repeat;
          justify-content: center;
          align-items: center;
        }
        h1 {
          color: white;
        }
      `}</style>
    </main>
  );
}
