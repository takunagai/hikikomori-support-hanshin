import { motion } from 'framer-motion'
import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/layout'

import { FaPhoneAlt } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Inquiry: NextPage = () => {
  return (
    <Layout title="お問合せ" description="お問合せ">
      <motion.div
        initial={{ opacity: 0 }} // initial
        animate={{ opacity: 1 }} // on mount
        exit={{ opacity: 0 }} // on unmount
      >
        <h1 className="alignfull bg-dots3">お問合せ</h1>

        <div className="mx-auto max-w-2xl">
          <p className="mt-8">
            ご不明な点や聞きたいことがございましたら、電話、メールフォームのいずれかでご連絡ください。
          </p>
          <p className="mt-1 text-center text-sm">
            <Link href="/flow" className="inline-block font-bold text-primary">
              » 相談の流れ
            </Link>
            <Link href="/faq" className="inline-block font-bold text-primary">
              » よくある質問を見る
            </Link>
          </p>
        </div>

        <section className="py-8">
          <div className="mx-auto mt-8 max-w-3xl gap-8 lg:flex">
            <div className="mx-auto basis-1/2 rounded bg-base p-4 text-center shadow">
              <h2 className="text-primary">電話でのお問合せ</h2>
              <p className="mt-2">
                <b>
                  兵庫ひきこもり相談支援センター
                  <br />
                  阪神ブランチ
                </b>
              </p>
              <p className="mt-1 text-2xl">
                <b>
                  <FaPhoneAlt className=" inline align-baseline text-primary-300" />
                  <a href="tel:050-3749-1227">050-3749-1227</a>
                </b>
              </p>
              <p className="mt-1 text-sm">対応時間 火・水・木・金　10〜16時</p>
            </div>

            <div className="mx-auto mt-8 basis-1/2 rounded bg-base p-4 text-center shadow lg:mt-0">
              <h2 className="text-primary">SNS でお問合せ</h2>
              <p className="mt-2">
                メッセージでお問合せください。
                <br />
                対応時間内に順次ご連絡いたします。
              </p>
              <div className="mt-3 justify-center">
                <p>
                  <FaXTwitter className="inline align-baseline text-primary-300 text-2xl" />
                  <br />
                  ID:
                  <a href="https://x.com/ikigaisagashi1" target="_blank" rel="noreferrer">
                    @ikigaisagashi1
                  </a>
                </p>
                <p className="mt-1 text-sm">対応時間 火・水・木・金 10〜16時</p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded bg-base py-8 px-4 shadow lg:px-8 hidden">
            <h2 className="text-primary">お問合せフォーム</h2>
            <p className="text-small text-center text-sm">(24H受付)</p>
            <div className="mx-auto max-w-lg">
              <p className="mt-3">準備中です。電話か Twitter でお問合せください。</p>
              {/*<p className="mt-3">*/}
              {/*  送信後すぐに、自動返信メールが届きます。内容を確認次第、スタッフより連絡させていただきます。*/}
              {/*</p>*/}
              {/*<p className="mt-1">*/}
              {/*  <Link href="/privacy-policy" className="text-sm text-primary">*/}
              {/*    » 個人情報保護方針*/}
              {/*  </Link>*/}
              {/*</p>*/}
              {/*<p className="text-sm font-bold">*/}
              {/*  ※*/}
              {/*  送信から3時間経っても当センターからの自動返信メールが届いていない場合、お手数ですが電話連絡ください。*/}
              {/*</p>*/}
              {/*<div className="mail-form text-left">*/}
              {/*  <form action="#" method="post" encType="multipart/form-data">*/}
              {/*    <dl>*/}
              {/*      <dt className="mt-4 font-bold text-primary">*/}
              {/*        お名前(必須)*/}
              {/*      </dt>*/}
              {/*      <dd>*/}
              {/*        <input type="hidden" name="お名前[params]" value="名前" />*/}
              {/*        <input type="text" name="お名前[value]" />*/}
              {/*      </dd>*/}
              {/*    </dl>*/}
              {/*    <dl>*/}
              {/*      <dt className="mt-4 font-bold text-primary">*/}
              {/*        メールアドレス(必須)*/}
              {/*      </dt>*/}
              {/*      <dd>*/}
              {/*        <input*/}
              {/*          type="hidden"*/}
              {/*          name="メールアドレス[params]"*/}
              {/*          value="メール"*/}
              {/*        />*/}
              {/*        <input type="text" name="メールアドレス[value]" />*/}
              {/*      </dd>*/}
              {/*    </dl>*/}
              {/*    <dl>*/}
              {/*      <dt className="mt-4 font-bold text-primary">*/}
              {/*        メールアドレス確認(必須)*/}
              {/*      </dt>*/}
              {/*      <dd>*/}
              {/*        <input*/}
              {/*          type="hidden"*/}
              {/*          name="メールアドレス確認[params]"*/}
              {/*          value="再入力"*/}
              {/*        />*/}
              {/*        <input type="text" name="メールアドレス確認[value]" />*/}
              {/*      </dd>*/}
              {/*    </dl>*/}
              {/*    <dl>*/}
              {/*      <dt className="mt-4 font-bold text-primary">*/}
              {/*        電話番号(必須)*/}
              {/*      </dt>*/}
              {/*      <dd>*/}
              {/*        <input*/}
              {/*          type="hidden"*/}
              {/*          name="電話番号[params]"*/}
              {/*          value="電話番号,必須"*/}
              {/*        />*/}
              {/*        <input type="text" name="電話番号[value]" />*/}
              {/*      </dd>*/}
              {/*    </dl>*/}
              {/*    <dl>*/}
              {/*      <dt className="mt-4 font-bold text-primary">*/}
              {/*        お問い合わせ内容(必須)*/}
              {/*      </dt>*/}
              {/*      <dd>*/}
              {/*        <input*/}
              {/*          type="hidden"*/}
              {/*          name="お問い合わせ内容[params]"*/}
              {/*          value="必須"*/}
              {/*        />*/}
              {/*        <textarea name="お問い合わせ内容[value]"></textarea>*/}
              {/*      </dd>*/}
              {/*    </dl>*/}
              {/*    <dl>*/}
              {/*      <dt className="mt-4 font-bold text-primary">*/}
              {/*        個人情報の確認(必須)*/}
              {/*      </dt>*/}
              {/*      <dd>*/}
              {/*        <input*/}
              {/*          type="checkbox"*/}
              {/*          id="privacy-comfirm"*/}
              {/*          name="privacy-comfirm"*/}
              {/*        />*/}
              {/*        <label htmlFor="privacy-comfirm">*/}
              {/*          個人情報について了承しました*/}
              {/*        </label>*/}
              {/*      </dd>*/}
              {/*    </dl>*/}
              {/*    <div className="submit_area mt-4 text-center">*/}
              {/*      <input*/}
              {/*        type="submit"*/}
              {/*        value="送信する"*/}
              {/*        className="btn btn-secondary px-12"*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*  </form>*/}
              {/*</div>*/}
            </div>
          </div>
        </section>
      </motion.div>
    </Layout>
  )
}

export default Inquiry
