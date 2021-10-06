//import DStorage from '../abis/DStorage.json'
import * as React from 'react';
import Web3 from 'web3';

import { Navbar } from './Navbar';
import { Main } from './Main';

import './App.css';

//Declare IPFS

export function App() {
  const [account, setAccount] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [files, setFiles] = React.useState([]);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.web3.eth.requestAccounts();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
  }

  async function loadBlockchainData() {
    const { web3 } = window;

    const [accountAddress] = await web3.eth.getAccounts();
    setAccount(accountAddress);
    //Network ID
    //IF got connection, get data from contracts
    //Assign contract
    //Get files amount
    //Load files&sort by the newest
    //Else
    //alert Error
  }

  React.useEffect(() => {
    loadWeb3().then(() => loadBlockchainData());
  }, []);

  // Get file from user
  function captureFile(event) {}

  //Upload File
  function uploadFile(description) {
    //Add file to the IPFS
    //Check If error
    //Return error
    //Set state to loading
    //Assign value for the file without extension
    //Call smart contract uploadFile function
  }

  return (
    <div>
      <Navbar account={account} />
      {loading ? (
        <div id="loader" className="text-center mt-5">
          <p>Loading...</p>
        </div>
      ) : (
        <Main files={files} captureFile={captureFile} uploadFile={uploadFile} />
      )}
    </div>
  );
}
