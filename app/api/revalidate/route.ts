import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

const TAG_MAP: Record<string, readonly string[]> = {
  news: ['news-list', 'news-latest', 'news-ids', 'news-detail'],
  group: ['groups'],
  'user-comments': ['user-comments'],
}

/**
 * microCMS Webhook 受信エンドポイント
 *
 * microCMS 管理画面で以下を設定:
 *   - URL: https://hanshin-branch.org/api/revalidate
 *   - カスタムヘッダ `x-microcms-signature` に MICROCMS_WEBHOOK_SECRET と同じ値
 *
 * ペイロードの `api` フィールドに応じて該当タグの ISR キャッシュを無効化する。
 */
export async function POST(request: Request) {
  const secret = process.env.MICROCMS_WEBHOOK_SECRET
  if (!secret) {
    // biome-ignore lint/suspicious/noConsole: サーバー設定不備をログに残す
    console.error('MICROCMS_WEBHOOK_SECRET is not configured')
    return NextResponse.json({ message: 'server misconfigured' }, { status: 500 })
  }

  const signature = request.headers.get('x-microcms-signature')
  if (signature !== secret) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
  }

  let body: { api?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'invalid payload' }, { status: 400 })
  }

  const api = body?.api
  if (!api) {
    return NextResponse.json({ message: 'missing api field' }, { status: 400 })
  }

  const tags = TAG_MAP[api] ?? []
  for (const tag of tags) {
    // Next.js 16: 第 2 引数 'max' で stale-while-revalidate を有効化
    revalidateTag(tag, 'max')
  }

  return NextResponse.json({ revalidated: true, api, tags })
}
