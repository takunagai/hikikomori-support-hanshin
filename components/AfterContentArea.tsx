import Link from 'next/link'

/**
 * App Router 対応 AfterContentArea コンポーネント
 * - Server Component として実装
 * - CTAセクション（Call to Action）
 */
export default function AfterContentArea() {
  return (
    <div className="mx-auto mt-8 max-w-xl rounded-xl bg-tertiary-100 p-4 text-center shadow">
      <h3 className="mt-2 text-lg font-semibold text-gray-900">
        悩みを抱えておられる方、
        <br />
        気軽に相談ください
      </h3>

      <p className="text-xs text-gray-600 mt-1">(ご本人、ご家族)</p>

      <p className="mt-3 text-gray-700">
        兵庫ひきこもり相談支援センターでは、
        <br />
        ひきこもりに悩むご本人やご家族からの相談を受け付けています。
      </p>

      <p className="mt-4">
        <Link href="/flow" className="btn btn-primary">
          相談する
          <small className="block text-sm opacity-90 mt-1">(電話、来所、訪問)</small>
        </Link>
      </p>
    </div>
  )
}
