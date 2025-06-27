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

- **Next.js 15.1.6** (Pages Router)
- **React 18.2.0**
- **TypeScript** (strictモード有効)

### UI/スタイリング

- **Tailwind CSS 3.4.17**
  - `@tailwindcss/typography`: マークダウンスタイリング
  - `@tailwindcss/forms`: フォーム要素のスタイリング
- **CSS Modules** (一部コンポーネントで使用)
- **Framer Motion 10.18.0**: アニメーション
- **Radix UI**: アクセシブルなUIコンポーネント
- **React Icons 4.12.0**: アイコンライブラリ

### データ管理/API

- **microCMS**: ヘッドレスCMS
  - エンドポイント: `news`, `group`, `user-comments`
- **SWR**: データフェッチング
- **date-fns**: 日付処理
- **DOMPurify**: HTMLサニタイズ

### 開発ツール

- **Biome**: リンター/フォーマッター
- **PostCSS**: CSS処理

## ディレクトリ構造

```
.
├── pages/          # Pages Router のページコンポーネント
│   ├── index.tsx   # トップページ
│   ├── faq.tsx     # よくある質問
│   ├── news/       # ニュース関連
│   │   └── [id].tsx # ニュース詳細（動的ルート）
│   └── ...         # その他のページ
├── components/     # 再利用可能なUIコンポーネント
│   ├── layout/     # レイアウト関連
│   ├── ui/         # UI要素
│   └── nav/        # ナビゲーション
├── lib/            # ユーティリティ関数
│   └── client.ts   # microCMS クライアント
├── types/          # TypeScript型定義
├── styles/         # スタイリング関連
├── public/         # 静的アセット
└── app/            # App Router (移行準備中)
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
- 定数: SNAKE_CASE（例：`MAX_ITEMS`）
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

#### 構成

- **レイアウト**: Layout.tsx, Header.tsx, Footer.tsx
- **UI要素**: Button.tsx, Alert.tsx, Dialog.tsx
- **ナビゲーション**: Navbar.tsx, BreadCrumbs.tsx

## 環境変数

`.env.local` ファイルに以下を設定：

```env
# microCMS設定
SERVICE=your-microcms-service-domain
APIKEY=your-microcms-api-key
```

`.env` ファイル（バージョン管理対象）：

```env
NEXT_PUBLIC_SITE_TITLE=兵庫ひきこもり相談支援センター 阪神ブランチ
```

## API連携

### microCMS

#### エンドポイント

- `news`: お知らせ情報
- `group`: 場所とグループ情報  
- `user-comments`: ご利用者様の声

#### データフェッチング

- SSG（Static Site Generation）を使用
- `getStaticProps`でビルド時にデータ取得
- 動的ルートでは`getStaticPaths`も使用

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

## デプロイ

### ビルド

```bash
npm run build
```

### 本番環境起動

```bash
npm run start
```

## 現在の課題と TODO

### 最優先タスク

#### 1. App Router への移行

- Pages Router から App Router への段階的移行
- Server Components の活用
- データフェッチングの最適化
- レイアウトシステムの改善

#### 2. 型定義の改善

- microCMS APIスキーマからの型自動生成
- より厳密な型チェック

#### 3. ダークモード実装の完了

- 現在は強制的にライトモード適用
- next-themesの設定調整が必要

### その他の改善点

- [ ] OG画像の動的生成（@vercel/og）
- [ ] パフォーマンス最適化
- [ ] テストの追加
- [ ] アクセシビリティの向上

## 重要な注意事項

### Pages Router 使用中

- 現在はPages Routerを使用
- App Routerへの移行は段階的に実施予定
- 新規ページは可能な限りApp Router対応を意識

### microCMS連携

- APIキーは環境変数で管理
- ビルド時にデータ取得（SSG）
- リアルタイム更新が必要な場合はSWRを使用

### スタイリング

- Tailwind CSSを優先使用
- 複雑なスタイルはCSS Modulesで対応
- カスタムカラーは`tailwind.config.js`で定義

### アニメーション

- Framer Motionを使用
- パフォーマンスに配慮した実装
- アクセシビリティ設定の尊重

## 開発フロー

1. **機能追加前**
   - 既存コードの確認
   - 影響範囲の把握
   - 型定義の追加/更新

2. **実装時**
   - TypeScriptの型安全性を活用
   - Biomeによる自動フォーマット
   - アクセシビリティの確認

3. **完了時**
   - `npm run check`でコード品質確認
   - ビルドエラーの確認
   - 動作確認（モバイル含む）

## リソース

- [公式サイト](https://hanshin-branch.org)
- [Next.js ドキュメント](https://nextjs.org/docs)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [microCMS ドキュメント](https://document.microcms.io/)

---

最終更新: 2025-06-27
