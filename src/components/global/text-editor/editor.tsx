"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, SerializedEditorState } from "lexical";

import { FloatingLinkContext } from "@/components/editor/context/floating-link-context";
import { SharedAutocompleteContext } from "@/components/editor/context/shared-autocomplete-context";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/ui/tooltip";

import { nodes } from "./nodes";
import { Plugins } from "./plugins";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

export function Editor({
  onChange,
  onSerializedChange,
}: {
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
}) {
  return (
    <div className="overflow-hidden max-h-svh min-w-[90vw] relative rounded-lg border p-2 bg-muted-foreground/5 shadow">
      <TooltipProvider>
        <SharedAutocompleteContext>
          <FloatingLinkContext>
            <Plugins />

            <OnChangePlugin
            
              ignoreSelectionChange={true}
              onChange={(editorState) => {
                onChange?.(editorState);
                onSerializedChange?.(editorState.toJSON());
              }}
            />
          </FloatingLinkContext>
        </SharedAutocompleteContext>
      </TooltipProvider>
    </div>
  );
}
