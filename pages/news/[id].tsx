import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
/**
 * 確認用 URL: http://localhost:3000/news/fh86-lbz5
 * 参照：https://blog.microcms.io/microcms-next-jamstack-blog/
 */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import FormattedDate from '../../components/date';
import Layout from '../../components/layout';
import { client } from '../../lib/client'; // microcms-js-sdkの初期化

import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext
} from 'next';

// https://zenn.dev/catnose99/articles/7201a6c56d3c88
// type Props = InferGetStaticPropsType<typeof getStaticProps>

// microCMS - news
import type { NewsItem } from '../../types/news';

/**
 * ページコンポーネント
 */
export default function BlogId({ newsArticle }: { newsArticle: NewsItem }) {
  const [sanitizedHtml, setSanitizedHtml] = useState(newsArticle.body);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSanitizedHtml(DOMPurify.sanitize(newsArticle.body));
    }
  }, [newsArticle.body]);

  return (
    <Layout
      title={newsArticle.title}
      description={newsArticle.body.replace(/(<([^>]+)>)/gi, '').slice(0, 100)}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <h1 className="alignfull bg-dots3">
          お知らせ
        </h1>

        <div className="mx-auto max-w-2xl py-12">
          <h2 className="font-sans font-bold">{newsArticle.title}</h2>
          <p className="mt-2 text-sm text-gray-600">
            投稿日：
            <FormattedDate dateString={newsArticle.date} />
          </p>
          <div
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: sanitizedHtml,
            }}
            className="mt-8"
          />
        </div>
        <p className="text-center">
          <Link href="/" className="btn btn-primary px-16">
            トップページへ
          </Link>
          <Link href="/news" className="btn btn-secondary px-7">
            お知らせ一覧へ
          </Link>
        </p>
      </motion.div>
    </Layout>
  )
}

/**
 * getStaticPaths
 *   静的生成のためのパスを指定
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: 'news' })
  const paths = data.contents.map((content: NewsItem) => `/news/${content.id}`)
  return { paths, fallback: false }
}

/**
 * getStaticProps (from microCMS API)
 *   データをテンプレートに受け渡す部分の処理を記述します
 *   getStaticProps は、実装者が大きな変更をしない限り Promise を返却する = 条件は必ず真に流れる
 */
export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id
  const idExceptArray = Array.isArray(id) ? id[0] : id
  const data = await client.get({
    endpoint: 'news',
    contentId: idExceptArray,
  })

  return {
    props: {
      newsArticle: data,
    },
  }
  // const id = context.contents.id
  // const data = await client.get({ endpoint: "news", contentId: id })

  // return {
  //   props: {
  //     news: data,
  //   },
  // }
}
