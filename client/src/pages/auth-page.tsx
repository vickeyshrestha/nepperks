import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { Redirect } from "wouter";
import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

export default function AuthPage() {
  const { user, loginMutation } = useAuth();
  const queryClient = useQueryClient();
  const [_, navigate] = useLocation();

  const loginForm = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
      fullName: "",
      userType: "customer",
      email: "",
      phone: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      const user = await res.json();

      if (user.type === "business") {
        const businessRes = await fetch("/api/businesses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${user.fullName}'s Business`,
            description: "Welcome to my business",
            userId: user.id
          }),
        });
        if (!businessRes.ok) throw new Error(await businessRes.text());
      }

      return user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);
      navigate(user.type === "business" ? "/business/dashboard" : "/customer");
    },
  });


  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <Tabs defaultValue="login">
            <TabsList className="w-full">
              <TabsTrigger value="login" className="w-full">Login</TabsTrigger>
              <TabsTrigger value="register" className="w-full">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data))}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" {...loginForm.register("username")} />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" {...loginForm.register("password")} />
                  </div>
                  <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                    {loginMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Login
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={registerForm.handleSubmit((data) => registerMutation.mutate(data))}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reg-fullName">Full Name</Label>
                    <Input id="reg-fullName" {...registerForm.register("fullName")} />
                  </div>
                  <div>
                    <Label htmlFor="reg-email">Email</Label>
                    <Input id="reg-email" type="email" {...registerForm.register("email")} />
                  </div>
                  <div>
                    <Label htmlFor="reg-phone">Phone</Label>
                    <Input id="reg-phone" {...registerForm.register("phone")} />
                  </div>
                  <div>
                    <Label htmlFor="reg-username">Username</Label>
                    <Input id="reg-username" {...registerForm.register("username")} />
                  </div>
                  <div>
                    <Label htmlFor="reg-password">Password</Label>
                    <Input id="reg-password" type="password" {...registerForm.register("password")} />
                  </div>
                  <div>
                    <Label htmlFor="reg-userType">Account Type</Label>
                    <select
                      id="reg-userType"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      {...registerForm.register("userType")}
                    >
                      <option value="customer">Customer</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
                    {registerMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Register
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="hidden md:flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-bold text-primary">NepPerks</h1>
          <p className="text-lg text-muted-foreground">
            Join Nepal's premier rewards program for local businesses. Earn points, get rewards, and support your community.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1516274626895-055a99214f08" 
              alt="Local Shop" 
              className="rounded-lg object-cover h-32"
            />
            <img 
              src="https://images.unsplash.com/photo-1445067041505-b53988974abd" 
              alt="Nepalese Culture" 
              className="rounded-lg object-cover h-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
}