import { FaHandHoldingHeart, FaHandshake, FaHorse, FaLock, FaUserFriends } from 'react-icons/fa'

import AppRouterLink from './AppRouterLink'

/**
 * App Router 対応 支援内容セクション
 * - Server Component として実装
 * - ひきこもり支援の詳細説明
 * - アクセシビリティ対応
 */
export default function AppRouterSupportSection() {
  return (
    <section className="my-12 px-4" aria-labelledby="support-section">
      <h2
        id="support-section"
        className="flex items-center justify-center text-2xl font-semibold text-gray-900"
      >
        <FaHorse className="mr-2 text-secondary-300" aria-hidden="true" />
        <span>
          ひきこもりのお悩みを
          <br />
          抱えておられる方へ
        </span>
      </h2>

      <p className="mt-1 text-center text-sm text-gray-600">(ご本人、ご家族のサポート)</p>

      <p className="mx-auto mt-4 max-w-xl text-center text-gray-700">
        当事者の気持ちに十分な配慮を行い、社会参加へのはじめの一歩を踏みだせるようサポートいたします。お気軽にご相談ください。
      </p>

      {/* 相談対象者 */}
      <div className="mt-10">
        <h3 className="marker-underlined text-center text-xl font-semibold text-gray-900">
          このような方、ご相談ください
        </h3>

        <div className="mx-auto mt-6 flex max-w-4xl flex-col gap-6 md:flex-row">
          <div className="flex-1 rounded-lg border-4 border-dotted border-secondary-300 p-4">
            <h4 className="text-lg font-semibold text-primary-600">ご本人</h4>
            <ul className="mt-3 list-square pl-5 marker:text-secondary-400 space-y-1 text-sm text-gray-700">
              <li>このままではいけないと思ってはいるが…</li>
              <li>人と接する練習をする場所があれば行きたい</li>
              <li>働くのは難しいが、このままではいけない</li>
            </ul>
          </div>

          <div className="flex-1 rounded-lg border-4 border-dotted border-secondary-300 p-4">
            <h4 className="text-lg font-semibold text-primary-600">ご家族さま</h4>
            <ul className="mt-3 list-square pl-5 marker:text-secondary-400 space-y-1 text-sm text-gray-700">
              <li>ひきこもったままの、子どもの将来が心配</li>
              <li>ひきこもっている子への接し方がわからない</li>
              <li>子どもの居場所や親の会を紹介して欲しい</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 支援内容 */}
      <div className="mt-10">
        <h3 className="marker-underlined text-center text-xl font-semibold text-gray-900">
          当支援センターが
          <br className="lg:hidden" />
          お手伝いできること
        </h3>

        <div className="container mx-auto mt-6">
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <li className="rounded-xl border-4 border-white bg-tertiary-100 p-6 text-center">
              <div className="mb-4">
                <FaUserFriends
                  className="mx-auto text-[50px] text-primary-200"
                  aria-hidden="true"
                />
              </div>
              <p className="font-bold text-primary-600 text-sm">
                ご本人はもちろん、ご家族からのご相談もお受けします
              </p>
            </li>

            <li className="rounded-xl border-4 border-white bg-tertiary-100 p-6 text-center">
              <div className="mb-4">
                <FaHandshake className="mx-auto text-[50px] text-primary-200" aria-hidden="true" />
              </div>
              <p className="font-bold text-primary-600 text-sm">
                相談内容に応じ、適切な関係機関を紹介します
              </p>
            </li>

            <li className="rounded-xl border-4 border-white bg-tertiary-100 p-6 text-center">
              <div className="mb-4">
                <FaLock className="mx-auto text-[50px] text-primary-200" aria-hidden="true" />
              </div>
              <p className="font-bold text-primary-600 text-sm">
                秘密を守ります。同意なしに相談内容を口外しません
              </p>
            </li>

            <li className="rounded-xl border-4 border-white bg-tertiary-100 p-6 text-center">
              <div className="mb-4">
                <FaHandHoldingHeart
                  className="mx-auto text-[50px] text-primary-200"
                  aria-hidden="true"
                />
              </div>
              <p className="font-bold text-primary-700 text-sm">
                電話、面談などで親身に相談に乗ります。相談費用は無料です
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* 利用者情報 */}
      <div className="mt-10">
        <h3 className="marker-underlined text-center text-xl font-semibold text-gray-900">
          利用してるのはどんな人？
        </h3>

        <div className="mx-auto mt-6 max-w-fit border border-primary-200 rounded-lg py-3 px-5 bg-primary-50">
          <p className="font-bold text-primary-700 text-center">
            利用人数：１日２〜８名程度
            <br />
            男女比：８：２ / 年齢層：20～50代
          </p>
        </div>

        <div className="mx-auto mt-4 max-w-4xl">
          <ul className="list-square pl-5 marker:text-secondary-400 space-y-2 text-sm text-gray-700">
            <li>
              病気で入院して体力が落ちたので、復職へ向けて体力づくりやリハビリの最初のステップとして通いたい
            </li>
            <li>人が怖い、緊張してしまうので、会話や交流など人と関わる練習をしたい</li>
          </ul>
        </div>
      </div>

      {/* 利用方法 */}
      <div className="mt-10">
        <h3 className="marker-underlined text-center text-xl font-semibold text-gray-900">
          どうやって利用や相談をするの？
        </h3>

        <p className="mx-auto mt-6 max-w-3xl text-center text-gray-700">
          専門の相談員による相談（電話・来所・訪問）、ひきこもりに関する地域相談会や研修会などを開催しています。
          <br />
          まずはお電話ください。スタッフが相談可能日をご案内します。
        </p>

        <div className="mt-6 text-center">
          <AppRouterLink href="/flow" className="btn btn-primary px-10">
            相談の流れ
          </AppRouterLink>
        </div>
      </div>
    </section>
  )
}
