const Donation = require('../models/Donation');
const User = require('../models/User');

// Get overall statistics
exports.getOverallStats = async (req, res) => {
  try {
    // Get donation statistics
    const donationStats = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalDonations: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          avgDonation: { $avg: '$amount' },
          completedDonations: { 
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } 
          },
          monthlyDonations: { 
            $sum: { $cond: [{ $eq: ['$frequency', 'monthly'] }, 1, 0] } 
          },
          yearlyDonations: { 
            $sum: { $cond: [{ $eq: ['$frequency', 'yearly'] }, 1, 0] } 
          }
        }
      }
    ]);

    // Get user statistics
    const userStats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          verifiedUsers: { 
            $sum: { $cond: [{ $eq: ['$isVerified', true] }, 1, 0] } 
          },
          adminUsers: { 
            $sum: { $cond: [{ $eq: ['$role', 'admin'] }, 1, 0] } 
          }
        }
      }
    ]);

    // Get monthly donation trends for last 12 months
    const monthlyTrends = await Donation.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          amount: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    // Get donation by payment method
    const paymentMethodStats = await Donation.aggregate([
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    // Get donation by frequency
    const frequencyStats = await Donation.aggregate([
      {
        $group: {
          _id: '$frequency',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    // Calculate conversion rate
    const conversionRate = userStats[0]?.totalUsers 
      ? (donationStats[0]?.totalDonations / userStats[0].totalUsers * 100).toFixed(2) 
      : 0;

    res.json({
      donations: donationStats[0] || {},
      users: userStats[0] || {},
      monthlyTrends,
      paymentMethodStats,
      frequencyStats,
      conversionRate: parseFloat(conversionRate)
    });

  } catch (error) {
    console.error('Get overall stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch statistics'
    });
  }
};

// Get dashboard data for admin
exports.getDashboardData = async (req, res) => {
  try {
    // Get recent donations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentDonations = await Donation.find({
      createdAt: { $gte: thirtyDaysAgo }
    }).sort({ createdAt: -1 }).limit(10);

    // Get recent users (last 30 days)
    const recentUsers = await User.find({
      createdAt: { $gte: thirtyDaysAgo }
    }).sort({ createdAt: -1 }).limit(10).select('-password');

    // Get weekly statistics
    const weeklyStats = await getWeeklyStats();

    res.json({
      recentDonations,
      recentUsers,
      weeklyStats
    });

  } catch (error) {
    console.error('Get dashboard data error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard data'
    });
  }
};

// Helper function to get weekly statistics
async function getWeeklyStats() {
  const now = new Date();
  const stats = [];

  for (let i = 6; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const donations = await Donation.find({
      createdAt: { $gte: weekStart, $lt: weekEnd }
    });

    stats.push({
      week: i === 0 ? 'This Week' : i === 1 ? 'Last Week' : `${i} Weeks Ago`,
      startDate: weekStart.toISOString(),
      endDate: weekEnd.toISOString(),
      count: donations.length,
      amount: donations.reduce((sum, donation) => sum + donation.amount, 0)
    });
  }

  return stats;
}

// Get impact metrics
exports.getImpactMetrics = async (req, res) => {
  try {
    // Calculate impact metrics based on donations
    const donations = await Donation.find({ status: 'completed' });
    
    const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
    
    // Impact calculation based on predefined values
    const impact = {
      livesImpacted: Math.floor(totalAmount / 10), // $10 per life impacted
      communitiesServed: Math.floor(totalAmount / 1000), // $1000 per community
      studentsEducated: Math.floor(totalAmount / 500), // $500 per student
      countriesReached: 25, // Fixed number for demo
      totalDonations: donations.length,
      totalAmount: totalAmount
    };

    res.json(impact);

  } catch (error) {
    console.error('Get impact metrics error:', error);
    res.status(500).json({
      error: 'Failed to fetch impact metrics'
    });
  }
};
