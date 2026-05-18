/**
 * 環境変数の型安全な管理
 * 実行時にすべての必要な環境変数をチェックし、型安全にアクセス可能にする
 */

/**
 * 必要な環境変数の型定義
 */
interface RequiredEnvVars {
  /** microCMS サービスドメイン */
  SERVICE: string;
  /** microCMS APIキー */
  APIKEY: string;
  /** Next.js パブリックサイトタイトル */
  NEXT_PUBLIC_SITE_TITLE?: string;
  /** Google Analytics 4 測定 ID（未設定時は GA を無効化） */
  NEXT_PUBLIC_GA_ID?: string;
}

/**
 * 環境変数の検証とパース
 */
function validateEnvVars(): RequiredEnvVars {
  const envVars: Partial<RequiredEnvVars> = {
    SERVICE: process.env.SERVICE,
    APIKEY: process.env.APIKEY,
    NEXT_PUBLIC_SITE_TITLE: process.env.NEXT_PUBLIC_SITE_TITLE,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  };

  // 必須環境変数のチェック
  const requiredVars: (keyof RequiredEnvVars)[] = ["SERVICE", "APIKEY"];
  const missingVars = requiredVars.filter((key) => !envVars[key]);

  if (missingVars.length > 0) {
    throw new Error(
      `以下の環境変数が設定されていません: ${missingVars.join(", ")}\n` +
        "設定方法：\n" +
        "1. .env.local ファイルを作成\n" +
        "2. 以下の形式で環境変数を設定:\n" +
        "   SERVICE=your-microcms-service-domain\n" +
        "   APIKEY=your-microcms-api-key",
    );
  }

  return envVars as RequiredEnvVars;
}

/**
 * 型安全な環境変数
 * アプリケーション全体で使用する環境変数の中央管理
 */
export const env = validateEnvVars();

/**
 * microCMS関連の設定
 */
export const microCMSConfig = {
  serviceDomain: env.SERVICE,
  apiKey: env.APIKEY,
  baseUrl: `https://${env.SERVICE}.microcms.io/api/v1`,
} as const;

/**
 * サイト設定
 */
export const siteConfig = {
  title:
    env.NEXT_PUBLIC_SITE_TITLE || "兵庫ひきこもり相談支援センター 阪神ブランチ",
} as const;

/**
 * Google Analytics 4 設定
 */
export const analyticsConfig = {
  gaId: env.NEXT_PUBLIC_GA_ID,
} as const;
