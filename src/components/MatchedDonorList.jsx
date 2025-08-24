import React, { useState } from 'react';
import { Users, MapPin, Phone, Mail, Heart, AlertTriangle, Send, CheckCircle } from 'lucide-react';

const MatchedDonorList = ({ donors, onNotifyDonors, isLoading = false }) => {
  const [notifiedDonors, setNotifiedDonors] = useState(new Set());
  const [isNotifying, setIsNotifying] = useState(false);

  const handleNotifyAll = async () => {
    setIsNotifying(true);
    try {
      await onNotifyDonors(donors);
      // Mark all donors as notified
      setNotifiedDonors(new Set(donors.map(donor => donor.id)));
    } catch (error) {
      console.error('Failed to notify donors:', error);
    } finally {
      setIsNotifying(false);
    }
  };

  const handleNotifySingle = async (donor) => {
    try {
      await onNotifyDonors([donor]);
      setNotifiedDonors(prev => new Set([...prev, donor.id]));
    } catch (error) {
      console.error('Failed to notify donor:', error);
    }
  };

  if (!donors || donors.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">No Matched Donors Found</h3>
        <p className="text-gray-600">We couldn't find any donors matching your requirements in this area.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="w-6 h-6 text-green-600 mr-2" />
            Matched Donors ({donors.length})
          </h3>
          <p className="text-gray-600 mt-1">These donors match your requirements and are available</p>
        </div>
        
        <button
          onClick={handleNotifyAll}
          disabled={isNotifying || isLoading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg disabled:transform-none flex items-center"
        >
          {isNotifying ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Notifying...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Notify All Donors
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donors.map((donor) => (
          <div key={donor.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{donor.name}</h4>
                  <p className="text-sm text-gray-600">{donor.age} years old</p>
                </div>
              </div>
              
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Available
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-4 h-4 bg-red-100 rounded mr-2 flex items-center justify-center">
                  <span className="text-xs font-bold text-red-600">{donor.bloodGroup}</span>
                </div>
                Blood Group
              </div>
              
              {donor.organType && (
                <div className="flex items-center text-sm text-gray-600">
                  <Heart className="w-4 h-4 text-red-500 mr-2" />
                  {donor.organType.charAt(0).toUpperCase() + donor.organType.slice(1)}
                </div>
              )}
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                {donor.city}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-600">Contact Info:</div>
                <button
                  onClick={() => handleNotifySingle(donor)}
                  disabled={notifiedDonors.has(donor.id) || isNotifying}
                  className={`text-sm px-3 py-1 rounded-md transition-colors ${
                    notifiedDonors.has(donor.id)
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {notifiedDonors.has(donor.id) ? (
                    <>
                      <CheckCircle className="w-3 h-3 inline mr-1" />
                      Notified
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3 inline mr-1" />
                      Notify
                    </>
                  )}
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-3 h-3 mr-2" />
                  <span className="truncate">{donor.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-3 h-3 mr-2" />
                  <span>{donor.phone}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notification Status */}
      {notifiedDonors.size > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">
              {notifiedDonors.size} donor{notifiedDonors.size > 1 ? 's' : ''} have been notified successfully!
            </span>
          </div>
          <p className="text-green-700 text-sm mt-1">
            They will receive an email with your emergency request details and contact information.
          </p>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
          <div>
            <h4 className="text-blue-800 font-medium mb-1">What happens next?</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Matched donors will receive an email with your request details</li>
              <li>• They can contact you directly using the provided contact information</li>
              <li>• You can also reach out to them proactively</li>
              <li>• Keep your phone and email accessible for quick responses</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchedDonorList;
