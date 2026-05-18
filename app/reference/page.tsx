import type { Metadata } from 'next'

import AfterContentArea from '../../components/AfterContentArea'
import InquiryContent from '../../components/InquiryContent'
import Link from '../../components/Link'

export const metadata: Metadata = {
  title: '相談窓口・教育支援センター',
  description:
    '兵庫県内、阪神地域でひきこもりや不登校に関する悩みをもつ方の相談を受けている行政などの公共機関、民間の支援機関などをご紹介しています。',
  openGraph: {
    title: '相談窓口・教育支援センター | 兵庫ひきこもり相談支援センター 阪神ブランチ',
    description:
      '兵庫県内、阪神地域でひきこもりや不登校に関する悩みをもつ方の相談を受けている支援機関をご紹介しています。',
  },
}

// 相談窓口のデータ
const consultationServices = [
  {
    name: '兵庫ひきこもり相談支援センター',
    url: 'https://web.pref.hyogo.lg.jp/kk16/ac12_000000034.html',
  },
  {
    name: '兵庫県ひきこもり総合支援センター',
    url: 'https://web.pref.hyogo.lg.jp/kf21/hikikomori.html',
  },
  {
    name: '芦屋市社会福祉協議会',
    url: 'https://ashiya-shakyo.com/',
  },
  {
    name: '尼崎市ユース相談支援事業',
    url: 'https://www.city.amagasaki.hyogo.jp/manabu/afterschool/108ibasyo/1019732.html',
  },
  {
    name: 'しごと・くらしサポートセンター尼崎',
    url: 'https://www.city.amagasaki.hyogo.jp/kurashi/seikatusien/1001977/1004321.html',
  },
  {
    name: '川西市こども若者相談センター',
    url: 'https://www.city.kawanishi.hyogo.jp/kurashi/kodomo/youth/1000756/1000760.html',
  },
  {
    name: '川西市地域福祉課',
    url: 'https://www.city.kawanishi.hyogo.jp/1006637/1006663/1006664.html',
  },
  {
    name: '三田市生活安心サポートセンター',
    url: 'http://www.sanda-shakyo.or.jp/service/kenri.html',
  },
  {
    name: '宝塚市せいかつ応援センター',
    url: 'https://www.city.takarazuka.hyogo.jp/kenkofukushi/seikatsushien/1051449/',
  },
  {
    name: '西宮市ひきこもり地域支援センター',
    url: 'https://www.nishi.or.jp/kenko/shakaifukushi/chiikifukushi/hikikomori.html',
  },
  {
    name: 'ソーシャルスポット西宮よりそい',
    url: 'https://nishi-yorisoi.com/',
  },
] as const

// 教育支援センターのデータ
const educationSupportCenters = [
  {
    city: '芦屋市',
    centers: [
      {
        name: 'のびのび学級',
        url: 'https://www.city.ashiya.lg.jp/gakkoukyouiku/20220613.html',
      },
    ],
  },
  {
    city: '尼崎市',
    centers: [
      {
        name: 'ほっとすてっぷ',
        url: 'https://www.city.amagasaki.hyogo.jp/manabu/school/consult/1031523.html',
      },
    ],
  },
  {
    city: '伊丹市',
    centers: [
      {
        name: '教育支援センター「やまびこ」',
        url: 'https://www.itami.ed.jp/futouko/12508.html',
      },
    ],
  },
  {
    city: '猪名川町',
    centers: [
      {
        name: '猪名川町教育支援センター「STEPいながわ」',
        url: 'https://www.town.inagawa.lg.jp/soshiki/1029/1_2/1673.html',
      },
    ],
  },
  {
    city: '川西市',
    centers: [
      {
        name: '学びのスペース「セオリア」',
        url: 'https://www.city.kawanishi.hyogo.jp/kurashi/kodomo/1000841.html',
      },
    ],
  },
  {
    city: '三田市',
    centers: [
      {
        name: '三田市あすなろ教室',
        url: 'https://www.city.sanda.lg.jp/soshiki/65/taisetsu/seitoshidou/futoukou/731.html',
      },
    ],
  },
  {
    city: '宝塚市',
    centers: [
      {
        name: 'Pal たからづか',
        url: 'https://www.city.takarazuka.hyogo.jp/kyoikuiinkai/1044140/index.html',
      },
      {
        name: 'CoCo たからづか',
        url: 'https://www.city.takarazuka.hyogo.jp/kyoikuiinkai/1044140/index.html',
      },
    ],
  },
  {
    city: '西宮市',
    centers: [
      {
        name: 'あすなろ (みらい)',
        url: 'https://www.nishi.or.jp/kosodate/kodomomiraicenter/asunaromirai/asunaromirai.html',
        note: 'みらい',
      },
      {
        name: 'あすなろ',
        url: 'https://www.nishi.or.jp/kosodate/kyoiku/gakkokyoiku/oshirase/20231030.html',
        note: 'なるおきた、かわらぎ、やまぐち、しおせ、うえがはら、はまわき',
      },
    ],
  },
] as const

/**
 * 相談窓口・教育支援センターページ（App Router版）
 * - Server Component として実装
 * - 構造化されたデータ管理
 * - アクセシビリティ完全対応
 * - SEO最適化
 */
export default function ReferencePage() {
  return (
    <InquiryContent>
      <div className="pb-8">
        {/* ページヘッダー */}
        <h1 className="alignfull bg-dots3">相談窓口・教育支援センター</h1>

        {/* イントロダクション */}
        <section className="mx-auto max-w-2xl px-4">
          <div className="mt-8">
            <p className="text-lg text-gray-700">
              兵庫県内、阪神地域でひきこもりや不登校に関する悩みをもつ方の相談を受けている行政などの公共機関、民間の支援機関などを載せています。
            </p>
          </div>
        </section>

        {/* メインコンテンツ */}
        <section className="px-4 py-8">
          <div className="mx-auto max-w-4xl gap-8 lg:flex">
            {/* 相談窓口セクション */}
            <article
              className="mx-auto basis-1/2 rounded bg-base p-4 shadow"
              aria-labelledby="consultation-services"
            >
              <h2
                id="consultation-services"
                className="mt-3 text-xl font-semibold text-primary-600"
              >
                相談
              </h2>

              <p className="mt-4 text-gray-700">
                ひきこもりや不登校に関する相談を受けている行政などの公共機関、民間の支援機関。
              </p>

              <nav role="navigation" aria-label="相談窓口一覧">
                <ul className="mt-4 flex list-square flex-col gap-3 pl-5 marker:text-secondary-400">
                  {consultationServices.map((service) => (
                    <li key={service.name}>
                      <Link
                        href={service.url}
                        external
                        variant="default"
                        className="text-gray-700 hover:text-primary-600 focus:text-primary-600"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </article>

            {/* 教育支援センターセクション */}
            <article
              className="mx-auto mt-8 basis-1/2 rounded bg-base p-4 shadow lg:mt-0"
              aria-labelledby="education-support-centers"
            >
              <h2
                id="education-support-centers"
                className="mt-3 text-xl font-semibold text-primary-600"
              >
                教育支援センター
              </h2>

              <p className="mt-4 text-gray-700">
                主に小中学校を長期で休んでいる子どものために、教育委員会が用意した公的機関。
              </p>

              <div className="mt-6 space-y-6">
                {educationSupportCenters.map((cityData) => (
                  <section key={cityData.city} aria-labelledby={`${cityData.city}-centers`}>
                    <h3
                      id={`${cityData.city}-centers`}
                      className="border-b border-dashed border-primary-200 pb-1 text-base font-medium text-primary-600"
                    >
                      {cityData.city}
                    </h3>

                    <ul className="mt-3 flex list-square flex-col gap-2 pl-5 marker:text-secondary-400">
                      {cityData.centers.map((center) => (
                        <li key={center.name}>
                          <Link
                            href={center.url}
                            external
                            variant="default"
                            className="text-gray-700 hover:text-primary-600 focus:text-primary-600"
                          >
                            {center.name}
                            {'note' in center && center.note && (
                              <small className="ml-1 text-gray-500">({center.note})</small>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </article>
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
