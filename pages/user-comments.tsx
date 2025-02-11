/**
 * microcms フェッチ
 * @ref https://document.microcms.io/tutorial/next/next-getting-started
 */
import { motion } from 'framer-motion'
import AfterContentArea from '../components/AfterContentArea'
import Layout from '../components/layout'
import { client } from '../lib/client' // microcms-js-sdkの初期化

import type { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next' // TypeScript の型データ

// https://zenn.dev/catnose99/articles/7201a6c56d3c88
type Props = InferGetStaticPropsType<typeof getStaticProps>

// microCMS - user-comments
import type { UserComment } from '../types/user-comment'
type UserCommentsTypes = { groups: Array<UserComment> }

// getStaticProps は、実装者が大きな変更をしない限り Promise を返却する = 条件は必ず真に流れる
// ★★TODO: エラー消す (参考：https://zenn.dev/eitches/articles/2021-0424-getstaticprops-type)
// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<{ slug: string }>) => {
export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const data = await client.get({
    endpoint: 'user-comments',
    queries: { limit: 50 },
  })

  return {
    props: {
      userComments: data.contents,
    },
  }
}

// const UserComments: NextPage<Props> = ({ groups }: UserComments) => { // 型付けるとエラー
const UserComments: NextPage<Props> = ({ userComments }) => {
  return (
    <Layout
      title="ご利用者様の声"
      description="兵庫ひきこもり相談支援センター 阪神ブランチをご利用いただいた方々からの声を紹介します"
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <h1 className="alignfull bg-dots3">ご利用者様の声</h1>
        <div className="mx-auto mt-8 max-w-2xl">
          <p>当センターをご利用いただいた方々から いただいた声を紹介します。</p>
        </div>

        <section className="mt-8">
          <div className="mt-8">
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {userComments.map((userComment: UserComment, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.1,
                  }}
                  className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-lg bg-[#FBF7F4] p-6 shadow-md transition-all hover:shadow-lg dark:bg-gray-800/95 dark:shadow-gray-900/30"
                  style={{
                    backgroundImage: "url('/images/paper-texture.svg')",
                    backgroundRepeat: 'repeat',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary-50/30 to-transparent dark:from-primary-900/10"></div>
                  <div className="relative flex-1">
                    <h3 className="mb-4 text-lg font-medium text-primary-600 dark:text-primary-400">
                      {userComment.title}
                    </h3>

                    <div className="relative">
                      <div className="absolute -left-2 -top-2 text-4xl text-primary-200 dark:text-primary-800">
                        "
                      </div>
                      <p className="pl-4 text-gray-600 dark:text-gray-300">{userComment.body}</p>
                      <div className="absolute -bottom-4 -right-2 text-4xl text-primary-200 dark:text-primary-800">
                        "
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-6 flex items-center justify-end gap-2 border-t border-primary-100/50 pt-4 dark:border-primary-700/30">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {userComment.city[0]}
                    </p>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {userComment.initial}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">様</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        <AfterContentArea />
      </motion.div>
    </Layout>
  )
}

export default UserComments
