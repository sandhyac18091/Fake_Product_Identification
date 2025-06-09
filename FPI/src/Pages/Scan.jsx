import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import QRCode from 'qrcode';

const ScannerPage = () => {
  const [scannedData, setScannedData] = useState('');
  const [status, setStatus] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        setScannedData(decodedText);
        verifyProduct(decodedText);
      },
      (error) => {
        console.warn(error);
        setStatus('Camera access error. Please allow permission.');
      }
    );

    return () => {
      scanner.clear().catch((err) => console.error('Scanner cleanup error:', err));
    };
  }, []);

  
  const verifyProduct = async (productId) => {
   
    setStatus('Verifying...');
    setProductDetails(null);
    setQrCodeUrl('');

    
    const fakeDB = {
      valid123: {
        manufacturerId: 101,
        productName: 'Smart Watch',
        productBrand: 'TimeX',
        productDescription: 'Next-gen smartwatch with health tracking',
      },
      valid456: {
        manufacturerId: 102,
        productName: 'Wireless Earbuds',
        productBrand: 'SoundMax',
        productDescription: 'Noise-cancelling wireless earbuds',
      },
    };

    if (fakeDB[productId]) {
      setStatus('✅ This product is Genuine.');
      setProductDetails(fakeDB[productId]);

     
      const infoText = `Product: ${fakeDB[productId].productName}\nBrand: ${fakeDB[productId].productBrand}\nDescription: ${fakeDB[productId].productDescription}\nManufacturer ID: ${fakeDB[productId].manufacturerId}\nProduct ID: ${productId}`;

      
      try {
        const url = await QRCode.toDataURL(infoText);
        setQrCodeUrl(url);
      } catch (err) {
        console.error('QR code generation error:', err);
      }
    } else {
      setStatus('❌ This product is Fake.');
      setProductDetails(null);
      setQrCodeUrl('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0d1e] text-white flex flex-col items-center p-8">
      <h1 className="text-lg font-semibold text-purple-400 underline mb-4">Scan Product</h1>
      <p className="text-sm max-w-2xl text-center mb-6">
        Scan the QR code found on the product to verify its authenticity using blockchain data.
      </p>

      <div className="bg-[#1b1a2e] p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <div id="reader" />

        {scannedData && (
          <p className="text-sm text-gray-300">
            Scanned Data: <span className="text-pink-400">{scannedData}</span>
          </p>
        )}

        {status && <p className="text-lg font-bold">{status}</p>}

        {productDetails && (
          <div className="mt-4 space-y-1 text-gray-200">
            <p><strong>Product Name:</strong> {productDetails.productName}</p>
            <p><strong>Brand:</strong> {productDetails.productBrand}</p>
            <p><strong>Description:</strong> {productDetails.productDescription}</p>
            <p><strong>Manufacturer ID:</strong> {productDetails.manufacturerId}</p>
          </div>
        )}

        {qrCodeUrl && (
          <div className="mt-4 flex justify-center">
            <img src={qrCodeUrl} alt="Product QR Code" className="w-48 h-48" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScannerPage;
