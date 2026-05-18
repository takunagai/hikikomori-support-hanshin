# 兵庫ひきこもり相談支援センター 阪神ブランチ

ひきこもりの当事者やご家族への支援を目的とした情報提供・相談窓口サイトです。

[公式サイト](https://hanshin-branch.org)

## プロジェクト状況

- **Next.js 16 + React 19 ベース** — 2026-05 に Next.js 15.3 → 16.2、React 18.2 → 19.2 へ刷新
- **App Router のみ** — Pages Router は物理削除済み、AppRouter プレフィックスも除去
- **React Compiler 有効化** — 自動メモ化
- **microCMS Webhook 連動** — 記事更新が `revalidateTag(tag, 'max')` で即反映
- **定数管理 / 環境変数型安全** — `lib/constants.ts`, `lib/env.ts`

## 主な機能

- 支援情報の提供
- よくある質問（FAQ）
- ニュースと活動報告（microCMS 連携、お知らせ / 活動報告を分離表示）
- 居場所・親の会の情報（市町村フィルタ + リーフレット拡大表示）
- お問い合わせフォーム
- プライバシーポリシー
- アクセシビリティ対応（WAI-ARIA 準拠）

## 技術スタック

### フロントエンド基盤

- **Next.js 16.2.6** (App Router, React Compiler 有効)
- **React 19.2.6**
- **TypeScript 5.9.3** (strict モード)

### UI / スタイリング

- **Tailwind CSS 3.4.17** (v4 移行は別フェーズで検討)
  - `@tailwindcss/typography` — マークダウンスタイリング
  - `@tailwindcss/forms` — フォーム要素
- **motion 12.x** (旧 framer-motion から移行、`motion/react` から import)
- **Radix UI** (`@radix-ui/react-dialog`, `@radix-ui/react-visually-hidden`)
- **React Icons 5.x**
- **next-themes 0.4.6** (ダークモード基盤、UI 実装は保留中)

### データ管理 / API

- **microCMS** — ヘッドレス CMS
  - エンドポイント: `news`, `group`, `user-comments`
  - `lib/microcms-app-router.ts` で自前 fetch + cache tags
  - `app/api/revalidate/route.ts` で Webhook を受けて `revalidateTag(tag, 'max')`
- **date-fns 4.x** — 日付処理
- **isomorphic-dompurify** — Server Component で HTML サニタイズ

### 開発基盤

- **Biome 2.4.15** — リンター/フォーマッター
- `lib/constants.ts` — 設定値の一元管理
- `lib/env.ts` — 環境変数の型安全アクセス

## ディレクトリ構造

```
.
├── app/                # App Router (全ページがここに集約)
│   ├── page.tsx        # トップページ
│   ├── api/
│   │   ├── og/         # OG画像の動的生成
│   │   └── revalidate/ # microCMS Webhook で revalidateTag を呼ぶ
│   ├── faq/            # よくある質問
│   ├── news/           # お知らせ / 活動報告
│   │   ├── page.tsx    # ニュース一覧
│   │   └── [id]/       # ニュース詳細 (async params 対応)
│   ├── flow/           # 相談の流れ
│   ├── user-comments/  # ご利用者様の声
│   ├── reference/      # 相談窓口
│   ├── inquiry/        # お問い合わせ
│   ├── sitemap/        # サイトマップ
│   ├── privacy-policy/ # プライバシーポリシー
│   ├── places-and-groups/  # 居場所・親の会の情報
│   │   ├── page.tsx               # Server Component (データ取得)
│   │   └── PlacesAndGroupsClient.tsx  # Client (フィルタ UI)
│   ├── layout.tsx      # ルートレイアウト
│   ├── loading.tsx     # ローディングUI
│   ├── error.tsx       # エラーUI
│   ├── not-found.tsx   # 404 ページ
│   └── template.tsx    # ページテンプレート (motion フェード遷移)
├── components/         # 再利用可能な UI コンポーネント
│   ├── Header.tsx, Footer.tsx, Navbar.tsx 等   # サイト共通レイアウト
│   ├── HeroSection.tsx, NewsSection.tsx 等     # トップページ用セクション
│   ├── NewsContent.tsx     # Server Component で SSR サニタイズ
│   ├── FormattedDate.tsx   # 日付表示
│   ├── DropdownMenu.tsx    # 汎用ドロップダウン
│   ├── Dialog.tsx          # Radix Dialog ラッパ
│   └── providers/ThemeProvider.tsx
├── lib/                # ユーティリティ
│   ├── constants.ts             # アプリケーション定数
│   ├── env.ts                   # 環境変数管理
│   └── microcms-app-router.ts   # microCMS クライアント
├── types/              # TypeScript 型定義
├── styles/             # globals.css と every-layout.css のみ
├── public/             # 静的アセット
└── docs/               # プロジェクトドキュメント
    ├── app-router-migration-guide.md  # 過去の移行ガイド (アーカイブ)
    ├── MicroCMS と NextJS の連携について.md
    ├── NextJS Page Router から App Router への移行.md
    └── logs/
        ├── 2025-06-28_refactor.md
        └── 2026-05-18_upgrade-next16-react19.md
```

## セキュリティ対策

- isomorphic-dompurify による HTML サニタイズ（Server Component で実行、Client JS 削減）
- Content Security Policy (CSP)
- HTTPS 強制
- 環境変数の型安全管理と実行時バリデーション (`lib/env.ts`)
- Webhook シークレット (`MICROCMS_WEBHOOK_SECRET`) でリクエスト検証

## SEO / メタデータ

- `app/layout.tsx` で Next.js Metadata API による集中管理（Open Graph, Twitter Card, robots 等）
- `app/api/og/` で OG 画像の動的生成
- 各 `page.tsx` で `metadata` export による個別ページタイトル / description

## 開発環境のセットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/takunagai/hikikomori-support-hanshin.git
cd hikikomori-support-hanshin
```

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local` をプロジェクトルートに作成：

```env
# microCMS設定（必須）
SERVICE=your-microcms-service-domain
APIKEY=your-microcms-api-key

# microCMS Webhook 用シークレット（任意、Webhook を運用する場合）
MICROCMS_WEBHOOK_SECRET=your-shared-secret

# サイト設定（オプション）
NEXT_PUBLIC_SITE_TITLE=兵庫ひきこもり相談支援センター 阪神ブランチ
```

`lib/env.ts` で実行時バリデーションされます。

### 4. 開発サーバーの起動

```bash
npm run dev          # 通常モード
npm run dev-turbo    # Turbopack モード
```

ブラウザで <http://localhost:3000> を開いて確認。

## ページ構成

すべて App Router で実装：

- `/` トップページ
- `/faq` よくある質問
- `/inquiry` お問い合わせ
- `/news` 活動報告一覧
- `/news/[id]` 活動報告詳細（SSG + ISR）
- `/flow` 相談の流れ
- `/user-comments` ご利用者様の声
- `/reference` 相談窓口
- `/sitemap` サイトマップ
- `/privacy-policy` プライバシーポリシー
- `/places-and-groups` 居場所・親の会の情報
- `/api/og` OG 画像動的生成
- `/api/revalidate` microCMS Webhook 受信

## デプロイ

### 本番用ビルド

```bash
npm run build
```

### 本番環境での起動

```bash
npm run start
```

### コード品質チェック

```bash
npm run check    # フォーマット + リント (自動修正)
npm run format   # フォーマットのみ
npm run lint     # リントのみ
```

## 開発ガイドライン

### 必須原則

#### 1. 定数管理

すべての設定値は `lib/constants.ts` で管理：

```typescript
import { NEWS_CONFIG, CONTACT_CONFIG } from '../lib/constants'

const limit = NEWS_CONFIG.FETCH_LIMIT
const phone = CONTACT_CONFIG.PHONE_NUMBER
```

利用可能な定数: `NEWS_CONFIG` / `CACHE_CONFIG` / `CONTACT_CONFIG` / `SITE_CONFIG` / `ANIMATION_CONFIG` / `UI_CONFIG` / `VALIDATION_CONFIG`

#### 2. 環境変数

`lib/env.ts` 経由でアクセス：

```typescript
import { microCMSConfig } from '../lib/env'

const apiKey = microCMSConfig.apiKey
const baseUrl = microCMSConfig.baseUrl
```

#### 3. microCMS データフェッチ

`lib/microcms-app-router.ts` の API オブジェクトを使用：

```typescript
import { newsApi, groupsApi } from '../lib/microcms-app-router'

// Server Component で直接 await
const { contents } = await newsApi.getAll({ limit: NEWS_CONFIG.FETCH_LIMIT })
const groups = await groupsApi.getAll()
```

### コーディング規約

- インデント: 2 スペース
- 引用符: シングルクォート
- セミコロン: ASI 準拠
- 最大行長: 100 文字
- コンポーネント: PascalCase
- 関数 / 変数: camelCase
- 定数: SCREAMING_SNAKE_CASE
- ファイル名: コンポーネントは PascalCase、その他は kebab-case

### Biome ルール

- 未使用変数 / import は error
- `console` は warn（`console.log` は許容、`console.error` 等は `// biome-ignore` で意図明示）
- インポート自動整理
- `public/`, `.next/`, `out/`, `node_modules/` は対象外

## 既知の残脆弱性

- `postcss < 8.5.10` (moderate, GHSA-qx2v-qp2m-jg93)
  - Next.js 16 内部の `node_modules/next/node_modules/postcss@8.4.31` 由来
  - 攻撃ベクトルは「攻撃者制御の CSS が PostCSS の Stringify を通る」場合の XSS。本プロジェクトでは流入経路なく、ビルド時のみ使用
  - 次回 Next.js リリースで自然解消予定。`npm audit fix --force` は厳禁（next@9.3.3 へのダウングレード提案）

## ドキュメント

- **詳細な開発ガイド**: [CLAUDE.md](./CLAUDE.md)
- **2026-05 アップグレードログ**: [docs/logs/2026-05-18_upgrade-next16-react19.md](./docs/logs/2026-05-18_upgrade-next16-react19.md)
- **App Router 移行ガイド (アーカイブ)**: [docs/app-router-migration-guide.md](./docs/app-router-migration-guide.md)
- **2025-06 リファクタリングログ**: [docs/logs/2025-06-28_refactor.md](./docs/logs/2025-06-28_refactor.md)

## ライセンス

Copyright (c) 2025 兵庫ひきこもり相談支援センター 阪神ブランチ

All rights reserved.

このプロジェクトのソースコードおよびコンテンツの全ての権利は兵庫ひきこもり相談支援センター 阪神ブランチに帰属します。許可なく複製、改変、再配布することを禁じます。

---

**最終更新**: 2026-05-18 — Next.js 16 + React 19 への包括的アップグレード完了後
