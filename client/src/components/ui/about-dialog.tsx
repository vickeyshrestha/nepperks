import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  const { user } = useAuth();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-primary">About NepPerks</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Company Overview */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Who We Are</h3>
            <div className="bg-muted rounded-lg p-6">
              <p className="text-muted-foreground">
                NepPerks is a pioneering startup dedicated to supporting local Nepalese businesses 
                through an innovative rewards-based system. We bridge the gap between businesses 
                and customers, fostering stronger community relationships and economic growth.
              </p>
              <div className="mt-4">
                <h4 className="font-semibold">Vickey Shrestha</h4>
                <p className="text-sm text-muted-foreground">Founder & Owner</p>
                <p className="text-sm text-muted-foreground">Based in Fort Worth, Texas</p>
              </div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">Our Vision</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2">Empowering Businesses</h4>
                <p className="text-sm text-muted-foreground">
                  Supporting small businesses through increased customer engagement and loyalty programs
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2">Customer Value</h4>
                <p className="text-sm text-muted-foreground">
                  Delivering meaningful rewards and perks that enhance the shopping experience
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2">Community Growth</h4>
                <p className="text-sm text-muted-foreground">
                  Building a sustainable business ecosystem that benefits all stakeholders
                </p>
              </div>
            </div>
          </section>

          {/* Owner's Message */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">A Message from Our Founder</h3>
            <blockquote className="border-l-4 border-primary pl-6 italic">
              <p className="text-muted-foreground">
                "Living in US for past 17 years, I witnessed the incredible potential of small Neaplese businesses 
                and their impact on communities. NepPerks was born from a vision to bridge 
                the gap between these businesses and their customers, creating a win-win 
                relationship through a modern rewards system. Together, we can build stronger 
                communities and successful businesses."
              </p>
              <footer className="mt-2 font-semibold">- Vickey Shrestha</footer>
            </blockquote>
          </section>

          {/* Call to Action */}
          <section className="bg-primary/5 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold mb-4">Join Our Community</h3>
            <p className="text-muted-foreground mb-6">
              Whether you're a business owner looking to grow your customer base or a customer 
              eager to support local businesses while earning rewards, NepPerks is here for you.
            </p>
            {!user && (
              <Link href="/auth">
                <Button size="lg" className="animate-pulse">
                  Get Started Today
                </Button>
              </Link>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}