import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    verified: true,
    totalDonated: 2500,
    campaignsSupported: 8,
    impactScore: 92
  });

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: 'Clean Water for Rural Communities',
      category: 'Charity',
      description: 'Providing clean water access to underserved communities',
      raised: 75000,
      goal: 100000,
      beneficiary: 'WaterAid Foundation',
      verified: true,
      image: 'https://via.placeholder.com/300x200',
      milestones: [
        { id: 1, title: 'Site Assessment', status: 'Complete', date: '2024-01-15' },
        { id: 2, title: 'Well Drilling', status: 'Under Review', date: '2024-02-01' },
        { id: 3, title: 'Water Testing', status: 'Pending', date: '2024-02-15' }
      ]
    },
    {
      id: 2,
      title: 'Disaster Relief - Hurricane Victims',
      category: 'Disaster Relief',
      description: 'Emergency aid for families affected by recent hurricane',
      raised: 45000,
      goal: 80000,
      beneficiary: 'Red Cross Emergency',
      verified: true,
      image: 'https://via.placeholder.com/300x200',
      milestones: [
        { id: 1, title: 'Emergency Response', status: 'Complete', date: '2024-01-10' },
        { id: 2, title: 'Shelter Setup', status: 'Complete', date: '2024-01-12' },
        { id: 3, title: 'Long-term Housing', status: 'Under Review', date: '2024-02-01' }
      ]
    },
    {
      id: 3,
      title: 'EcoTech Startup - Solar Innovation',
      category: 'Startup',
      description: 'Revolutionary solar panel technology for affordable energy',
      raised: 120000,
      goal: 200000,
      beneficiary: 'EcoTech Solutions',
      verified: true,
      image: 'https://via.placeholder.com/300x200',
      milestones: [
        { id: 1, title: 'Prototype Development', status: 'Complete', date: '2024-01-05' },
        { id: 2, title: 'Testing Phase', status: 'Complete', date: '2024-01-20' },
        { id: 3, title: 'Manufacturing Setup', status: 'Under Review', date: '2024-02-10' }
      ]
    }
  ]);

  const [userDonations, setUserDonations] = useState([
    { id: 1, campaignId: 1, amount: 500, date: '2024-01-20' },
    { id: 2, campaignId: 2, amount: 300, date: '2024-01-18' },
    { id: 3, campaignId: 3, amount: 1000, date: '2024-01-15' }
  ]);

  const [notifications, setNotifications] = useState([]);

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCampaigns(prev => prev.map(campaign => ({
        ...campaign,
        raised: campaign.raised + Math.floor(Math.random() * 100)
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const addDonation = (campaignId, amount) => {
    const newDonation = {
      id: userDonations.length + 1,
      campaignId,
      amount,
      date: new Date().toISOString().split('T')[0]
    };
    setUserDonations(prev => [...prev, newDonation]);
    
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, raised: campaign.raised + amount }
        : campaign
    ));

    setUser(prev => ({
      ...prev,
      totalDonated: prev.totalDonated + amount,
      campaignsSupported: prev.campaignsSupported + (userDonations.find(d => d.campaignId === campaignId) ? 0 : 1)
    }));
  };

  const value = {
    user,
    campaigns,
    userDonations,
    notifications,
    addDonation,
    setUser,
    setCampaigns
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
