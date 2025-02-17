import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
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
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">About NepPerks</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 py-4">
          {/* Company Overview */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="text-muted-foreground">
              NepPerks is dedicated to supporting local Nepalese businesses by creating a dynamic
              rewards-based system that enhances customer engagement and builds lasting relationships
              between businesses and their patrons.
            </p>
          </section>

          {/* Owner's Information */}
          <section className="flex items-center space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/owner.jpg" alt="Vickey Shrestha" />
              <AvatarFallback>VS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">Vickey Shrestha</h3>
              <p className="text-sm text-muted-foreground">Founder & Owner</p>
              <p className="mt-2 text-muted-foreground">
                Based in Fort Worth, Texas
              </p>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <ul className="space-y-2 text-muted-foreground list-disc pl-4">
              <li>Empowering small businesses through increased customer engagement</li>
              <li>Providing value to customers via innovative perks and rewards</li>
              <li>Building a sustainable and thriving business community</li>
            </ul>
          </section>

          {/* Owner's Message */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">A Message from Our Founder</h3>
            <blockquote className="border-l-2 pl-4 italic text-muted-foreground">
              "Growing up in Nepal, I witnessed the incredible potential of small businesses and their
              impact on communities. NepPerks was born from a vision to bridge the gap between these
              businesses and their customers, creating a win-win relationship through a modern rewards
              system. Together, we can build stronger communities and successful businesses."
            </blockquote>
          </section>

          {/* Call to Action */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Join Our Community</h3>
            <p className="text-muted-foreground">
              Whether you're a business owner looking to grow your customer base or a customer eager
              to support local businesses while earning rewards, NepPerks is here for you.
            </p>
            {!user && (
              <Link href="/auth">
                <Button className="mt-4">Get Started Today</Button>
              </Link>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
