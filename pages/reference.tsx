import { motion } from 'framer-motion'
import type { NextPage } from 'next'
import AfterContentArea from '../components/AfterContentArea'
import Layout from '../components/layout'

const Reference: NextPage = () => {
  return (
    <Layout title="相談窓口・教育支援センター" description="相談窓口・教育支援センター">
      <motion.div
        initial={{ opacity: 0 }} // initial
        animate={{ opacity: 1 }} // on mount
        exit={{ opacity: 0 }} // on unmount
      >
        <h1 className="alignfull bg-dots3">相談窓口・教育支援センター</h1>

        <div className="mx-auto max-w-2xl">
          <p className="mt-8">
            兵庫県内、阪神地域でひきこもりや不登校に関する悩みをもつ方の相談を受けている行政などの公共機関、民間の支援機関などを載せています。
          </p>
        </div>

        <section className="py-4">
          <div className="mx-auto mt-8 max-w-4xl gap-8 lg:flex">
            <div className="mx-auto basis-1/2 rounded bg-base p-4 shadow">
              <h2 className="mt-3 text-primary">相談</h2>
              <p className="mt-4">
                ひきこもりや不登校に関する相談を受けている行政などの公共機関、民間の支援機関。
              </p>
              <ul className="mt-4 flex list-square flex-col gap-2 pl-5 marker:text-secondary-400">
                <li>
                  <a
                    href="https://web.pref.hyogo.lg.jp/kk16/ac12_000000034.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    兵庫ひきこもり相談支援センター
                  </a>
                </li>
                <li>
                  <a
                    href="https://web.pref.hyogo.lg.jp/kf21/hikikomori.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    兵庫県ひきこもり総合支援センター
                  </a>
                </li>
                <li>
                  <a href="https://ashiya-shakyo.com/" target="_blank" rel="noreferrer">
                    芦屋市社会福祉協議会
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.city.amagasaki.hyogo.jp/manabu/afterschool/108ibasyo/1019732.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    尼崎市ユース相談支援事業
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.city.amagasaki.hyogo.jp/kurashi/seikatusien/1001977/1004321.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    しごと・くらしサポートセンター尼崎
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.city.kawanishi.hyogo.jp/kurashi/kodomo/youth/1000756/1000760.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    川西市こども若者相談センター
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.city.kawanishi.hyogo.jp/1006637/1006663/1006664.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    川西市地域福祉課
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.sanda-shakyo.or.jp/service/kenri.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    三田市生活安心サポートセンター
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.city.takarazuka.hyogo.jp/kenkofukushi/seikatsushien/1051449/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    宝塚市せいかつ応援センター
                  </a>
                </li>
<li>
  <a
    href="https://www.nishi.or.jp/kenko/shakaifukushi/chiikifukushi/hikikomori.html"
    target="_blank"
    rel="noreferrer"
  >
    西宮市ひきこもり地域支援センター
  </a>
</li>
                <li>
                  <a href="https://nishi-yorisoi.com/" target="_blank" rel="noreferrer">
                    ソーシャルスポット西宮よりそい
                  </a>
                </li>
              </ul>
            </div>

            <div className="mx-auto mt-8 basis-1/2 rounded bg-base p-4 shadow lg:mt-0">
              <h2 className="mt-3 text-primary">教育支援センター</h2>
              <p className="mt-4">
                主に小中学校を長期で休んでいる子どものために、教育委員会が用意した公的機関。
              </p>
              <h3 className="mt-4 border-b border-dashed border-primary-200 text-left text-base !text-primary">
                芦屋市
              </h3>
              <ul className="mt-4 flex list-square flex-col gap-2 pl-5 marker:text-secondary-400">
                <li>
                  <a
                    href="https://www.city.ashiya.lg.jp/gakkoukyouiku/20220613.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    のびのび学級
                  </a>
                </li>
              </ul>
              <h3 className="mt-4 border-b border-dashed border-primary-200 text-left text-base !text-primary">
                尼崎市
              </h3>
              <ul className="mt-4 flex list-square flex-col gap-2 pl-5 marker:text-secondary-400">
                <li>
                  <a
                    href="https://www.city.amagasaki.hyogo.jp/manabu/school/consult/1031523.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ほっとすてっぷ
                  </a>
                </li>
              </ul>
              <h3 className="mt-4 border-b border-dashed border-primary-200 text-left text-base !text-primary">
                伊丹市
              </h3>
              <ul className="mt-4 flex list-square flex-col gap-2 pl-5 marker:text-secondary-400">
                <li>
                  <a
                    href="https://www.itami.ed.jp/futouko/12508.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    教育支援センター「やまびこ」
                  </a>
                </li>
              </ul>
              <h3 className="mt-4 border-b border-dashed border-primary-200 text-left text-base !text-primary">
                猪名川町
              </h3>
              <ul className="mt-4 flex list-square flex-col gap-2 pl-5 marker:text-secondary-400">
                <li>
                  <a
                    href="https://www.town.inagawa.lg.jp/soshiki/1029/1_2/1673.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    猪名川町教育支援センター「STEPいながわ」
                  </a>
                </li>
              </ul>
              <h3 className="mt-4 border-b border-dashed border-primary-200 text-left text-base !text-primary">
                川西市
              </h3>
              <ul className="mt-4 flex list-square flex-col gap-2 pl-5 marker:text-secondary-400">
                <li>
                  <a
                    href="https://www.city.kawanishi.hyogo.jp/kurashi/kodomo/1000841.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    学びのスペース「セオリア」
                  </a>
                </li>
              </ul>
              <h3 className="mt-4 border-b border-dashed border-primary-200 text-left text-base !text-primary">
                三田市
              </h3>
              <ul className="mt-4 flex list-square flex-col gap-2 pl-5 marker:text-secondary-400">
                <li>
                  <a
                    href="https://www.city.sanda.lg.jp/soshiki/65/taisetsu/seitoshidou/futoukou/731.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    三田市あすなろ教室
                  </a>
                </li>
              </ul>
              <h3 className="mt-4 border-b border-dashed border-primary-200 text-left text-base !text-primary">
                宝塚市
              </h3>
              <ul className="mt-4 flex list-square flex-col gap-2 pl-5 marker:text-secondary-400">
                <li>
                  <a
                    href="https://www.city.takarazuka.hyogo.jp/kyoikuiinkai/1044140/index.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Pal たからづか
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.city.takarazuka.hyogo.jp/kyoikuiinkai/1044140/index.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    CoCo たからづか
                  </a>
                </li>
              </ul>
              <h3 className="mt-4 border-b border-dashed border-primary-200 text-left text-base !text-primary">
                西宮市
              </h3>
              <ul className="mt-4 flex list-square flex-col gap-2 pl-5 marker:text-secondary-400">
                <li>
                  <a
                    href="https://www.nishi.or.jp/kosodate/kodomomiraicenter/asunaromirai/asunaromirai.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    あすなろ<small> (みらい)</small>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nishi.or.jp/kosodate/kyoiku/gakkokyoiku/oshirase/20231030.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    あすなろ
                    <small> (なるおきた、かわらぎ、やまぐち、しおせ、うえがはら、はまわき)</small>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <AfterContentArea />
      </motion.div>
    </Layout>
  )
}

export default Reference
