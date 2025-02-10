import Link from "next/link"
import { motion } from "framer-motion"
import Layout from "../components/layout"
import Accordion from "../components/Accordion"
import AfterContentArea from "../components/AfterContentArea"
import type { NextPage } from "next"

import {
  FaPhoneAlt,
  FaLine,
  FaTwitter,
  FaLock,
  FaHandHoldingHeart,
  FaUserFriends,
  FaHandshake,
  FaDove,
  FaCat,
  FaCrow,
  FaDemocrat,
  FaDog,
  FaFish,
  FaHorse,
  FaFrog,
} from "react-icons/fa"

const Faq: NextPage = () => {
  return (
    <Layout title="よくある質問とその回答" description="よくある質問とその回答">
      <motion.div
        initial={{ opacity: 0 }} // initial
        animate={{ opacity: 1 }} // on mount
        exit={{ opacity: 0 }} // on unmount
      >
        <h1 className="alignfull bg-dots3">よくある質問とその回答</h1>

        <div className="mx-auto max-w-2xl">
          <p className="mt-8">
            よくいただく質問をまとめました。
            <br />
            これ以外にご不明な点や聞きたいことがございましたら、お問合せよりご連絡ください。
          </p>
          <p className="mt-1 text-sm">
            <Link href="/inquiry" className="inline-block font-bold text-primary">
              » お問合せはこちら
            </Link>
          </p>
        </div>

        <section className="mx-auto max-w-2xl py-8">
          <div className="space-y-0">
            <Accordion title="Q. 相談料はかかりますか？" defaultOpen>
              <p className="text-gray-800 dark:text-gray-200">
                料金はかかりません。無料です。
              </p>
            </Accordion>

            <Accordion title="Q. 対象の地域は？">
              <p className="text-gray-800 dark:text-gray-200">
                神戸市以外の阪神地域の方が対象です。
                <br />
                兵庫県の他の地域の方は、兵庫ひきこもり相談支援センターの地域のブランチをご利用ください。
              </p>
              <div className="mt-3 max-w-fit rounded border border-dashed border-primary-200 p-3">
                <p className="font-bold text-primary">
                  兵庫ひきこもり相談支援センター
                </p>
                <p className="mt-0 text-xs">
                  ※リンクは運営している団体のホームページ
                </p>
                <ul className="mt-2 list-square pl-5 marker:text-secondary-400">
                  <li>
                    阪神ブランチ<small>(当サイト)</small>
                  </li>
                  <li>
                    <a
                      href="https://harima-branch.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      播磨ブランチ
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://kounotori-inochinet.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      但馬ブランチ
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://web.pref.hyogo.lg.jp/kk16/ac12_000000034.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      丹波ブランチ
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://web.pref.hyogo.lg.jp/kf09/hikikomori/awaji.html"
                      target="_blank"
                      rel="noreferrer"
                    >
                      淡路ブランチ
                    </a>
                  </li>
                </ul>
              </div>
            </Accordion>

            <Accordion title="Q. 本人以外が相談してもよいですか？">
              <p className="text-gray-800 dark:text-gray-200">
                ご本人・家族・兄弟・年齢などは問いません。
              </p>
            </Accordion>

            <Accordion title="Q. いつでも相談できるの？">
              <p className="text-gray-800 dark:text-gray-200">
                まずはお電話ください。スタッフが相談予約日をご案内します。
              </p>
            </Accordion>
          </div>
        </section>

        <AfterContentArea />
      </motion.div>
    </Layout>
  )
}

export default Faq
