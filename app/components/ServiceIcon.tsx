import {
  Bot,
  ChartColumn,
  Clapperboard,
  Cloud,
  CodeXml,
  Glasses,
  GraduationCap,
  Megaphone,
  MonitorSmartphone,
  PenTool,
  ShoppingBag,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { SERVICE_ICONS } from "@/lib/content-schema";

const ICONS: Record<(typeof SERVICE_ICONS)[number], LucideIcon> = {
  megaphone: Megaphone,
  clapperboard: Clapperboard,
  monitor: MonitorSmartphone,
  code: CodeXml,
  bot: Bot,
  pen: PenTool,
  trending: TrendingUp,
  chart: ChartColumn,
  cart: ShoppingBag,
  glasses: Glasses,
  cloud: Cloud,
  graduation: GraduationCap,
};

export default function ServiceIcon({
  name,
  size = 20,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = ICONS[name as keyof typeof ICONS] ?? Megaphone;
  return <Icon size={size} strokeWidth={1.5} aria-hidden className={className} />;
}
