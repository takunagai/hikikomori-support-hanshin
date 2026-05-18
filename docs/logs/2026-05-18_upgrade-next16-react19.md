# Next.js 16 + React 19 への包括的アップグレード作業ログ

**実施日**: 2026-05-18
**ブランチ**: `chore/upgrade-next16-react19`
**プランファイル**: `~/.claude/plans/react-next-js-piped-pizza.md`

---

## 概要

Next.js 15.3.4 + React 18.2 で稼働していたサイトを、Next.js 16.2.6 + React 19.2.6 + React Compiler ベースに全面刷新。同時にレガシー Pages Router、`_backup/`、未使用パッケージ、AppRouter プレフィックスを大掃除した。

Tailwind CSS v3 → v4 は別フェーズに切り出し（@apply の再構成と Safari 16.4+ 要件確認のため）。

---

## バージョン推移

| パッケージ | 変更前 | 変更後 |
|---|---|---|
| next | 15.3.4 | **16.2.6** |
| react / react-dom | 18.2.0 | **19.2.6** |
| typescript | 5.3.3 | **5.9.3** |
| @types/react / @types/react-dom | 18.x | **19.x** |
| @types/node | 20.x | **25.8** |
| @biomejs/biome | 2.0.6 | **2.4.15** |
| framer-motion → motion | 10.18 | **motion 12.38** |
| date-fns | 2.30 | **4.1** |
| dompurify → isomorphic-dompurify | 3.2 | **isomorphic 最新** |
| @radix-ui/react-dialog | 1.1.5 | **1.1.15** |
| next-themes | 0.2.1 | **0.4.6** |
| react-icons | 4.12 | **5.6** |
| @tailwindcss/forms / typography | 0.5.x | 最新 |
| tailwindcss | 3.4.17 | 3.4.17 (据え置き、v4 は別フェーズ) |

---

## Phase 別作業内容

### Phase 0: 既存バグ修正

`app/news/[id]/page.tsx` で `status.includes('レポート')` が undefined ガード無く呼ばれ、microCMS で status 未設定の記事があると prerender が落ちていた。Optional chaining + nullish coalescing で 1 行修正、main に直接コミットしてアップグレードブランチに rebase。

### Phase 1: 準備

ブランチ `chore/upgrade-next16-react19` 作成、ベースラインビルド確認、タグ `upgrade-phase-1-baseline`。

### Phase 2: 未使用パッケージ・ファイル削除

- `swr`, `react-responsive`, `yet-another-react-lightbox`, `sharp`, `classnames` を uninstall
- `components/Alert.tsx`, `Alert.module.css`, `Button.module.css`, `layout.module.css` 削除
- `styles/Home.module.css`, `Pagination.module.css`, `utils.module.css` 削除
- `_backup/pages-router/` 10 ファイル削除、`_pages/` 削除、`pages/api/hello.js` 削除
- `tsconfig.json` の `exclude` から `_backup` を除去

**削減**: 約 1,968 行、6 パッケージ。

### Phase 3: Next.js 16 + React 19

- TypeScript を 5.9.3 に。`typescript@latest` だと 6.0 系が入り CSS の side-effect import で型エラーになるため、エコシステム互換性を優先して `^5` で固定。
- React 19.2.6 へ。`package.json` に `overrides` で next-themes 0.2.1 の React peer dep 警告を吸収。
- React 19 codemod は対話入力でクラッシュしたためスキップ（対象パターン `forwardRef` / `defaultProps` / `propTypes` / `useFormState` / `ReactDOM.render` はいずれも未使用と事前確認済み）。
- Next.js 16.2.6 へ。`@next/codemod` が `tsconfig.json` を Next 16 仕様に自動更新 (`jsx: react-jsx`、`.next/dev/types/**/*.ts` を include に追加)。
- 手動対応: `app/news/[id]/page.tsx` で `params` を `Promise<{ id: string }>` 化し、`generateMetadata` と `NewsDetailPage` 双方で `await params`。

### Phase 4: framer-motion → motion

`framer-motion@10` は React 19 と型不整合（`HTMLAttributesWithoutMotionProps` の `onClick` プロパティが解決できない）。Phase 3 から続けて motion@12.38 に置換、18 ファイルで `from 'framer-motion'` → `from 'motion/react'` を sed で一括変換。

### Phase 5: date-fns v4

ESM-first + flat 構造。`import ja from 'date-fns/locale/ja'` を `import { ja } from 'date-fns/locale'` に修正（components/FormattedDate.tsx の 1 箇所）。

### Phase 6: その他ライブラリ更新

Radix UI、next-themes、react-icons を dependencies で、Biome、Tailwind プラグインを devDependencies で最新化。`biome.json` の `$schema` を 2.4.15 に更新。Biome 2.4 の新ルールに伴い 44 ファイルに自動フォーマット適用。

残 lint エラー 665 件 / 警告 407 件は Phase 7-8 でレガシー削除後の自然解消を期待し、追加タスクとして登録。

### Phase 7: pages/ → App Router 完全移行

- `app/places-and-groups/page.tsx` (Server Component): `groupsApi.getAll()` で取得、`metadata` export で `<head>` 設定
- `app/places-and-groups/PlacesAndGroupsClient.tsx` (`'use client'`): フィルタ state、Radix Dialog、motion `popLayout` + `AnimatePresence`、InfiniteScroll、全カードレイアウト
- `<img>` リーフレットを `next/image` に置換（`sizes` で responsive 制御）
- `pages/_app.tsx` `_document.tsx` `404.tsx` `500.tsx` `places-and-groups.tsx` 削除
- `pages/` ディレクトリ自体を削除
- `lib/client.ts` と `lib/microcms-app-router.ts` の re-export 削除
- `microcms-js-sdk` を uninstall

### Phase 8: AppRouter プレフィックス除去 + 素レガシー削除

連鎖削除マップ通り、`pages/` が消えた時点で素レガシーが全部宙に浮いたため、13 ファイル (`layout`, `Header`, `Footer`, `Navbar`, `SiteLogo`, `NavbarCollapseButton`, `Link`, `FadeIn`, `PageTransition`, `ModeSwitcher`, `Accordion`, `AccessMap`, `AfterContentArea`) を物理削除。

その後、`AppRouter*.tsx` 17 ファイルを `*.tsx` にリネーム、全 import を sed で一括置換。`AppRouter` 文字列の残存ゼロを `git grep` で確認。

副作用: `NewsSection.tsx` で `next/link` の `Link` と元 `AppRouterLink` 名（リネーム後 `Link`）の二重定義が発生 → `next/link` の import を削除して自前 Link で統一。

### Phase 9: DOMPurify サーバー側化

`dompurify` + `@types/dompurify` を `isomorphic-dompurify` に置換。`components/NewsContent.tsx` から `'use client'` / `useState` / `useEffect` を削除し Server Component 化。SSR 時にサニタイズが完了するため Client JS 削減 + FOUC 解消。

### Phase 10: microCMS Webhook + revalidateTag

新規 `app/api/revalidate/route.ts`:
- `x-microcms-signature` ヘッダで `MICROCMS_WEBHOOK_SECRET` 検証 (401)
- ペイロード `api` フィールドから `TAG_MAP` に基づき `revalidateTag` 呼び出し
- **Next.js 16 で `revalidateTag` が 2 引数必須に変更されたため、`revalidateTag(tag, 'max')` の新仕様を採用**（stale-while-revalidate）

`lib/microcms-app-router.ts` の死コード `revalidateCache` を削除。

`lib/env.ts` のラッパ追加は permission により今回未実施（追加タスク）。現状は API route が `process.env.MICROCMS_WEBHOOK_SECRET` を直接参照。

### Phase 11: React Compiler 有効化

`babel-plugin-react-compiler` を devDependencies に追加、`next.config.js` に `reactCompiler: true`。Next.js 16 で stable。ビルド時 bailout 警告なし。

### Phase 12: 最終検証 + ドキュメント

- `next.config.js` から未使用 `picsum.photos` と `vercel.app` の `remotePatterns` を削除
- CLAUDE.md を Next 16 / React 19 ベースに改訂（バージョン表、ディレクトリ構造、進行中タスク）
- 本作業ログ作成

---

## 最終ビルドメトリクス

```
Route (app)             Revalidate  Expire
┌ ○ /                          30m      1y
├ ○ /_not-found
├ ƒ /api/og
├ ƒ /api/revalidate
├ ○ /faq
├ ○ /flow
├ ○ /inquiry
├ ○ /news                      30m      1y
├ ● /news/[id]   (28 paths)     1h      1y
├ ○ /places-and-groups          2h      1y
├ ○ /privacy-policy
├ ○ /reference
├ ○ /sitemap
└ ○ /user-comments              1h      1y
```

- 全 41 ページ生成（Static 11 + SSG 28 + Dynamic 2）
- `pages/` セクション完全消滅
- React Compiler ビルド時 bailout なし

---

## 残課題 (別タスク)

1. **Tailwind CSS v3 → v4 移行**: `@apply` 19 箇所の再構成、CSS-first 化、Safari 16.4+ 要件確認
2. **Biome 2.4 残 lint エラー対応**: 自動 fix で 41 ファイル整形済み、残 665 errors は個別対応
3. **`lib/env.ts` に `MICROCMS_WEBHOOK_SECRET` ラッパ追加**: 今回 permission により未実施
4. **microCMS 管理画面で Webhook 登録**: URL `https://hanshin-branch.org/api/revalidate`、カスタムヘッダ `x-microcms-signature`
5. **`<Suspense>` 境界の追加**: `app/page.tsx` で PPR (Partial Prerendering) 対応
6. **Lighthouse 計測**: before/after の Performance / Accessibility / Best Practices / SEO 比較
7. **バンドルサイズ計測**: `npx @next/bundle-analyzer`
8. **`types/news.ts`**: `status` を `string[]` から `string[]?` に optional 化（型と実データの整合）

---

## ロールバック

各 Phase で以下のタグを打っている:
- `upgrade-phase-1-baseline`
- `upgrade-phase-2-complete`
- `upgrade-phase-3-complete`
- `upgrade-phase-6-complete`
- `upgrade-phase-7-complete`
- `upgrade-phase-8-complete`
- `upgrade-phase-11-complete`

問題発覚時は `git reset --hard upgrade-phase-N-complete` で戻せる。
