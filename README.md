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

## 技術スタック

- **フレームワーク**
  - Next.js
  - React
  - TypeScript

- **スタイリング**
  - Tailwind CSS
  - PostCSS

- **コンテンツ管理**
  - MicroCMS（ヘッドレスCMS）

- **その他の主要パッケージ**
  - Framer Motion（アニメーション）
  - SWR（データフェッチング）
  - date-fns（日付処理）

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

ブラウザで http://localhost:3000 を開いて確認できます。

## 主要なページ構成

- `/`: トップページ
- `/about`: 概要
- `/faq`: よくある質問
- `/inquiry`: お問い合わせ
- `/news`: ニュース一覧
- `/places-and-groups`: 場所とグループ
- `/reference`: 参考資料
- `/sitemap`: サイトマップ

## ビルドとデプロイ

本番用ビルド：
```bash
npm run build
```

本番環境での起動：
```bash
npm run start
```

## ライセンス

All rights reserved.

## 問い合わせ先

詳細は[お問い合わせページ](https://hanshin-branch.org/inquiry)をご覧ください。
