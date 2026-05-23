import { Button } from '@/components/ui/button'
import {
  HeroSection,
  SectionWrapper,
  GradientText,
  Badge,
  FeatureCard,
  PricingCard,
  TestimonialCard,
} from '@/components/ui-kit'

export default function UIKitPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Hero Section */}
      <HeroSection
        badge="New in v2.0"
        title="Build faster with"
        titleHighlight="AI-powered tools"
        description="A professional starter kit for SaaS and landing pages. Everything you need to launch your next project in days, not months."
        primaryAction={<Button size="lg">Get Started</Button>}
        secondaryAction={<Button size="lg" variant="outline">View Docs</Button>}
      />

      {/* Badge Examples */}
      <SectionWrapper id="badges">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          <GradientText>Badges</GradientText>
        </h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </SectionWrapper>

      {/* Feature Cards */}
      <SectionWrapper id="features" className="bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          <GradientText>Feature Cards</GradientText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<span className="text-2xl">⚡</span>}
            title="Lightning Fast"
            description="Built with Next.js 15 and React 19 for maximum performance and speed."
          />
          <FeatureCard
            icon={<span className="text-2xl">🤖</span>}
            title="AI Powered"
            description="Integrated with Groq AI for intelligent features out of the box."
          />
          <FeatureCard
            icon={<span className="text-2xl">🔒</span>}
            title="Secure by Default"
            description="JWT authentication, Prisma ORM and PostgreSQL for enterprise security."
          />
        </div>
      </SectionWrapper>

      {/* Pricing Cards */}
      <SectionWrapper id="pricing">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          <GradientText>Pricing Cards</GradientText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PricingCard
            title="Starter"
            price="0 ₽"
            period="mo"
            description="Perfect for personal projects"
            features={[
              { text: '3 projects', included: true },
              { text: 'Basic AI features', included: true },
              { text: 'Community support', included: true },
              { text: 'Custom domain', included: false },
              { text: 'Priority support', included: false },
            ]}
            buttonText="Get Started Free"
          />
          <PricingCard
            title="Pro"
            price="2 990 ₽"
            period="mo"
            description="For growing businesses"
            features={[
              { text: 'Unlimited projects', included: true },
              { text: 'Full AI features', included: true },
              { text: 'Priority support', included: true },
              { text: 'Custom domain', included: true },
              { text: 'Analytics dashboard', included: false },
            ]}
            buttonText="Start Pro Trial"
            highlighted={true}
            badge="Most Popular"
          />
          <PricingCard
            title="Enterprise"
            price="9 990 ₽"
            period="mo"
            description="For large teams"
            features={[
              { text: 'Unlimited projects', included: true },
              { text: 'Full AI features', included: true },
              { text: 'Dedicated support', included: true },
              { text: 'Custom domain', included: true },
              { text: 'Analytics dashboard', included: true },
            ]}
            buttonText="Contact Sales"
          />
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper id="testimonials" className="bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          <GradientText>Testimonials</GradientText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            text="This starter kit saved me weeks of setup time. The AI integration works perfectly out of the box."
            author="Alex Petrov"
            role="Founder at TechStartup"
            rating={5}
          />
          <TestimonialCard
            text="Best Next.js boilerplate I have used. Clean code, great structure and excellent documentation."
            author="Maria Ivanova"
            role="Senior Developer"
            rating={5}
          />
          <TestimonialCard
            text="Launched my SaaS in just 2 weeks instead of 3 months. The UI kit is a game changer."
            author="Dmitry Sokolov"
            role="Product Manager"
            rating={4}
          />
        </div>
      </SectionWrapper>

    </main>
  )
}
