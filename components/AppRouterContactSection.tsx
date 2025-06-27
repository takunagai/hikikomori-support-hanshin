import { FaPhoneAlt } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

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

        {/* SNSでのお問い合わせ */}
        <div className="mx-auto mt-8 basis-1/2 rounded bg-base p-4 text-center shadow lg:mt-0">
          <h3 className="text-lg font-semibold text-primary-600">
            SNS でお問合せ
          </h3>
          
          <p className="mt-2 text-gray-700">
            メッセージでお問合せください。
            <br />
            対応時間内に順次ご連絡いたします。
          </p>
          
          <div className="mt-4">
            <div className="flex items-center justify-center gap-2">
              <FaXTwitter 
                className="text-2xl text-primary-300" 
                aria-hidden="true" 
              />
              <div>
                <p className="text-sm text-gray-600">ID:</p>
                <a 
                  href="https://x.com/ikigaisagashi1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-primary-600 transition-colors hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                  aria-label="Twitter/X @ikigaisagashi1 (新しいタブで開く)"
                >
                  @ikigaisagashi1
                </a>
              </div>
            </div>
            
            <p className="mt-2 text-sm text-gray-600">
              対応時間：{CONTACT_CONFIG.BUSINESS_HOURS_DETAILED}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}