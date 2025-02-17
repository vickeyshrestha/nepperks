
import { Navigation } from "@/components/ui/navigation";

export default function CustomerRewardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-4xl font-bold text-center text-primary mb-8">Customer Rewards Program</h1>
          
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Earn Rewards</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="https://images.unsplash.com/photo-1625124376320-b0c5589b1585"
                alt="Nepalese People Shopping"
                className="rounded-lg object-cover h-64 w-full"
              />
              <p className="text-muted-foreground">
                When you shop at participating local Nepalese businesses, you automatically earn rewards for every purchase. Simply visit a store, make your purchase, and watch your points accumulate. It's that easy! Each transaction helps strengthen our vibrant community and supports small business owners. Plus, you can track your earnings effortlessly through our platform. The more you shop, the more you earn!
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Redeem Perks</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <p className="text-muted-foreground">
                Redeeming your hard-earned rewards has never been simpler! Once you've accumulated enough points, you can use them to enjoy exclusive discounts and offers at participating stores. Whether it's a percentage off your next purchase or a special deal on select items, your rewards are yours to choose. Just present your reward at the checkout, and see the savings apply instantly.
              </p>
              <img
                src="https://images.unsplash.com/photo-1609188944033-06041b850424"
                alt="Nepalese Community"
                className="rounded-lg object-cover h-64 w-full"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
