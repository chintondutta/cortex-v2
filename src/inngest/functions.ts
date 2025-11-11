import { openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
      const codeAgent = createAgent({
        name: "code-agent",
        system: "You are a next.js developer. You write readable and maintainable code. You write Next.js & React snippets.",
        model: openai({ model: "gpt-3.5-turbo", apiKey: process.env.OPENAI_API_KEY }),
      });
      const {output} = await codeAgent.run(
        `Write the following snippet: ${event.data.value}`,
      );
      return { output };
    },
);