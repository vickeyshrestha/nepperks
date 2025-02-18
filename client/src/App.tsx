import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";

import HomePage from "@/pages/home-page";
import CustomerRewardsPage from "@/pages/customer-rewards-page";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import BusinessDashboard from "@/pages/business-dashboard";
import CustomerDashboard from "@/pages/customer-dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/customer-rewards" component={CustomerRewardsPage} />
      <ProtectedRoute path="/business" component={BusinessDashboard} />
      <ProtectedRoute path="/customer" component={CustomerDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
