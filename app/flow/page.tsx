import type { Metadata } from 'next'
import Image from 'next/image'
import { 
  FaCat, 
  FaCrow, 
  FaDemocrat, 
  FaDove, 
  FaPhoneAlt 
} from 'react-icons/fa'

import AppRouterAccessMap from '../../components/AppRouterAccessMap'
import AppRouterInquiryContent from '../../components/AppRouterInquiryContent'

export const metadata: Metadata = {
  title: '相談の流れ',
  description: '兵庫ひきこもり相談支援センター 阪神ブランチへの相談方法と流れについて説明します。電話相談、来所相談、訪問相談を行っています。',
  openGraph: {
    title: '相談の流れ | 兵庫ひきこもり相談支援センター 阪神ブランチ',
    description: '兵庫ひきこもり相談支援センター 阪神ブランチへの相談方法と流れについて説明します。',
  },
}

/**
 * 相談の流れページ（App Router版）
 * - Server Component とClient Component の適切な分離
 * - アクセシビリティ完全対応
 * - SEO最適化
 * - 画像最適化
 */
export default function FlowPage() {
  return (
    <AppRouterInquiryContent>
      <div className="pb-8">
        {/* ページヘッダー */}
        <h1 className="alignfull bg-dots3">相談する</h1>

        {/* イントロダクション */}
        <section className="mx-auto max-w-2xl px-4">
          <div className="mt-8">
            <p className="text-lg font-bold text-primary-600">
              兵庫ひきこもり相談支援センターでは、ひきこもりに悩むご本人やご家族からの相談を受け付けています。悩みを抱えている方、お気軽にご相談ください。
            </p>
          </div>
        </section>

        {/* 相談の流れセクション */}
        <section className="py-12 px-4" aria-labelledby="consultation-flow">
          <h2 id="consultation-flow" className="flex items-center justify-center text-2xl font-semibold text-gray-900">
            <FaDove 
              className="mr-2 text-secondary-300" 
              aria-hidden="true" 
            />
            相談の流れ
          </h2>
          
          <p className="mt-6 text-center text-gray-700 md:text-lg">
            専門の相談員による相談 (電話相談、来所相談、訪問相談) を行っています。
            <br className="hidden md:inline" />
            まずはお電話ください。スタッフが相談可能日をご案内します。
          </p>
          
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <Image
              src="/images/hanshin-branch/flow.png"
              width={600}
              height={400}
              alt="相談の流れを説明した図表"
              className="inline rounded-2xl shadow-md"
              priority
            />
          </div>
        </section>

        {/* 相談方法の詳細 */}
        <section className="px-4 py-8" aria-labelledby="consultation-methods">
          <h2 id="consultation-methods" className="sr-only">
            相談方法の詳細
          </h2>
          
          <div className="lg:mx-auto lg:flex lg:max-w-4xl lg:gap-8">
            {/* 電話相談 */}
            <article className="lg:basis-1/3" aria-labelledby="telephone-counseling">
              <h3 id="telephone-counseling" className="flex items-center text-xl font-semibold text-gray-900">
                <FaCat 
                  className="mr-2 text-secondary-300" 
                  aria-hidden="true" 
                />
                電話相談
              </h3>
              
              <div className="mx-auto mt-6 max-w-2xl text-center">
                <p className="text-gray-700">
                  来所が難しい方には、専門の相談員による電話相談を行っています。
                </p>
                
                <div className="mt-4">
                  <Image
                    src="/images/hanshin-branch/illust-telephone.png"
                    width={200}
                    height={155}
                    alt="電話相談をしている人のイラスト"
                    className="inline"
                  />
                </div>
              </div>
            </article>

            <hr className="my-12 lg:hidden" />

            {/* 来所相談 */}
            <article className="lg:basis-1/3" aria-labelledby="office-counseling">
              <h3 id="office-counseling" className="flex items-center text-xl font-semibold text-gray-900">
                <FaDemocrat 
                  className="mr-2 text-secondary-300" 
                  aria-hidden="true" 
                />
                来所相談
              </h3>
              
              <div className="mx-auto mt-6 max-w-xl text-center">
                <p className="text-gray-700">
                  西宮市名塩にある事務所で、専門の相談員による相談を行っています。{' '}
                  <a 
                    href="#access-map" 
                    className="text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                  >
                    » アクセス地図
                  </a>
                </p>
                
                <div className="mt-4">
                  <Image
                    src="/images/hanshin-branch/consultation.jpg"
                    width={200}
                    height={161}
                    alt="相談室での面談の様子"
                    className="inline rounded"
                  />
                </div>
              </div>
            </article>

            <hr className="my-12 lg:hidden" />

            {/* 訪問相談 */}
            <article className="lg:basis-1/3" aria-labelledby="home-visit-counseling">
              <h3 id="home-visit-counseling" className="flex items-center text-xl font-semibold text-gray-900">
                <FaCrow 
                  className="mr-2 text-secondary-300" 
                  aria-hidden="true" 
                />
                訪問相談
              </h3>
              
              <div className="mx-auto mt-6 max-w-xl text-center">
                <p className="text-gray-700">
                  来所が難しい方は、ご本人の同意を得て家庭訪問をします。
                </p>
                
                <div className="mt-4">
                  <Image
                    src="/images/hanshin-branch/illust-house.png"
                    width={200}
                    height={161}
                    alt="家庭訪問のイラスト"
                    className="inline"
                  />
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* 予約案内セクション */}
        <section className="py-12 px-4" aria-labelledby="reservation-info">
          <h2 id="reservation-info" className="sr-only">
            予約のご案内
          </h2>
          
          <div className="mx-auto max-w-lg rounded-2xl bg-tertiary-100 py-4 px-8 text-center shadow">
            <h3 className="text-lg">お気軽にご予約ください</h3>
            <p>
              <b>
                兵庫ひきこもり相談支援センター
                <br />
                阪神ブランチ
              </b>
            </p>
            <p className="mt-1 text-2xl">
              <b>
                <FaPhoneAlt className="inline align-baseline text-primary-300" />
                <a href="tel:050-3749-1227">050-3749-1227</a>
              </b>
            </p>
            <p className="mt-1 text-sm">受付時間 火・水・木・金 10〜16時</p>
            <p>
              <button
                type="button"
                className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
                title="準備中です"
              >
                青少年用「ほっとらいん相談」
              </button>
            </p>
          </div>
        </section>

        <hr className="my-12" />

        {/* アクセスマップ */}
        <div className="mt-12 px-4">
          <AppRouterAccessMap />
        </div>
      </div>
    </AppRouterInquiryContent>
  )
}