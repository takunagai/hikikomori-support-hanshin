import type { Metadata } from 'next'

import InquiryContent from '../../components/InquiryContent'

export const metadata: Metadata = {
  title: '個人情報保護方針(プライバシーポリシー)',
  description:
    '兵庫ひきこもり相談支援センター 阪神ブランチの個人情報の取り扱いについて定めた方針です。個人情報の定義、収集目的、利用方法について詳しくご説明しています。',
  openGraph: {
    title: '個人情報保護方針(プライバシーポリシー) | 兵庫ひきこもり相談支援センター 阪神ブランチ',
    description:
      '兵庫ひきこもり相談支援センター 阪神ブランチの個人情報の取り扱いについて定めた方針です。',
  },
}

/**
 * プライバシーポリシーページ（App Router版）
 * - Server Component とClient Component の適切な分離
 * - アクセシビリティ完全対応
 * - 法的文書の構造化
 * - SEO最適化
 */
export default function PrivacyPolicyPage() {
  return (
    <InquiryContent>
      <div className="pb-8">
        {/* ページヘッダー */}
        <h1 className="alignfull bg-dots3">個人情報保護方針</h1>

        {/* リード文 */}
        <section className="mx-auto max-w-2xl px-4">
          <p className="lead mx-auto mt-8 max-w-xl text-center text-lg text-gray-700">
            当センターの個人情報の定義･取り扱いについてご説明いたします。
            <br />
            <small className="text-base text-gray-600">(令和3年3月25日改訂)</small>
          </p>
        </section>

        {/* メインコンテンツ */}
        <article className="mx-auto max-w-4xl px-4">
          <div className="py-12 space-y-8">
            {/* セクション1: 個人情報の定義 */}
            <section aria-labelledby="definition">
              <h2
                id="definition"
                className="border-b border-dashed border-primary-400 pb-1 text-lg font-semibold tracking-wide text-gray-900"
              >
                １. 個人情報の定義について
              </h2>
              <p className="mt-3 text-gray-700">
                個人情報とは、個人に関する情報であり、当該情報に含まれる氏名・住所・職務経歴・メールアドレスなど個人別に付与された番号・記号その他の符号・画像・もしくは音声により当該個人と識別できるものをいいます。
                また、組み合わせることで個人を識別できるものも個人情報として取り扱います。
              </p>
            </section>

            {/* セクション2: 収集目的 */}
            <section aria-labelledby="purpose">
              <h2
                id="purpose"
                className="border-b border-dashed border-primary-400 pb-1 text-lg font-semibold tracking-wide text-gray-900"
              >
                ２. 個人情報を収集する目的について
              </h2>
              <p className="mt-3 text-gray-700">
                個人情報収集の目的は、ひきこもり当事者様並びに保護者様のひきこもりに関する相談を適切に進めることなど、ブランチで最適なサービスを提供するためです。より良い支援を行うために、登録の際に記入いただいた内容や相談内容等はスタッフ間で共有させて頂く場合があります。
              </p>

              <div className="mt-4 space-y-2 rounded-lg bg-yellow-50 p-4 border-l-4 border-yellow-400">
                <p className="text-sm text-gray-700">
                  ※個人情報の全部・または一部が不足している場合には、サービスを提供できない場合があります。
                </p>
                <p className="text-sm text-gray-700">
                  ※個人情報の保管期間は原則として最終利用日から５年とします。なお、保管期間を終了した個人情報、保管する必要がなくなった個人情報については、速やかに適切な方法で廃棄いたします。
                </p>
              </div>

              {/* サブセクション */}
              <div className="mt-6 space-y-4">
                <section aria-labelledby="acquisition">
                  <h3 id="acquisition" className="font-medium text-gray-900">
                    (1) 個人情報の取得
                  </h3>
                  <p className="mt-2 text-gray-700">
                    当社は、当社が管理するインターネットによる情報提供サイト（以下「本サイト」といいます。）の運営に必要な範囲で、本サイトの一般利用者（以下「ユーザー」といいます。）又は本サイトに広告掲載を行う者（以下「掲載主」といいます。）から、ユーザー又は掲載主に係る個人情報を取得することがあります。
                  </p>
                </section>

                <section aria-labelledby="usage-purpose">
                  <h3 id="usage-purpose" className="font-medium text-gray-900">
                    (2) 個人情報の利用目的
                  </h3>
                  <p className="mt-2 text-gray-700">
                    当社は、当社が取得した個人情報について、法令に定める場合又は本人の同意を得た場合を除き、以下に定める利用目的の達成に必要な範囲を超えて利用することはありません。
                  </p>
                  <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>本サイトの運営、維持、管理</li>
                    <li>本サイトを通じたサービスの提供及び紹介</li>
                    <li>本サイトの品質向上のためのアンケート</li>
                  </ul>
                </section>

                <section aria-labelledby="provision">
                  <h3 id="provision" className="font-medium text-gray-900">
                    (3) 個人情報の提供等
                  </h3>
                  <p className="mt-2 text-gray-700">
                    当社は、法令で定める場合を除き、本人の同意に基づき取得した個人情報を、本人の事前の同意なく第三者に提供することはありません。なお、本人の求めによる個人情報の開示、訂正、追加若しくは削除又は利用目的の通知については、法令に従いこれを行うとともに、ご意見、ご相談に関して適切に対応します。
                  </p>
                </section>
              </div>
            </section>

            {/* その他のセクション */}
            <section aria-labelledby="purpose-change">
              <h2
                id="purpose-change"
                className="border-b border-dashed border-primary-400 pb-1 text-lg font-semibold tracking-wide text-gray-900"
              >
                個人情報の利用目的の変更
              </h2>
              <p className="mt-3 text-gray-700">
                当社は、前項で特定した利用目的は、予め本人の同意を得た場合を除くほかは、原則として変更しません。但し、変更前の利用目的と相当の関連性を有すると合理的に認められる範囲において、予め変更後の利用目的を公表の上で変更を行う場合はこの限りではありません。
              </p>
            </section>

            <section aria-labelledby="third-party">
              <h2
                id="third-party"
                className="border-b border-dashed border-primary-400 pb-1 text-lg font-semibold tracking-wide text-gray-900"
              >
                個人情報の第三者提供
              </h2>
              <p className="mt-3 text-gray-700">
                当社は、個人情報の取扱いの全部又は一部を第三者に委託する場合、その適格性を十分に審査し、その取扱いを委託された個人情報の安全管理が図られるよう、委託を受けた者に対する必要かつ適切な監督を行うこととします。
              </p>
            </section>

            <section aria-labelledby="improvement">
              <h2
                id="improvement"
                className="border-b border-dashed border-primary-400 pb-1 text-lg font-semibold tracking-wide text-gray-900"
              >
                個人情報の取扱いの改善・見直し
              </h2>
              <p className="mt-3 text-gray-700">
                当社は、個人情報の取扱い、管理体制及び取組みに関する点検を実施し、継続的に改善・見直しを行います。
              </p>
            </section>

            <section aria-labelledby="disposal">
              <h2
                id="disposal"
                className="border-b border-dashed border-primary-400 pb-1 text-lg font-semibold tracking-wide text-gray-900"
              >
                個人情報の廃棄
              </h2>
              <p className="mt-3 text-gray-700">
                当社は、個人情報の利用目的に照らしその必要性が失われたときは、個人情報を消去又は廃棄するものとし、当該消去及び廃棄は、外部流失等の危険を防止するために必要かつ適切な方法により、業務の遂行上必要な限りにおいて行います。
              </p>
            </section>

            <section aria-labelledby="analytics">
              <h2
                id="analytics"
                className="border-b border-dashed border-primary-400 pb-1 text-lg font-semibold tracking-wide text-gray-900"
              >
                アクセス解析ツールの利用について
              </h2>
              <p className="mt-3 text-gray-700">
                当センターでは、サイトの改善・運営の参考とするため、Google
                が提供するアクセス解析ツール「Google アナリティクス（GA4）」を導入しています。
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Cookie を用いて訪問者の閲覧履歴を匿名で収集します</li>
                <li>個人を特定する情報は収集しません</li>
                <li>IP アドレスは匿名化された状態で処理されます</li>
                <li>収集データの Google 広告等への利用（Google シグナル）は無効に設定しています</li>
              </ul>
              <p className="mt-3 text-sm text-gray-700">
                収集を希望されない場合は、ブラウザの拡張機能{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout?hl=ja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                >
                  Google アナリティクス オプトアウト アドオン
                </a>{' '}
                をご利用ください。Google が収集する情報の取り扱いについては、
                <a
                  href="https://policies.google.com/privacy?hl=ja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                >
                  Google プライバシーポリシー
                </a>{' '}
                をご確認ください。
              </p>
            </section>

            <section aria-labelledby="contact-info">
              <h2
                id="contact-info"
                className="border-b border-dashed border-primary-400 pb-1 text-lg font-semibold tracking-wide text-gray-900"
              >
                苦情や相談の担当窓口
              </h2>
              <p className="mt-3 text-gray-700">
                当社は、個人情報の取扱いに関する担当窓口及び責任者を以下の通り設けます。
              </p>

              {/* 連絡先情報 */}
              <div className="mx-auto mt-8 max-w-fit border border-primary-100 bg-white p-4 text-center shadow md:px-8 rounded-lg">
                <h3 className="text-lg font-semibold text-primary-600">個人情報に関する問合せ先</h3>
                <div className="mt-4 space-y-2">
                  <p className="font-bold text-gray-900">
                    兵庫ひきこもり相談支援センター
                    <br className="md:hidden" />
                    阪神ブランチ
                  </p>
                  <p className="text-sm text-gray-600">運営：一般社団法人 いきがいさがし</p>
                  <p className="font-bold text-gray-900">
                    TEL:
                    <a
                      href="tel:079-240-6299"
                      className="ml-1 text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                    >
                      079-240-6299
                    </a>
                  </p>
                  <p className="text-sm text-gray-600">
                    火・水・木・金 10:00〜16:00
                    <br />
                    盆休み、GW、年末年始は休業
                  </p>
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>
    </InquiryContent>
  )
}
