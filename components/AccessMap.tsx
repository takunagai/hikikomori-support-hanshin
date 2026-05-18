import { FaMapMarkedAlt } from 'react-icons/fa'

/**
 * App Router 対応 アクセスマップ
 * - Server Component として実装
 * - Google Maps 埋め込み地図
 * - アクセシビリティ対応
 */
export default function AccessMap() {
  return (
    <section aria-labelledby="access-map">
      <h2
        id="access-map"
        className="flex items-center justify-center text-2xl font-semibold text-gray-900"
      >
        <FaMapMarkedAlt className="mr-2 text-secondary-300" aria-hidden="true" />
        アクセス
      </h2>

      <div className="mt-8 text-center">
        <div className="space-y-3">
          <p className="font-bold text-gray-900">
            兵庫ひきこもり相談支援センター 阪神ブランチ
            <br />
            <small className="text-sm font-normal text-gray-600">
              (運営：一般社団法人いきがいさがし)
            </small>
          </p>

          <address className="not-italic text-gray-700">
            〒669-1134 西宮市名塩新町3-2
            <br />
            <small className="text-sm text-gray-600">(JR西宮名塩駅西に出てすぐ)</small>
          </address>
        </div>
      </div>

      <div className="iframe-wrapper iframe-wrapper--golden-ratio alignfull mt-6 md:container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d818.7917694393141!2d135.3082351140503!3d34.826891507988776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f548097a2ce1%3A0x9106435756e99ac8!2z44CSNjY5LTExMzQg5YW15bqr55yM6KW_5a6u5biC5ZCN5aGp5paw55S677yT4oiS77yS!5e0!3m2!1sja!2sjphttps://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1637.5835388786281!2d135.30768794341174!3d34.826891507988776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f548097a2ce1%3A0x9106435756e99ac8!2z44CSNjY5LTExMzQg5YW15bqr55yM6KW_5a6u5biC5ZCN5aGp5paw55S677yT4oiS77yS!5e0!3m2!1sja!2sjp!4v1699575084862!5m2!1sja!2sjp"
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="兵庫ひきこもり相談支援センター 阪神ブランチの地図"
        />
      </div>
    </section>
  )
}
