import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";



export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [lastAction, setLastAction] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());

    }
  }
  const showBalance = async() => {
    if (atm) {
      getBalance();
      alert("Your balance is: " + balance);
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
      setLastAction("Deposited 1 ETH");
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
      setLastAction("Withdrew 1 ETH");
    }
  }

  const disconnect = async()=>{
    if (atm){
      setAccount(undefined)
      // setEthWallet(undefined)
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <>
      <br/>
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
      
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div className="account">
        <p >Your Account: {account}</p>
        <img  className="profile-img" src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnhoaGU3dm12bXBpOW5xNWg1czdibGw4dHh0MDFya2VuaHFxa3k4ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tHIRLHtNwxpjIFqPdV/giphy.webp" alt="ATM" />
        {/* <p>Your Balance: {balance}</p> */}
        <div>

        <button onClick={deposit} >Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <button onClick={showBalance}>Check Balance</button>
        <button onClick={disconnect}>Disconnect Wallet</button>
        </div>

        
        <p>Last Action: {lastAction}</p>



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
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1 className="sub-container">Welcome to the Vib's Metacrafters ATM!</h1></header>
      <section className="sub-section">
      {initUser()}

      </section>
      <style jsx>{`
        
        body{
          margin: 0; 
          padding: 0;
        }

        *{
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          }
        .container {
          text-align: center;
          height: 100vh;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-image: url("https://img.freepik.com/premium-photo/dark-blue-grainy-gradient-texture-background_573550-758.jpg");
          background-size: cover;
          background-repeat: no-repeat;

          
        }
        .sub-container {
          width: 100%;
          height: 100%;
          
          color: white;
        }

        .sub-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          
        }
      `}
      </style>
    </main>
  )
}
