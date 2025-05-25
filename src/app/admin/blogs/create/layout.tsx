"use client";
import { editorConfig } from "@/constants/textEditor";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>{children}</LexicalComposer>
  );
};

export default layout;
