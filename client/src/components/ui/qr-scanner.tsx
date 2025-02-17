import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Card } from "./card";
import { Button } from "./button";

interface QRScannerProps {
  onScan: (qrCode: string) => void;
}

export function QRScanner({ onScan }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>("");
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (!scannerRef.current && isScanning) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          showTorchButtonIfSupported: true,
          aspectRatio: 1.0,
        },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          onScan(decodedText);
          if (scannerRef.current) {
            scannerRef.current.clear();
          }
          setIsScanning(false);
          setError("");
        },
        (error) => {
          console.error(error);
          if (error.includes("permission")) {
            setError("Camera permission denied. Please enable camera access and try again.");
          } else {
            setError("Error accessing camera. Please try again.");
          }
          setIsScanning(false);
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [isScanning, onScan]);

  return (
    <Card className="p-4">
      {!isScanning ? (
        <div className="text-center space-y-4">
          <Button onClick={() => {
            setError("");
            setIsScanning(true);
          }}>Start Scanning</Button>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </div>
      ) : (
        <>
          <div id="qr-reader" className="w-full max-w-sm mx-auto" />
          <div className="text-center mt-4">
            <Button variant="outline" onClick={() => {
              setIsScanning(false);
              setError("");
            }}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}
