import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Campaigns = () => {
  const { campaigns } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Disaster Relief', 'Charity', 'Startup'];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Discover Campaigns</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            search
          </span>
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map(campaign => (
          <Link
            key={campaign.id}
            to={`/campaigns/${campaign.id}`}
            className="card hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-full">
                {campaign.category}
              </span>
              {campaign.verified && (
                <div className="flex items-center text-green-600">
                  <span className="material-icons text-sm">verified</span>
                  <span className="text-xs ml-1">Verified</span>
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>

            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Raised: ${campaign.raised.toLocaleString()}</span>
                <span>Goal: ${campaign.goal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((campaign.raised / campaign.goal) * 100)}% funded
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="material-icons text-sm align-middle">business</span>
                <span className="ml-1">{campaign.beneficiary}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                {campaign.milestones.map((milestone, index) => (
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
            </div>
          </Link>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <span className="material-icons text-6xl text-gray-300 mb-4">search_off</span>
          <p className="text-gray-500">No campaigns found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
