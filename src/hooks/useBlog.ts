"use client";
import { useSession } from "next-auth/react";
import { useQueryData } from "./useQueryData";
import { getBlogs, getBlogById, createBlog, updateBlog } from "@/api/blog";
import { useMutationData } from "./useMutation";
import { blogPostSchema } from "@/schema/blogSchema";
import useZodForm from "./useZodForm";
import { useRouter } from "next/navigation";
import { $generateHtmlFromNodes } from '@lexical/html'
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { $generateNodesFromDOM } from '@lexical/html';

export const useBlogs = () => {
  const { data: session } = useSession();
  const { data, isPending } = useQueryData(["blogs"], () =>
    getBlogs(session?.user.token)
  );
  const response = data as any;
  return { data: response, isPending };
};

export const useBlogById = (id: string) => {
  const { data: session } = useSession();
  const { data, isPending } = useQueryData(["blogById"], () =>
    getBlogById(session?.user.token, id)
  );
  const response = data as any;
  return { data: response, isPending };
};

export const useCreateBlog = () => {
  const { data: session } = useSession();
  const [content, setContent] = useState<any>(null);
  const router = useRouter();
  const [editor] = useLexicalComposerContext()
  const { mutate, isPending } = useMutationData(["createBlog"], (data: any) =>
    createBlog(session?.user.token, data)
  );

  const { form, formState, errors, onFormSubmit, watch, ...rest } = useZodForm(
    blogPostSchema,
    mutate
  );


  useEffect(() => {
    const updatePreview = () => {
      editor.update(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        form.setValue("content", htmlString)
      })
    }

    updatePreview()

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        form.setValue("content", htmlString)
      })
    })
  }, [editor])
  const coverImage = watch("coverImage");


  return { mutate, isPending, coverImage, content, form, formState, errors, onFormSubmit, watch, setContent };
};


export const useUpdateBlog = (id: string) => {
  const { data: session } = useSession();
  const [content, setContent] = useState<any>(null);
  const { data, isPending: isLoading,isFetched } = useQueryData(["blogById"], () =>
    getBlogById(session?.user.token, id)
  );
  const [editor] = useLexicalComposerContext()
  const { mutate, isPending } = useMutationData(["updateBlog"], (data: any) =>
    updateBlog(session?.user.token, id, data)
  );

  const { form, formState, errors, onFormSubmit, watch, ...rest } = useZodForm(
    blogPostSchema,
    mutate
  );
  useEffect(() => {
    if (data) {
      form.reset(
        {
          title: (data as any).title,

        }
      )
      //  the content is html so i want to pass lexical and convert to tree
      const htmlString = (data as any).content;

      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlString, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        console.log(nodes)
        const root = $getRoot();
        root.clear();
        root.append(...nodes);
      });
    }
  }, [isFetched])






  useEffect(() => {
    const updatePreview = () => {
      editor.update(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        form.setValue("content", htmlString)
      })
    }

    updatePreview()

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null)
        form.setValue("content", htmlString)
      })
    })
  }, [editor])
  const coverImage = watch("coverImage");


  return { mutate, isPending, coverImage, content, form, formState, errors, onFormSubmit, watch, setContent };
}




