import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Dashboard = () => {
  const { user, campaigns, userDonations } = useApp();

  const impactStats = [
    { label: 'Total Donated', value: `$${user.totalDonated.toLocaleString()}`, icon: 'volunteer_activism', color: 'text-green-600' },
    { label: 'Campaigns Supported', value: user.campaignsSupported, icon: 'campaign', color: 'text-blue-600' },
    { label: 'Impact Score', value: `${user.impactScore}%`, icon: 'trending_up', color: 'text-purple-600' }
  ];

  const recentActivity = userDonations.slice(-3).reverse();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900">Hello, {user.name}! 👋</h1>
        <p className="text-gray-600 mt-2">Welcome back to your impact dashboard.</p>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {impactStats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                <span className="material-icons">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((donation) => {
              const campaign = campaigns.find(c => c.id === donation.campaignId);
              return (
                <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{campaign?.title}</p>
                    <p className="text-sm text-gray-600">{donation.date}</p>
                  </div>
                  <span className="text-green-600 font-semibold">${donation.amount}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Campaigns */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Campaigns</h2>
          <div className="space-y-3">
            {campaigns.slice(0, 3).map((campaign) => (
              <Link
                key={campaign.id}
                to={`/campaigns/${campaign.id}`}
                className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{campaign.title}</p>
                    <div className="flex items-center mt-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-600">
                        {Math.round((campaign.raised / campaign.goal) * 100)}%
                      </span>
                    </div>
                  </div>
                  <span className="material-icons text-gray-400">arrow_forward_ios</span>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/campaigns" className="btn-primary w-full mt-4 text-center block">
            View All Campaigns
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
