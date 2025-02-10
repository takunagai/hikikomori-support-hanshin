/**
 * microcms API からフェッチ
 * @ref https://document.microcms.io/tutorial/next/next-getting-started
 */
import * as Dialog from "@radix-ui/react-dialog"
import { motion } from "framer-motion"
import { useState } from "react"
import AfterContentArea from "../components/AfterContentArea"
import DialogDemo from "../components/Dialog"
import Layout from "../components/layout"
import Link from "../components/Link"
import RadioButton from "../components/RadioButton"
import { client } from "../lib/client"; // microcms-js-sdkの初期化

import {
  FaEnvelope,
  FaGlobe,
  FaInfoCircle,
  FaLine,
  FaPhoneAlt,
  FaPrint,
} from "react-icons/fa"

import type {
  GetStaticProps,
  // GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next"; // TypeScript の型データ

// https://zenn.dev/catnose99/articles/7201a6c56d3c88
type Props = InferGetStaticPropsType<typeof getStaticProps>

// microCMS - group
import type { Group } from "../types/group"
type Groups = { groups: Array<Group> }

/**
 * getStaticProps (from microCMS API)
 *   getStaticProps は、実装者が大きな変更をしない限り Promise を返却する = 条件は必ず真に流れる
 */
// ★★TODO: エラー消す (参考：https://zenn.dev/eitches/articles/2021-0424-getstaticprops-type)
// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<{ slug: string }>) => {
export const getStaticProps: GetStaticProps = async () =>
  // context: GetStaticPropsContext,
  {
    const data = await client.get({
      endpoint: "group",
      queries: {
        // filters: "city[contains]宝塚市[or]city[contains]伊丹市",
        limit: 100,
      },
    })

    return {
      props: {
        groups: data.contents,
      },
    }
  }

/**
 * Main Component
 */
// const PlacesAndGroups: NextPage<Props> = ({ groups }: Groups) => { // 型付けるとエラー
const PlacesAndGroups: NextPage<Props> = ({ groups }) => {
  const [selectedCity, setSelectedCity] = useState("全表示")

  return (
    <Layout
      title="居場所・親の会の情報"
      description="阪神地域でされているひきこもりの方の居場所、不登校の方の居場所、親の会、学習支援、教育支援センター、相談機関などの情報を集めました。"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="alignfull bg-dots3">居場所・親の会の情報</h1>
        <div className="mx-auto mt-8 max-w-2xl">
          <p className="font-bold text-primary">
            なかなか探しにくい、阪神地域でされているひきこもりの方の居場所、不登校の方の居場所、親の会、学習支援、教育支援センター、相談機関などの情報を集めました。
          </p>

          <div
            className="mt-4 rounded-md border border-yellow-200 bg-yellow-50 p-2"
            role="alert"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <FaInfoCircle className="inline align-baseline text-yellow-400" />
              </div>
              <div className="ml-2">
                <div className="text-sm text-yellow-800">
                  中には有償のものや、合わない所があるかもしれません。
                  <br />
                  ホームページやチラシに載っている情報や、説明をよく聞いてから利用する様にしてください。
                </div>
              </div>
            </div>
            <div className="mt-3 flex">
              <div className="flex-shrink-0">
                <FaInfoCircle className="inline align-baseline text-yellow-400" />
              </div>
              <div className="ml-2">
                <div className="text-sm text-yellow-800">
                  イベント日程等は、各グループのホームページをご参照ください。
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="btn btn-primary">
                  運営者の方へ<small> (掲載希望、情報変更)</small>
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                  <Dialog.Title className="DialogTitle">
                    運営者の方へ<small> (掲載希望、情報変更)</small>
                  </Dialog.Title>
                  {/*<Dialog.Description className="DialogDescription">*/}
                  {/*  Make changes to your profile here. Click save when you're*/}
                  {/*  done.*/}
                  {/*</Dialog.Description>*/}
                  <p className="mt-4">
                    当ページへの新規掲載を気希望の方や掲載情報変更を希望の方は、お問い合わせください。
                  </p>
                  <p className="mt-4 text-center">
                    <Link
                      href="/inquiry"
                      type="button"
                      className="btn btn-secondary"
                    >
                      お問合せはこちら
                    </Link>
                  </p>

                  <div
                    style={{
                      marginTop: "0.5em",
                      textAlign: "center",
                    }}
                  >
                    <Dialog.Close asChild>
                      <button className="text-sm text-primary underline">
                        閉じる
                      </button>
                    </Dialog.Close>
                  </div>
                  <Dialog.Close asChild>
                    <button className="IconButton" aria-label="Close">
                      ×
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </p>
        </div>
        <section className="mt-8">
          <RadioButtonsForFilter
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
          <GroupList groups={groups} selectedCity={selectedCity} />
        </section>

        <AfterContentArea />
      </motion.div>
    </Layout>
  )
}

export default PlacesAndGroups

/**
 * ラジオボタンエリア
 */
const RadioButtonsForFilter = ({
  selectedCity,
  setSelectedCity,
}: {
  selectedCity: string
  setSelectedCity: (selectedCity: string) => void
}) => {
  const CITIES = [
    { id: "all", name: "全表示" },
    { id: "amagasaki", name: "尼崎市" },
    { id: "nishinomiya", name: "西宮市" },
    { id: "ashiya", name: "芦屋市" },
    { id: "itami", name: "伊丹市" },
    { id: "takarazuka", name: "宝塚市" },
    { id: "kawanishi", name: "川西市" },
    { id: "sanda", name: "三田市" },
    { id: "inagawa", name: "川辺郡猪名川町" },
    { id: "online", name: "オンライン" },
  ]

  return (
    <>
      <div className="mx-auto max-w-lg rounded-2xl bg-gray-100 p-4 dark:bg-gray-800">
        <p className="text-center font-bold text-primary dark:text-primary-300">場所で絞り込む</p>
        <fieldset className="mt-4">
          <div className="flex flex-wrap justify-center gap-2">
            {CITIES.map((city) => (
              <RadioButton
                key={city.id}
                name="city"
                id={city.id}
                value={city.name}
                label={city.name}
                checked={selectedCity === city.name}
                onChange={(e) => setSelectedCity(e.target.value)}
              />
            ))}
          </div>
        </fieldset>
      </div>
      <motion.h2
        className="mt-6 border-b border-dashed border-primary-200 pb-2 font-bold dark:border-primary-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={selectedCity}
      >
        {selectedCity}
      </motion.h2>
    </>
  )
}

/**
 * 居場所&グループのリスト
 */
const GroupList = ({
  groups,
  selectedCity,
}: {
  groups: Groups
  selectedCity: string
}) => {
  const extractCategoryMatches = (item: Group) => {
    if (selectedCity === "全表示") {
      return true
    } else {
      return item.city[0] === selectedCity
    }
  }

  return Object.keys(groups).length === 0 ? (
    <p>登録がありません。</p>
  ) : (
    <div className="mt-8">
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(groups as any) // FIXME: 型
          .filter(extractCategoryMatches)
          .map((group: Group, index: number) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg bg-[#FBF7F4] p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800/95 dark:shadow-gray-900/30"
              style={{
                backgroundImage: "url('/images/paper-texture.svg')",
                backgroundRepeat: "repeat",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary-50/30 to-transparent dark:from-primary-900/10"></div>
              <div className="relative">
                <h2 className="text-left text-[1.4rem] font-bold text-primary-700 dark:text-primary-300">
                  {group.title}
                </h2>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.locationType.map((x, i) => (
                    <li
                      className="rounded-md border border-primary-200 px-2 py-0.5 text-sm text-primary-600 dark:border-primary-700 dark:text-primary-300"
                      key={i}
                    >
                      {x}
                    </li>
                  ))}
                  <li className="rounded-full bg-secondary-100 px-3 py-0.5 text-sm text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300">
                    {group.city.join(", ")}
                  </li>
                </ul>

                <p className="mt-4 text-gray-600 dark:text-gray-300">{group.summary}</p>

                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <span className="font-bold text-primary-600 dark:text-primary-400">対象者:</span>
                    <p className="mt-1">{group.objectPerson}</p>
                  </div>

                  <div className="grid gap-2">
                    <p className="flex items-start">
                      <span className="mr-2 font-bold text-primary-600 dark:text-primary-400">場所：</span>
                      <span className="flex-1">
                        {group.place}
                        {group.address && (
                          <small className="mt-1 block text-gray-500 dark:text-gray-400">
                            ({group.address})
                          </small>
                        )}
                      </span>
                    </p>

                    <p className="flex items-start">
                      <span className="mr-2 font-bold text-primary-600 dark:text-primary-400">日時：</span>
                      <span className="flex-1">{group.activityDate}</span>
                    </p>

                    <p className="flex items-start">
                      <span className="mr-2 font-bold text-primary-600 dark:text-primary-400">参加費：</span>
                      <span className="flex-1">{group.cost}</span>
                    </p>

                    <p className="flex items-start">
                      <span className="mr-2 font-bold text-primary-600 dark:text-primary-400">主催者：</span>
                      <span className="flex-1">{group.manager}</span>
                    </p>
                  </div>

                  {group.notice && (
                    <p className="rounded-md bg-red-50 p-2 text-red-600 dark:bg-red-900/20 dark:text-red-300">
                      <small>{group.notice}</small>
                    </p>
                  )}

                  <div className="border-t border-gray-100 pt-3 dark:border-gray-700">
                    <p className="font-bold text-primary-600 dark:text-primary-400">
                      問合せ先
                      {group.contactName && (
                        <small className="font-normal text-gray-500 dark:text-gray-400">
                          {" "}({group.contactName})
                        </small>
                      )}
                    </p>

                    <div className="mt-2 space-y-2">
                      {group.contactTel && (
                        <p className="flex items-center gap-2">
                          <FaPhoneAlt className="h-4 w-4 text-secondary-500" />
                          <a
                            href={`tel:${group.contactTel}`}
                            className="text-lg font-bold text-secondary-600 hover:text-secondary-500 dark:text-secondary-400 dark:hover:text-secondary-300"
                          >
                            {group.contactTel}
                          </a>
                          {group.contactHours && (
                            <small className="text-gray-500 dark:text-gray-400">
                              {group.contactHours}
                            </small>
                          )}
                        </p>
                      )}

                      {group.contactFax && (
                        <p className="flex items-center gap-2">
                          <FaPrint className="h-4 w-4 text-secondary-500" />
                          <span className="text-gray-600 dark:text-gray-300">{group.contactFax}</span>
                        </p>
                      )}

                      <div className="flex gap-4">
                        {group.contactEmail && (
                          <Link
                            href={`mailto:${group.contactEmail}`}
                            external
                            variant="secondary"
                            className="inline-flex items-center gap-1"
                          >
                            <FaEnvelope className="h-4 w-4 mx-auto" />
                            <span className="font-bold">Email</span>
                          </Link>
                        )}

                        {group.contactLine && (
                          <Link
                            href={`https://lin.ee/${group.contactLine}`}
                            external
                            variant="secondary"
                            className="inline-flex items-center gap-1"
                          >
                            <FaLine className="h-4 w-4 mx-auto" />
                            <span className="font-bold">LINE</span>
                          </Link>
                        )}

                        {group.webUrl && (
                          <Link
                            href={group.webUrl}
                            external
                            variant="secondary"
                            className="inline-flex items-center gap-1"
                          >
                            <FaGlobe className="h-4 w-4 mx-auto" />
                            <span className="font-bold">Web</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {(group.leafletImage1 || group.leafletImage2) && (
                  <div className="mt-4 grid gap-4">
                    {group.leafletImage1 && (
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={group.leafletImage1.url}
                          width={group.leafletImage1.width}
                          height={group.leafletImage1.height}
                          alt="リーフレット"
                          className="w-full object-cover"
                        />
                        <DialogDemo
                          title={group.title}
                          showTitle={false}
                          triggerType="link"
                          triggerText="» 拡大表示"
                          isStretchLink={true}
                          isPortrait={group.leafletImage1.height >= group.leafletImage1.width}
                        >
                          <img
                            src={group.leafletImage1.url}
                            width={group.leafletImage1.width}
                            height={group.leafletImage1.height}
                            alt="リーフレット"
                          />
                        </DialogDemo>
                      </div>
                    )}

                    {group.leafletImage2 && (
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={group.leafletImage2.url}
                          width={group.leafletImage2.width}
                          height={group.leafletImage2.height}
                          alt="リーフレット"
                          className="w-full object-cover"
                        />
                        <DialogDemo
                          title={group.title}
                          showTitle={false}
                          triggerType="link"
                          triggerText="» 拡大表示"
                          isStretchLink={true}
                          isPortrait={group.leafletImage2.height >= group.leafletImage2.width}
                        >
                          <img
                            src={group.leafletImage2.url}
                            width={group.leafletImage2.width}
                            height={group.leafletImage2.height}
                            alt="リーフレット"
                          />
                        </DialogDemo>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.li>
          ))}
      </ul>
    </div>
  )
}
