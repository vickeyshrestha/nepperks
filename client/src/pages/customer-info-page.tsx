
import { Navigation } from "@/components/ui/navigation";

export default function CustomerInfoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-4xl font-bold text-center text-primary mb-8">Earn Rewards with NepPerks</h1>
          
          <section className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src="https://images.unsplash.com/photo-1530695440407-21fef47230b1"
                alt="Nepalese People Shopping"
                className="rounded-lg object-cover h-64 w-full"
              />
              <p className="text-muted-foreground">
                When you shop at participating local Nepalese businesses, you automatically earn rewards for every purchase. Simply visit a store, make your purchase, and watch your points accumulate. It's that easy! Each transaction helps strengthen our vibrant community and supports small business owners.
              </p>
            </div>
            <p className="text-muted-foreground">
              Plus, you can track your earnings effortlessly through our platform. The more you shop, the more you earn! This not only enhances your shopping experience but also contributes to the growth of local enterprises, making every purchase a win-win situation for you and your community.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
