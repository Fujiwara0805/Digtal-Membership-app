"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import { GlassWater, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMembershipStore } from "@/store/membership-store";
import { generateQRToken } from "@/lib/qr-utils";

export function MembershipCard() {
  const { memberDetails } = useMembershipStore();
  const [qrValue, setQrValue] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(false);

  // Generate QR code that refreshes every 30 seconds
  useEffect(() => {
    const generateQR = () => {
      setLoading(true);
      const token = generateQRToken(memberDetails.id);
      setQrValue(token);
      setCountdown(30);
      setLoading(false);
    };

    generateQR();
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          generateQR();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [memberDetails.id]);

  const manualRefresh = () => {
    setLoading(true);
    const token = generateQRToken(memberDetails.id);
    setQrValue(token);
    setCountdown(30);
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="w-full max-w-md"
    >
      <Card className="membership-card overflow-hidden">
        <CardContent className="card-content p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <GlassWater className="h-8 w-8 text-primary mr-2" />
              <h2 className="text-2xl font-bold font-serif gold-text">Le Bar Privé</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">MEMBER ID</p>
              <p className="text-sm font-mono">{memberDetails.id}</p>
            </div>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="bg-white p-4 rounded-xl mb-2 relative">
              {loading ? (
                <div className="flex items-center justify-center w-48 h-48">
                  <RefreshCw className="animate-spin h-8 w-8 text-primary/50" />
                </div>
              ) : (
                <QRCodeSVG
                  value={qrValue}
                  size={192}
                  level="H"
                  className="rounded-md"
                />
              )}
              <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {countdown}s
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={manualRefresh}
              className="text-xs flex items-center text-muted-foreground"
              disabled={loading}
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Refresh
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1">MEMBER NAME</p>
              <p className="font-medium">{memberDetails.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">MEMBERSHIP TYPE</p>
              <p className="font-medium">{memberDetails.type}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">VALID UNTIL</p>
              <p className="font-medium">{memberDetails.validUntil}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">MEMBER SINCE</p>
              <p className="font-medium">{memberDetails.memberSince}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}