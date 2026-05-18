/**
 * 統合版 日付フォーマットコンポーネント
 * - App Router と Pages Router の両方で使用可能
 * - date-fns で日付を整形し表示
 * - アクセシビリティ対応
 * - 後方互換性を保持
 */
import { format, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'

interface FormattedDateProps {
  dateString: string
  className?: string
  showWeekday?: boolean
}

/**
 * 日付フォーマット表示コンポーネント
 * @param dateString ISO形式の日付文字列
 * @param className 追加のCSSクラス
 * @param showWeekday 曜日表示の有無（デフォルト: false）
 */
export default function FormattedDate({
  dateString,
  className = '',
  showWeekday = false,
}: FormattedDateProps) {
  const date = parseISO(dateString)
  const formatString = showWeekday ? 'yyyy年MM月dd日(eee)' : 'yyyy年MM月dd日'

  return (
    <time dateTime={dateString} className={className}>
      {format(date, formatString, { locale: ja })}
    </time>
  )
}

// 後方互換性のため、従来のPropsでもエクスポート
export type DateProps = {
  dateString: string
}

/**
 * 後方互換性を保つためのエイリアス
 * @deprecated 新しいコードでは FormattedDate を直接使用してください
 */
export const Date = FormattedDate
