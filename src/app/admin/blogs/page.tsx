"use client";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import BlogList from "@/components/global/blogs/blogList";
import AnimatedButton from "@/components/global/globalButton";
import Link from "next/link";

const page = () => {
  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Blogs 📝" description="Blogs Listing And Actions " />
          <div className="flex  w-1/2 items-center justify-end gap-2">
            <AnimatedButton
              isLoading={false}
              text="Create"
              link="/admin/blogs/create"
              className="w-fit px-3 "
            />
          </div>
        </div>

        <Separator />
        <BlogList />
      </div>
    </PageContainer>
  );
};

export default page;
