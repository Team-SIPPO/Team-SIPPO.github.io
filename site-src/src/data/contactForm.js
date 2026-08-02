// お問い合わせフォームの送信設定
// endpoint: Formspree (https://formspree.io) などフォーム送信サービスのURL。
//   設定すると、ページ遷移なしでフォーム内容を POST 送信する。
//   例: 'https://formspree.io/f/xxxxxxxx'
// email: endpoint 未設定時のフォールバック。送信ボタンで
//   メールソフトが開き、入力内容が本文に転記される。
export const contactFormConfig = {
  endpoint: '',
  email: 'a.nap.of.kinosuke@gmail.com',
};
