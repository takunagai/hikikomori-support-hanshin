# 兵庫ひきこもり相談支援センター 阪神ブランチ

ひきこもりの当事者やご家族への支援を目的とした情報提供・相談窓口サイトです。

[公式サイト](https://hanshin-branch.org)

## 主な機能

- 支援情報の提供
- よくある質問（FAQ）
- ニュースと最新情報
- 場所とグループ情報
- お問い合わせフォーム
- プライバシーポリシー
- ダークモード対応
- アクセシビリティ対応

## 技術スタック

### フロントエンド基盤

- Next.js 15.1.6
- React 18.2.0
- TypeScript

### UI/スタイリング

- Tailwind CSS 3.4.17
  - @tailwindcss/typography: マークダウンスタイリング
  - @tailwindcss/forms: フォーム要素のスタイリング
  - @tailwindcss/aspect-ratio: アスペクト比の制御
  - @tailwindcss/line-clamp: テキストの行数制限
  - PostCSS プラグイン（postcss-import, postcss-nesting）
- Framer Motion 10.18.0（アニメーション）
  - ページトランジション
  - スプリングアニメーション
  - 無限スクロール効果
- Radix UI（アクセシブルなコンポーネント）
  - @radix-ui/react-dialog: モーダルダイアログ
  - @radix-ui/react-visually-hidden: スクリーンリーダー対応
- React Icons 4.12.0
  - Font Awesome アイコン
  - SNSアイコン
- その他のUIライブラリ
  - next-themes 0.2.1: ダークモード対応
  - react-responsive 9.0.0: レスポンシブデザイン
  - react-scroll 1.9.0: スムーズスクロール
  - yet-another-react-lightbox 2.2.0: 画像ライトボックス
  - @etchteam/next-pagination 3.5.5: ページネーション

### データ管理/API

- SWR（データフェッチング）
- microCMS SDK（ヘッドレスCMS）
- date-fns（日付処理）
- DOMPurify（HTMLサニタイズ）
- Satori & @vercel/og（OGP画像生成）
  - Reactコンポーネントからの動的画像生成
  - カスタムフォントとスタイリング
  - エッジでのリアルタイム生成

### セキュリティ対策

- DOMPurifyによるHTMLコンテンツのサニタイズ
- Content Security Policy (CSP) の実装
- HTTPSの強制
- クロスサイトスクリプティング（XSS）対策
- セキュアなヘッダー設定

### SEOとソーシャルメディア対応

#### メタタグとOGP

- 動的OGP画像生成
  - @vercel/ogとSatoriを使用
  - Reactコンポーネントベースのデザイン
  - エッジでのリアルタイム生成
  - 1200×630pxの最適化された画像
  - カスタムフォントとブランディング
- Twitter Card対応
- 構造化データ（JSON-LD）
- カスタムメタタグ
- Google Search Console対応

#### 最適化

- SEOフレンドリーなURL構造
- サイトマップの自動生成
- 適切なHTMLセマンティクス
- モバイルフレンドリー対応
- Core Web Vitalsの最適化

## プロジェクト構成

### ディレクトリ構造

```
.
├── components/     # 再利用可能なUIコンポーネント
│   ├── layout/    # レイアウト関連
│   ├── ui/        # UI要素
│   └── nav/       # ナビゲーション
├── pages/         # Next.jsのページコンポーネント
├── public/        # 静的アセット
├── styles/        # スタイリング関連
├── lib/          # ユーティリティ関数
└── types/        # TypeScript型定義
```

### 主要コンポーネント

- **レイアウト**: Layout.tsx, Header.tsx, Footer.tsx
- **UI要素**: Button.tsx, Alert.tsx, Dialog.tsx
- **ナビゲーション**: Navbar.tsx, BreadCrumbs.tsx

## 特徴的な実装

### UI/UX

- スプリングアニメーションによる自然な動き
- 無限スクロールによるコンテンツ読み込み
- レスポンシブデザイン
- ダークモード対応
- アクセシブルなUI（WAI-ARIA準拠）

### パフォーマンス

- 画像の最適化
- コンポーネントの遅延読み込み
- SSGによる高速なページロード

## 開発環境のセットアップ

1. リポジトリのクローン

```bash
git clone [repository-url]
cd hikikomori-support-hanshin
```

2. 依存パッケージのインストール

```bash
npm install
```

3. 環境変数の設定
`.env.local`ファイルをプロジェクトルートに作成し、以下の環境変数を設定：

```
SERVICE=your-microcms-service-domain
APIKEY=your-microcms-api-key
```

4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで <http://localhost:3000> を開いて確認できます。

## 主要なページ構成

- `/`: トップページ
- `/about`: 概要
- `/faq`: よくある質問
- `/inquiry`: お問い合わせ
- `/news`: ニュース一覧
- `/places-and-groups`: 場所とグループ
- `/reference`: 参考資料
- `/user-comments`: ご利用者様の声
- `/sitemap`: サイトマップ

## デプロイ

### 本番用ビルド

```bash
npm run build
```

### 本番環境での起動

```bash
npm run start
```

## 開発ガイドライン

### コーディング規約

- Biomeによるコード品質管理（リントとフォーマット）
- TypeScriptの厳格な型チェック
- コンポーネントの単一責任原則
- アクセシビリティガイドラインの遵守

### Git運用

- 機能ごとのブランチ作成
- コミットメッセージの規約に従う
- プルリクエストによるコードレビュー

## TODO

### アーキテクチャの改善

- [ ] Pages Router から App Router への移行
  - Server Components の活用によるパフォーマンス改善
  - より良いルーティング構造の実現
  - レイアウトとテンプレートの最適化
  - データフェッチングの改善

## コーディング規約

### 基本方針

- TypeScriptの型安全性を最大限活用する
- コンポーネントは再利用可能な単位で分割する
- アクセシビリティを考慮したマークアップを心がける
- パフォーマンスを意識した実装を行う

### 命名規則

- コンポーネント: PascalCase（例：`FormattedDate`）
- 関数・変数: camelCase（例：`getUserData`）
- 定数: SNAKE_CASE（例：`MAX_ITEMS`）
- ファイル名: コンポーネントはPascalCase、その他はkebab-case
- クラス名: [TailwindCSS](https://tailwindcss.com/)の命名規則に従う

### コードスタイル

- インデント: 2スペース
- 引用符: シングルクォート
- セミコロン: 必要な場合のみ（ASI準拠）
- 最大行長: 100文字
- コンポーネントのprops型は明示的に定義
- 不要なelse文を避ける
- 配列のmapにおけるkeyには一意な値を使用

### Biomeによるコード品質管理

プロジェクトではBiomeを使用してコードの品質を管理しています。以下のコマンドを使用できます：

```bash
# コードのフォーマット
npm run format

# リント（コードの静的解析）
npm run lint

# フォーマットとリントを同時に実行（自動修正あり）
npm run check
```

#### 主なルール

- 未使用の変数は禁止（error）
- console.logは警告（warn）
- non-null assertion operatorは許可
- インポートの自動整理を有効化
- コードフォーマットの自動適用

## ライセンス

Copyright (c) 2025 兵庫ひきこもり相談支援センター 阪神ブランチ

All rights reserved.

このプロジェクトのソースコードおよびコンテンツの全ての権利は兵庫ひきこもり相談支援センター 阪神ブランチに帰属します。
許可なく複製、改変、再配布することを禁じます。
