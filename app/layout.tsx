import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '兵庫ひきこもり相談支援センター 阪神ブランチ',
  description: 'ひきこもりでお悩みの方やそのご家族の相談窓口です。兵庫県阪神地域で無料の相談支援を行っています。',
  keywords: 'ひきこもり,相談,支援,兵庫県,阪神,無料,家族会',
  authors: [{ name: '兵庫ひきこもり相談支援センター 阪神ブランチ' }],
  creator: '兵庫ひきこもり相談支援センター 阪神ブランチ',
  publisher: '兵庫ひきこもり相談支援センター 阪神ブランチ',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '兵庫ひきこもり相談支援センター 阪神ブランチ',
    description: 'ひきこもりでお悩みの方やそのご家族の相談窓口です。兵庫県阪神地域で無料の相談支援を行っています。',
    url: 'https://hikikomori-support-hanshin.vercel.app/',
    siteName: '兵庫ひきこもり相談支援センター 阪神ブランチ',
    images: [
      {
        url: 'https://hikikomori-support-hanshin.vercel.app/api/og',
        width: 1200,
        height: 630,
        alt: '兵庫ひきこもり相談支援センター 阪神ブランチ',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '兵庫ひきこもり相談支援センター 阪神ブランチ',
    description: 'ひきこもりでお悩みの方やそのご家族の相談窓口です。兵庫県阪神地域で無料の相談支援を行っています。',
    images: ['https://hikikomori-support-hanshin.vercel.app/api/og'],
  },
  verification: {
    google: 'XXXXXXXXXX', // Google Search Console 用の確認コード
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: '相談支援',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
