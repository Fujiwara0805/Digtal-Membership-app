export const i18n = {
  defaultLocale: 'ja',
  locales: ['en', 'ja'],
  translations: {
    ja: {
      navigation: {
        home: '酒場の入口',
        membership: 'ギルドへ',
        reservations: '集いの予約',
        profile: '冒険者情報',
        signIn: '名乗りを上げる',
        openMenu: 'メニューを開く',
        closeMenu: 'メニューを閉じる'
      },
      common: {
        bookTable: '予約する',
        membershipSettings: 'メンバーシップ設定',
        save: '保存',
        cancel: 'キャンセル'
      },
      booking: {
        title: 'ご予約',
        subtitle: '会員専用施設のご予約',
        selectDate: '日付を選択',
        reservationDetails: '予約詳細',
        guests: '人数',
        time: '時間',
        location: '場所',
        occasion: '目的',
        specialRequests: '特別なご要望',
        cancellationPolicy: 'キャンセルポリシー',
        cancellationRules: {
          rule1: '予約の24時間前までのキャンセルは無料です。',
          rule2: '24時間以内のキャンセルは最低利用金額の50%を申し受けます。',
          rule3: 'ご来店なしの場合は最低利用金額の全額を申し受けます。'
        }
      },
      membership: {
        title: 'メンバーアクセス',
        subtitle: 'デジタルメンバーシップカードをご提示ください',
        memberInfo: {
          title: '会員情報',
          status: '会員資格',
          validUntil: '有効期限',
          upcomingReservations: '予約状況',
          preferredLocation: '優先施設',
          editProfile: 'プロフィール編集'
        },
        reservations: {
          title: '予約履歴',
          upcoming: '今後の予約',
          past: '過去の予約',
          noUpcoming: '予約はありません',
          noPast: '過去の予約はありません'
        }
      },
      profile: {
        title: '会員プロフィール',
        subtitle: '個人情報と設定の管理',
        tabs: {
          profile: 'プロフィール',
          notifications: '通知',
          privacy: 'プライバシー'
        },
        form: {
          fullName: 'お名前',
          email: 'メールアドレス',
          phone: '電話番号',
          preferredLocation: '優先施設',
          dietary: '食事制限',
          alcoholPreference: 'お好みのお酒',
          bio: '自己紹介',
          saveChanges: '変更を保存'
        }
      },
      home: {
        hero: {
          title: '未知なる物語が交わる、旅人の酒場',
          subtitle: '土地の秘話、隠れた名所、仲間との出会い。次の冒険が、ここから始まる。',
          cta: '酒場の仲間入り',
          exclusiveMembership: '旅人たちの集い',
          privateHaven: '未知なる物語が交わる、旅人の酒場',
          description: '土地の秘話、隠れた名所、仲間との出会い。次の冒険が、ここから始まる。',
          viewMembership: 'ギルドについて',
          makeReservation: '席を確保する',
          digitalMembership: '冒険者の証',
          digitalPass: '酒場への通行証',
          qrCode: '通行証の印',
          memberSince: '酒場の仲間入り: '
        },
        features: {
          title: '酒場の仲間だけの特権',
          subtitle: 'より深く、より楽しく。旅と情報交換を支える特典の数々。',
          items: {
            access: '秘伝のレシピ帖',
            accessDescription: 'メンバー限定の特別メニューや、地元食材を使った創作料理を味わえる。',
            reservations: '暖炉そばの特等席',
            reservationsDescription: '混雑時も安心。特別な集いや語らいのために、優先的に席を確保。',
            selection: '土地の恵みと物語の一杯',
            selectionDescription: '地元産の珍しい酒や、旅の物語にちなんだオリジナルカクテルを楽しめる。',
            hours: '語り部の灯火',
            hoursDescription: '夜更けまで語り明かしたい夜も安心。メンバーだけの延長営業。',
            privileges: '情報交換の円卓',
            privilegesDescription: '最新のルート情報、穴場スポット、旅の知恵をメンバー間で共有できる。'
          }
        },
        events: {
          title: '今宵の催しと集い',
          subtitle: '忘れられない体験を共に。季節ごとの特別な集いや情報交換会。',
          reserve: '参加する',
          items: [
            {
              title: "星空キャンプと焚き火料理の夜",
              date: "近日開催",
              description: "満天の星の下、焚き火を囲んで地元食材を使った料理を楽しみ、旅の体験を語り合う特別なキャンプイベント。",
              image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1080&q=75"
            },
            {
              title: "〇〇渓谷 秘境トレッキング報告会",
              date: "近日開催",
              description: "最近踏破されたばかりの〇〇渓谷の新ルート。詳細な情報や注意点を、踏破したメンバーから直接聞ける報告会。",
              image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1080&q=75"
            },
            {
              title: "地元猟師と囲むジビエの宴",
              date: "近日開催",
              description: "普段は味わえない新鮮なジビエ料理と、地元猟師の興味深い話を楽しめる、食と文化の交流会。",
              image: "/images/ジビエ.jpg"
            }
          ]
        },
        ctaSection: {
          title: 'さあ、新たな冒険の扉を開こう',
          description: 'この酒場の仲間となれば、旅はもっと豊かに、もっと刺激的になる。信頼できる情報、温かい出会い、そして忘れられない体験が君を待っている。',
          becomeMember: '仲間に加わる',
          bookVisit: '酒場を覗いてみる'
        }
      }
    }
  }
} as const