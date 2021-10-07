import * as React from 'react';
import Web3 from 'web3';
import ipfsClient from 'ipfs-http-client';

import { Navbar } from './Navbar';
import { Main } from './Main';

import DStorage from '../abis/DStorage.json';

import './App.css';

const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});

export function App() {
  const [account, setAccount] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [dStorageContract, setDStorageContract] = React.useState(null);
  const [filesCount, setFilesCount] = React.useState(0);
  const [buffer, setBuffer] = React.useState(null);
  const [type, setType] = React.useState('');
  const [name, setName] = React.useState('');

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

    const networkId = await web3.eth.net.getId();
    const networkData = DStorage.networks[networkId];

    if (networkData) {
      const dStorage = new web3.eth.Contract(DStorage.abi, networkData.address);
      setDStorageContract(dStorage);

      const incomingFilesCount = await dStorage.methods.fileCount().call();
      setFilesCount(incomingFilesCount);

      for (let i = incomingFilesCount; i >= 1; i--) {
        const file = await dStorage.methods.files(i).call();
        setFiles(state => [...state, file]);
      }
    } else {
      window.alert('DStorage contract not deployed to detected network.');
    }
  }

  React.useEffect(() => {
    loadWeb3().then(() => loadBlockchainData());
  }, []);

  function captureFile(event) {
    event.preventDefault();

    const [file] = event.target.files;
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
      setType(file.type);
      setName(file.name);
    };
  }

  function uploadFile(description) {
    if (!buffer) {
      return;
    }

    setLoading(true);

    ipfs.add(buffer, (err, result) => {
      if (err) {
        console.error('Error while uploading to IPFS', err);
        return;
      }

      if (!dStorageContract) {
        return;
      }

      const fileType = type === '' ? 'none' : type;

      dStorageContract.methods
        .uploadFile(result[0].hash, result[0].size, fileType, name, description)
        .send({ from: account })
        .on('transactionHash', () => {
          setLoading(false);
          window.location.reload();
        })
        .on('error', e => {
          window.alert(e);
          setLoading(false);
        });
    });
  }

  return (
    <div>
      <Navbar account={account} />
      {loading ? (
        <div id="loader" className="text-center mt-5">
          <p>Loading...</p>
        </div>
      ) : (
        <Main
          files={files}
          fileCount={filesCount}
          captureFile={captureFile}
          uploadFile={uploadFile}
        />
      )}
    </div>
  );
}
