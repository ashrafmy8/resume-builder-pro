import Link from 'next/link'
import { ArrowRight, FileText, Sparkles, CreditCard, Download, Star, Users, Globe, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Resume Builder Pro</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/templates" className="text-gray-600 hover:text-gray-900 transition-colors">Templates</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Reviews</Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">Sign In</Link>
              <Link href="/register" className="btn-primary">Start Free</Link>
            </nav>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Link href="/register" className="btn-primary">Start Free</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Create Professional Resumes with 
            <span className="text-primary-600"> AI Power</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Build stunning resumes in minutes with our AI-powered content suggestions, 
            professional templates, and seamless editing experience.
          </p>
          <Link href="/register" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
            Start Building Your Resume <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        
        {/* Trust Signals */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">Trusted by professionals worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">50K+</div>
              <div className="text-gray-600">Resumes Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">24/7</div>
              <div className="text-gray-600">Online Access</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">180+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Land Your Dream Job
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Content Suggestions</h3>
              <p className="text-gray-600">
                Get smart suggestions for bullet points, summaries, and professional descriptions 
                tailored to your industry.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Templates</h3>
              <p className="text-gray-600">
                Choose from dozens of ATS-friendly templates designed by professionals 
                for maximum impact.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Export & Share</h3>
              <p className="text-gray-600">
                Download as PDF, email directly to employers, or share with recruiters 
                with just one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "This website helped me land my dream job! The AI suggestions were spot-on and the templates look incredibly professional."
              </p>
              <div className="font-semibold text-gray-900">Sarah Johnson</div>
              <div className="text-gray-500 text-sm">Marketing Manager</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Best online resume builder I've used. The payment system is smooth and the templates are worth every penny."
              </p>
              <div className="font-semibold text-gray-900">Michael Chen</div>
              <div className="text-gray-500 text-sm">Software Engineer</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I love how easy it is to use this website. Created a professional resume in just 15 minutes!"
              </p>
              <div className="font-semibold text-gray-900">Emily Rodriguez</div>
              <div className="text-gray-500 text-sm">Project Manager</div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Website?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Web-Based</h3>
              <p className="text-gray-600 text-sm">
                Access from any device with internet. No downloads required.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure</h3>
              <p className="text-gray-600 text-sm">
                Your data is encrypted and secure. We never share your information.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multi-User</h3>
              <p className="text-gray-600 text-sm">
                Create accounts for teams. Share and collaborate online.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Highly Rated</h3>
              <p className="text-gray-600 text-sm">
                5-star rated website with thousands of satisfied users.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Simple, Affordable Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">24-Hour Pass</h3>
              <div className="text-3xl font-bold text-primary-600 mb-4">$2</div>
              <p className="text-gray-600 mb-6">Perfect for immediate needs</p>
              <ul className="text-left space-y-2 mb-6">
                <li>✓ Unlimited resume building</li>
                <li>✓ PDF download</li>
                <li>✓ Email sharing</li>
                <li>✓ 24-hour access</li>
              </ul>
            </div>
            <div className="card border-primary-200 border-2">
              <h3 className="text-xl font-semibold mb-4">Monthly Plan</h3>
              <div className="text-3xl font-bold text-primary-600 mb-4">$5<span className="text-lg text-gray-500">/month</span></div>
              <p className="text-gray-600 mb-6">Best value for job seekers</p>
              <ul className="text-left space-y-2 mb-6">
                <li>✓ Everything in 24-hour pass</li>
                <li>✓ Unlimited downloads</li>
                <li>✓ Priority AI suggestions</li>
                <li>✓ Advanced templates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <FileText className="h-8 w-8 text-primary-500" />
            <span className="ml-2 text-2xl font-bold">Resume Builder Pro</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Resume Builder Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}