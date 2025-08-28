# Resume Builder Pro - Online Website

A full-stack **web application** that users access through their web browsers to create, edit, and manage professional resumes using pre-designed templates with AI-powered content suggestions and a paywall system.

## 🌐 Website Features

**This is a WEBSITE, not a desktop application:**
- Users access it through web browsers (Chrome, Firefox, Safari, etc.)
- No software installation required
- Works on desktop, tablet, and mobile devices
- Responsive web design for all screen sizes
- PWA-ready for mobile "app-like" experience

## 🚀 Features

### Core Features
- **User Registration & Login** - Email/password and Google OAuth
- **Resume Builder Interface** - Step-by-step input for all resume sections
- **Professional Templates** - Multiple pre-designed templates
- **AI Content Suggestions** - OpenAI-powered bullet points and summaries
- **Resume Management** - Save, edit, duplicate, delete resumes

### Monetization
- **Paywall System** - Free to build, premium to download/email
- **Payment Gateway Integration**:
  - Stripe for credit/debit cards
  - Flutterwave for mobile money and cards
  - Airtel Money STK Push support
- **Subscription Plans**:
  - 24-Hour Access Pass ($2)
  - Monthly Plan ($5)

### Additional Features
- **PDF Generation** - High-quality resume exports
- **Email Functionality** - Send resumes directly to employers
- **Responsive Design** - Mobile-friendly interface
- **ATS Optimization** - AI-powered resume optimization

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling
- **Zod** - Validation
- **Lucide React** - Icons

### Backend
- **Node.js/Express** - REST API
- **MongoDB/Mongoose** - Database
- **JWT** - Authentication
- **OpenAI API** - AI content generation
- **Stripe** - Payment processing
- **Flutterwave** - Mobile money payments
- **Puppeteer** - PDF generation
- **Nodemailer** - Email functionality

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd resume-builder
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/resume-builder

# JWT Secret
JWT_SECRET=your_super_secure_jwt_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Flutterwave
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-your_flutterwave_secret_key
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-your_flutterwave_public_key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# URLs
NEXT_PUBLIC_API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

### 4. Start MongoDB
Make sure MongoDB is running on your system.

### 5. Run the Application

**Start Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Start Frontend (Terminal 2):**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔧 Configuration

### Payment Setup

#### Stripe
1. Create a Stripe account
2. Get your publishable and secret keys
3. Set up webhooks for payment confirmation

#### Flutterwave
1. Create a Flutterwave account
2. Get your public and secret keys
3. Configure mobile money settings

### OpenAI Setup
1. Create an OpenAI account
2. Generate an API key
3. Add it to your environment variables

### Email Setup
1. Configure SMTP settings (Gmail recommended)
2. Use app-specific passwords for Gmail

## 📱 Usage

### For Users
1. **Sign Up/Login** - Create an account or sign in
2. **Build Resume** - Use the step-by-step builder
3. **AI Assistance** - Get AI-powered content suggestions
4. **Choose Template** - Select from professional templates
5. **Upgrade** - Purchase subscription to download/email resumes

### For Developers
1. **API Endpoints** - All endpoints documented in code
2. **Database Models** - MongoDB schemas in `/backend/src/models`
3. **Frontend Components** - Reusable components in `/src/components`

## 🚀 Website Deployment

### Quick Website Launch
```bash
# Option 1: Deploy to Vercel (Recommended)
npm install -g vercel
vercel
# Your website will be live at: https://your-site.vercel.app

# Option 2: Deploy to Netlify
npm run build
# Upload to netlify.com or connect GitHub repo

# Option 3: Traditional Web Hosting
npm run export
# Upload the 'out' folder to any web host
```

### Website Access
- **No Installation**: Users just visit your website URL
- **Cross-Platform**: Works on any device with a web browser
- **Mobile-Friendly**: Responsive design for all screen sizes
- **SEO Optimized**: Search engine friendly with sitemap

## 📱 How Users Access Your Website

1. **Desktop**: Visit `https://yoursite.com` in Chrome/Firefox/Safari
2. **Mobile**: Open mobile browser and navigate to your site
3. **Tablet**: Access through tablet browser
4. **PWA**: Can be "installed" as a web app on mobile devices

### Frontend (Vercel/Netlify)
1. Connect your repository
2. Set environment variables
3. Deploy

### Backend (Heroku/Railway/DigitalOcean)
1. Set up MongoDB (MongoDB Atlas recommended)
2. Configure environment variables
3. Deploy backend

### Database
- **Development**: Local MongoDB
- **Production**: MongoDB Atlas

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- Input validation
- CORS configuration
- Helmet.js security headers

## 📊 Project Structure

```
resume-builder/
├── src/                    # Frontend source
│   ├── app/               # Next.js app directory
│   ├── components/        # Reusable components
│   ├── lib/              # Utilities and configs
│   ├── types/            # TypeScript types
│   └── utils/            # Helper functions
├── backend/               # Backend source
│   └── src/
│       ├── controllers/   # Route controllers
│       ├── models/       # Database models
│       ├── routes/       # API routes
│       ├── middleware/   # Custom middleware
│       ├── utils/        # Utility functions
│       └── config/       # Configuration files
├── public/               # Static assets
└── docs/                 # Documentation
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

For support, email support@resumebuilderpro.com or join our Discord community.

## 🗺️ Roadmap

- [ ] Mobile app (React Native/Flutter)
- [ ] Advanced template editor
- [ ] Team collaboration features
- [ ] LinkedIn integration
- [ ] ATS compatibility checker
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Advanced analytics dashboard

## 🔗 Links

- [Live Demo](https://your-demo-url.com)
- [API Documentation](https://your-api-docs.com)
- [Support](mailto:support@resumebuilderpro.com)

---

Built with ❤️ by [Your Name]