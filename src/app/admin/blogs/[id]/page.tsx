"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Edit } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types/IBlogPost";
import PageContainer from "@/components/layout/page-container";
import { getBlogById } from "@/api/blog";
import { useSession } from "next-auth/react";
export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  useEffect(() => {
    const loadPost = async () => {
      try {
        const blogPost = await getBlogById(
          session?.user.token,
          params.id as string
        );
        setPost(blogPost);
      } catch (error) {
        console.error("Failed to load blog post:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="w-full  py-8 px-4 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6" />
          <div className="h-12 bg-muted rounded w-3/4 mb-8" />
          <div className="h-64 bg-muted rounded mb-8" />
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full  py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
        <p className="text-muted-foreground mb-6">
          The blog post you're looking for doesn't exist.
        </p>
        <Button onClick={() => router.push("/")}>Back to Blog</Button>
      </div>
    );
  }

  return (
    <PageContainer scrollable={true}>
      <div className="w-full  py-8 px-4 ">
        {/* <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="flex items-center gap-2 mb-6"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Button>
        </motion.div> */}
        <div className="w-full  flex items-center flex-col ">
          <div className="max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

              <div className="flex items-center gap-4 text-muted-foreground mb-8">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>
                    {format(new Date(post.createdAt), "MMMM d, yyyy")}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => router.push(`/admin/blogs/${post.id}/edit`)}
                >
                  <Edit size={14} />
                  Edit Post
                </Button>
              </div>
            </motion.div>

            {/* {post.coverImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden"
              >
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            )} */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
