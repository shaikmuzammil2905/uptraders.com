import React, { useState } from 'react';
import { Sparkles, Search, Phone, MessageSquare, Calendar, CheckCircle, Clock } from 'lucide-react';

const MOCK_FUNCTION_ENQUIRIES = [
  {
    id: 'FNC-2001',
    name: 'K. Venkatesh',
    mobile: '9849011223',
    functionType: 'Marriage Function',
    date: '2026-10-15',
    products: 'Complete grocery list for 500 guests (Rice, Dals, Cooking Oils, Spices, Ghee)',
    quantity: 'Full Marriage Package',
    location: 'SMR Garden, Sangareddy',
    requirements: 'Doorstep morning delivery required 1 day prior.',
    status: 'Pending'
  },
  {
    id: 'FNC-2002',
    name: 'M. Anitha',
    mobile: '9123456789',
    functionType: 'Housewarming (Gruhapravesam)',
    date: '2026-09-28',
    products: 'Dry Fruits, Pooja Essentials, Specialty Rice, Ghee, Sugar',
    quantity: 'For 150 guests',
    location: 'Tara Degree College Road, Sangareddy',
    requirements: 'Need premium quality Basmati & pure Cow Ghee.',
    status: 'Contacted'
  }
];

export function AdminFunctionOrdersPage() {
  const [enquiries, setEnquiries] = useState(MOCK_FUNCTION_ENQUIRIES);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleStatus = (id) => {
    setEnquiries(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'Pending' ? 'Contacted' : item.status === 'Contacted' ? 'Confirmed' : 'Pending';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const filtered = enquiries.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.mobile.includes(searchTerm) || 
    e.functionType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#08183A] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" /> Function & Event Enquiries
          </h1>
          <p className="text-sm text-gray-600">Manage marriage and special occasion bulk grocery requirements</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search function enquiries..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">ID & Event Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Event & Items</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-[#08183A] block">{item.id}</span>
                    <span className="text-xs text-amber-600 font-semibold flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" /> Event: {item.date}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900 block">{item.name}</span>
                    <a href={`tel:${item.mobile}`} className="text-xs text-brand-green font-medium flex items-center gap-1 mt-0.5 hover:underline">
                      <Phone className="w-3 h-3" /> {item.mobile}
                    </a>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <span className="inline-block bg-amber-50 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-md mb-1">
                      {item.functionType}
                    </span>
                    <p className="font-medium text-gray-800 line-clamp-2">{item.products}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-xs max-w-[150px] truncate">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      item.status === 'Contacted' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status === 'Confirmed' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Next Status
                    </button>
                    <a
                      href={`https://wa.me/91${item.mobile}?text=${encodeURIComponent(`Hello ${item.name}, regarding your ${item.functionType} grocery order enquiry (${item.id}) at UP Traders:`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
