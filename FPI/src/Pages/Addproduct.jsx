import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import QRCode from 'qrcode';
import abi from '../assets/Product.json';
import address from '../assets/deployed_address.json';

function App() {
  const [form, setForm] = useState({
    serialNumber: '',
    manufacturerId: '',
    productName: '',
    productBrand: '',
    productDescription: ''
  });
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [output, setOutput] = useState('');

  const provider = new BrowserProvider(window.ethereum);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const signer = await provider.getSigner();
      const contract = new Contract(address['ProductModule#ProductRegistry'], abi.abi, signer);

      const tx = await contract.addProduct(
        form.serialNumber,
        BigInt(form.manufacturerId),
        form.productName,
        form.productBrand,
        form.productDescription
      );

      await tx.wait();
      alert(`Transaction successful: ${tx.hash}`);

      const qr = await QRCode.toDataURL(form.serialNumber);
      setQrCodeDataUrl(qr);
    } catch (err) {
      console.error(err);
      alert('Error adding product. Please check details.');
      setQrCodeDataUrl('');
    }
  }

  async function handleFetch() {
    try {
      const serialNum = document.getElementById('fetchSerialNumber').value;
      const signer = await provider.getSigner();
      const contract = new Contract(address['ProductModule#ProductRegistry'], abi.abi, signer);
      const result = await contract.products(serialNum);

      const details = `
        Serial Number: ${serialNum}
        Manufacturer ID: ${result.manufacturerId}
        Name: ${result.productName}
        Brand: ${result.productBrand}
        Description: ${result.productDescription}
      `;

      setOutput(details);
    } catch (err) {
      console.error(err);
      alert('Error fetching product.');
      setOutput('');
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0d1e] text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">Product Registry</h1>

     

      <form
        onSubmit={handleSubmit}
        className="bg-[#1b1a2e] p-6 rounded shadow-lg w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-purple-400 mb-4 text-center">Add Product</h2>

        <input
          name="serialNumber"
          value={form.serialNumber}
          onChange={handleChange}
          placeholder="Serial Number"
          className="w-full h-12 text-base p-3 border border-pink-500 bg-transparent rounded-lg"
          required
        />

        <input
          name="manufacturerId"
          value={form.manufacturerId}
          onChange={handleChange}
          placeholder="Manufacturer ID"
          className="w-full h-12 text-base p-3 border border-pink-500 bg-transparent rounded-lg"
          required
        />

        <input
          name="productName"
          value={form.productName}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full h-12 text-base p-3 border border-pink-500 bg-transparent rounded-lg"
          required
        />

        <input
          name="productBrand"
          value={form.productBrand}
          onChange={handleChange}
          placeholder="Product Brand"
          className="w-full h-12 text-base p-3 border border-pink-500 bg-transparent rounded-lg"
          required
        />

        <input
          name="productDescription"
          value={form.productDescription}
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full h-12 text-base p-3 border border-pink-500 bg-transparent rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full h-12 bg-purple-500 rounded hover:bg-purple-600 text-lg"
        >
          Add Product
        </button>
      </form>

      {qrCodeDataUrl && (
        <div className="mt-8 bg-[#1b1a2e] p-6 rounded shadow-lg max-w-md text-center">
          <h3 className="text-purple-400 mb-4 font-semibold">Product QR Code</h3>
          <img src={qrCodeDataUrl} alt="QR Code" className="mx-auto mb-4" />
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = qrCodeDataUrl;
              link.download = `product-${form.serialNumber}.png`;
              link.click();
            }}
            className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded text-white"
          >
            Download QR Code
          </button>
        </div>
      )}

      
    </div>
  );
}

export default App;
