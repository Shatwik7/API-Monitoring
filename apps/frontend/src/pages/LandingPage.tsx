import { useEffect, useState } from 'react';
// import bg from "../assets/bg.jpg";


export default function LandingPage() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Spot', 'Resolve', 'Prevent'];

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000); // Change word every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <header className="py-6 px-8 flex justify-between items-center">
        <div className="text-3xl font-bold">Sentinel</div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features" className="hover:text-indigo-400">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-indigo-400">How it Works</a></li>
            <li><a href="#pricing" className="hover:text-indigo-400">Pricing</a></li>
            <li><a href="#contact" className="hover:text-indigo-400">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat text-white text-center px-6"
              /* style={{ backgroundImage: `url(${bg})` }}*/>
        <h1 className="mt-3 hero-text inline-block text-transparent font-semibold tracking-tight text-[60px] sm:text-[100px] lg:text-[115px] leading-[88%]">
          <div className="relative js-slide grid text-white">
            {words.map((word, index) => (
              <span
                key={index}
                className={`absolute transition-all duration-700 ease-in-out ${
                  index === currentWord
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-full'
                }`}
                style={{ gridArea: '1 / 1' }}
              >
                {word}
              </span>
            ))}
          </div>
          downtime.
        </h1>
        <p className="text-xl max-w-2xl mt-6">
          Sentinel helps you monitor, spot, and prevent API downtimes with real-time insights, alerts, and comprehensive analytics.
        </p>
        <button className="mt-8 bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-8 rounded-lg font-semibold shadow-lg">
          Sign Up Now
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900 text-white">
  <h2 className="text-5xl font-extrabold text-center mb-16">Features</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-6">
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-xl text-center shadow-lg transform hover:scale-105 transition duration-300">
      <h3 className="text-2xl font-semibold mb-4">Real-Time Monitoring</h3>
      <p className="text-gray-200">Monitor your APIs in real-time with powerful analytics and alerts.</p>
    </div>
    <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8 rounded-xl text-center shadow-lg transform hover:scale-105 transition duration-300">
      <h3 className="text-2xl font-semibold mb-4">Comprehensive Alerts</h3>
      <p className="text-gray-200">Get instant notifications for any service interruptions or errors.</p>
    </div>
    <div className="bg-gradient-to-r from-pink-600 to-red-600 p-8 rounded-xl text-center shadow-lg transform hover:scale-105 transition duration-300">
      <h3 className="text-2xl font-semibold mb-4">Detailed Analytics</h3>
      <p className="text-gray-200">Deep insights into API performance to prevent issues before they arise.</p>
    </div>
  </div>
</section>


      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gray-900 text-white">
  <h2 className="text-5xl font-extrabold text-center text-indigo-400 mb-20">How It Works</h2>
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 px-8">
    <div className="flex flex-col items-center text-center p-8 bg-gradient-to-b from-gray-800 to-gray-700 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-indigo-600 text-white text-3xl font-bold shadow-md">1</div>
      <h3 className="text-3xl font-semibold mb-4">Setup</h3>
      <p className="text-gray-300 mb-4">Connect your APIs to Sentinel in just a few steps.</p>
      <img src="setup-icon.svg" alt="Setup Icon" className="w-12 h-12 mt-4 opacity-80 hover:opacity-100 transition-opacity duration-300"/>
    </div>
    <div className="flex flex-col items-center text-center p-8 bg-gradient-to-b from-gray-800 to-gray-700 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-green-500 text-white text-3xl font-bold shadow-md">2</div>
      <h3 className="text-3xl font-semibold mb-4">Monitor</h3>
      <p className="text-gray-300 mb-4">Get real-time metrics and monitor your API performance.</p>
      <img src="monitor-icon.svg" alt="Monitor Icon" className="w-12 h-12 mt-4 opacity-80 hover:opacity-100 transition-opacity duration-300"/>
    </div>
    <div className="flex flex-col items-center text-center p-8 bg-gradient-to-b from-gray-800 to-gray-700 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-red-500 text-white text-3xl font-bold shadow-md">3</div>
      <h3 className="text-3xl font-semibold mb-4">Alert</h3>
      <p className="text-gray-300 mb-4">Receive alerts when there are issues and resolve them quickly.</p>
      <img src="alert-icon.svg" alt="Alert Icon" className="w-12 h-12 mt-4 opacity-80 hover:opacity-100 transition-opacity duration-300"/>
    </div>
  </div>
</section>



      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
          <div className="bg-gray-800 p-8 rounded-xl text-center shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Free</h3>
            <p className="text-xl mb-6">$0 / month</p>
            <p>Basic monitoring and alerting for up to 5 APIs.</p>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg mt-6">
              Sign Up
            </button>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl text-center shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Pro</h3>
            <p className="text-xl mb-6">$29 / month</p>
            <p>Advanced monitoring for up to 50 APIs, with detailed analytics.</p>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg mt-6">
              Get Pro
            </button>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl text-center shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Enterprise</h3>
            <p className="text-xl mb-6">Custom Pricing</p>
            <p>Custom solutions for large-scale API monitoring.</p>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg mt-6">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-gray-500 text-center">
        <p>&copy; 2024 Sentinel. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">LinkedIn</a>
          <a href="#" className="hover:text-white">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
