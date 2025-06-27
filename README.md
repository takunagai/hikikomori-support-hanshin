# 兵庫ひきこもり相談支援センター 阪神ブランチ

ひきこもりの当事者やご家族への支援を目的とした情報提供・相談窓口サイトです。

[公式サイト](https://hanshin-branch.org)

## ✅ プロジェクト状況

- **App Router 完全移行済み** - モダンなNext.jsアーキテクチャ
- **定数管理システム導入** - マジックナンバー排除
- **環境変数型安全性向上** - 実行時バリデーション
- **コンポーネント統合開始** - 重複排除と品質向上
- **開発基盤強化** - 効率的な開発環境

## 主な機能

- 支援情報の提供
- よくある質問（FAQ）
- ニュースと最新情報（microCMS連携）
- 場所とグループ情報
- お問い合わせフォーム
- プライバシーポリシー
- ダークモード対応（実装途中）
- アクセシビリティ対応（WAI-ARIA準拠）

## 技術スタック

### フロントエンド基盤

- **Next.js 15.3.4** ✅ **App Router完全移行済み**
- **React 18.2.0**
- **TypeScript** (strictモード有効)

### UI/スタイリング

- **Tailwind CSS 3.4.17** ✅ **App Router対応済み**
  - `@tailwindcss/typography`: マークダウンスタイリング
  - `@tailwindcss/forms`: フォーム要素のスタイリング
  - ~~@tailwindcss/aspect-ratio~~: (Tailwind CSS 3.4以降は組み込み)
  - ~~@tailwindcss/line-clamp~~: (Tailwind CSS 3.3以降は組み込み)
- **Framer Motion 10.18.0**: アニメーション（必要最小限で使用）
- **Radix UI**: アクセシブルなUIコンポーネント
- **React Icons 4.12.0**: アイコンライブラリ
- **next-themes 0.2.1**: ダークモード対応（実装途中）

### データ管理/API

- **microCMS** ✅ **型安全性向上済み**
  - App Router対応クライアント
  - 環境変数の型安全管理
  - Next.js 15.3.4キャッシュ機能活用
- **date-fns**: 日付処理
- **DOMPurify**: HTMLサニタイズ

### 開発基盤システム ✅

- **定数管理**: `lib/constants.ts` - アプリケーション全体の設定値を一元管理
- **環境変数管理**: `lib/env.ts` - 型安全な環境変数アクセス
- **統合コンポーネント**: 重複排除と品質向上（進行中）
- **Biome**: リンター/フォーマッター

### セキュリティ対策

- DOMPurifyによるHTMLコンテンツのサニタイズ
- Content Security Policy (CSP) の実装
- HTTPSの強制
- クロスサイトスクリプティング（XSS）対策
- セキュアなヘッダー設定
- **環境変数の型安全管理と実行時バリデーション** ✅

### SEOとソーシャルメディア対応

- Twitter Card対応
- 構造化データ（JSON-LD）
- カスタムメタタグ
- SEOフレンドリーなURL構造
- 適切なHTMLセマンティクス
- モバイルフレンドリー対応
- Core Web Vitalsの最適化

## プロジェクト構成

### ディレクトリ構造 ✅

```
.
├── app/                # App Router のページコンポーネント（メイン）
│   ├── page.tsx        # トップページ
│   ├── faq/           # よくある質問
│   ├── news/          # ニュース関連
│   │   ├── page.tsx   # ニュース一覧
│   │   └── [id]/      # ニュース詳細（動的ルート）
│   ├── flow/          # 相談の流れ
│   ├── user-comments/ # ご利用者様の声
│   ├── reference/     # 相談窓口
│   ├── inquiry/       # お問い合わせ
│   ├── sitemap/       # サイトマップ
│   ├── privacy-policy/ # プライバシーポリシー
│   ├── layout.tsx     # ルートレイアウト
│   ├── loading.tsx    # ローディングUI
│   ├── error.tsx      # エラーUI
│   ├── not-found.tsx  # 404ページ
│   └── template.tsx   # ページテンプレート
├── pages/             # Pages Router（レガシー、段階的削除予定）
├── components/        # 再利用可能なUIコンポーネント
│   ├── FormattedDate.tsx    # ✅ 統合済み
│   ├── AppRouter*.tsx       # App Router用コンポーネント
│   └── [legacy].tsx         # レガシーコンポーネント
├── lib/               # ユーティリティ関数とシステム
│   ├── constants.ts   # ✅ アプリケーション定数
│   ├── env.ts         # ✅ 環境変数管理
│   ├── microcms-app-router.ts # microCMS クライアント（App Router用）
│   └── client.ts      # microCMS クライアント（レガシー）
├── types/             # TypeScript型定義
├── styles/            # スタイリング関連
├── public/            # 静的アセット
└── docs/              # ✅ プロジェクトドキュメント
    ├── app-router-migration-guide.md
    └── logs/          # 作業ログ
        └── 2025-06-28_refactor.md
```

### 主要コンポーネント

#### 統合済みコンポーネント ✅

- **FormattedDate**: 日付表示（重複排除済み）

#### App Router用コンポーネント

- **レイアウト**: AppRouterHeader, AppRouterFooter, AppRouterInquiryContent
- **UI要素**: AppRouterLink, AppRouterAccordion, AppRouterNewsSection
- **ナビゲーション**: AppRouterNavbar, AppRouterSiteLogo

#### レガシーコンポーネント（段階的削除予定）

- Pages Router用の重複コンポーネント

## 特徴的な実装

### アーキテクチャ ✅

- **Server Components中心**: パフォーマンス最適化
- **Next.js 15.3.4キャッシュ機能**: 効率的なデータフェッチング
- **段階的静的再生成**: リアルタイム性とパフォーマンスの両立

### 開発基盤 ✅

#### 定数管理システム

```typescript
import { NEWS_CONFIG, CONTACT_CONFIG } from '../lib/constants'

// 設定値の一元管理
const newsLimit = NEWS_CONFIG.FETCH_LIMIT
const contactPhone = CONTACT_CONFIG.PHONE_NUMBER
```

#### 環境変数管理

```typescript
import { microCMSConfig } from '../lib/env'

// 型安全な環境変数アクセス
const apiClient = createClient({
  serviceDomain: microCMSConfig.serviceDomain,
  apiKey: microCMSConfig.apiKey
})
```

### UI/UX

- Server Componentsによる高速レンダリング
- レスポンシブデザイン
- アクセシブルなUI（WAI-ARIA準拠）
- 適切なSEO最適化

### パフォーマンス

- App Routerによる最適化
- Server Componentsの活用
- 画像の最適化
- 必要最小限のアニメーション

## 開発環境のセットアップ

### 1. リポジトリのクローン

```bash
git clone [repository-url]
cd hikikomori-support-hanshin
```

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. 環境変数の設定 ✅

`.env.local`ファイルをプロジェクトルートに作成し、以下の環境変数を設定：

```env
# microCMS設定（必須）
SERVICE=your-microcms-service-domain
APIKEY=your-microcms-api-key

# サイト設定（オプション）
NEXT_PUBLIC_SITE_TITLE=兵庫ひきこもり相談支援センター 阪神ブランチ
```

**注意**: 環境変数は`lib/env.ts`で型安全性がチェックされます。設定不備がある場合は詳細なエラーメッセージが表示されます。

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで <http://localhost:3000> を開いて確認できます。

## 主要なページ構成 ✅

### App Router ページ（メイン）

- `/`: トップページ
- `/faq`: よくある質問
- `/inquiry`: お問い合わせ
- `/news`: ニュース一覧
- `/news/[id]`: ニュース詳細
- `/flow`: 相談の流れ
- `/user-comments`: ご利用者様の声
- `/reference`: 相談窓口
- `/sitemap`: サイトマップ
- `/privacy-policy`: プライバシーポリシー

### レガシーページ（段階的削除予定）

- `/places-and-groups`: 場所とグループ（Pages Router）

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
# フォーマットとリントを同時に実行（自動修正あり）
npm run check

# 個別実行
npm run format  # フォーマット
npm run lint    # リント
```

## 開発ガイドライン

### 必須開発原則 ✅

#### 1. 定数管理

**すべての設定値は `lib/constants.ts` で管理**

```typescript
// ✅ 正しい使用例
import { NEWS_CONFIG } from '../lib/constants'
const limit = NEWS_CONFIG.FETCH_LIMIT

// ❌ 避けるべき
const limit = 20  // マジックナンバー
```

#### 2. 環境変数

**`lib/env.ts` 経由での型安全なアクセス必須**

```typescript
// ✅ 正しい使用例
import { microCMSConfig } from '../lib/env'
const apiKey = microCMSConfig.apiKey

// ❌ 避けるべき
const apiKey = process.env.APIKEY  // 型安全性なし
```

#### 3. 統合コンポーネント

**統合済みコンポーネントの使用必須**

```typescript
// ✅ 正しい使用例
import FormattedDate from './FormattedDate'

// ❌ 避けるべき（廃止済み）
import AppRouterFormattedDate from './AppRouterFormattedDate'
```

### コーディング規約

#### 基本方針

- TypeScriptの型安全性を最大限活用
- Server Componentsの適切な使用
- アクセシビリティを考慮したマークアップ
- パフォーマンスを意識した実装

#### 命名規則

- コンポーネント: PascalCase（例：`FormattedDate`）
- 関数・変数: camelCase（例：`getUserData`）
- 定数: SNAKE_CASE（例：`NEWS_CONFIG.FETCH_LIMIT`）
- ファイル名: コンポーネントはPascalCase、その他はkebab-case

#### コードスタイル

- インデント: 2スペース
- 引用符: シングルクォート
- セミコロン: 必要な場合のみ（ASI準拠）
- 最大行長: 100文字
- コンポーネントのprops型は明示的に定義

### Biomeによるコード品質管理

プロジェクトではBiomeを使用してコードの品質を管理しています：

```bash
# 推奨: フォーマットとリントを同時実行
npm run check

# 個別実行
npm run format  # コードのフォーマット
npm run lint    # リント（コードの静的解析）
```

#### 主なルール

- 未使用の変数は禁止（error）
- console.logは警告（warn）
- non-null assertion operatorは許可
- インポートの自動整理を有効化
- コードフォーマットの自動適用

### Git運用

- 機能ごとのブランチ作成
- 論理的なステップに分けたコミット
- コミットメッセージの規約に従う
- プルリクエストによるコードレビュー

## 完了済み改善 ✅

### アーキテクチャの大幅改善

- ✅ **Pages Router から App Router への完全移行**
  - Server Components の活用によるパフォーマンス改善
  - 最新のルーティング構造の実現
  - レイアウトとテンプレートの最適化
  - データフェッチングの改善

### 開発基盤の強化

- ✅ **定数管理システムの導入**
  - マジックナンバーの完全排除
  - 設定値の一元管理
  - 保守性の大幅向上

- ✅ **環境変数の型安全性向上**
  - 実行時バリデーション
  - 詳細なエラーメッセージ
  - 設定ミスの早期発見

- ✅ **コンポーネント統合（第1段階）**
  - FormattedDateコンポーネント統合完了
  - 重複排除によるバンドルサイズ削減
  - 品質向上と保守性改善

### 開発環境の整理

- ✅ **Tailwind設定の最適化**
  - App Routerディレクトリの対応
  - スタイル処理の改善

- ✅ **ドキュメント体系化**
  - 作業ログの体系的管理
  - 技術ドキュメントの整理

## 進行中の改善

### コンポーネント統合（第2段階）

優先順位順：
1. **SiteLogo** - Header内での使用、統合が容易
2. **NavbarCollapseButton** - アクセシビリティ改善版を採用
3. **Link** - 外部リンク機能の統合が必要

### その他の改善点

- [ ] ダークモード実装の完了
- [ ] OG画像の動的生成（@vercel/og）
- [ ] パフォーマンス最適化の継続
- [ ] テストの追加
- [ ] アクセシビリティの更なる向上

## トラブルシューティング

### 環境変数エラー

```bash
Error: 以下の環境変数が設定されていません: SERVICE, APIKEY

対処法:
1. .env.local ファイルを作成
2. 必要な環境変数を設定
3. サーバーを再起動
```

### コンポーネント統合エラー

```bash
Module not found: Can't resolve './AppRouterFormattedDate'

対処法:
import FormattedDate from './FormattedDate'  # 統合版を使用
```

### Tailwindスタイル未適用

確認事項:
1. app/ ディレクトリがtailwind.config.jsのcontentに含まれているか
2. クラス名が正しく記述されているか
3. ビルドキャッシュをクリアしてみる

## ドキュメント

- **開発ガイド**: [CLAUDE.md](./CLAUDE.md) - 包括的な開発ガイドライン
- **移行ガイド**: [docs/app-router-migration-guide.md](./docs/app-router-migration-guide.md)
- **改善ログ**: [docs/logs/2025-06-28_refactor.md](./docs/logs/2025-06-28_refactor.md)

## ライセンス

Copyright (c) 2025 兵庫ひきこもり相談支援センター 阪神ブランチ

All rights reserved.

このプロジェクトのソースコードおよびコンテンツの全ての権利は兵庫ひきこもり相談支援センター 阪神ブランチに帰属します。
許可なく複製、改変、再配布することを禁じます。

---

**最終更新**: 2025-06-28 - App Router移行完了・包括的改善実施後