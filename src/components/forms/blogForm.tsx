"use client";

import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploader from "@/components/global/imageUploader";
import { Editor } from "@/components/global/text-editor/editor";
import { useCreateBlog, useUpdateBlog } from "@/hooks/useBlog";

const BlogForm = ({ id }: { id?: string }) => {
  const hook = id ? useUpdateBlog(id) : useCreateBlog();
  const { form, errors, onFormSubmit, content, isPending, setContent } = hook;
  return (
    <form onSubmit={onFormSubmit} className="space-y-8 w-full overflow-hidden">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...form.register("title")}
          placeholder="Enter blog title"
          className=""
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Cover Image */}
      <div className="space-y-2">
        <Label>Cover Image</Label>
        <ImageUploader
          onImageSelected={(url) => {
            console.log("url", url);
            form.setValue("image", url as string);
          }}
        />
        {/* {image && (
          <div className="mt-2 relative w-full h-48 rounded-md overflow-hidden">
            <img
              src={image}
              alt="Cover preview"
              className="w-full h-full object-cover"
            />
          </div>
        )} */}
      </div>

      {/* Content */}
      <div className="space-y-2 w-full  overflow-hidden">
        <Label>Content</Label>
        <Editor onChange={(editorState: any) => setContent(editorState)} />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="flex items-center gap-2"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Save size={16} />
          )}
          {isPending ? "Saving..." : "Publish Blog Post"}
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;
