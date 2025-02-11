import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '兵庫ひきこもり相談支援センター 阪神ブランチ',
  description: 'ひきこもりでお悩みの方やそのご家族の相談窓口です。兵庫県阪神地域で無料の相談支援を行っています',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
