const Donation = require('../models/Donation');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

// Create a new donation
exports.createDonation = async (req, res) => {
  try {
    const { 
      donorName, 
      donorEmail, 
      amount, 
      currency, 
      frequency, 
      paymentMethod,
      message,
      anonymous 
    } = req.body;

    // Validate input
    if (!donorName || !donorEmail || !amount || !paymentMethod) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    // Create donation record
    const donation = new Donation({
      donorName,
      donorEmail,
      amount,
      currency,
      frequency,
      paymentMethod,
      message,
      anonymous
    });

    // Process payment based on method
    if (paymentMethod === 'stripe') {
      await processStripePayment(donation, req, res);
    } else if (paymentMethod === 'crypto') {
      donation.status = 'pending';
      await donation.save();
      return res.status(201).json({
        success: true,
        message: 'Donation created successfully. Please send cryptocurrency to the provided address.',
        donation: donation
      });
    } else {
      return res.status(400).json({
        error: 'Invalid payment method'
      });
    }

  } catch (error) {
    console.error('Donation creation error:', error);
    res.status(500).json({
      error: 'Failed to create donation',
      message: error.message
    });
  }
};

// Process Stripe payment
async function processStripePayment(donation, req, res) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: donation.amount * 100, // Convert to cents
      currency: donation.currency.toLowerCase(),
      description: `Donation from ${donation.donorName}`,
      receipt_email: donation.donorEmail,
      metadata: {
        donorName: donation.donorName,
        frequency: donation.frequency,
        message: donation.message
      }
    });

    donation.stripePaymentIntentId = paymentIntent.id;
    donation.status = 'completed';
    await donation.save();

    // Send confirmation email
    await sendDonationEmail(donation);

    res.status(201).json({
      success: true,
      message: 'Donation completed successfully!',
      donation: donation,
      clientSecret: paymentIntent.client_secret
    });

  } catch (error) {
    console.error('Stripe payment error:', error);
    donation.status = 'failed';
    await donation.save();
    
    res.status(400).json({
      error: 'Payment failed',
      message: error.message
    });
  }
}

// Send donation confirmation email
async function sendDonationEmail(donation) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: donation.donorEmail,
      subject: 'Thank You for Your Donation!',
      html: `
        <h1>Thank You for Your Support!</h1>
        <p>Dear ${donation.donorName},</p>
        <p>We greatly appreciate your donation of ${donation.amount} ${donation.currency} to Hope Is Everything.</p>
        <p>Your contribution will help us continue our mission of providing education and support to those in need.</p>
        
        <h3>Donation Details:</h3>
        <p>Amount: ${donation.amount} ${donation.currency}</p>
        <p>Frequency: ${donation.frequency}</p>
        <p>Date: ${new Date(donation.createdAt).toLocaleString()}</p>
        <p>Payment Method: ${donation.paymentMethod}</p>
        
        ${donation.message ? `<p>Message: ${donation.message}</p>` : ''}
        
        <p>This email serves as your receipt for tax purposes.</p>
        <p>Thank you for being part of our community!</p>
        
        <p>With gratitude,</p>
        <p>The Hope Is Everything Team</p>
        <p><a href="${process.env.FRONTEND_URL}">hopeiseverything.org</a></p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Donation email sent to ${donation.donorEmail}`);
  } catch (error) {
    console.error('Email sending error:', error);
  }
}

// Get all donations
exports.getDonations = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, frequency } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }
    if (frequency) {
      query.frequency = frequency;
    }

    const donations = await Donation.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Donation.countDocuments(query);

    res.json({
      donations,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total: total
    });

  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({
      error: 'Failed to fetch donations'
    });
  }
};

// Get donation by ID
exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({
        error: 'Donation not found'
      });
    }

    res.json(donation);

  } catch (error) {
    console.error('Get donation by ID error:', error);
    res.status(500).json({
      error: 'Failed to fetch donation'
    });
  }
};

// Update donation status
exports.updateDonationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!donation) {
      return res.status(404).json({
        error: 'Donation not found'
      });
    }

    res.json(donation);

  } catch (error) {
    console.error('Update donation status error:', error);
    res.status(500).json({
      error: 'Failed to update donation status'
    });
  }
};

// Get donation statistics
exports.getDonationStats = async (req, res) => {
  try {
    const stats = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalDonations: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          avgDonation: { $avg: '$amount' },
          completedDonations: { 
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } 
          }
        }
      }
    ]);

    const monthlyStats = await Donation.aggregate([
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

    res.json({
      overall: stats[0],
      monthly: monthlyStats
    });

  } catch (error) {
    console.error('Get donation stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch donation statistics'
    });
  }
};
