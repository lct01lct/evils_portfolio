import type { Metadata } from "next";
import ResumePage from "@/components/resume/ResumePage";
import type { PersonalDetails } from "@/types/resume";

declare const __RESUME_PRIVATE__: boolean;
declare const __RESUME_PERSONAL_DETAILS__: PersonalDetails | null;

export const metadata: Metadata = {
  title: "刘纯涛 · Coder",
  description: "刘纯涛的 AI、Agent、软件工程与产品作品集",
};

export default function Home() {
  return <ResumePage privateBuild={__RESUME_PRIVATE__} personalDetails={__RESUME_PERSONAL_DETAILS__} />;
}
