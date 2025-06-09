import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserProvider } from 'ethers';

const Navbar = ({ setProvider }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const ethProvider = new BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setProvider(ethProvider);
        setWalletAddress(accounts[0]);
        alert(`${accounts[0]} connected`);
      } catch (err) {
        console.error('User rejected the request', err);
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  return (
    <nav className="flex justify-between p-4 bg-gray-700 text-white">
      <h1 className="text-xl font-bold">Fake Product Identifier</h1>
      <div className="flex space-x-4 items-center">
        <Link to="/Home" className="hover:underline">Home</Link>
        <Link to="/AddProduct" className="hover:underline">Add Product</Link>
        <Link to="/scan" className="hover:underline">Scan</Link>
        <button
          onClick={connectWallet}
          className="bg-white text-gray-700 px-4 py-1 rounded hover:bg-gray-300 transition"
        >
          {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
