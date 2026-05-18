import type { Metadata } from 'next'
import AfterContentArea from '../../components/AfterContentArea'
import { groupsApi } from '../../lib/microcms-app-router'
import PlacesAndGroupsClient from './PlacesAndGroupsClient'

export const metadata: Metadata = {
  title: '居場所・親の会の情報',
  description:
    '阪神地域でされているひきこもりの方の居場所、不登校の方の居場所、親の会、学習支援、教育支援センター、相談機関などの情報を集めました。',
}

/**
 * 居場所・親の会の情報ページ（App Router 版）
 * - Server Component でデータ取得
 * - フィルタリング UI は Client Component に分離
 */
export default async function PlacesAndGroupsPage() {
  const groups = await groupsApi.getAll()

  return (
    <>
      <PlacesAndGroupsClient groups={groups} />
      <AfterContentArea />
    </>
  )
}
