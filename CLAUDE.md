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

- **Next.js 15.3.4** (App Router) ✅ **移行完了**
- **React 18.2.0**
- **TypeScript** (strictモード有効)

### UI/スタイリング

- **Tailwind CSS 3.4.17** ✅ **App Router対応済み**
  - `@tailwindcss/typography`: マークダウンスタイリング
  - `@tailwindcss/forms`: フォーム要素のスタイリング
- **CSS Modules** (一部レガシーコンポーネント)
- **Framer Motion 10.18.0**: アニメーション
- **Radix UI**: アクセシブルなUIコンポーネント
- **React Icons 4.12.0**: アイコンライブラリ

### データ管理/API

- **microCMS**: ヘッドレスCMS ✅ **型安全性向上済み**
  - エンドポイント: `news`, `group`, `user-comments`
- **SWR**: データフェッチング（Pages Router用）
- **date-fns**: 日付処理
- **DOMPurify**: HTMLサニタイズ

### 開発ツール

- **Biome**: リンター/フォーマッター
- **PostCSS**: CSS処理

## ディレクトリ構造

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

#### 統合コンポーネントの使用 ✅

**必須**: 以下の統合済みコンポーネントを使用すること

- `FormattedDate` - 日付表示（AppRouterFormattedDate、dateは廃止）

**統合予定**: 以下のコンポーネントは統合作業を進行中

- `SiteLogo` vs `AppRouterSiteLogo`
- `NavbarCollapseButton` vs `AppRouterNavbarCollapseButton`
- `Link` vs `AppRouterLink`

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

- `NEWS_CONFIG`: ニュース表示設定
- `CACHE_CONFIG`: キャッシュ設定
- `CONTACT_CONFIG`: 連絡先情報
- `SITE_CONFIG`: サイト基本情報
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

**App Router**: Server Components + Next.js 15.3.4キャッシュ機能

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

#### ✅ コンポーネント統合（第1段階）

- **完了**: FormattedDateコンポーネント統合

### 進行中タスク

#### 🔄 コンポーネント統合（第2段階）

優先順位順：

1. **SiteLogo** - Header内でのみ使用、統合が容易
2. **NavbarCollapseButton** - アクセシビリティ改善版を採用
3. **Link** - 外部リンク機能の統合が必要

#### 🔄 その他の改善点

- [ ] ダークモード実装の完了
- [ ] OG画像の動的生成（@vercel/og）
- [ ] パフォーマンス最適化
- [ ] テストの追加
- [ ] アクセシビリティの向上

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

- **現在**: App Routerがメインアーキテクチャ
- **Pages Router**: レガシーとして一部残存、段階的削除予定
- **新規開発**: 必ずApp Routerで実装

### microCMS連携

- **必須**: `lib/env.ts` 経由での型安全なアクセス
- **App Router**: Server Components でのデータフェッチング
- **キャッシュ**: Next.js 15.3.4の新機能を活用

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

#### コンポーネント統合エラー

```bash
# エラー例
Module not found: Can't resolve './AppRouterFormattedDate'

# 対処法
import FormattedDate from './FormattedDate'  # 統合版を使用
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

**最終更新**: 2025-06-28 - App Router移行完了・包括的改善実施後
