"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMembershipStore } from "@/store/membership-store";
import { User, Upload, ChevronDown, ChevronUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import { useState, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { MembershipCard } from "@/components/membership/membership-card";

const formSchema = z.object({
  display_name: z.string().min(2, "表示名は2文字以上で入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phone: z.string().optional(),
  user_type: z.enum(["tourist", "local", "staff"], { required_error: "ユーザータイプを選択してください" }),
  home_area: z.string().optional(),
  interests: z.array(z.string()).optional(),
  preferredLocation: z.string().optional(),
  dietary: z.string().optional(),
  alcoholPreference: z.string().optional(),
  bio: z.string().optional(),
});

// Supabaseクライアントの初期化 (コンポーネントの外、または適切な場所で一度だけ行う)
// 環境変数が設定されていることを確認してください
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Check your .env file.");
}
// @ts-ignore supabaseUrl と supabaseAnonKey が undefined でないことを確認した上で createClient を呼び出す
const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith("http") 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// 興味・関心の選択肢 (例)
const allInterests = [
  { id: "camping", label: "キャンプ" },
  { id: "hiking", label: "ハイキング・登山" },
  { id: "onsen", label: "温泉" },
  { id: "gourmet", label: "グルメ・地酒" },
  { id: "local_history", label: "郷土史・文化財" },
  { id: "photography", label: "写真撮影" },
  { id: "fishing", label: "釣り" },
  { id: "cycling", label: "サイクリング" },
  { id: "nature_walk", label: "自然散策" },
];

export function ProfileForm() {
  const { data: session } // NextAuth.jsのセッションを取得
    = useSession(); 
  const { memberDetails, updateMemberDetails } = useMembershipStore();
  const [isLoading, setIsLoading] = useState(false); // Supabaseへの保存処理中のローディング状態
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null); // 保存結果のメッセージ
  const [showMemberCard, setShowMemberCard] = useState(false);
  
  const toggleMemberCard = useCallback(() => {
    setShowMemberCard(prev => !prev);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      display_name: memberDetails.name,
      email: memberDetails.email,
      phone: memberDetails.phone || "",
      user_type: memberDetails.user_type || undefined,
      home_area: memberDetails.home_area || "",
      interests: memberDetails.interests || [],
      preferredLocation: memberDetails.preferredLocation || "",
      dietary: memberDetails.preferences?.dietary || "",
      alcoholPreference: memberDetails.preferences?.alcoholPreference || "",
      bio: memberDetails.bio || "",
    },
  });

  const userId = (session?.user as { id?: string | null })?.id;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!supabase) {
      setFormMessage({ type: 'error', text: "データベース接続が設定されていません。" });
      return;
    }
    // session.user に id が存在することを型アサーションで示す
    if (!userId) {
      setFormMessage({ type: 'error', text: "ログインしていません。プロフィールを保存できません。" });
      return;
    }

    setIsLoading(true);
    setFormMessage(null);

    // 1. Zustandストアの更新 (これは既存の処理)
    updateMemberDetails({
      ...memberDetails, // avatarなど、フォームにない既存情報も維持
      name: data.display_name,
      email: data.email,
      phone: data.phone,
      user_type: data.user_type,
      home_area: data.home_area,
      interests: data.interests,
      preferredLocation: data.preferredLocation,
      preferences: {
        dietary: data.dietary,
        alcoholPreference: data.alcoholPreference,
      },
      bio: data.bio,
    });
    

    // 2. Supabaseデータベースへの保存処理
    try {
      // profilesテーブルに保存するデータを整形
      // user_type, home_area, interests など、コンセプトに合わせて追加した項目もここに追加
      const profileDataToSave = {
        id: userId, // 認証ユーザーのID (型アサーションで取得した値を使用)
        display_name: data.display_name,
        phone_number: data.phone,
        bio: data.bio,
        user_type: data.user_type,
        home_area: data.home_area,
        interests: data.interests,
        preferred_location: data.preferredLocation,
        dietary_preferences: data.dietary,
        alcohol_preferences: data.alcoholPreference,
        avatar_url: memberDetails.avatar,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(profileDataToSave, {
          // onConflict: 'id' // idが競合した場合にupdateする (Supabaseのupsertのデフォルト動作)
        });

      if (error) {
        console.error("Error saving profile to Supabase:", error);
        setFormMessage({ type: 'error', text: `プロフィールの保存に失敗しました: ${error.message}` });
      } else {
        setFormMessage({ type: 'success', text: "プロフィールが正常に保存されました。" });
      }
    } catch (e) {
      console.error("An unexpected error occurred:", e);
      setFormMessage({ type: 'error', text: "予期せぬエラーが発生しました。" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-primary/10">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={memberDetails.avatar} />
            <AvatarFallback>
              <User className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="text-xs">
            <Upload className="h-3 w-3 mr-1" /> アバターを変更
          </Button>
        </div>
        
        <div className="mb-8">
          <Button
            onClick={toggleMemberCard}
            variant="outline"
            className="flex items-center gap-2 mx-auto"
          >
            {showMemberCard ? (
              <>会員証を閉じる <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>デジタル会員証を表示 <ChevronDown className="h-4 w-4" /></>
            )}
          </Button>
          
          {showMemberCard && (
            <div className="mt-4 max-w-md mx-auto">
              <MembershipCard userId={userId || memberDetails.id} />
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="display_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>表示名</FormLabel>
                    <FormControl>
                      <Input placeholder="アプリ内で表示される名前" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>メールアドレス</FormLabel>
                    <FormControl>
                      <Input placeholder="連絡可能なメールアドレス" {...field} readOnly disabled/>
                    </FormControl>
                    <FormDescription>メールアドレスは変更できません。</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="user_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ユーザータイプ</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="あなたのタイプを選択してください" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tourist">観光客</SelectItem>
                        <SelectItem value="local">地域住民</SelectItem>
                        <SelectItem value="staff">バー関係者</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="home_area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>主な活動エリア / 出身地</FormLabel>
                    <FormControl>
                      <Input placeholder="例: 東京都、〇〇市、△△キャンプ場周辺" {...field} />
                    </FormControl>
                    <FormDescription>観光客の方は出発地、地域住民の方はお住まいのエリアなど</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>電話番号 (任意)</FormLabel>
                    <FormControl>
                      <Input placeholder="連絡可能な電話番号" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>お気に入りの場所 (任意)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="場所を選択" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* ここは実際の地域や観光スポットに合わせて変更 */}
                        <SelectItem value="lake_toya">洞爺湖エリア</SelectItem>
                        <SelectItem value="furano_ski">富良野スキー場周辺</SelectItem>
                        <SelectItem value="noboribetsu_onsen">登別温泉</SelectItem>
                        <SelectItem value="local_market">地元の市場</SelectItem>
                        <SelectItem value="secret_spot">秘密の場所</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>よく行く場所や、これから行ってみたい場所など</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dietary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>食事の好み (任意)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="食事の好みを選択" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">特に制限なし</SelectItem>
                        <SelectItem value="vegetarian">ベジタリアン</SelectItem>
                        <SelectItem value="vegan">ヴィーガン</SelectItem>
                        <SelectItem value="gluten-free">グルテンフリー</SelectItem>
                        <SelectItem value="halal">ハラル</SelectItem>
                        <SelectItem value="other">その他（自己紹介欄に記入）</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alcoholPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>お酒の好み (任意)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="好きなお酒を選択" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">特に指定なし</SelectItem>
                        <SelectItem value="craft_beer">クラフトビール</SelectItem>
                        <SelectItem value="sake">日本酒</SelectItem>
                        <SelectItem value="shochu">焼酎</SelectItem>
                        <SelectItem value="wine">ワイン</SelectItem>
                        <SelectItem value="whiskey">ウィスキー</SelectItem>
                        <SelectItem value="cocktail">カクテル</SelectItem>
                        <SelectItem value="non-alcoholic">ノンアルコール</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">興味・関心のあること (複数選択可)</FormLabel>
                    <FormDescription>
                      あなたの趣味や、この地域で体験したいことなどを教えてください。
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {allInterests.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="interests"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(
                                        (field.value || []).filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>自己紹介 (任意)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="あなた自身のことや、旅の目的、地域への想いなどを自由にご記入ください。"
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
              {isLoading ? "保存中..." : "変更を保存"}
            </Button>
            {formMessage && (
              <p className={`mt-4 text-sm ${formMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {formMessage.text}
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}