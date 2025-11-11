import { openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";
import {Sandbox} from "@e2b/code-interpreter"
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("cortex-nextjs-test");
      return sandbox.sandboxId;
    });
      const codeAgent = createAgent({
        name: "code-agent",
        system: "You are a next.js developer. You write readable and maintainable code. You write Next.js & React snippets.",
        model: openai({ model: "gpt-3.5-turbo", apiKey: process.env.OPENAI_API_KEY }),
      });
      const {output} = await codeAgent.run(
        `Write the following snippet: ${event.data.value}`,
      );
      const sandboxUrl = await step.run("get-sandbox-url", async () => {
        const sandbox = await getSandbox(sandboxId);
        const host = sandbox.getHost(3000);
        return `https://${host}`;
      });
      return { output, sandboxUrl };
    },
);