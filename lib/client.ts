/**
 * microcms-js-sdkの初期化
 * @ref https://document.microcms.io/tutorial/next/next-getting-started
 */
import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  serviceDomain: process.env.SERVICE as string,
  apiKey: process.env.APIKEY as string,
})
