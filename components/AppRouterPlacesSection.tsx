import { FaFrog } from 'react-icons/fa'

import AppRouterLink from './AppRouterLink'

/**
 * App Router 対応 居場所情報セクション
 * - Server Component として実装
 * - 阪神地域の居場所情報案内
 * - アクセシビリティ対応
 */
export default function AppRouterPlacesSection() {
  return (
    <section className="py-12 px-4" aria-labelledby="places-section">
      <h2
        id="places-section"
        className="flex items-center justify-center text-2xl font-semibold text-gray-900"
      >
        <FaFrog className="mr-2 text-secondary-300" aria-hidden="true" />
        <span>
          兵庫県阪神地域の
          <br />
          居場所情報
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-center text-gray-700">
        なかなか探しにくい、阪神地域でされているひきこもりの方の居場所、不登校の方の居場所、親の会、学習支援、教育支援センター、相談機関などの情報を集めました。
      </p>

      <div className="mt-8 text-center">
        <AppRouterLink href="/places-and-groups" className="btn btn-secondary">
          居場所情報を見る
        </AppRouterLink>
      </div>
    </section>
  )
}
