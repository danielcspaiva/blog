import type { ComponentType } from "react";
import { Callout } from "@/components/Callout";
import TaskEquationVisualizer from "@/components/TaskEquationVisualizer";
import HumanVsAIRadarChart from "@/components/HumanVsAIRadarChart";
import { MdxImage } from "@/components/mdx/mdx-image";

// Components available to every MDX document (both the named custom components
// used in posts and overrides for intrinsic elements like <img>).
export const mdxComponents: Record<string, ComponentType<any>> = {
  Callout,
  TaskEquationVisualizer,
  HumanVsAIRadarChart,
  img: MdxImage,
};
