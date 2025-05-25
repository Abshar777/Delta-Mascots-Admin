"use client";

import { useState } from "react";
import { SerializedEditorState } from "lexical";
import { Editor } from "@/components/global/text-editor/editor";
import { EditorPreview } from "@/components/global/text-editor/previewEditor";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { nodes } from "@/components/global/text-editor/nodes";
import PageContainer from "@/components/layout/page-container";
import { initialValue, editorConfig } from "@/constants/textEditor";



export default function EditorPage() {
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialValue);
  return (
    <PageContainer scrollable>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="grid grid-cols-1 md:grid-cols-2 h-[200vh] gap-4 p-4">
          <div>
            <h1 className="text-xl font-bold mb-2">Editor</h1>
            <Editor />
          </div>
          <div>
            <EditorPreview />
          </div>
        </div>
      </LexicalComposer>
    </PageContainer>
  );
}
