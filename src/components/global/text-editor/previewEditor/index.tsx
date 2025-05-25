'use client'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $generateHtmlFromNodes } from '@lexical/html'
import { useEffect, useState } from 'react'

export function EditorPreview() {
  const [editor] = useLexicalComposerContext()
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    const updatePreview = () => {
      editor.update(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        setHtml(htmlString)
      })
    }

    // Run on mount
    updatePreview()

    // Update preview when editor state changes
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        setHtml(htmlString)
      })
    })
  }, [editor])

  return (
    
    <div className="p-4 border mt-4 bg-background rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Live Preview</h2>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
