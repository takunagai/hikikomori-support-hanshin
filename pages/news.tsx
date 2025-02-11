import { motion } from 'framer-motion'
/**
 * microcms フェッチ
 * @ref https://document.microcms.io/tutorial/next/next-getting-started
 */
import Link from 'next/link'
import AfterContentArea from '../components/AfterContentArea'
import FormattedDate from '../components/date'
import Layout from '../components/layout'
import { client } from '../lib/client' // microcms-js-sdkの初期化

import type { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next' // TypeScript の型データ

// https://zenn.dev/catnose99/articles/7201a6c56d3c88
type Props = InferGetStaticPropsType<typeof getStaticProps>

// microCMS - news
import type { NewsItem } from '../types/news'
type NewsItemsTypes = { newsItems: Array<NewsItem> }

// getStaticProps は、実装者が大きな変更をしない限り Promise を返却する = 条件は必ず真に流れる
// ★★TODO: エラー消す (参考：https://zenn.dev/eitches/articles/2021-0424-getstaticprops-type)
// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<{ slug: string }>) => {
export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const data = await client.get({
    endpoint: 'news',
    queries: { limit: 50 },
  })

  return {
    props: {
      newsItems: data.contents,
    },
  }
}

// const NewsItems: NextPage<Props> = ({ groups }: NewsItems) => { // 型付けるとエラー
const NewsItems: NextPage<Props> = ({ newsItems }) => {
  return (
    <Layout
      title="お知らせ"
      description="兵庫ひきこもり相談支援センター 阪神ブランチからのお知らせです"
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <h1 className="alignfull bg-dots3">お知らせ</h1>
        <div className="mx-auto mt-8 max-w-2xl">
          <p>お知らせやイベント情報。</p>
        </div>

        <section className="mx-auto mt-8 max-w-2xl">
          <ul className="">
            {newsItems.map((newsItem: NewsItem) => (
              <li key={newsItem.id} className="border-b border-dashed border-primary-100 py-4">
                <h2 className="inline text-left text-xl">
                  <Link href={`/news/${newsItem.id}`} passHref className="!px-0 text-primary">
                    {newsItem.title}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-gray-700">
                  投稿日：
                  <FormattedDate dateString={newsItem.date} />
                </p>
              </li>
            ))}
          </ul>
        </section>

        <AfterContentArea />
      </motion.div>
    </Layout>
  )
}

export default NewsItems
