import { FaPhoneAlt } from 'react-icons/fa'

import { CONTACT_CONFIG } from '../lib/constants'

/**
 * App Router 対応 お問い合わせセクション
 * - Server Component として実装
 * - 電話とSNSの連絡先情報
 */
export default function AppRouterContactSection() {
  return (
    <section className="py-8" aria-labelledby="contact-methods">
      <h2 id="contact-methods" className="sr-only">
        お問い合わせ方法
      </h2>
      
      <div className="mx-auto mt-8 max-w-3xl gap-8 lg:flex">
        {/* 電話でのお問い合わせ */}
        <div className="mx-auto basis-1/2 rounded bg-base p-4 text-center shadow">
          <h3 className="text-lg font-semibold text-primary-600">
            電話でのお問合せ
          </h3>
          
          <p className="mt-2 font-medium">
            兵庫ひきこもり相談支援センター
            <br />
            阪神ブランチ
          </p>
          
          <p className="mt-4">
            <span className="flex items-center justify-center gap-2 text-2xl font-bold">
              <FaPhoneAlt 
                className="text-primary-300" 
                aria-hidden="true" 
              />
              <a 
                href={`tel:${CONTACT_CONFIG.PHONE_NUMBER}`}
                className="text-gray-900 transition-colors hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                aria-label={`電話番号 ${CONTACT_CONFIG.PHONE_NUMBER} に発信`}
              >
                {CONTACT_CONFIG.PHONE_NUMBER}
              </a>
            </span>
          </p>
          
          <p className="mt-2 text-sm text-gray-600">
            対応時間：{CONTACT_CONFIG.BUSINESS_HOURS_DETAILED}
          </p>
        </div>
      </div>
    </section>
  )
}