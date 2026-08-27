import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "刘纯涛 · Coder",
  description: "刘纯涛的 AI、Agent、软件工程与产品作品集",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
