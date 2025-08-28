import React, { useState } from 'react';
import { Users, AlertTriangle, Trash2, Eye, Mail, Filter, Search, BarChart3, Shield } from 'lucide-react';

const AdminDashboard = ({ 
  requests = [], 
  donors = [], 
  onDeleteRequest, 
  onToggleDonorStatus,
  onNotifyDonors,
  isLoading = false 
}) => {
  const [activeTab, setActiveTab] = useState('requests');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const filteredDonors = donors.filter(donor => {
    return donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           donor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
           donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const stats = {
    totalRequests: requests.length,
    pendingRequests: requests.filter(r => r.status === 'Pending').length,
    totalDonors: donors.length,
    availableDonors: donors.filter(d => d.isAvailable).length,
    bloodRequests: requests.filter(r => r.type === 'Blood').length,
    organRequests: requests.filter(r => r.type === 'Organ').length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage emergency requests and donor network</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">{stats.totalRequests}</div>
              <div className="text-sm text-red-700">Total Requests</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</div>
              <div className="text-sm text-yellow-700">Pending</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalDonors}</div>
              <div className="text-sm text-blue-700">Total Donors</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{stats.availableDonors}</div>
              <div className="text-sm text-green-700">Available</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.bloodRequests}</div>
              <div className="text-sm text-purple-700">Blood Requests</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-indigo-600">{stats.organRequests}</div>
              <div className="text-sm text-indigo-700">Organ Requests</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'requests'
                  ? 'bg-red-100 text-red-700'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <AlertTriangle className="w-4 h-4 inline mr-2" />
              Emergency Requests ({stats.totalRequests})
            </button>
            <button
              onClick={() => setActiveTab('donors')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'donors'
                  ? 'bg-red-100 text-red-700'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Donor Network ({stats.totalDonors})
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'requests' ? 'requests' : 'donors'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            {activeTab === 'requests' && (
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            )}
          </div>

          {/* Content */}
          {activeTab === 'requests' ? (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          request.urgency === 'High' ? 'bg-red-100 text-red-800' :
                          request.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {request.urgency} Priority
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {request.type}
                        </span>
                        <span className="text-gray-500 text-sm">{request.timeAgo}</span>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {request.type === 'Blood' ? `${request.bloodGroup} Blood` : request.organType} needed for {request.patientName}
                      </h4>
                      
                      <p className="text-gray-600 mb-2">
                        <strong>Hospital:</strong> {request.hospitalName}, {request.city}
                      </p>
                      
                      <p className="text-gray-600">
                        <strong>Contact:</strong> {request.contactPerson} • {request.contactPhone}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => onNotifyDonors([request])}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Notify Donors"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteRequest(request.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                  <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No requests found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map((donor) => (
                <div key={donor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{donor.name}</h4>
                      <p className="text-sm text-gray-600">{donor.age} years old</p>
                    </div>
                    
                    <button
                      onClick={() => onToggleDonorStatus(donor.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        donor.isAvailable
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {donor.isAvailable ? 'Available' : 'Unavailable'}
                    </button>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-4 h-4 bg-red-100 rounded mr-2 flex items-center justify-center">
                        <span className="text-xs font-bold text-red-600">{donor.bloodGroup}</span>
                      </div>
                      Blood Group
                    </div>
                    
                    {donor.organType && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-4 h-4 bg-blue-100 rounded mr-2 flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">O</span>
                        </span>
                        {donor.organType}
                      </div>
                    )}
                    
                    <div className="text-sm text-gray-600">
                      📍 {donor.city}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3">
                    <div className="text-sm text-gray-600">
                      📧 {donor.email}
                    </div>
                    <div className="text-sm text-gray-600">
                      📞 {donor.phone}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredDonors.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No donors found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
