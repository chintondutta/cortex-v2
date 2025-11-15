"use client";

import Image from "next/image";
import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";

const Page = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full min-h-[calc(100vh-2rem)]">
    <section className="space-y-6 flex-1 flex flex-col justify-center pb-12 pt-12">
      <div className="flex flex-col items-center">
        <Image
          src="/logo.svg"
          alt="Cortex"
          width={80}
          height={80}
          className="hidden md:block"
        />
      </div>
      <h1 className="text-2xl md:text-5xl font-bold text-center">
        Build something with Cortex
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground text-center">
        Create apps and websites by chatting with AI
      </p>
      <div className="max-w-3xl mx-auto w-full">
        <ProjectForm />
      </div>
    </section>
     
    </div>
  );
}

export default Page;