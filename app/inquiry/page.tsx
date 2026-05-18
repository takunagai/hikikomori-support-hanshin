import type { Metadata } from 'next'

import AfterContentArea from '../../components/AfterContentArea'
import ContactSection from '../../components/ContactSection'
import InquiryContent from '../../components/InquiryContent'
import Link from '../../components/Link'

export const metadata: Metadata = {
  title: 'お問合せ',
  description:
    'ひきこもり相談に関するお問い合わせは、お電話またはSNSでお気軽にご連絡ください。火・水・木・金の10:00〜16:00に対応しております。',
  openGraph: {
    title: 'お問合せ | 兵庫ひきこもり相談支援センター 阪神ブランチ',
    description: 'ひきこもり相談に関するお問い合わせは、お電話またはSNSでお気軽にご連絡ください。',
  },
}

/**
 * お問い合わせページ（App Router版）
 * - Server Component とClient Component の適切な分離
 * - アクセシビリティ完全対応
 * - SEO最適化
 * - レスポンシブデザイン
 */
export default function InquiryPage() {
  return (
    <InquiryContent>
      <div className="pb-8">
        {/* ページヘッダー */}
        <h1 className="alignfull bg-dots3">お問合せ</h1>

        {/* イントロダクション */}
        <section className="mx-auto max-w-2xl px-4">
          <div className="mt-8">
            <p className="text-lg text-gray-700">
              ご不明な点や聞きたいことがございましたら、電話、メールフォームのいずれかでご連絡ください。
            </p>

            <nav
              className="mt-4 flex flex-wrap justify-center gap-4 text-center"
              aria-label="関連ページ"
            >
              <Link href="/flow" variant="primary" showArrow>
                相談の流れ
              </Link>
              <Link href="/faq" variant="primary" showArrow>
                よくある質問を見る
              </Link>
            </nav>
          </div>
        </section>

        {/* 連絡先セクション */}
        <ContactSection />

        {/* お問い合わせフォーム（準備中） */}
        <section className="px-4" aria-labelledby="form-section">
          <div className="mx-auto mt-8 max-w-3xl rounded bg-base px-4 py-8 shadow lg:px-8 hidden">
            <h2 id="form-section" className="text-lg font-semibold text-primary-600">
              お問合せフォーム
            </h2>
            <p className="text-center text-sm text-gray-600">(24H受付)</p>

            <div className="mx-auto max-w-lg">
              <p className="mt-3 text-gray-700">準備中です。電話か Twitter でお問合せください。</p>
            </div>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="px-4" aria-labelledby="cta-section">
          <h2 id="cta-section" className="sr-only">
            相談のご案内
          </h2>
          <AfterContentArea />
        </section>
      </div>
    </InquiryContent>
  )
}
