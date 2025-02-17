import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Loader2, QrCode, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRScanner } from "@/components/ui/qr-scanner";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: transactions, isLoading: loadingTransactions } = useQuery({
    queryKey: ["/api/transactions/customer"],
    queryFn: async () => {
      const res = await fetch("/api/transactions/customer");
      return res.json();
    },
  });

  const totalPoints = transactions?.reduce((acc: number, t: any) => acc + t.points, 0) || 0;

  const handleQrCodeScanned = async (qrCode: string) => {
    try {
      const businessId = qrCode.replace("NEPPERKS-", "");
      // In a real app, this would open a form to enter transaction details
      toast({
        title: "QR Code Scanned",
        description: `Business ID: ${businessId}`,
      });
    } catch (error) {
      toast({
        title: "Invalid QR Code",
        description: "Please scan a valid NepPerks business QR code",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <h1 className="text-3xl font-bold">Welcome, {user?.fullName}</h1>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Points</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {totalPoints}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Transactions</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {transactions?.length || 0}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <QrCode className="h-4 w-4 mr-2" />
                      Scan QR
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Scan Business QR Code</DialogTitle>
                    </DialogHeader>
                    <QRScanner onScan={handleQrCodeScanned} />
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Receipt
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
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
                      <TableHead>Business</TableHead>
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
                        <TableCell>{transaction.businessName}</TableCell>
                        <TableCell>Rs. {transaction.amount}</TableCell>
                        <TableCell>+{transaction.points}</TableCell>
                        <TableCell className="capitalize">
                          {transaction.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b"
                    alt="Shop Interior"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="text-muted-foreground">
                    Discover exciting rewards from your favorite local businesses
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1561710309-efd9aee84194"
                    alt="Local Markets"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="text-muted-foreground">
                    Explore new participating businesses in your area
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
