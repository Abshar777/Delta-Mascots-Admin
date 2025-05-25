"use client";

import { useParams} from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/layout/page-container";
import { Card, CardContent } from "@/components/ui/card";
import BlogForm from "@/components/forms/blog";

export default function EditorPage() {
  const router = useRouter();
  const params = useParams();
  return (
    <PageContainer scrollable={true}>
      <div className="max-w-[99vw] ">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Button>

          <h1 className="text-3xl font-bold">Create New Blog Post</h1>
        </motion.div>
        <Card className="p-0 hover:scale-1 cursor-default bg-transparent border-none max-w-[95vw]">
          <CardContent className="p-1 bg-transparent">
            <BlogForm id={params.id as string} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
