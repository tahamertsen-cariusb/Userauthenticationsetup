import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Sparkles, 
  Zap, 
  Globe, 
  BarChart3, 
  Shield, 
  ArrowRight,
  CheckCircle2,
  Bot,
  Languages,
  TrendingUp
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/app/products');
    }
  }, [user, navigate]);

  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Optimization',
      description: 'Leverage GPT-4 to generate SEO-optimized product descriptions that convert.',
    },
    {
      icon: Languages,
      title: 'Multi-Language Support',
      description: 'Automatically translate and optimize descriptions in multiple languages.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track performance, SEO scores, and optimization metrics in real-time.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Bulk optimize hundreds of products in minutes, not hours.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with automatic backups and data protection.',
    },
    {
      icon: Globe,
      title: 'Shopify Integration',
      description: 'Seamlessly sync with your Shopify store with one-click integration.',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Products Optimized' },
    { value: '95%', label: 'SEO Score Improvement' },
    { value: '50+', label: 'Languages Supported' },
    { value: '24/7', label: 'AI Availability' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900 dark:text-white">Shopify AI Optimizer</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/auth')}>
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <Badge className="mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-0">
          <Sparkles className="w-3 h-3 mr-1" />
          Powered by GPT-4
        </Badge>
        
        <h1 className="text-gray-900 dark:text-white mb-6 max-w-4xl mx-auto">
          Transform Your Shopify Store with AI-Powered Product Descriptions
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Boost your SEO rankings and conversion rates with intelligent, multi-language product descriptions 
          generated in seconds. Save hours of manual work and let AI optimize your entire catalog.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" onClick={() => navigate('/auth')} className="gap-2">
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
            Watch Demo
          </Button>
        </div>

        {/* Hero Image / Dashboard Preview */}
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-3xl opacity-20"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2"></div>
            <div className="p-8">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                    <div className="w-20 h-8 bg-blue-500 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 border-0">
            Features
          </Badge>
          <h2 className="text-gray-900 dark:text-white mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful features designed to help you optimize your entire product catalog efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-0">
              Simple Process
            </Badge>
            <h2 className="text-gray-900 dark:text-white mb-4">
              Get Started in 3 Easy Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Connect Your Store',
                description: 'Link your Shopify store with our secure API integration.',
              },
              {
                step: '02',
                title: 'Configure AI Settings',
                description: 'Choose your target languages and optimization preferences.',
              },
              {
                step: '03',
                title: 'Generate & Deploy',
                description: 'Let AI optimize your products and push changes instantly.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                )}
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 border-0">
              Benefits
            </Badge>
            <h2 className="text-gray-900 dark:text-white mb-6">
              Why Choose Our Platform?
            </h2>
            <div className="space-y-4">
              {[
                'Increase organic traffic with SEO-optimized content',
                'Save 10+ hours per week on product descriptions',
                'Reach global markets with multi-language support',
                'Improve conversion rates by up to 40%',
                'Maintain brand consistency across all products',
                'Get real-time analytics and performance insights',
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
            <Button size="lg" className="mt-8" onClick={() => navigate('/auth')}>
              Start Optimizing Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-3xl opacity-20"></div>
            <Card className="relative">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="text-gray-900 dark:text-white">Revenue Growth</div>
                      <p className="text-gray-600 dark:text-gray-400">+45% average increase</p>
                    </div>
                  </div>
                  <div className="h-40 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg flex items-end justify-around p-4">
                    {[40, 60, 45, 80, 95, 100].map((height, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-t from-blue-600 to-purple-600 rounded w-12"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-white mb-6">
            Ready to Transform Your Shopify Store?
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Join thousands of successful e-commerce businesses using AI to optimize their product catalogs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate('/auth')}>
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-900 dark:text-white">Shopify AI Optimizer</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              © 2025 Shopify AI Optimizer. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}