/**
 * microcms-js-sdkの初期化
 * @ref https://document.microcms.io/tutorial/next/next-getting-started
 */
import { createClient } from 'microcms-js-sdk'
import { microCMSConfig } from './env'

export const client = createClient({
  serviceDomain: microCMSConfig.serviceDomain,
  apiKey: microCMSConfig.apiKey,
})
