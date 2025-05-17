export const i18n = {
  defaultLocale: 'ja',
  locales: ['en', 'ja'],
  translations: {
    ja: {
      navigation: {
        home: 'ホーム',
        membership: 'メンバーシップ',
        reservations: 'ご予約',
        profile: 'プロフィール',
        signIn: 'ログイン'
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
          title: '洗練された空間で特別なひとときを',
          subtitle: '会員制バーで至高のおもてなしを',
          cta: 'メンバーになる'
        },
        features: {
          title: '会員特典',
          subtitle: '会員様だけの特別なサービス',
          items: {
            access: '優先入場',
            reservations: '優先予約',
            selection: '厳選された銘酒',
            hours: '延長営業時間',
            privileges: '会員特典'
          }
        },
        events: {
          title: '特別イベント',
          subtitle: '会員様限定の特別なイベント',
          reserve: '予約する'
        }
      }
    }
  }
} as const