import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
/**
 * Dialog Sample
 * @ref {https://www.radix-ui.com/docs/primitives/components/dialog}
 */
import React, { type ReactNode } from 'react'

type Props = {
  title?: string | null
  showTitle?: boolean
  triggerType?: 'button' | 'link'
  triggerText?: string
  isStretchLink?: boolean
  isPortrait?: boolean
  children: ReactNode
}

const DialogDemo = ({
  title = null,
  showTitle = true,
  triggerType = 'button',
  triggerText = '開く',
  isStretchLink = false,
  isPortrait = false,
  children,
}: Props) => (
  <Dialog.Root>
    <Dialog.Trigger asChild {...(isStretchLink && { className: 'after:absolute after:inset-0' })}>
      {triggerType === 'button' ? (
        <button className="rounded bg-primary-100 px-2 py-1 shadow data-[state=open]:bg-primary-200">
          {triggerText}
        </button>
      ) : (
        <a href="#" className="text-primary-500-700 underline data-[state=open]:text-gray-500">
          {triggerText}
        </a>
      )}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay bg-black/50" />
      <Dialog.Content
        aria-describedby={undefined}
        className={`DialogContent max-h-[85vh] w-11/12 rounded-xl bg-white p-6 ${
          isPortrait ? `max-w-xl` : `max-w-3xl`
        }`}
      >
        {title &&
          (showTitle ? (
            <Dialog.Title className="DialogTitle mb-6 text-center text-xl font-bold">
              {title}
            </Dialog.Title>
          ) : (
            <VisuallyHidden.Root asChild>
              <Dialog.Title className="DialogTitle mb-6 text-center text-xl font-bold">
                {title}
              </Dialog.Title>
            </VisuallyHidden.Root>
          ))}
        {children}
        <p className="mt-6 text-center">
          <Dialog.Close asChild>
            <button className="text-sm underline">閉じる</button>
          </Dialog.Close>
        </p>
        <Dialog.Close asChild>
          <button
            className="IconButton right-[10px] top-[10px] inline-flex h-[25px] w-[25px] items-center justify-center rounded-full hover:bg-gray-100 focus:shadow"
            aria-label="Close"
          >
            ×
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

export default DialogDemo
