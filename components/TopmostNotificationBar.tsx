import Link from 'next/link'
import { FaFlag } from 'react-icons/fa'

const TopmostNotificationBar = () => {
  return (
    <aside className="bg-gradient-to-r from-purple-500 to-pink-500 py-2 text-white">
      <div className="flex flex-col justify-center text-center md:flex-row">
        <FaFlag className="mx-auto inline h-7 w-7 md:mx-0" />
        <p className="mx-3 inline-block font-bold">目立たせたいお知らせが入ります！</p>
        <span className="mx-auto inline-block rounded-full bg-white py-1.5 px-3 text-xs font-bold text-pink-500 md:mx-0">
          <Link href="./about">Read Here</Link>
        </span>
      </div>
    </aside>
  )
}

export default TopmostNotificationBar
