import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { insertRewardSchema } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BusinessDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: business } = useQuery({
    queryKey: ["/api/businesses/user"],
    queryFn: async () => {
      const res = await fetch(`/api/businesses/${user?.id}`);
      return res.json();
    },
  });

  const { data: transactions, isLoading: loadingTransactions } = useQuery({
    queryKey: ["/api/transactions/business", business?.id],
    queryFn: async () => {
      const res = await fetch(`/api/transactions/business/${business?.id}`);
      return res.json();
    },
    enabled: !!business?.id,
  });

  const { data: rewards, isLoading: loadingRewards } = useQuery({
    queryKey: ["/api/rewards/business", business?.id],
    queryFn: async () => {
      const res = await fetch(`/api/rewards/business/${business?.id}`);
      return res.json();
    },
    enabled: !!business?.id,
  });

  const rewardForm = useForm({
    resolver: zodResolver(insertRewardSchema),
    defaultValues: {
      name: "",
      description: "",
      pointsCost: 0,
    },
  });

  const createRewardMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/rewards", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Reward created successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/rewards/business"] });
      rewardForm.reset();
    },
  });

  if (!business) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-6">
              <p>Business profile not found. Please contact support.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{business.name}</h1>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${business.qrCode}`} 
              alt="Business QR Code"
              className="h-24 w-24"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Transactions</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {transactions?.length || 0}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Rewards</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {rewards?.length || 0}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Points Issued</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {transactions?.reduce((acc: number, t: any) => acc + t.points, 0) || 0}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Rewards</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Reward
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Reward</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={rewardForm.handleSubmit((data) => createRewardMutation.mutate(data))}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Reward Name</Label>
                        <Input id="name" {...rewardForm.register("name")} />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" {...rewardForm.register("description")} />
                      </div>
                      <div>
                        <Label htmlFor="pointsCost">Points Required</Label>
                        <Input 
                          id="pointsCost" 
                          type="number" 
                          {...rewardForm.register("pointsCost", { valueAsNumber: true })} 
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={createRewardMutation.isPending}>
                        {createRewardMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Reward
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {loadingRewards ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Points Required</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rewards?.map((reward: any) => (
                      <TableRow key={reward.id}>
                        <TableCell>{reward.name}</TableCell>
                        <TableCell>{reward.description}</TableCell>
                        <TableCell>{reward.pointsCost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingTransactions ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions?.map((transaction: any) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {new Date(transaction.timestamp).toLocaleDateString()}
                        </TableCell>
                        <TableCell>Rs. {transaction.amount}</TableCell>
                        <TableCell>{transaction.points}</TableCell>
                        <TableCell className="capitalize">{transaction.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
