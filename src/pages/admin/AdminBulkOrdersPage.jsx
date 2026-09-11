import React, { useState } from 'react';
import { Package, Search, Phone, MessageSquare, Calendar, Filter, CheckCircle, Clock, Edit2, Trash2, X, Save, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

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
    name: 'Srinivas Rao (Sri Lakshmi Stores)',
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
  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('upt_bulk_orders');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return MOCK_BULK_ENQUIRIES;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', mobile: '', products: '', quantity: '', location: '', requirements: '', status: 'Pending' });
  const [isNew, setIsNew] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const saveStorage = (data) => {
    setEnquiries(data);
    localStorage.setItem('upt_bulk_orders', JSON.stringify(data));
  };

  const handleAdd = () => {
    setFormData({ name: '', mobile: '', products: '', quantity: '', location: 'Sangareddy', requirements: '', status: 'Pending' });
    setEditItem({});
    setIsNew(true);
  };

  const handleEdit = (item) => {
    setFormData({ ...item });
    setEditItem(item);
    setIsNew(false);
  };

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    const updated = enquiries.filter(e => e.id !== id);
    saveStorage(updated);
    setSuccessMsg('Enquiry deleted successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    let updated;
    if (isNew) {
      const newItem = {
        ...formData,
        id: `BLK-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().split('T')[0]
      };
      updated = [newItem, ...enquiries];
    } else {
      updated = enquiries.map(item => item.id === editItem.id ? { ...item, ...formData } : item);
    }
    saveStorage(updated);
    setEditItem(null);
    setSuccessMsg('✓ Bulk enquiry updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const toggleStatus = (id) => {
    const updated = enquiries.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'Pending' ? 'Contacted' : item.status === 'Contacted' ? 'Completed' : 'Pending';
        return { ...item, status: nextStatus };
      }
      return item;
    });
    saveStorage(updated);
  };

  const filtered = enquiries.filter(e => 
    e.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.mobile?.includes(searchTerm) || 
    e.products?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#08183A]">Bulk & Wholesale Enquiries</h1>
          <p className="text-xs text-gray-500">Manage large order and wholesale commodity enquiries</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search enquiries..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B7A2B]"
            />
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1B7A2B] hover:bg-[#156321] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Enquiry
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl shadow-xs">
          {successMsg}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                <th className="px-5 py-3.5">ID & Date</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Items & Details</th>
                <th className="px-5 py-3.5">Location</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="font-bold text-gray-900 block">{item.id}</span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-bold text-gray-900 block">{item.name}</span>
                    <a href={`tel:${item.mobile}`} className="text-[11px] text-[#1B7A2B] font-bold flex items-center gap-1 mt-0.5 hover:underline">
                      <Phone className="w-3 h-3" /> {item.mobile}
                    </a>
                  </td>
                  <td className="px-5 py-3.5 max-w-xs">
                    <p className="font-semibold text-gray-800 line-clamp-2">{item.products}</p>
                    {item.requirements && (
                      <p className="text-[10px] text-gray-400 mt-0.5 italic line-clamp-1">"{item.requirements}"</p>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 text-xs">
                    {item.location}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        item.status === 'Contacted' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status === 'Completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {item.status}
                    </button>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#1B7A2B] border border-emerald-200 rounded-lg font-bold text-xs"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <a
                        href={`https://wa.me/91${item.mobile}?text=${encodeURIComponent(`Hello ${item.name}, regarding your Bulk Order enquiry (${item.id}) at UP Traders:`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg font-bold text-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-base text-gray-900">{isNew ? 'Create New' : 'Edit'} Bulk Order Enquiry</h2>
              <button onClick={() => setEditItem(null)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Customer / Business Name</label>
                <input
                  type="text" required
                  value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-[#1B7A2B]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Phone / WhatsApp</label>
                  <input
                    type="text" required
                    value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-[#1B7A2B]"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Status</label>
                  <select
                    value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-[#1B7A2B]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Requested Products & Quantities</label>
                <textarea
                  rows={2} required
                  value={formData.products} onChange={e => setFormData({ ...formData, products: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-[#1B7A2B]"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Delivery Destination / Sangareddy Location</label>
                <input
                  type="text"
                  value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-[#1B7A2B]"
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Internal Notes & Remarks</label>
                <input
                  type="text"
                  value={formData.requirements} onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-[#1B7A2B]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditItem(null)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#1B7A2B] hover:bg-[#156321] text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
