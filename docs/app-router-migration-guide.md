# Pages Router から App Router への移行ガイド

> **📦 アーカイブ — 移行完了済み (2026-05-18)**
>
> 本ガイドは 2025-06 時点で書かれた移行計画書です。Phase 1〜3 は 2025 年内に、Phase 4（`pages/places-and-groups.tsx` の移植と `pages/` の物理削除）は 2026-05-18 の Next.js 16 + React 19 アップグレードで完了しました。
>
> - 現状のプロジェクト構造は [README.md](../README.md) と [CLAUDE.md](../CLAUDE.md) を参照
> - 2026-05 アップグレードの詳細は [docs/logs/2026-05-18_upgrade-next16-react19.md](./logs/2026-05-18_upgrade-next16-react19.md) を参照
>
> 以下は当時の計画書をそのまま残しています（実装パターン集は現在でもほぼ有効ですが、`params` は Promise 化された等の Next.js 16 仕様変更があります）。

## 概要

このドキュメントは、hikikomori-support-hanshin プロジェクトを Pages Router から App Router へ移行するための詳細なガイドです。

**作成日**: 2025-06-27  
**対象バージョン**: Next.js 15.3.4（当時）  
**プロジェクト**: 兵庫ひきこもり相談支援センター 阪神ブランチ

---

## 目次

1. [現在のプロジェクト構造分析](#現在のプロジェクト構造分析)
2. [App Router の最新機能とベストプラクティス](#app-router-の最新機能とベストプラクティス)
3. [移行時の課題と対処法](#移行時の課題と対処法)
4. [段階的移行戦略](#段階的移行戦略)
5. [実装パターン集](#実装パターン集)
6. [チェックリスト](#チェックリスト)

---

## 現在のプロジェクト構造分析

### Pages Router 実装状況

#### ページ構成
```
pages/
├── _app.tsx          # アプリケーション初期化 (Framer Motion + next-themes)
├── _document.tsx     # HTML/Body カスタム設定 (日本語lang、アンチエイリアス)
├── index.tsx         # トップページ (SSG with microCMS)
├── news.tsx          # ニュース一覧ページ (SSG)
├── news/[id].tsx     # ニュース詳細ページ (SSG + ISR)
├── faq.tsx           # よくある質問ページ (静的)
├── flow.tsx          # 相談の流れページ (静的)
├── inquiry.tsx       # お問い合わせページ (静的)
├── places-and-groups.tsx  # 居場所情報ページ (SSG + フィルタリング)
├── user-comments.tsx # ご利用者様の声ページ (SSG)
├── privacy-policy.tsx # プライバシーポリシー
├── reference.tsx     # 参考情報
├── sitemap.tsx       # サイトマップ
├── 404.tsx           # カスタム404ページ
├── 500.tsx           # カスタム500ページ
└── api/hello.js      # APIルート (サンプル)
```

#### データフェッチング手法

**SSG (Static Site Generation) の使用状況**
- **index.tsx**: `getStaticProps` でニュース最新20件取得、表示は5件+サムネイル4件
- **news.tsx**: 全ニュース記事を取得、一覧表示
- **news/[id].tsx**: `getStaticPaths` + `getStaticProps` で個別記事生成
- **places-and-groups.tsx**: 居場所グループ情報100件取得、クライアントサイドフィルタリング
- **user-comments.tsx**: ユーザーコメント50件取得

**microCMS 連携パターン**
```typescript
// 基本的なフェッチパターン
const data = await client.get({
  endpoint: 'news',
  queries: {
    limit: numberOfNewsItemsToFetch,
    orders: '-date',
  },
})

// 動的ルート用パス生成
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: 'news' })
  const paths = data.contents.map((content: NewsItem) => `/news/${content.id}`)
  return { paths, fallback: false }
}
```

#### 技術スタック詳細

**フロントエンド基盤**
- Next.js 15.3.4 (Pages Router)
- React 18.2.0
- TypeScript (strictモード有効)

**UI/スタイリング**
- Tailwind CSS 3.4.17 + カスタムカラーパレット
- CSS Modules (一部コンポーネント)
- Framer Motion 10.18.0 (アニメーション)
- Radix UI (アクセシブルなUIコンポーネント)

**データ管理**
- microCMS (ヘッドレスCMS)
- SWR (データフェッチング)
- DOMPurify (HTMLサニタイズ)

---

## App Router の最新機能とベストプラクティス

### 1. Server Components vs Client Components

#### 使い分けの基準

**Server Components（デフォルト）**
- データフェッチング（API呼び出し）
- 静的コンテンツの表示
- SEO重要な情報
- 初期ロード時のパフォーマンス重視

**Client Components（`"use client"`指定）**
- 状態管理（useState, useReducer）
- イベントハンドラー（onClick, onChange）
- ライフサイクル（useEffect）
- ブラウザAPIの使用
- インタラクティブな要素

#### 推奨実装パターン

```typescript
// Server Component（データフェッチング）
// app/news/page.tsx
export default async function NewsPage() {
  const newsItems = await fetchNewsItems();
  
  return (
    <div>
      <h1>最新ニュース</h1>
      <NewsClient newsItems={newsItems} />
    </div>
  );
}

// Client Component（インタラクション）
// components/NewsClient.tsx
"use client";
import { useState } from 'react';

interface Props {
  newsItems: NewsItem[];
}

export default function NewsClient({ newsItems }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  return (
    <div>
      <CategoryFilter 
        onCategoryChange={setSelectedCategory} 
      />
      <NewsList 
        items={newsItems} 
        category={selectedCategory} 
      />
    </div>
  );
}
```

### 2. データフェッチング戦略

#### SSG実装：generateStaticParams + キャッシュ戦略

```typescript
// app/news/[id]/page.tsx
export const revalidate = 3600; // 1時間キャッシュ

export async function generateStaticParams() {
  const newsItems = await fetchNewsItems();
  return newsItems.slice(0, 10).map((item) => ({
    id: item.id,
  }));
}

export default async function NewsDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const newsItem = await fetchNewsItem(id);
  
  if (!newsItem) {
    notFound();
  }
  
  return (
    <article>
      <h1>{newsItem.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
    </article>
  );
}
```

#### microCMSとの連携における推奨パターン

```typescript
// lib/microcms-app-router.ts
export async function fetchNewsItems() {
  const data = await fetch(`${process.env.MICROCMS_SERVICE_DOMAIN}/api/v1/news`, {
    headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY! },
    next: { 
      revalidate: 3600,
      tags: ['news'] 
    }
  });
  
  if (!data.ok) {
    throw new Error('Failed to fetch news items');
  }
  
  return data.json();
}

// Webhook での手動更新
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const { tag } = await request.json();
  
  revalidateTag(tag);
  
  return Response.json({ revalidated: true });
}
```

### 3. Metadata API

#### 動的メタデータの生成

```typescript
// app/news/[id]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const newsItem = await fetchNewsItem(id);
  
  return {
    title: `${newsItem.title} | 兵庫ひきこもり相談支援センター`,
    description: newsItem.excerpt,
    openGraph: {
      title: newsItem.title,
      description: newsItem.excerpt,
      url: `https://hanshin-branch.org/news/${id}`,
      siteName: '兵庫ひきこもり相談支援センター 阪神ブランチ',
      images: [
        {
          url: newsItem.featuredImage,
          width: 1200,
          height: 630,
          alt: newsItem.title,
        },
      ],
      locale: 'ja_JP',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: newsItem.title,
      description: newsItem.excerpt,
      images: [newsItem.featuredImage],
    },
    alternates: {
      canonical: `https://hanshin-branch.org/news/${id}`,
    },
  };
}
```

#### ルートレイアウトでの基本設定

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://hanshin-branch.org'),
  title: {
    template: '%s | 兵庫ひきこもり相談支援センター 阪神ブランチ',
    default: '兵庫ひきこもり相談支援センター 阪神ブランチ',
  },
  description: 'ひきこもりの当事者やご家族への支援を行っています',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://hanshin-branch.org',
    siteName: '兵庫ひきこもり相談支援センター 阪神ブランチ',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'サイトのロゴ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 4. レイアウトシステム

#### ルートレイアウト

```typescript
// app/layout.tsx
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="h-full">
      <body className="flex h-full flex-col leading-relaxed antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

#### ネストしたレイアウト

```typescript
// app/news/layout.tsx
export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="news-layout">
      <aside className="news-sidebar">
        <NewsNavigation />
      </aside>
      <div className="news-content">
        {children}
      </div>
    </div>
  );
}
```

#### エラーハンドリング

```typescript
// app/news/error.tsx
'use client';

export default function NewsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-container max-w-md mx-auto mt-8 p-6 bg-red-50 rounded-lg">
      <h2 className="text-lg font-semibold text-red-800 mb-2">
        ニュースの読み込みに失敗しました
      </h2>
      <p className="text-red-600 mb-4">{error.message}</p>
      <button 
        onClick={reset}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        再試行
      </button>
    </div>
  );
}

// app/news/loading.tsx
export default function NewsLoading() {
  return (
    <div className="loading-container flex justify-center items-center min-h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      <p className="ml-4 text-gray-600">ニュースを読み込み中...</p>
    </div>
  );
}
```

### 5. パフォーマンス最適化

#### Streaming SSR の活用

```typescript
// app/news/page.tsx
import { Suspense } from 'react';

export default function NewsPage() {
  return (
    <div>
      <h1>最新ニュース</h1>
      <Suspense fallback={<NewsListSkeleton />}>
        <NewsList />
      </Suspense>
      <Suspense fallback={<PopularNewsSkeleton />}>
        <PopularNews />
      </Suspense>
    </div>
  );
}

// スケルトンコンポーネントの例
function NewsListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
```

---

## 移行時の課題と対処法

### 主要な課題

#### 1. データフェッチング方式の変更

**課題**: `getStaticProps` → Server Components + fetch  
**対処法**: 
```typescript
// Before (Pages Router)
export async function getStaticProps() {
  const newsItems = await client.get({ endpoint: 'news' });
  return { props: { newsItems } };
}

// After (App Router)
export default async function NewsPage() {
  const newsItems = await fetchNewsItems();
  return <NewsList items={newsItems} />;
}
```

#### 2. クライアントサイド状態管理

**課題**: places-and-groups.tsx のフィルタリング状態  
**対処法**: Server Component + Client Component の組み合わせ
```typescript
// app/places-and-groups/page.tsx
export default async function PlacesAndGroupsPage() {
  const groups = await fetchGroups();
  
  return (
    <div>
      <h1>居場所とグループ情報</h1>
      <PlacesClient groups={groups} />
    </div>
  );
}

// components/PlacesClient.tsx
"use client";
export default function PlacesClient({ groups }: { groups: Group[] }) {
  const [selectedCity, setSelectedCity] = useState('all');
  // フィルタリングロジック
}
```

#### 3. アニメーション実装の調整

**課題**: Framer Motion の Server Components 対応  
**対処法**: `template.tsx` または Client Components での実装
```typescript
// app/template.tsx (ページ遷移アニメーション)
'use client';
import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

#### 4. SEO・メタデータ管理

**課題**: Layout での Head 設定 → Metadata API  
**対処法**: 新しい Metadata API の活用（上記参照）

### 互換性問題への対処

#### Framer Motion
- **Pages Router**: 完全対応
- **App Router**: 一部制限（ページ遷移アニメーション）
- **対策**: `template.tsx` または Client Components で実装

#### SWR
- **両方のルーターで使用可能**
- **App Router**: Client Components で使用

---

## 段階的移行戦略

### Phase 1: 基盤整備（2-3週間）

#### 目標
- App Router の基本構造構築
- レイアウトシステムの移行
- 静的ページの移行

#### 作業内容
1. **App Router ディレクトリ構造の構築**
   ```
   app/
   ├── layout.tsx         # ルートレイアウト
   ├── page.tsx          # トップページ
   ├── loading.tsx       # グローバルローディング
   ├── error.tsx         # グローバルエラー
   ├── not-found.tsx     # 404ページ
   └── globals.css       # グローバルスタイル
   ```

2. **静的ページの移行**
   - `faq.tsx` → `app/faq/page.tsx`
   - `flow.tsx` → `app/flow/page.tsx`
   - `inquiry.tsx` → `app/inquiry/page.tsx`
   - `privacy-policy.tsx` → `app/privacy-policy/page.tsx`
   - `reference.tsx` → `app/reference/page.tsx`
   - `sitemap.tsx` → `app/sitemap/page.tsx`

3. **レイアウトコンポーネントの調整**
   - `components/layout.tsx` の App Router 対応
   - Metadata API への移行
   - next-themes の App Router 対応

#### 完了基準
- 静的ページが App Router で正常に動作
- レイアウトが正しく適用される
- SEO メタデータが正しく設定される

### Phase 2: データ連携ページの移行（3-4週間）

#### 目標
- microCMS 連携ページの移行
- SSG の新しい実装方式への移行

#### 作業内容

1. **microCMS クライアントの App Router 対応**
   ```typescript
   // lib/microcms-app-router.ts
   export async function fetchNewsItems() {
     const response = await fetch(
       `${process.env.MICROCMS_SERVICE_DOMAIN}/api/v1/news`,
       {
         headers: {
           'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY!,
         },
         next: { revalidate: 3600, tags: ['news'] }
       }
     );
     
     if (!response.ok) {
       throw new Error('Failed to fetch news');
     }
     
     return response.json();
   }
   ```

2. **ニュース関連ページの移行**
   - `news.tsx` → `app/news/page.tsx`
   - `news/[id].tsx` → `app/news/[id]/page.tsx`
   - `getStaticProps` → Server Components
   - `getStaticPaths` → `generateStaticParams`

3. **ユーザーコメントページの移行**
   - `user-comments.tsx` → `app/user-comments/page.tsx`

4. **トップページの移行**
   - `index.tsx` → `app/page.tsx`
   - 複雑なデータフェッチングの移行

#### 完了基準
- microCMS からのデータ取得が正常に動作
- SSG が正しく動作
- 動的ルーティングが機能する

### Phase 3: 複雑な機能の移行（4-5週間）

#### 目標
- 最も複雑な places-and-groups.tsx の移行
- アニメーション機能の移行
- パフォーマンス最適化

#### 作業内容

1. **places-and-groups の移行**
   ```typescript
   // app/places-and-groups/page.tsx
   export default async function PlacesAndGroupsPage() {
     const groups = await fetchGroups();
     
     return (
       <div>
         <h1>居場所とグループ情報</h1>
         <Suspense fallback={<PlacesLoading />}>
           <PlacesClient groups={groups} />
         </Suspense>
       </div>
     );
   }
   
   // components/PlacesClient.tsx
   "use client";
   export default function PlacesClient({ groups }: { groups: Group[] }) {
     const [selectedCity, setSelectedCity] = useState('all');
     const [filteredGroups, setFilteredGroups] = useState(groups);
     
     // フィルタリングロジック、無限スクロール実装
   }
   ```

2. **アニメーション実装の最適化**
   - Framer Motion の適切な実装
   - パフォーマンスの最適化

3. **エラーハンドリングの改善**
   - `error.tsx` の各ページでの実装
   - `loading.tsx` の最適化

#### 完了基準
- 全ての複雑な機能が App Router で動作
- パフォーマンスが Pages Router 以上
- エラーハンドリングが適切に動作

### Phase 4: 最終調整・クリーンアップ（1-2週間）

#### 目標
- Pages Router の完全削除
- 最終的な最適化と検証

#### 作業内容

1. **Pages Router の削除**
   - `pages/` ディレクトリの削除（`pages/api/` は保持）
   - 不要なファイルの整理

2. **最終検証**
   - 全ページの動作確認
   - SEO 設定の確認
   - パフォーマンステスト

3. **ドキュメント更新**
   - README.md の更新
   - CLAUDE.md の更新

#### 完了基準
- Pages Router が完全に削除されている
- 全機能が正常に動作
- ドキュメントが最新状態

---

## 実装パターン集

### 1. 基本的なページ移行パターン

#### 静的ページ
```typescript
// Before: pages/faq.tsx
export default function FAQ() {
  return <div>FAQ Content</div>;
}

// After: app/faq/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'よくある質問',
  description: 'ひきこもり相談に関してよくお寄せいただく質問をまとめました',
};

export default function FAQ() {
  return <div>FAQ Content</div>;
}
```

#### SSG ページ
```typescript
// Before: pages/news.tsx
export async function getStaticProps() {
  const newsItems = await client.get({ endpoint: 'news' });
  return { props: { newsItems }, revalidate: 3600 };
}

export default function News({ newsItems }: { newsItems: NewsItem[] }) {
  return <NewsList items={newsItems} />;
}

// After: app/news/page.tsx
export const revalidate = 3600;

export default async function News() {
  const newsItems = await fetchNewsItems();
  return <NewsList items={newsItems} />;
}
```

### 2. 動的ルーティングパターン

```typescript
// Before: pages/news/[id].tsx
export async function getStaticPaths() {
  const data = await client.get({ endpoint: 'news' });
  const paths = data.contents.map((item) => ({ params: { id: item.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const newsItem = await client.get({ 
    endpoint: 'news', 
    contentId: params.id 
  });
  return { props: { newsItem } };
}

// After: app/news/[id]/page.tsx
export async function generateStaticParams() {
  const data = await fetchNewsItems();
  return data.contents.map((item) => ({ id: item.id }));
}

export default async function NewsDetail({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const newsItem = await fetchNewsItem(id);
  
  if (!newsItem) {
    notFound();
  }
  
  return <NewsDetailContent item={newsItem} />;
}
```

### 3. クライアントサイド状態管理パターン

```typescript
// Server Component でデータ取得
// app/places-and-groups/page.tsx
export default async function PlacesAndGroupsPage() {
  const groups = await fetchGroups();
  
  return (
    <div>
      <h1>居場所とグループ情報</h1>
      <PlacesClient groups={groups} />
    </div>
  );
}

// Client Component で状態管理
// components/PlacesClient.tsx
"use client";
import { useState, useMemo } from 'react';

interface Props {
  groups: Group[];
}

export default function PlacesClient({ groups }: Props) {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const filteredGroups = useMemo(() => {
    return groups.filter(group => {
      const cityMatch = selectedCity === 'all' || group.city === selectedCity;
      const searchMatch = searchTerm === '' || 
        group.name.includes(searchTerm) || 
        group.description.includes(searchTerm);
      return cityMatch && searchMatch;
    });
  }, [groups, selectedCity, searchTerm]);
  
  return (
    <div>
      <div className="filters">
        <CityFilter 
          selectedCity={selectedCity} 
          onCityChange={setSelectedCity} 
        />
        <SearchInput 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
      </div>
      <GroupList groups={filteredGroups} />
    </div>
  );
}
```

### 4. エラーハンドリングパターン

```typescript
// app/news/error.tsx
'use client';

export default function NewsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-page">
      <h2>ニュースの読み込みでエラーが発生しました</h2>
      <details>
        <summary>エラー詳細</summary>
        <pre>{error.message}</pre>
      </details>
      <button onClick={reset}>再試行</button>
    </div>
  );
}

// app/news/loading.tsx
export default function NewsLoading() {
  return (
    <div className="loading-state">
      <div className="spinner" />
      <p>ニュースを読み込み中...</p>
    </div>
  );
}
```

---

## チェックリスト

### Phase 1: 基盤整備
- [ ] `app/` ディレクトリの作成
- [ ] `app/layout.tsx` の実装
- [ ] `app/page.tsx` の基本実装
- [ ] 静的ページの移行完了
  - [ ] `app/faq/page.tsx`
  - [ ] `app/flow/page.tsx`
  - [ ] `app/inquiry/page.tsx`
  - [ ] `app/privacy-policy/page.tsx`
  - [ ] `app/reference/page.tsx`
  - [ ] `app/sitemap/page.tsx`
- [ ] エラーページの実装
  - [ ] `app/not-found.tsx`
  - [ ] `app/error.tsx`
- [ ] Metadata API の基本設定
- [ ] CSS/スタイリングの動作確認

### Phase 2: データ連携
- [ ] microCMS App Router 対応関数の実装
- [ ] ニュース関連ページの移行
  - [ ] `app/news/page.tsx`
  - [ ] `app/news/[id]/page.tsx`
  - [ ] `generateStaticParams` の実装
- [ ] ユーザーコメントページの移行
  - [ ] `app/user-comments/page.tsx`
- [ ] トップページの移行
  - [ ] `app/page.tsx` の完全実装
- [ ] 動的メタデータの設定
- [ ] キャッシング戦略の実装

### Phase 3: 複雑な機能
- [ ] places-and-groups の移行
  - [ ] `app/places-and-groups/page.tsx`
  - [ ] フィルタリング機能の Client Component 実装
  - [ ] 無限スクロールの動作確認
- [ ] アニメーション機能の移行
  - [ ] Framer Motion の適切な実装
  - [ ] `app/template.tsx` の検討・実装
- [ ] パフォーマンス最適化
  - [ ] Streaming SSR の活用
  - [ ] Suspense の適切な実装
- [ ] 各ページでのエラーハンドリング実装

### Phase 4: 最終調整
- [ ] Pages Router の削除
  - [ ] `pages/` ディレクトリの削除（API routes 除く）
  - [ ] 不要な依存関係の整理
- [ ] 全機能の動作確認
  - [ ] 各ページの表示確認
  - [ ] 動的ルーティングの確認
  - [ ] フォーム動作の確認
  - [ ] SEO メタデータの確認
- [ ] パフォーマンステスト
  - [ ] Lighthouse スコアの確認
  - [ ] ページ読み込み速度の確認
- [ ] ドキュメント更新
  - [ ] README.md の更新
  - [ ] CLAUDE.md の更新
  - [ ] 移行履歴の記録

### 品質確認
- [ ] TypeScript エラーゼロ
- [ ] Biome チェック通過
- [ ] ビルドエラーゼロ
- [ ] 全ページの動作確認
- [ ] モバイル表示の確認
- [ ] アクセシビリティの確認
- [ ] SEO 設定の確認

---

## 参考リソース

### 公式ドキュメント
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Next.js Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [React Server Components](https://react.dev/reference/react/use-client)

### プロジェクト固有リソース
- [microCMS API リファレンス](https://document.microcms.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

**最終更新**: 2025-06-27（当時の計画書としての最終更新）  
**移行完了**: 2026-05-18（pages/ 物理削除をもって完了、[docs/logs/2026-05-18_upgrade-next16-react19.md](./logs/2026-05-18_upgrade-next16-react19.md) 参照）