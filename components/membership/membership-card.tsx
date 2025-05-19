"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMembershipStore } from "@/store/membership-store";
import { generateQRToken } from "@/lib/qr-utils";
import QRCode from "react-qr-code";

export function MembershipCard({ userId }: { userId: string }) {
  const { memberDetails } = useMembershipStore();
  const [qrValue, setQrValue] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(false);

  // QRコードの生成関数（統合版）
  const generateQR = () => {
    setLoading(true);
    
    // 基本情報と会員詳細を含めたデータを作成
    const cardData = {
      userId,
      memberType: memberDetails.type,
      validUntil: memberDetails.validUntil,
      timestamp: Date.now(),
      token: generateQRToken(memberDetails.id) // セキュリティ検証用トークン
    };
    
    // JSONを文字列化してQRコードの値として使用
    setQrValue(JSON.stringify(cardData));
    setCountdown(30);
    setLoading(false);
  };

  // QRコード生成と自動更新
  useEffect(() => {
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
  }, [memberDetails.id, userId, memberDetails.type, memberDetails.validUntil]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="membership-card overflow-hidden">
        <CardContent className="card-content p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold">{memberDetails.name}</h3>
              <div className="flex items-center text-sm mt-1">
                <span className="bg-primary/20 px-2 py-0.5 rounded-full text-xs">
                  {memberDetails.user_type === 'tourist' ? '観光客' : 
                   memberDetails.user_type === 'local' ? '地域住民' : 'スタッフ'}
                </span>
                <span className="ml-2 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" /> 会員確認済み
                </span>
              </div>
            </div>
            
            {/* QRコード更新ボタンと残り時間の表示 */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={generateQR} 
              disabled={loading || countdown > 28}
              className="h-8 px-2"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
              <span className="text-xs">{countdown}秒</span>
            </Button>
          </div>

          <div className="flex-1 flex items-center justify-center my-4">
            <div className={`p-3 bg-white rounded-lg ${loading ? 'opacity-50' : ''}`}>
              {qrValue && (
                <QRCode
                  value={qrValue}
                  size={180}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  fgColor="#000000"
                  bgColor="#FFFFFF"
                />
              )}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">会員ID</span>
              <span className="font-medium">{memberDetails.id}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">会員種別</span>
              <span className="font-medium">{memberDetails.type}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">有効期限</span>
              <span className="font-medium">{memberDetails.validUntil}</span>
            </div>
            
            <p className="text-xs text-center mt-4 text-muted-foreground">
              店舗スタッフにこのQRコードをご提示ください<br />
              <span className="opacity-70">（安全のため{countdown}秒後に自動更新されます）</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}