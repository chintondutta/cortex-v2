"use client";

import Link from "next/link";
import Image from "next/image";
import {formatDistanceToNow} from "date-fns";
import { useTRPC } from "@/trpc/client";
import {useQuery} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";

export const ProjectsList = () => {
    const trpc = useTRPC();
    const {data: projects} = useQuery(trpc.projects.getMany.queryOptions());
    return (
        <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border flex flex-col gap-y-6">
            <h2 className="text-2xl font-semibold">
                Saved Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {projects?.length === 0 && (
                    <div className="col-span-full text-center">
                        <p className="text-sm text-muted-foreground">
                            No projects found
                        </p>

                    </div>
                )}
                {projects?.map((project) => (
                    <Button key={project.id} variant="outline" className="font-norma h-auto justify-start w-full text-start p-4" asChild>
                        <Link href={`/projects/${project.id}`}>
                            <div>
                                <Image 
                                    src="/logo.svg"
                                    alt="Cortex"
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                />
                                <div className="flex flex-col">
                                    <h3 className="truncate font-medium">
                                        {project.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDistanceToNow(project.updatedAt, {addSuffix: true})}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    );
}