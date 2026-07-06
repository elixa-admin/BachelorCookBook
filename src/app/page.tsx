import { redirect } from "next/navigation";

// The live app is the single-file TUB app in /public/tub/tub-app.html.
// next.config.ts already redirects `/` there (non-permanent). This page only
// renders if the redirect is bypassed — fall back to a server redirect so the
// user always lands on the real product. See CLAUDE.md "Current working copy".
export default function Home() {
  redirect("/tub/tub-app.html");
}
