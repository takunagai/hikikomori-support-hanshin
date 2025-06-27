/**
 * App Router 対応 日付フォーマットコンポーネント
 * - Server Component として実装
 * - date-fns で日付を整形し表示
 * - アクセシビリティ対応
 */
import { format, parseISO } from 'date-fns'
import ja from 'date-fns/locale/ja'

interface AppRouterFormattedDateProps {
  dateString: string
  className?: string
  showWeekday?: boolean
}

export default function AppRouterFormattedDate({ 
  dateString, 
  className = '',
  showWeekday = false 
}: AppRouterFormattedDateProps) {
  const date = parseISO(dateString)
  const formatString = showWeekday ? 'yyyy年MM月dd日(eee)' : 'yyyy年MM月dd日'
  
  return (
    <time 
      dateTime={dateString}
      className={className}
    >
      {format(date, formatString, { locale: ja })}
    </time>
  )
}