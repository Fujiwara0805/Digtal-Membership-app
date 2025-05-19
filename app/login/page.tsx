"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full">
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/guild.jpg" 
          alt="Guild background" 
          fill 
          className="object-cover brightness-50"
          priority
        />
      </div>
      
      {/* カードをより小さく */}
      <Card className="relative z-10 w-[calc(100%-8px)] max-w-sm mx-1 bg-background/90 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-[32px]">Guildにログイン</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-center text-[20px] leading-tight max-w-[280px] mx-auto">
            ログインして予約や会員証の表示などの
            機能を利用できます。
          </p>
          <Button
            onClick={() => signIn("line", { callbackUrl })}
            className="w-full py-6 text-lg"
          >
            LINEでログイン
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
