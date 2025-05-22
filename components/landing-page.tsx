import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, FileText, Cloud, Users } from "lucide-react"
import Link from "next/link"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { EnhancedLoadingLink } from "@/components/enhanced-loading-link"
import { EnhancedLoadingButton } from "@/components/enhanced-loading-button"

const features = [
  {
    title: "Tokenized Crops",
    description: "Invest directly in agricultural commodities through blockchain tokens representing real crops.",
    icon: Coins,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Smart Contracts",
    description: "Transparent agreements between investors and farmers with automated milestone payments.",
    icon: FileText,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Climate Insurance",
    description: "Parametric insurance powered by weather oracles to protect investments from climate risks.",
    icon: Cloud,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Farmer Empowerment",
    description: "Support local farmers with fair financing and access to global markets.",
    icon: Users,
    color: "bg-amber-100 text-amber-700",
  },
]

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Invest in the Future of Farming
                <span className="block text-green-600">Powered by Blockchain</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                AgriDeFi connects investors with farmers through blockchain technology, creating transparent,
                sustainable, and profitable agricultural investments.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <EnhancedLoadingButton href="/dashboard" size="lg" className="bg-green-600 hover:bg-green-700">
                  Start Investing
                </EnhancedLoadingButton>
                <div className="w-full sm:w-auto">
                  <ConnectWalletButton />
                </div>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Sustainable farming"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How AgriDeFi Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines blockchain technology with agriculture to create a sustainable and profitable
              ecosystem for investors and farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.color} mb-4`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Ready to Grow Your Investment?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of investors who are already supporting sustainable agriculture while earning competitive
            returns.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <EnhancedLoadingButton href="/dashboard" size="lg" className="bg-green-600 hover:bg-green-700">
              Explore Tokens
            </EnhancedLoadingButton>
            <EnhancedLoadingButton href="/farmers" variant="outline" size="lg">
              Meet Our Farmers
            </EnhancedLoadingButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 lg:px-8 bg-gray-900 text-gray-300 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AgriDeFi</h3>
              <p className="text-sm text-gray-400">
                Blockchain-powered agriculture investment platform connecting investors with farmers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <EnhancedLoadingLink href="/dashboard" className="hover:text-white">
                    Token Investment
                  </EnhancedLoadingLink>
                </li>
                <li>
                  <EnhancedLoadingLink href="/smart-contracts" className="hover:text-white">
                    Smart Contracts
                  </EnhancedLoadingLink>
                </li>
                <li>
                  <EnhancedLoadingLink href="/climate-risk" className="hover:text-white">
                    Climate Risk
                  </EnhancedLoadingLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Whitepaper
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Telegram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} AgriDeFi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
