import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-[#1b1a2e] min-h-screen text-white">
      <section className="text-center py-20 px-6">
        <h2 className="text-5xl font-extrabold text-purple-400 mb-4">Verify Product Authenticity</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
          Scan QR codes or serial numbers to ensure your product is genuine and safe.
        </p>
        <Link to="/Scan">
          <button className="bg-purple-600 hover:bg-purple-700 transition px-8 py-3 rounded-lg text-white text-lg shadow-md">
            Start Scanning
          </button>
        </Link>
      </section>

      <section className="py-16 px-8 bg-[#272343]">
        <h3 className="text-3xl font-bold mb-12 text-center text-pink-300">Why Choose Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-6 bg-[#1f1d2e] rounded-lg shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-3 text-purple-400">Real-Time Scanning</h4>
            <p className="text-gray-300">Detect fake products instantly with our smart QR scanning system.</p>
          </div>
          <div className="p-6 bg-[#1f1d2e] rounded-lg shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-3 text-purple-400">Blockchain Secured</h4>
            <p className="text-gray-300">All records are stored immutably for maximum security and transparency.</p>
          </div>
          <div className="p-6 bg-[#1f1d2e] rounded-lg shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-3 text-purple-400">Easy to Use</h4>
            <p className="text-gray-300">Simple interface designed for consumers, retailers, and manufacturers alike.</p>
          </div>
        </div>
      </section>

      <footer className="bg-[#101020] text-center py-6 mt-12">
        <p className="text-sm text-gray-400">© 2025 Fake Product Identifier. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
