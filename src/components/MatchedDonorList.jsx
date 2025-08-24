import React, { useState, useEffect } from 'react';
import { Users, MapPin, Phone, Mail, Clock, AlertTriangle, Heart, Filter, Search, User } from 'lucide-react';

const MatchedDonorList = ({ 
  requestData, 
  donors = [], 
  onNotifyDonors,
  isLoading = false 
}) => {
  const [matchedDonors, setMatchedDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('all');
  const [notifiedDonors, setNotifiedDonors] = useState(new Set());

  // Find matching donors based on request criteria
  useEffect(() => {
    if (!requestData || !donors.length) return;

    const matches = donors.filter(donor => {
      if (!donor.isAvailable) return false;

      // Blood type matching
      if (requestData.requestType === 'Blood' && requestData.bloodGroup) {
        if (donor.bloodGroup !== requestData.bloodGroup) return false;
      }

      // Organ type matching
      if (requestData.requestType === 'Organ' && requestData.organType) {
        if (donor.organType !== requestData.organType) return false;
      }

      // Location matching (simple city-based for now)
      if (requestData.city && donor.city) {
        const requestCity = requestData.city.toLowerCase();
        const donorCity = donor.city.toLowerCase();
        if (requestCity !== donorCity) return false;
      }

      return true;
    });

    // Sort by relevance (exact matches first, then by availability)
    const sortedMatches = matches.sort((a, b) => {
      // Exact city match gets priority
      const aCityMatch = a.city?.toLowerCase() === requestData.city?.toLowerCase();
      const bCityMatch = b.city?.toLowerCase() === requestData.city?.toLowerCase();
      
      if (aCityMatch && !bCityMatch) return -1;
      if (!aCityMatch && bCityMatch) return 1;
      
      // Then by availability
      if (a.isAvailable && !b.isAvailable) return -1;
      if (!a.isAvailable && b.isAvailable) return 1;
      
      return 0;
    });

    setMatchedDonors(sortedMatches);
    setFilteredDonors(sortedMatches);
  }, [requestData, donors]);

  // Filter donors based on search and distance
  useEffect(() => {
    let filtered = matchedDonors;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(donor =>
        donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Distance filter (simplified for now)
    if (distanceFilter !== 'all') {
      // This would integrate with actual distance calculation API
      // For now, just show all matches
    }

    setFilteredDonors(filtered);
  }, [searchTerm, distanceFilter, matchedDonors]);

  const handleNotifyDonor = async (donor) => {
    try {
      await onNotifyDonors([donor]);
      setNotifiedDonors(prev => new Set([...prev, donor.id]));
    } catch (error) {
      console.error('Failed to notify donor:', error);
    }
  };

  const handleNotifyAll = async () => {
    try {
      await onNotifyDonors(filteredDonors);
      setNotifiedDonors(prev => new Set([...prev, ...filteredDonors.map(d => d.id)]));
    } catch (error) {
      console.error('Failed to notify donors:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Finding matching donors...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!requestData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Request Data</h2>
            <p className="text-gray-600">Please submit an emergency request first to find matching donors.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            <Heart className="w-8 h-8 text-red-600 inline mr-3" />
            Matching Donors Found
          </h1>
          <p className="text-lg text-gray-600">
            We found <span className="font-semibold text-red-600">{filteredDonors.length}</span> potential donor{filteredDonors.length !== 1 ? 's' : ''} for your request
          </p>
        </div>

        {/* Request Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            Request Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium">{requestData.requestType}</p>
            </div>
            {requestData.requestType === 'Blood' && (
              <div>
                <p className="text-sm text-gray-500">Blood Group</p>
                <p className="font-medium">{requestData.bloodGroup}</p>
              </div>
            )}
            {requestData.requestType === 'Organ' && (
              <div>
                <p className="text-sm text-gray-500">Organ Type</p>
                <p className="font-medium">{requestData.organType}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{requestData.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Urgency</p>
              <p className="font-medium">{requestData.urgency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hospital</p>
              <p className="font-medium">{requestData.hospitalName}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search donors by name, city, or blood group..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                <option value="nearby">Nearby (10km)</option>
                <option value="city">Same City</option>
                <option value="state">Same State</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredDonors.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Matching Donors</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search criteria.' : 'No donors match your current request criteria.'}
            </p>
          </div>
        ) : (
          <>
            {/* Bulk Actions */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredDonors.length} of {matchedDonors.length} matches
              </p>
              <button
                onClick={handleNotifyAll}
                disabled={filteredDonors.every(d => notifiedDonors.has(d.id))}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Notify All ({filteredDonors.length})
              </button>
            </div>

            {/* Donor List */}
            <div className="space-y-4">
              {filteredDonors.map((donor) => (
                <div key={donor.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{donor.name}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                            <div>
                              <p className="text-sm text-gray-500">Age</p>
                              <p className="font-medium">{donor.age} years</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Blood Group</p>
                              <p className="font-medium">{donor.bloodGroup}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Organ Type</p>
                              <p className="font-medium">{donor.organType}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {donor.city}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 lg:items-end">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          donor.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {donor.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <a
                          href={`tel:${donor.phone}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </a>
                        <a
                          href={`mailto:${donor.email}`}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </a>
                        <button
                          onClick={() => handleNotifyDonor(donor)}
                          disabled={notifiedDonors.has(donor.id)}
                          className={`px-4 py-2 rounded-lg flex items-center ${
                            notifiedDonors.has(donor.id)
                              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                              : 'bg-red-600 text-white hover:bg-red-700'
                          }`}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          {notifiedDonors.has(donor.id) ? 'Notified' : 'Notify'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MatchedDonorList;
