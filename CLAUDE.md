# hikikomori-support-hanshin プロジェクトガイド

## プロジェクト概要

**兵庫ひきこもり相談支援センター 阪神ブランチ** の公式Webサイト。ひきこもりの当事者やご家族への支援を目的とした情報提供・相談窓口サイトです。

### 対象地域

尼崎市、西宮市、芦屋市、伊丹市、宝塚市、川西市、三田市、川辺郡猪名川町

### 主な機能

- 支援情報の提供
- よくある質問（FAQ）
- ニュースと最新情報（microCMS連携）
- 場所とグループ情報
- お問い合わせフォーム
- プライバシーポリシー
- ダークモード対応（実装途中）
- アクセシビリティ対応

## 技術スタック

### フロントエンド基盤

- **Next.js 16.2.6** (App Router) ✅
- **React 19.2.6** (React Compiler 有効化)
- **TypeScript 5.9.3** (strictモード有効)

### UI/スタイリング

- **Tailwind CSS 3.4.17** (v4 移行は別フェーズで検討)
  - `@tailwindcss/typography`: マークダウンスタイリング
  - `@tailwindcss/forms`: フォーム要素のスタイリング
- **motion 12.x** (旧 framer-motion から移行、`motion/react` から import)
- **Radix UI** (`@radix-ui/react-dialog`, `@radix-ui/react-visually-hidden`)
- **React Icons 5.x**: アイコンライブラリ

### データ管理/API

- **microCMS**: ヘッドレスCMS
  - エンドポイント: `news`, `group`, `user-comments`
  - 自前 fetch (`lib/microcms-app-router.ts`) で `revalidate` / `tags` キャッシュ制御
  - Webhook → `app/api/revalidate/route.ts` で即時 `revalidateTag('...', 'max')`
- **date-fns 4.x**: 日付処理
- **isomorphic-dompurify**: HTMLサニタイズ (Server Component 化済み)

### 開発ツール

- **Biome 2.4.15**: リンター/フォーマッター
- **PostCSS**: CSS処理 (Tailwind v3 対応のため継続)

## ディレクトリ構造

```
.
├── app/                # App Router (全ページがここに集約)
│   ├── page.tsx        # トップページ
│   ├── api/
│   │   ├── og/         # OG画像の動的生成
│   │   └── revalidate/ # microCMS Webhook で revalidateTag を呼ぶ
│   ├── faq/            # よくある質問
│   ├── news/           # ニュース関連（お知らせ / 活動報告）
│   │   ├── page.tsx    # ニュース一覧
│   │   └── [id]/       # ニュース詳細（動的ルート、async params 対応）
│   ├── flow/           # 相談の流れ
│   ├── user-comments/  # ご利用者様の声
│   ├── reference/      # 相談窓口
│   ├── inquiry/        # お問い合わせ
│   ├── sitemap/        # サイトマップ
│   ├── privacy-policy/ # プライバシーポリシー
│   ├── places-and-groups/  # 居場所・親の会の情報
│   │   ├── page.tsx    # Server Component (データ取得)
│   │   └── PlacesAndGroupsClient.tsx  # Client (フィルタ UI)
│   ├── layout.tsx      # ルートレイアウト
│   ├── loading.tsx     # ローディングUI
│   ├── error.tsx       # エラーUI
│   ├── not-found.tsx   # 404ページ
│   └── template.tsx    # ページテンプレート (motion でフェード遷移)
├── components/         # 再利用可能なUIコンポーネント (AppRouter プレフィックス除去済み)
│   ├── Header.tsx, Footer.tsx, Navbar.tsx 等  # サイト共通レイアウト
│   ├── HeroSection.tsx, NewsSection.tsx 等    # トップページ用セクション
│   ├── NewsContent.tsx     # Server Component で SSR サニタイズ
│   ├── FormattedDate.tsx   # 日付表示
│   ├── DropdownMenu.tsx    # 汎用ドロップダウン
│   ├── Dialog.tsx          # Radix Dialog ラッパ
│   └── providers/ThemeProvider.tsx  # next-themes
├── lib/                # ユーティリティ関数とシステム
│   ├── constants.ts            # アプリケーション定数
│   ├── env.ts                  # 環境変数管理
│   └── microcms-app-router.ts  # microCMS クライアント (自前 fetch + cache tags)
├── types/              # TypeScript型定義
├── styles/             # globals.css と every-layout.css のみ
├── public/             # 静的アセット
└── docs/               # プロジェクトドキュメント
    ├── app-router-migration-guide.md
    ├── MicroCMS と NextJS の連携について.md
    ├── NextJS Page Router から App Router への移行.md
    └── logs/           # 作業ログ
        ├── 2025-06-28_refactor.md
        └── 2026-05-18_upgrade-next16-react19.md
```

## 開発規約

### コーディングスタイル

#### 基本ルール

- インデント: 2スペース
- 引用符: シングルクォート
- セミコロン: 必要な場合のみ（ASI準拠）
- 最大行長: 100文字

#### 命名規則

- コンポーネント: PascalCase（例：`FormattedDate`）
- 関数・変数: camelCase（例：`getUserData`）
- 定数: SNAKE_CASE（例：`NEWS_CONFIG.FETCH_LIMIT`）
- ファイル名: コンポーネントはPascalCase、その他はkebab-case

#### TypeScript

- 型安全性を最大限活用
- コンポーネントのprops型は明示的に定義
- `any`型の使用は避ける
- 非nullアサーション演算子は許可（Biome設定）

### Biome設定

```bash
# コードフォーマット
npm run format

# リント
npm run lint

# フォーマット＋リント（自動修正付き）
npm run check
```

### コンポーネント設計

#### 原則

- 単一責任の原則を守る
- 再利用可能な単位で分割
- アクセシビリティを考慮（WAI-ARIA準拠）
- パフォーマンスを意識した実装

#### コンポーネント命名 ✅

AppRouter プレフィックスは完全除去済み。すべて素の名前で統一。
重複していた旧 Pages Router 用コンポーネントは Phase 7 で物理削除。

## 定数管理システム ✅

### 基本方針

**すべての設定値は `lib/constants.ts` で一元管理**

```typescript
import { NEWS_CONFIG, CONTACT_CONFIG, SITE_CONFIG } from '../lib/constants'

// ✅ 正しい使用例
const limit = NEWS_CONFIG.FETCH_LIMIT
const phone = CONTACT_CONFIG.PHONE_NUMBER

// ❌ 避けるべき
const limit = 20  // マジックナンバー
const phone = '050-3749-1227'  // ハードコード
```

### 利用可能な定数

- `NEWS_CONFIG`: ニュース表示設定（`FETCH_LIMIT`, `NEWS_PAGE_FETCH_LIMIT`, `DISPLAY_LIMIT`, `LEAFLET_DISPLAY_LIMIT`, `REPORT_STATUS`）
- `CACHE_CONFIG`: キャッシュ設定
- `CONTACT_CONFIG`: 連絡先情報
- `SITE_CONFIG`: サイト基本情報（`TITLE`, `ORGANIZATION`, `SUPPORTED_AREAS`）
- `ANIMATION_CONFIG`: アニメーション設定
- `UI_CONFIG`: UI設定
- `VALIDATION_CONFIG`: バリデーション設定

## 環境変数管理 ✅

### 型安全な環境変数

**必須**: `lib/env.ts` 経由でアクセス

```typescript
import { microCMSConfig, siteConfig } from '../lib/env'

// ✅ 正しい使用例
const apiKey = microCMSConfig.apiKey
const baseUrl = microCMSConfig.baseUrl

// ❌ 避けるべき
const apiKey = process.env.APIKEY  // 型安全性なし
```

### 設定ファイル

`.env.local` ファイルに以下を設定：

```env
# microCMS設定（必須）
SERVICE=your-microcms-service-domain
APIKEY=your-microcms-api-key

# microCMS Webhook 用シークレット（任意、設定時は管理画面側で同じ値を x-microcms-signature ヘッダに）
MICROCMS_WEBHOOK_SECRET=your-shared-secret

# サイト設定（オプション）
NEXT_PUBLIC_SITE_TITLE=兵庫ひきこもり相談支援センター 阪神ブランチ
```

## API連携

### microCMS

#### エンドポイント

- `news`: お知らせ情報
- `group`: 場所とグループ情報  
- `user-comments`: ご利用者様の声

#### データフェッチング

**App Router**: Server Components + Next.js 16 キャッシュ機能（`revalidate` / `tags`）。`newsApi.getAll({ filters })` で「お知らせ / 活動報告」を API 側でフィルタリング可能。microCMS Webhook 連動で `revalidateTag(tag, 'max')` による即時 stale-while-revalidate。

```typescript
import { newsApi } from '../lib/microcms-app-router'

// ✅ App Router での使用例
export default async function NewsPage() {
  const { contents } = await newsApi.getAll({ 
    limit: NEWS_CONFIG.FETCH_LIMIT 
  })
  return <NewsList news={contents} />
}
```

**レガシー**: SSG（getStaticProps）

- 段階的にApp Routerに移行予定

#### 型定義

- `/types/news.ts`: NewsItem型
- `/types/group.ts`: Group型
- `/types/user-comment.ts`: UserComment型

## セキュリティ対策

1. **HTMLサニタイズ**: DOMPurifyを使用
2. **CSP（Content Security Policy）**: 実装済み
3. **HTTPS強制**: 本番環境で有効
4. **XSS対策**: React標準機能＋追加対策
5. **セキュアなヘッダー**: next.config.jsで設定
6. **環境変数の型安全性**: 実行時バリデーション実装済み ✅

## デプロイ

### ビルド

```bash
npm run build
```

### 本番環境起動

```bash
npm run start
```

## 現在のタスクと進捗 ✅

### 完了済みタスク

#### ✅ App Router への移行

- **完了**: Pages Router から App Router への完全移行
- **完了**: Server Components の活用
- **完了**: データフェッチングの最適化
- **完了**: レイアウトシステムの改善

#### ✅ 開発基盤の強化

- **完了**: 環境変数の型安全性向上
- **完了**: 定数管理システムの導入
- **完了**: Tailwind設定でApp Router対応

#### ✅ Next.js 16 + React 19 への包括的アップグレード（2026-05）

- **完了**: Next.js 15.3.4 → 16.2.6、React 18.2 → 19.2、TypeScript 5.3 → 5.9
- **完了**: framer-motion → motion パッケージ移行 (`motion/react`)
- **完了**: date-fns 2 → 4 (ESM-first、flat 構造)
- **完了**: Biome 2.0 → 2.4、Radix UI / next-themes / react-icons を最新化
- **完了**: pages/ ディレクトリ完全削除、places-and-groups を App Router へ移植
- **完了**: AppRouter プレフィックス除去（17 ファイル）、素レガシー 13 ファイル削除
- **完了**: 未使用パッケージ 8 個削除 (swr, react-responsive, lightbox, sharp, classnames, microcms-js-sdk, dompurify, framer-motion)
- **完了**: DOMPurify を isomorphic-dompurify でサーバー側化 (NewsContent を Server Component に)
- **完了**: microCMS Webhook + `revalidateTag(tag, 'max')` 実装 (`app/api/revalidate/route.ts`)
- **完了**: React Compiler 有効化 (`next.config.js: reactCompiler: true`)
- **完了**: `app/news/[id]/page.tsx` の async params 対応

#### ✅ ニュース機能の拡張（2025-07）

- 「お知らせ」と「活動報告」の表示分離（`NEWS_CONFIG.REPORT_STATUS = 'レポート'` で判別）
- 汎用 `DropdownMenu` コンポーネントを導入、活動報告メニューをドロップダウン化
- OG画像の動的生成 (`app/api/og/`)

#### ✅ Biome 2.4 lint クリーン化（2026-05）

- biome.json `files.includes` に `!public, !.next, !out, !node_modules` 追加
  （`public/js/hs-ui.bundle.js` のサードパーティ JS 由来 1046 件のエラーが対象外に）
- 残った真のエラー 22 件 + 警告を個別修正（冗長 role 削除、button type 追加、装飾 SVG に aria-hidden、`Error` → `GlobalError` 等）
- 最終: 0 errors / 0 warnings

#### ✅ npm audit fix（2026-05）

- safe な範囲で間接依存 5 件解消（brace-expansion, glob, minimatch, picomatch, yaml）
- 残 1 件は `next` 内部の `postcss < 8.5.10`、Next.js のリリース待ち
  （詳細は [docs/logs/2026-05-18_upgrade-next16-react19.md](./docs/logs/2026-05-18_upgrade-next16-react19.md) 参照）

### 進行中タスク

- [ ] **Tailwind CSS v3 → v4 移行**（@apply 19 箇所の再構成、CSS-first 化、Safari 16.4+ 要件確認）
- [ ] **`lib/env.ts` に MICROCMS_WEBHOOK_SECRET ラッパ追加**（現状は API route で process.env 直接参照）
- [ ] **`<Suspense>` 境界の追加**（`app/page.tsx` で PPR 対応）
- [ ] **microCMS 管理画面で Webhook 登録**（URL `https://hanshin-branch.org/api/revalidate`、ヘッダ `x-microcms-signature`）
- [ ] ダークモード実装の完了
- [ ] パフォーマンス最適化（Lighthouse 計測 + バンドル解析）
- [ ] テストの追加（Vitest + Testing Library）
- [ ] アクセシビリティの向上
- [ ] `types/news.ts` の microCMS API スキーマからの自動生成
- [ ] `next` 内部 `postcss` 脆弱性の解消（Next.js リリース待ち）

## Claude Code効率化ガイド ✅

### 作業開始時の確認事項

1. **TodoRead**で現在のタスク状況を確認
2. **最新のCLAUDE.md**で変更内容を把握
3. **定数ファイル**（lib/constants.ts）で設定値を確認
4. **統合コンポーネント**の使用状況をチェック

### 効率的な作業フロー

#### 複雑なタスクの場合

1. **TodoWrite**でタスクを分解
2. **ultrathink**で実装方針を検討
3. **段階的実装**で影響範囲を限定
4. **論理的なコミット**で履歴を整理

#### 簡単なタスクの場合

- TodoWriteは不要、直接実装

### 推奨作業パターン

#### 新機能追加

```bash
1. 既存コードの確認（Read/Grep/Task）
2. 定数ファイルでの設定値確認
3. 統合コンポーネントの活用
4. 型定義の追加/更新
5. npm run check でコード品質確認
```

#### コンポーネント統合

```bash
1. Task toolで重複コンポーネント分析
2. 機能差分の詳細比較
3. 統合版コンポーネント作成
4. 使用箇所の段階的更新
5. 古いコンポーネントの削除
```

#### バグ修正

```bash
1. 現象の確認と再現
2. 関連コンポーネントの調査
3. 最小限の修正で対応
4. 影響範囲の確認
```

### ドキュメント管理

#### 作業ログ

- **場所**: `docs/logs/YYYY-MM-DD_作業内容.md`
- **内容**: 作業の詳細、改善効果、今後の課題
- **更新**: 大きな作業完了時に必ず作成

#### プロジェクトドキュメント

- **技術仕様**: `docs/` 直下
- **API仕様**: 必要に応じて `docs/api/`
- **移行ガイド**: `docs/app-router-migration-guide.md`

### ultrathink活用場面

#### 必須場面

- **アーキテクチャ設計**: システム全体に影響する変更
- **複雑なリファクタリング**: 複数コンポーネントに影響
- **パフォーマンス最適化**: 測定と分析が必要
- **セキュリティ対応**: 慎重な設計が必要

#### 推奨場面

- **新機能設計**: 要件が曖昧な場合
- **既存機能改善**: 影響範囲が広い場合
- **技術選定**: 複数の選択肢がある場合

## 重要な注意事項

### App Router完全移行済み ✅

- **現在**: App Routerのみ。`pages/` ディレクトリは Phase 7 で物理削除済み
- **新規開発**: 必ずApp Routerで実装

### microCMS連携

- **必須**: `lib/env.ts` 経由での型安全なアクセス
- **App Router**: Server Components でのデータフェッチング
- **キャッシュ**: Next.js 16 の `revalidate` / `tags` を活用、Webhook で `revalidateTag(tag, 'max')`

### スタイリング

- **優先**: Tailwind CSS（App Router対応済み）
- **レガシー**: CSS Modules は段階的に削除
- **カスタマイズ**: `tailwind.config.js` で定義

### アニメーション

- **使用**: Framer Motion（必要な場合のみ）
- **方針**: パフォーマンス重視、アクセシビリティ考慮
- **過度な使用回避**: 保守性を優先

## 開発フロー

### 1. 機能追加前

- 既存コードの確認（Task tool活用）
- 統合コンポーネントの確認
- 定数ファイルでの設定値確認
- 影響範囲の把握
- 型定義の追加/更新

### 2. 実装時

- TypeScriptの型安全性を活用
- 統合済みコンポーネントを使用
- 定数ファイルから設定値を取得
- Biomeによる自動フォーマット
- アクセシビリティの確認

### 3. 完了時

- `npm run check`でコード品質確認
- ビルドエラーの確認
- 動作確認（モバイル含む）
- 論理的なコミット分割
- 必要に応じて作業ログ作成

## トラブルシューティング

### よくある問題

#### 環境変数エラー

```bash
# エラー例
Error: 以下の環境変数が設定されていません: SERVICE, APIKEY

# 対処法
1. .env.local ファイルを作成
2. 必要な環境変数を設定
3. サーバーを再起動
```

#### コンポーネント import エラー

```bash
# エラー例 (旧名のまま import している場合)
Module not found: Can't resolve '../components/AppRouterHeader'

# 対処法 (AppRouter プレフィックスは Phase 8 で除去済み)
import Header from '../components/Header'
```

#### Tailwindスタイル未適用

```bash
# 確認事項
1. app/ ディレクトリがtailwind.config.jsのcontentに含まれているか
2. クラス名が正しく記述されているか
3. ビルドキャッシュをクリアしてみる
```

## リソース

- [公式サイト](https://hanshin-branch.org)
- [Next.js ドキュメント](https://nextjs.org/docs)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [microCMS ドキュメント](https://document.microcms.io/)
- [プロジェクト移行ガイド](./docs/app-router-migration-guide.md)
- [最新リファクタリングログ](./docs/logs/2025-06-28_refactor.md)

---

**最終更新**: 2026-05-18 - Next.js 16 + React 19 アップグレード、pages/ 完全消滅、AppRouter プレフィックス除去、React Compiler 有効化、Biome lint 完全クリーン化、npm audit fix まで完了
