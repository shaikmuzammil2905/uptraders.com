import React, { useState } from 'react';
import { Package, Search, Phone, MessageSquare, Calendar, Filter, CheckCircle, Clock } from 'lucide-react';

const MOCK_BULK_ENQUIRIES = [
  {
    id: 'BLK-1001',
    name: 'Ramesh Reddy',
    mobile: '9848022338',
    products: 'Basmati Rice (25kg x 10 bags), Sunflower Oil (15L x 5 cans), Sugar (50kg)',
    quantity: 'Approx 350 kg total',
    location: 'Malkapur X Road, Sangareddy',
    requirements: 'Need delivery by Saturday morning for a family function.',
    date: '2026-09-09',
    status: 'Pending'
  },
  {
    id: 'BLK-1002',
    name: 'Srinivas Rao',
    mobile: '9440123456',
    products: 'Toor Dal (50kg), Chana Dal (25kg), Whole Spices Pack',
    quantity: '100 kg',
    location: 'Near New Bus Stand, Sangareddy',
    requirements: 'Best bulk price discount requested.',
    date: '2026-09-08',
    status: 'Contacted'
  }
];

export function AdminBulkOrdersPage() {
  const [enquiries, setEnquiries] = useState(MOCK_BULK_ENQUIRIES);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleStatus = (id) => {
    setEnquiries(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'Pending' ? 'Contacted' : item.status === 'Contacted' ? 'Completed' : 'Pending';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const filtered = enquiries.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.mobile.includes(searchTerm) || 
    e.products.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#08183A]">Bulk Order Enquiries</h1>
          <p className="text-sm text-gray-600">Manage large order and wholesale enquiries from customers</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search enquiries..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">ID & Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items & Details</th>
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
                    <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900 block">{item.name}</span>
                    <a href={`tel:${item.mobile}`} className="text-xs text-brand-green font-medium flex items-center gap-1 mt-0.5 hover:underline">
                      <Phone className="w-3 h-3" /> {item.mobile}
                    </a>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="font-medium text-gray-800 line-clamp-2">{item.products}</p>
                    {item.requirements && (
                      <p className="text-xs text-gray-500 mt-1 italic line-clamp-1">"{item.requirements}"</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-xs max-w-[150px] truncate">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      item.status === 'Contacted' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status === 'Completed' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
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
                      href={`https://wa.me/91${item.mobile}?text=${encodeURIComponent(`Hello ${item.name}, regarding your Bulk Order enquiry (${item.id}) at UP Traders:`)}`}
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
