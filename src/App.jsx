import React, { useState } from 'react';
import { Heart, Users, Clock, AlertTriangle, Plus, Search, Shield } from 'lucide-react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import DonorForm from './components/DonorForm';
import EmergencyRequestForm from './components/EmergencyRequestForm';
import MatchedDonorList from './components/MatchedDonorList';
import AdminDashboard from './components/AdminDashboard';

const JeevanLink = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false); // Toggle this for admin access

  
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: 'Blood',
      bloodGroup: 'O+',
      patientName: 'Aditya Pandey',
      hospitalName: 'AIIMS Delhi',
      urgency: 'High',
      location: 'New Delhi',
      timeAgo: '5 mins ago',
      status: 'Pending'
    },
    {
      id: 2,
      type: 'Organ',
      organType: 'Kidney',
      patientName: 'Shruti Srivastava',
      hospitalName: 'Apollo Hospital',
      urgency: 'Medium',
      location: 'Mumbai',
      timeAgo: '15 mins ago',
      status: 'Pending'
    }
  ]);

  const [donors, setDonors] = useState([
    { id: 1, name: 'Aman Shukla', age: 25, bloodGroup: 'O+', organType: 'kidney', email: 'aman@example.com', phone: '+91 98765 43210', city: 'Delhi', isAvailable: true },
    { id: 2, name: 'Srishti Saini', age: 28, bloodGroup: 'A+', organType: 'liver', email: 'srishti@example.com', phone: '+91 98765 43211', city: 'Mumbai', isAvailable: true },
    { id: 3, name: 'Bhosu', age: 30, bloodGroup: 'B-', organType: 'heart', email: 'bhosu@example.com', phone: '+91 98765 43212', city: 'Bangalore', isAvailable: false }
  ]);



  const handleDonorRegistration = (donorData) => {
    // Add donor registration logic here
    const newDonor = {
      id: Date.now(),
      ...donorData
    };
    setDonors(prev => [...prev, newDonor]);
    alert('Donor registration completed successfully!');
  };

  const handleEmergencyRequest = (requestData) => {
    // Add emergency request logic here
    const newRequest = {
      id: Date.now(),
      ...requestData,
      timeAgo: 'Just now',
      status: 'Pending'
    };
    setRequests(prev => [...prev, newRequest]);
    alert('Emergency request submitted successfully!');
  };

  const handleNotifyDonors = async (donorsToNotify) => {
    // This would integrate with your backend email service
    console.log('Notifying donors:', donorsToNotify);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`${donorsToNotify.length} donor(s) notified successfully!`);
  };

  const handleDeleteRequest = (requestId) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const handleToggleDonorStatus = (donorId) => {
    setDonors(prev => prev.map(donor => 
      donor.id === donorId 
        ? { ...donor, isAvailable: !donor.isAvailable }
        : donor
    ));
  };

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  // Request Help Form Component
  const RequestForm = () => (
    <EmergencyRequestForm onSubmit={handleEmergencyRequest} />
  );

  // Donor Registration Form Component
  const DonorFormComponent = () => (
    <DonorForm onSubmit={handleDonorRegistration} />
  );

  // Dashboard Component
  const Dashboard = () => (
    <div className="w-screen min-h-screen bg-gray-50 py-8 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <button
            onClick={toggleAdminMode}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
              isAdmin ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Shield className="w-4 h-4 mr-2" />
            {isAdmin ? 'Exit Admin' : 'Admin Mode'}
          </button>
        </div>
        
        {isAdmin ? (
          <AdminDashboard
            requests={requests}
            donors={donors}
            onDeleteRequest={handleDeleteRequest}
            onToggleDonorStatus={handleToggleDonorStatus}
            onNotifyDonors={handleNotifyDonors}
          />
        ) : (
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Requests */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              Recent Emergency Requests
            </h3>
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="border-l-4 border-red-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{request.patientName}</p>
                      <p className="text-sm text-gray-600">{request.hospitalName}</p>
                      <p className="text-sm text-gray-500">{request.location}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        request.urgency === 'High' ? 'bg-red-100 text-red-800' :
                        request.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {request.urgency}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{request.timeAgo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Donors */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="w-5 h-5 text-green-600 mr-2" />
              Available Donors
            </h3>
            <div className="space-y-4">
              {donors.map((donor) => (
                <div key={donor.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{donor.name}</p>
                    <p className="text-sm text-gray-600">{donor.bloodGroup}</p>
                    <p className="text-sm text-gray-500">{donor.location}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    donor.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {donor.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );

  // Main render function
  return (
    <div className="w-screen min-h-screen">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}
      {activeTab === 'request' && <RequestForm />}
      {activeTab === 'donor' && <DonorFormComponent />}
      {activeTab === 'dashboard' && <Dashboard />}
    </div>
  );
};

export default JeevanLink;