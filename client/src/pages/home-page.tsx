import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { Navigation } from "@/components/ui/navigation";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            NepPerks
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Support local Nepalese businesses and earn rewards for your loyalty
          </p>
          {!user && (
            <div className="space-x-4">
              <Link href="/auth">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-4">For Customers</h3>
            <p className="text-muted-foreground mb-4">
              Earn points on every purchase and redeem them for exclusive rewards
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-4">For Businesses</h3>
            <p className="text-muted-foreground mb-4">
              Build customer loyalty and grow your business with our rewards platform
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <p className="text-muted-foreground mb-4">
              Simply scan QR codes or upload receipts to earn points automatically
            </p>
            <Link href="/how-it-works" className="text-primary hover:underline">
              Learn more
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Featured Businesses</h2>
            <div className="grid gap-4">
              <img
                src="https://images.unsplash.com/photo-1481437156560-3205f6a55735"
                alt="Local Business"
                className="rounded-lg object-cover h-48 w-full"
              />
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1519057016395-76b7690327e0"
                  alt="Shop Interior"
                  className="rounded-lg object-cover h-32"
                />
                <img
                  src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf"
                  alt="Street Shop"
                  className="rounded-lg object-cover h-32"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Why Choose NepPerks?</h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <span className="text-primary">•</span>
                <span>Support local Nepalese businesses</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-primary">•</span>
                <span>Earn points on every purchase</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-primary">•</span>
                <span>Exclusive rewards and perks</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-primary">•</span>
                <span>Easy to use QR code system</span>
              </li>
            </ul>
          </div>
        </section>
      <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Get in Touch</h3>
                  <div className="space-y-2">
                    <p className="flex items-center space-x-2">
                      <span className="text-primary">📍</span>
                      <span>Fort Worth, Texas</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="text-primary">📧</span>
                      <span>vickey.shrestha@outlook.com</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="text-primary">📱</span>
                      <span>+1 (682) 556-9321</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Business Hours</h3>
                  <div className="space-y-2">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
