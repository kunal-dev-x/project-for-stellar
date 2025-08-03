import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import DonationModal from '../Donation/DonationModal';

const CampaignDetails = () => {
  const { id } = useParams();
  const { campaigns } = useApp();
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [comments] = useState([
    { id: 1, author: 'Sarah M.', comment: 'This is such an important cause!', date: '2024-01-22' },
    { id: 2, author: 'Mike R.', comment: 'How can I track the progress?', date: '2024-01-21' }
  ]);

  const campaign = campaigns.find(c => c.id === parseInt(id));

  if (!campaign) {
    return <div className="text-center py-12">Campaign not found</div>;
  }

  const progressPercentage = Math.round((campaign.raised / campaign.goal) * 100);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Header */}
          <div className="card">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-primary-100 text-primary-600 text-sm font-medium rounded-full">
                {campaign.category}
              </span>
              {campaign.verified && (
                <div className="flex items-center text-green-600">
                  <span className="material-icons">verified</span>
                  <span className="ml-1 font-medium">Verified</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{campaign.title}</h1>
            <p className="text-gray-600 mb-6">{campaign.description}</p>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Raised: ${campaign.raised.toLocaleString()}</span>
                <span>Goal: ${campaign.goal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-primary-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{progressPercentage}% funded</p>
            </div>

            <div className="flex items-center text-gray-600">
              <span className="material-icons mr-2">business</span>
              <span>Beneficiary: {campaign.beneficiary}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Timeline</h2>
            <div className="space-y-4">
              {campaign.milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.status === 'Complete' ? 'bg-green-500 text-white' :
                      milestone.status === 'Under Review' ? 'bg-yellow-500 text-white' :
                      'bg-gray-300 text-gray-600'
                    }`}>
                      <span className="material-icons text-sm">
                        {milestone.status === 'Complete' ? 'check' :
                         milestone.status === 'Under Review' ? 'schedule' :
                         'radio_button_unchecked'}
                      </span>
                    </div>
                    {index < campaign.milestones.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200 ml-4 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                    <p className="text-sm text-gray-600">Target: {milestone.date}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                      milestone.status === 'Complete' ? 'bg-green-100 text-green-800' :
                      milestone.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {milestone.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Comments & Q&A</h2>
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{comment.author}</span>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-600">{comment.comment}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <textarea
                placeholder="Ask a question or leave a comment..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="3"
              ></textarea>
              <button className="btn-primary mt-2">Post Comment</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sticky Donate Button */}
          <div className="card sticky top-6">
            <button
              onClick={() => setShowDonationModal(true)}
              className="btn-primary w-full text-lg py-3 mb-4"
            >
              <span className="material-icons mr-2">volunteer_activism</span>
              Donate Now
            </button>
            
            <div className="text-center text-sm text-gray-600">
              <p>Your donation helps make a real impact</p>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Updates</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Progress Update</p>
                <p className="text-xs text-gray-600">Site assessment completed successfully</p>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">New Milestone</p>
                <p className="text-xs text-gray-600">Well drilling phase initiated</p>
                <span className="text-xs text-gray-500">1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDonationModal && (
        <DonationModal
          campaign={campaign}
          onClose={() => setShowDonationModal(false)}
        />
      )}
    </div>
  );
};

export default CampaignDetails;
