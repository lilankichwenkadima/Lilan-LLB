import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
  const { className, ...rest } = props

  return (
    <div className={`prose prose-lg max-w-none ${className || ''}`}>
      <RichTextConverter {...rest} />
    </div>
  )
}
