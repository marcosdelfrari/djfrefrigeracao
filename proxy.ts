import { withMarkdown } from "@markdown-for-agents/nextjs";
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";

const markdownOptions = {
  extract: true,
  deduplicate: true,
  contentSignal: {
    aiTrain: false,
    search: true,
    aiInput: true,
  },
};

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/markdown")) {
    const response = NextResponse.next();
    response.headers.append("Vary", "Accept");
    return response;
  }

  const handler = withMarkdown(
    async (req: NextRequest) =>
      fetch(req.url, { headers: { accept: "text/html" } }),
    { ...markdownOptions, baseUrl: request.nextUrl.origin },
  );

  return (await handler(request, event)) ?? NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
