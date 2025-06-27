/**
 * App Router 最適化版 microCMS クライアント
 * Next.js 15.3.4 の新機能を活用したデータフェッチング
 */

import type { NewsItem } from '../types/news'
import type { Group } from '../types/group'
import type { UserComment } from '../types/user-comment'
import { CACHE_CONFIG } from './constants'
import { microCMSConfig } from './env'

/**
 * 共通のフェッチ関数
 * Next.js 15.3.4 のキャッシュ機能を活用
 */
async function fetchFromMicroCMS<T>(
  endpoint: string,
  options: {
    queries?: Record<string, string | number>
    revalidate?: number
    tags?: string[]
    next?: RequestInit['next']
  } = {}
): Promise<T> {
  const { queries = {}, revalidate = CACHE_CONFIG.DEFAULT_REVALIDATE, tags = [], next } = options

  // クエリパラメータの構築
  const searchParams = new URLSearchParams()
  Object.entries(queries).forEach(([key, value]) => {
    searchParams.append(key, String(value))
  })

  const url = `${microCMSConfig.baseUrl}/${endpoint}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

  try {
    const response = await fetch(url, {
      headers: {
        'X-MICROCMS-API-KEY': microCMSConfig.apiKey,
        'Content-Type': 'application/json',
      },
      next: {
        revalidate,
        tags: [endpoint, ...tags],
        ...next,
      },
    })

    if (!response.ok) {
      throw new Error(`microCMS API エラー: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`microCMS fetch エラー (${endpoint}):`, error)
    throw error
  }
}

/**
 * ニュース関連のデータフェッチング関数
 */
export const newsApi = {
  /**
   * ニュース一覧を取得
   */
  async getAll(options: { limit?: number; offset?: number } = {}): Promise<{ contents: NewsItem[]; totalCount: number }> {
    const { limit = 50, offset = 0 } = options
    
    return fetchFromMicroCMS('news', {
      queries: {
        limit,
        offset,
        orders: '-date',
      },
      revalidate: 1800, // 30分キャッシュ
      tags: ['news-list'],
    })
  },

  /**
   * ニュース詳細を取得
   */
  async getById(id: string): Promise<NewsItem> {
    return fetchFromMicroCMS(`news/${id}`, {
      revalidate: 3600, // 1時間キャッシュ
      tags: ['news-detail', `news-${id}`],
    })
  },

  /**
   * 最新ニュースを取得（トップページ用）
   */
  async getLatest(limit: number = 5): Promise<NewsItem[]> {
    const data = await fetchFromMicroCMS<{ contents: NewsItem[] }>('news', {
      queries: {
        limit,
        orders: '-date',
      },
      revalidate: 900, // 15分キャッシュ
      tags: ['news-latest'],
    })
    
    return data.contents
  },

  /**
   * 静的生成用のIDリストを取得
   */
  async getAllIds(): Promise<string[]> {
    const data = await fetchFromMicroCMS<{ contents: Pick<NewsItem, 'id'>[] }>('news', {
      queries: {
        limit: 1000,
        fields: 'id',
      },
      revalidate: 86400, // 24時間キャッシュ
      tags: ['news-ids'],
    })
    
    return data.contents.map(item => item.id)
  },
}

/**
 * グループ関連のデータフェッチング関数
 */
export const groupsApi = {
  /**
   * 全グループを取得
   */
  async getAll(): Promise<Group[]> {
    const data = await fetchFromMicroCMS<{ contents: Group[] }>('group', {
      queries: {
        limit: 100,
      },
      revalidate: 7200, // 2時間キャッシュ
      tags: ['groups'],
    })
    
    return data.contents
  },

  /**
   * 市町村別グループを取得
   */
  async getByCity(city: string): Promise<Group[]> {
    const data = await fetchFromMicroCMS<{ contents: Group[] }>('group', {
      queries: {
        limit: 100,
        filters: `city[contains]${city}`,
      },
      revalidate: 7200, // 2時間キャッシュ
      tags: ['groups', `groups-${city}`],
    })
    
    return data.contents
  },
}

/**
 * ユーザーコメント関連のデータフェッチング関数
 */
export const userCommentsApi = {
  /**
   * 全ユーザーコメントを取得
   */
  async getAll(): Promise<UserComment[]> {
    const data = await fetchFromMicroCMS<{ contents: UserComment[] }>('user-comments', {
      queries: {
        limit: 50,
        orders: '-publishedAt',
      },
      revalidate: 3600, // 1時間キャッシュ
      tags: ['user-comments'],
    })
    
    return data.contents
  },
}

/**
 * キャッシュ無効化関数
 */
export const revalidateCache = {
  /**
   * ニュース関連キャッシュを無効化
   */
  news: async () => {
    // Webhook からの呼び出し用
    // revalidateTag('news')
  },

  /**
   * グループ関連キャッシュを無効化
   */
  groups: async () => {
    // Webhook からの呼び出し用
    // revalidateTag('groups')
  },

  /**
   * ユーザーコメント関連キャッシュを無効化
   */
  userComments: async () => {
    // Webhook からの呼び出し用
    // revalidateTag('user-comments')
  },
}

/**
 * 従来のクライアント（互換性のため残す）
 */
export { client } from './client'

/**
 * エラーハンドリング用のヘルパー関数
 */
export function handleMicroCMSError(error: unknown): Error {
  if (error instanceof Error) {
    return error
  }
  
  return new Error('microCMS API で不明なエラーが発生しました')
}