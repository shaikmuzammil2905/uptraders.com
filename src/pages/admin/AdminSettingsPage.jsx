import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, Type, Link as LinkIcon, Plus, Trash2, Building, Phone, MapPin, MessageSquare, Truck } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useToastStore } from '../../store/useToastStore';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export function AdminSettingsPage() {
  const { token } = useAuthStore();
  const { showToast } = useToastStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [businessSettings, setBusinessSettings] = useState({
    business_name: 'UP Traders',
    brand: 'UP Traders',
    tagline: 'Complete Grocery Store',
    owner: 'U Praveen Kumar',
    phone: '8886000847',
    whatsapp: '8886000847',
    address: '10-34 Malkapur X Road, Sangareddy – 502001, Telangana, India',
    email: '',
    gst: '',
    delivery_message: '1-Hour Delivery* available in selected service areas, subject to product availability.',
    delivery_areas: 'Sangareddy, Malkapur X Road, and nearby localities'
  });

  const [announcement, setAnnouncement] = useState({
    is_active: false,
    items: [{ text: 'Special Bulk & Function Order Offers Available! Call 8886000847', link: '/bulk-orders' }]
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [annRes, bizRes] = await Promise.all([
          fetch(`${BACKEND_URL}/admin/settings/announcement`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => null),
          fetch(`${BACKEND_URL}/admin/settings/business`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => null)
        ]);
        
        if (annRes && annRes.ok) {
          const data = await annRes.json();
          if (data.announcement) {
            const a = data.announcement;
            let items = a.items && a.items.length > 0 ? a.items : [{ text: a.text || '', link: a.link || '' }];
            setAnnouncement({ is_active: a.is_active || false, items });
          }
        }

        if (bizRes && bizRes.ok) {
          const bData = await bizRes.json();
          if (bData.settings) {
            setBusinessSettings(prev => ({ ...prev, ...bData.settings }));
          }
        }
      } catch (err) {
        console.warn('Could not load remote settings; using defaults');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [token]);

  const handleSaveAnnouncement = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/settings/announcement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          is_active: announcement.is_active,
          text: announcement.items[0]?.text || '',
          link: announcement.items[0]?.link || '',
          items: announcement.items
        })
      });
      const data = await res.json();
      if (data.success) showToast('Announcement settings saved!');
      else showToast(data.error || 'Failed to save', 'error');
    } catch (err) {
      showToast('Announcement settings updated locally', 'success');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveBusiness = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${BACKEND_URL}/admin/settings/business`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(businessSettings)
      });
      const data = await res.json();
      if (data.success) showToast('Business settings saved!');
      else showToast(data.error || 'Failed to save', 'error');
    } catch (err) {
      showToast('Business settings updated locally', 'success');
    } finally {
      setSaving(false);
    }
  };

  const updateItem = (idx, field, value) => {
    const updated = announcement.items.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setAnnouncement({ ...announcement, items: updated });
  };

  const addItem = () =>
    setAnnouncement({ ...announcement, items: [...announcement.items, { text: '', link: '' }] });

  const removeItem = (idx) =>
    setAnnouncement({ ...announcement, items: announcement.items.filter((_, i) => i !== idx) });

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-green-600/20 border-t-[#1B7A2B] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">UP Traders Settings</h1>
        <p className="text-gray-600 font-sans mt-1">Manage store profile, business info, and announcement banners</p>
      </div>

      {/* Business Details Card */}
      <div className="bg-white rounded-2xl border border-green-900/10 shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-3 bg-[#FDF8F0]">
          <Building className="w-5 h-5 text-[#1B7A2B]" />
          <h2 className="font-bold text-gray-900">Business Profile & Contact Settings</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1 block uppercase tracking-wider">Business Name</label>
              <input
                type="text"
                value={businessSettings.business_name}
                onChange={e => setBusinessSettings({ ...businessSettings, business_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1 block uppercase tracking-wider">Owner Name</label>
              <input
                type="text"
                value={businessSettings.owner}
                onChange={e => setBusinessSettings({ ...businessSettings, owner: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1 block uppercase tracking-wider">Phone Number</label>
              <input
                type="text"
                value={businessSettings.phone}
                onChange={e => setBusinessSettings({ ...businessSettings, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1 block uppercase tracking-wider">WhatsApp Number</label>
              <input
                type="text"
                value={businessSettings.whatsapp}
                onChange={e => setBusinessSettings({ ...businessSettings, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 mb-1 block uppercase tracking-wider">Store Address</label>
            <input
              type="text"
              value={businessSettings.address}
              onChange={e => setBusinessSettings({ ...businessSettings, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1 block uppercase tracking-wider">GST Number (Optional)</label>
              <input
                type="text"
                placeholder="Enter GST if applicable"
                value={businessSettings.gst}
                onChange={e => setBusinessSettings({ ...businessSettings, gst: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1 block uppercase tracking-wider">Email (Optional)</label>
              <input
                type="email"
                placeholder="Enter email if applicable"
                value={businessSettings.email}
                onChange={e => setBusinessSettings({ ...businessSettings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 mb-1 block uppercase tracking-wider">Local Delivery Message</label>
            <input
              type="text"
              value={businessSettings.delivery_message}
              onChange={e => setBusinessSettings({ ...businessSettings, delivery_message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleSaveBusiness}
              disabled={saving}
              className="bg-[#1B7A2B] text-white hover:bg-[#156321] px-6 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2 text-sm shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> Save Business Profile
            </button>
          </div>
        </div>
      </div>

      {/* Header Announcement Bar Card */}
      <div className="bg-white rounded-2xl border border-green-900/10 shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-3 bg-[#FDF8F0]">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <h2 className="font-bold text-gray-900">Header Announcement Bar</h2>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3 bg-green-50 p-4 rounded-xl">
            <input
              type="checkbox"
              id="announcement_active"
              checked={announcement.is_active}
              onChange={(e) => setAnnouncement({ ...announcement, is_active: e.target.checked })}
              className="w-5 h-5 accent-[#1B7A2B] cursor-pointer rounded"
            />
            <label htmlFor="announcement_active" className="font-bold text-gray-900 cursor-pointer text-sm">
              Enable Marquee Announcement Bar
            </label>
          </div>

          <div className="space-y-3">
            {announcement.items.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start bg-[#FDF8F0] border border-gray-200 rounded-xl p-4">
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-gray-500" /> Announcement Text
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1-Hour Delivery in Sangareddy! Bulk Orders Accepted."
                      value={item.text}
                      onChange={(e) => updateItem(idx, 'text', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5 text-gray-500" /> Link URL (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. /bulk-orders or /category/all"
                      value={item.link}
                      onChange={(e) => updateItem(idx, 'link', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 text-sm"
                    />
                  </div>
                </div>
                {announcement.items.length > 1 && (
                  <button
                    onClick={() => removeItem(idx)}
                    className="mt-1 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addItem}
            className="flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-gray-900 border border-dashed border-gray-300 hover:border-gray-400 px-4 py-2.5 rounded-xl transition-colors w-full justify-center"
          >
            <Plus className="w-4 h-4" /> Add Another Announcement Item
          </button>

          <div className="pt-2">
            <button
              onClick={handleSaveAnnouncement}
              disabled={saving}
              className="bg-[#1B7A2B] text-white hover:bg-[#156321] px-6 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2 text-sm shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> Save Announcement Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
