// 'use client';
// import {useTRPC} from '@/trpc/client';
// import { useQuery } from '@tanstack/react-query';
// import { caller } from '@/trpc/server';
import {getQueryClient, trpc} from '@/trpc/server';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';
import { Suspense } from 'react';
import Client from './client';

const Page = async () => {
// const trpc = useTRPC();
// const {data} = useQuery(trpc.hello.queryOptions({text: 'world'}));
// const data = await caller.hello({text: 'world'});
const queryClient = getQueryClient();
void queryClient.prefetchQuery(trpc.hello.queryOptions({text: 'world'}));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <Client />
      </Suspense>
    </HydrationBoundary>
  );
}

export default Page;