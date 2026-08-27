import type { Metadata } from "next";
import ResumePage from "@/components/resume/ResumePage";

export const metadata: Metadata = {
  title: "刘纯涛 · Coder",
  description: "刘纯涛的 AI、Agent、软件工程与产品作品集",
};

export const dynamic = "force-static";

export default function Home() {
  return <ResumePage />;
}
