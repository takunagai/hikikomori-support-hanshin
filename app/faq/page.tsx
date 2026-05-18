import type { Metadata } from 'next'

import Accordion from '../../components/Accordion'
import AfterContentArea from '../../components/AfterContentArea'
import Link from '../../components/Link'

export const metadata: Metadata = {
  title: 'よくある質問とその回答',
  description:
    'ひきこもり相談に関してよくお寄せいただく質問とその回答をまとめました。料金、対象地域、相談方法について詳しくご説明しています。',
  openGraph: {
    title: 'よくある質問とその回答 | 兵庫ひきこもり相談支援センター 阪神ブランチ',
    description: 'ひきこもり相談に関してよくお寄せいただく質問とその回答をまとめました。',
  },
}

/**
 * よくある質問ページ（App Router版）
 * - Server Component とClient Component の適切な分離
 * - アクセシビリティ完全対応
 * - SEO最適化
 */
export default function FaqPage() {
  return (
    <div className="pb-8">
      {/* ページヘッダー */}
      <h1 className="alignfull bg-dots3">よくある質問とその回答</h1>

      {/* イントロダクション */}
      <section className="mx-auto max-w-2xl px-4">
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700">
            よくいただく質問をまとめました。
            <br />
            これ以外にご不明な点や聞きたいことがございましたら、お問合せよりご連絡ください。
          </p>

          <p className="mt-4">
            <Link href="/inquiry" variant="primary" showArrow>
              お問合せはこちら
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ セクション */}
      <section className="mx-auto max-w-2xl px-4 py-8" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="sr-only">
          よくある質問一覧
        </h2>

        <div className="space-y-0">
          <Accordion title="Q. 相談料はかかりますか？" defaultOpen>
            <p className="text-gray-800 dark:text-gray-200">料金はかかりません。無料です。</p>
          </Accordion>

          <Accordion title="Q. 対象の地域は？">
            <div className="space-y-4">
              <p className="text-gray-800 dark:text-gray-200">
                神戸市以外の阪神地域の方が対象です。
                <br />
                兵庫県の他の地域の方は、兵庫ひきこもり相談支援センターの地域のブランチをご利用ください。
              </p>

              <div className="max-w-fit rounded border border-dashed border-primary-200 p-4 bg-primary-50">
                <h3 className="font-bold text-primary text-lg mb-2">
                  兵庫ひきこもり相談支援センター
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  ※リンクは運営している団体のホームページ
                </p>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span
                      className="mr-2 h-2 w-2 rounded-full bg-secondary-400"
                      aria-hidden="true"
                    />
                    阪神ブランチ
                    <small className="ml-2 text-gray-500">(当サイト)</small>
                  </li>
                  <li className="flex items-center">
                    <span
                      className="mr-2 h-2 w-2 rounded-full bg-secondary-400"
                      aria-hidden="true"
                    />
                    <Link href="https://harima-branch.com/" external variant="default">
                      播磨ブランチ
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span
                      className="mr-2 h-2 w-2 rounded-full bg-secondary-400"
                      aria-hidden="true"
                    />
                    <Link href="https://kounotori-inochinet.com/" external variant="default">
                      但馬ブランチ
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span
                      className="mr-2 h-2 w-2 rounded-full bg-secondary-400"
                      aria-hidden="true"
                    />
                    <Link
                      href="https://web.pref.hyogo.lg.jp/kk16/ac12_000000034.html"
                      external
                      variant="default"
                    >
                      丹波ブランチ
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span
                      className="mr-2 h-2 w-2 rounded-full bg-secondary-400"
                      aria-hidden="true"
                    />
                    <Link
                      href="https://web.pref.hyogo.lg.jp/kf09/hikikomori/awaji.html"
                      external
                      variant="default"
                    >
                      淡路ブランチ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Accordion>

          <Accordion title="Q. 本人以外が相談してもよいですか？">
            <p className="text-gray-800 dark:text-gray-200">
              ご本人・家族・兄弟・年齢などは問いません。
              <br />
              どなたでもお気軽にご相談ください。
            </p>
          </Accordion>

          <Accordion title="Q. いつでも相談できるの？">
            <div className="space-y-3">
              <p className="text-gray-800 dark:text-gray-200">
                まずはお電話ください。スタッフが相談予約日をご案内します。
              </p>

              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>開所日時：</strong>火・水・木・金 10:00〜16:00
                </p>
                <p className="text-sm text-gray-700">
                  <strong>電話番号：</strong>
                  <a
                    href="tel:050-3749-1227"
                    className="font-bold text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                  >
                    050-3749-1227
                  </a>
                </p>
              </div>

              <p>
                <Link href="/flow" variant="primary" showArrow>
                  相談する
                </Link>
              </p>
            </div>
          </Accordion>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="px-4" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="sr-only">
          相談のご案内
        </h2>
        <AfterContentArea />
      </section>
    </div>
  )
}
