# Hope Is Everything - Backend

Backend API for the Hope Is Everything donation platform, built with Node.js, Express, and MongoDB.

## Features

### Donation Management
- Create and process donations
- Support for Stripe and cryptocurrency payments
- Donation status tracking (pending, completed, failed, refunded)
- Donation statistics and reports

### User Management
- User registration and authentication
- Email verification
- Password reset functionality
- User profiles and preferences

### Admin Dashboard
- Detailed analytics and reports
- User management
- Donation monitoring
- Impact metrics

## Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **Stripe**: Payment processing
- **Nodemailer**: Email notifications
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud instance)
- Stripe account for payment processing
- SMTP service for email notifications (Gmail, SendGrid, etc.)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hope-is-everything/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your environment variables:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/hope-is-everything
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   JWT_SECRET=your_jwt_secret_key
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_email_password
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/verify-email` - Verify email address
- `POST /api/users/forgot-password` - Request password reset
- `POST /api/users/reset-password` - Reset password

### Donations
- `POST /api/donations` - Create new donation
- `GET /api/donations` - Get all donations (with pagination)
- `GET /api/donations/:id` - Get donation by ID
- `PUT /api/donations/:id` - Update donation status (admin only)
- `GET /api/donations/stats` - Get donation statistics

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/profile` - Update user profile

### Statistics
- `GET /api/stats/impact` - Get impact metrics (public)
- `GET /api/stats/overall` - Get overall statistics (admin only)
- `GET /api/stats/dashboard` - Get dashboard data (admin only)

### Health Check
- `GET /api/health` - API health check

## Database Models

### User
Stores user information including:
- `name`: User's full name
- `email`: User's email address (unique)
- `password`: Hashed password
- `role`: User role (admin/user)
- `isVerified`: Email verification status
- `preferences`: User notification preferences

### Donation
Stores donation information including:
- `donorName`: Donor's name
- `donorEmail`: Donor's email
- `amount`: Donation amount
- `currency`: Currency code
- `frequency`: Donation frequency (one-time/monthly/yearly)
- `paymentMethod`: Payment method (stripe/crypto)
- `status`: Donation status (pending/completed/failed/refunded)
- `message`: Donor's message
- `anonymous`: Anonymous donation flag

## Stripe Integration

To set up Stripe:
1. Create a Stripe account at https://stripe.com/
2. Get your API keys from the Stripe dashboard
3. Add your Stripe secret key to `.env` file
4. Set up webhooks for payment events (optional but recommended)

## Email Configuration

The backend uses Nodemailer for email notifications. You can configure:
- Gmail (using app passwords)
- SendGrid
- Mailgun
- Any other SMTP service

## Security Features

- Password hashing with bcryptjs
- JWT authentication with refresh tokens
- Input validation and sanitization
- CORS configuration
- Protected routes for admin functionality
- Environment variable management

## Error Handling

- Centralized error handling middleware
- Detailed error messages with appropriate HTTP status codes
- Error logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, please email info@hopeiseverything.org

## TODO

- [ ] Add more comprehensive error handling
- [ ] Implement rate limiting
- [ ] Add API documentation with Swagger/OpenAPI
- [ ] Implement webhook handlers for Stripe
- [ ] Add more testing coverage
- [ ] Implement caching for frequent queries
- [ ] Add support for more payment methods
