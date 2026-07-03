import { Search, MapPin, Truck, Package, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';

// Mock data for the 3 specific tracking IDs
const TRACKING_DATA = {
  '7G2K9L4P1W8X5M0Q3R6N': {
    status: 'Delivered',
    location: 'New York, NY 10001',
    date: 'March 3, 2026',
    time: '10:42 AM',
    carrier: 'USPS',
    service: 'Priority Mail Express 1-Day',
    history: [
      { status: 'Delivered, In/At Mailbox', location: 'NEW YORK, NY 10001', time: '10:42 AM', date: 'March 3' },
      { status: 'Out for Delivery', location: 'NEW YORK, NY 10001', time: '8:15 AM', date: 'March 3' },
      { status: 'Arrived at Post Office', location: 'NEW YORK, NY 10001', time: '6:30 AM', date: 'March 3' },
      { status: 'Departed USPS Regional Facility', location: 'NY METRO DISTRIBUTION CENTER', time: '4:00 AM', date: 'March 3' },
    ],
    progress: 4 // 0-4
  },
  'B4V9Z1H6K3M8P2Q5W7Y0': {
    status: 'In Transit',
    location: 'Sao Paulo, Brazil',
    date: 'July 2, 2026',
    time: 'On Time',
    carrier: 'USPS',
    service: 'Priority Mail 14-Day',
    history: [
	  { status: 'Departed via international flight.', location: 'FRANKFURT, GERMANY', time: '10:30 AM', date: 'July 3' },
	  { status: 'Arrived at Frankfurt Airport Cargo Terminal.', location: 'FRANKFURT, GERMANY', time: '6:30 AM', date: 'July 3' },
	  { status: 'Cleared Belgian export customs', location: 'BRUSSELS, BELGIUM', time: '10:30 PM', date: 'July 2' },
	  { status: 'Arrived at BRUSSELS, BELGIUM NETWORK DISTRIBUTION CENTER', location: 'BRUSSELS, BELGIUM NETWORK DISTRIBUTION CENTER', time: '9:30 PM', date: 'July 2' },
      { status: 'In Transit to Next Facility', location: 'BRUSSELS, BELGIUM NETWORK DISTRIBUTION CENTER', time: '7:00 PM', date: 'July 2' },
      { status: 'Departed Antwerp International Sorting Center', location: 'ANTWERP, BELGIUM NETWORK DISTRIBUTION CENTER', time: '5:45 PM', date: 'July 2' },
      { status: 'Shipment accepted at local post office.', location: 'ANTWERP, BELGIUM NETWORK DISTRIBUTION CENTER', time: '5:20 AM', date: 'July 2' },
    ],
    progress: 2
  },
  '5X8T2N1J9K4L6M3Q7R0P': {
    status: 'Out for Delivery',
    location: 'Los Angeles, CA 90012',
    date: 'March 3, 2026',
    time: 'By 8:00 PM',
    carrier: 'USPS',
    service: 'First-Class Package Service',
    history: [
      { status: 'Out for Delivery', location: 'LOS ANGELES, CA 90012', time: '9:10 AM', date: 'March 3' },
      { status: 'Arrived at Post Office', location: 'LOS ANGELES, CA 90012', time: '7:45 AM', date: 'March 3' },
      { status: 'Departed USPS Regional Facility', location: 'LOS ANGELES CA DISTRIBUTION CENTER', time: '4:30 AM', date: 'March 3' },
    ],
    progress: 3
  }
};

export default function App() {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    // Simulate network delay
    setTimeout(() => {
      const data = TRACKING_DATA[trackingId.trim() as keyof typeof TRACKING_DATA];
      if (data) {
        setResult(data);
      } else {
        setError('Status Not Available. The tracking number may be incorrect or the status update is not yet available.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-[#333366] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-sm">
              <Truck className="h-6 w-6 text-[#333366]" />
            </div>
            <span className="font-bold text-xl tracking-tight">USPS TRACKING®</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-200">
            <a href="#" className="hover:text-white transition-colors">Quick Tools</a>
            <a href="#" className="hover:text-white transition-colors">Send</a>
            <a href="#" className="hover:text-white transition-colors">Receive</a>
            <a href="#" className="hover:text-white transition-colors">Shop</a>
            <a href="#" className="hover:text-white transition-colors">Business</a>
            <a href="#" className="hover:text-white transition-colors">International</a>
            <a href="#" className="hover:text-white transition-colors">Help</a>
          </nav>
        </div>
      </header>

      {/* Hero / Search Section */}
      <div className="bg-white border-b border-gray-200 pb-12 pt-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl font-bold text-[#333366] mb-2">Track a Package</h1>
          <p className="text-gray-600 mb-8">Enter your tracking number to see the status of your delivery.</p>
          
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
            <div className="flex shadow-sm rounded-md overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-[#333366] focus-within:border-[#333366] transition-all">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Tracking Number"
                className="flex-1 px-4 py-3 outline-none text-lg text-gray-900 placeholder-gray-400"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-[#333366] text-white px-6 py-3 font-semibold hover:bg-[#2a2a54] transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Track <Search className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
            {error && (
              <div 
                className="absolute top-full left-0 right-0 mt-3 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2 text-red-700 text-sm text-left animate-fade-in"
              >
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <main 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in"
        >
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Left Column: Status & History */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Status Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Tracking Number: <span className="text-[#333366] font-bold">{trackingId}</span></span>
                    <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{result.service}</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-8">
                      <div className={`p-3 rounded-full ${result.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {result.status === 'Delivered' ? <CheckCircle className="h-8 w-8" /> : <Truck className="h-8 w-8" />}
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${result.status === 'Delivered' ? 'text-green-700' : 'text-[#333366]'}`}>
                          {result.status}
                        </h2>
                        <p className="text-gray-600 mt-1">
                          {result.status === 'Delivered' 
                            ? `Your item was delivered in or at the mailbox at ${result.time} on ${result.date} in ${result.location}.`
                            : `Your item is currently ${result.status.toLowerCase()} to the destination as of ${result.time} on ${result.date}.`
                          }
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative mb-10 px-4">
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
                      <div 
                        className="absolute top-1/2 left-0 h-1 bg-[#333366] -translate-y-1/2 z-0 transition-all duration-1000" 
                        style={{ width: `${(result.progress / 4) * 100}%` }}
                      />
                      
                      <div className="relative z-10 flex justify-between w-full">
                        {['Accepted', 'In Transit', 'Out for Delivery', 'Delivered'].map((step, index) => {
                          const isCompleted = index <= result.progress;
                          const isCurrent = index === result.progress;
                          
                          return (
                            <div key={step} className="flex flex-col items-center gap-2">
                              <div className={`w-4 h-4 rounded-full border-2 ${isCompleted ? 'bg-[#333366] border-[#333366]' : 'bg-white border-gray-300'}`} />
                              <span className={`text-xs font-medium ${isCurrent ? 'text-[#333366] font-bold' : 'text-gray-500'}`}>{step}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* History */}
                    <div className="border-t border-gray-100 pt-8 mt-8">
                      <h3 className="font-bold text-[#333366] text-lg mb-6 flex items-center gap-2">
                        <Clock className="h-5 w-5" /> Tracking History
                      </h3>
                      <div className="relative pl-4 ml-2 space-y-8 border-l-2 border-gray-200">
                        {result.history.map((event: any, idx: number) => (
                          <div key={idx} className="relative pl-6">
                            <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 ${idx === 0 ? 'bg-[#333366] border-[#333366]' : 'bg-white border-gray-300'}`} />
                            <p className="font-bold text-gray-900 text-base">{event.status}</p>
                            <p className="text-sm text-gray-600 mt-1">{event.date}, {event.time}</p>
                            {event.location && <p className="text-xs font-medium text-gray-400 uppercase mt-1 tracking-wide">{event.location}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Map & Details */}
              <div className="space-y-6">
                
                {/* Map */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold text-[#333366] flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Live Location
                    </h3>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 animate-pulse">
                      Live Update
                    </span>
                  </div>
                  
                  <div className="aspect-square bg-gray-100 relative group min-h-[300px] overflow-hidden">
                    <iframe
                      title="Live Package Location"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: '300px' }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={
                        trackingId === 'B4V9Z1H6K3M8P2Q5W7Y0'
                          ? "https://maps.google.com/maps?q=Brussels,Belgium+to+Sao+Paulo,Brazil&t=m&z=3&ie=UTF8&iwloc=&output=embed"
                          : `https://maps.google.com/maps?q=${encodeURIComponent(result.location)}&t=m&z=13&ie=UTF8&iwloc=&output=embed`
                      }
                    />
                  </div>
                </div>

                {/* Additional Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                   <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-bold text-[#333366] flex items-center gap-2">
                      <Package className="h-4 w-4" /> Product Information
                    </h3>
                  </div>
                  <div className="p-4 space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Postal Product:</span>
                      <span className="font-medium text-gray-900">{result.service}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Features:</span>
                      <span className="font-medium text-gray-900">USPS Tracking®</span>
                    </div>
                     <div className="flex justify-between py-2">
                      <span className="text-gray-500">Carrier:</span>
                      <span className="font-medium text-gray-900">{result.carrier}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </main>
        )}

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-auto py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p className="mb-4">&copy; 2026 USPS. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">FOIA</a>
            <a href="#" className="hover:underline">No FEAR Act EEO Data</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
