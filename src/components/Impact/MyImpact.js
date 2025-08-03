import React from 'react';
import { useApp } from '../../context/AppContext';

const MyImpact = () => {
  const { user, campaigns, userDonations } = useApp();

  const getDonatedCampaigns = () => {
    return userDonations.map(donation => {
      const campaign = campaigns.find(c => c.id === donation.campaignId);
      return { ...donation, campaign };
    });
  };

  const totalImpact = userDonations.reduce((sum, donation) => sum + donation.amount, 0);
  const donatedCampaigns = getDonatedCampaigns();

  const generatePDF = () => {
    // Mock PDF generation
    alert('Impact summary PDF would be generated here');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Impact Dashboard</h1>
            <p className="text-gray-600 mt-2">Track the difference you're making</p>
          </div>
          <button
            onClick={generatePDF}
            className="btn-primary flex items-center"
          >
            <span className="material-icons mr-2">download</span>
            Export PDF
          </button>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="material-icons text-green-600">volunteer_activism</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalImpact.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total Donated</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="material-icons text-blue-600">campaign</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{user.campaignsSupported}</p>
          <p className="text-sm text-gray-600">Campaigns Supported</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="material-icons text-purple-600">trending_up</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{user.impactScore}%</p>
          <p className="text-sm text-gray-600">Impact Score</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="material-icons text-orange-600">emoji_events</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-600">Badges Earned</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation History */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Donation History</h2>
          <div className="space-y-4">
            {donatedCampaigns.map(donation => (
              <div key={donation.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{donation.campaign?.title}</h3>
                    <p className="text-sm text-gray-600">{donation.campaign?.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">${donation.amount}</p>
                    <p className="text-xs text-gray-500">{donation.date}</p>
                  </div>
                </div>
                
                {/* Milestone Progress */}
                <div className="flex items-center space-x-1 mb-2">
                  <span className="text-xs text-gray-600">Progress:</span>
                  {donation.campaign?.milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        milestone.status === 'Complete' ? 'bg-green-500' :
                        milestone.status === 'Under Review' ? 'bg-yellow-500' :
                        'bg-gray-300'
                      }`}
                      title={milestone.title}
                    ></div>
                  ))}
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full"
                    style={{ 
                      width: `${Math.min((donation.campaign?.raised / donation.campaign?.goal) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges & Achievements */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Badges & Achievements</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="material-icons text-white">star</span>
              </div>
              <p className="font-medium text-yellow-800">First Donation</p>
              <p className="text-xs text-yellow-600">Made your first donation</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="material-icons text-white">eco</span>
              </div>
              <p className="font-medium text-green-800">Eco Warrior</p>
              <p className="text-xs text-green-600">Supported environmental causes</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="material-icons text-white">people</span>
              </div>
              <p className="font-medium text-blue-800">Community Helper</p>
              <p className="text-xs text-blue-600">Supported 5+ campaigns</p>
            </div>

            <div className="text-center p-4 bg-gray-100 rounded-lg border border-gray-200 opacity-60">
              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="material-icons text-white">lock</span>
              </div>
              <p className="font-medium text-gray-600">Generous Giver</p>
              <p className="text-xs text-gray-500">Donate $5,000+ total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Certificates */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Impact Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {donatedCampaigns.slice(0, 2).map(donation => (
            <div key={donation.id} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-primary-50 to-primary-100">
              <div className="flex items-center justify-between mb-3">
                <span className="material-icons text-primary-600">verified</span>
                <span className="text-xs text-primary-600 font-medium">CERTIFICATE</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{donation.campaign?.title}</h3>
              <p className="text-sm text-gray-600 mb-3">
                Thank you for your ${donation.amount} donation to this important cause.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Issued: {donation.date}</span>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyImpact;
