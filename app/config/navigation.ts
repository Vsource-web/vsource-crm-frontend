// app/config/navigation.ts

import { Users, UserCog, ShieldCheck, Settings2, MapPin } from "lucide-react";

export const navigationItems = [
  {
    moduleCode: "MASTER_LEADS",
    to: "/leads",
    label: "MASTER Leads",
    icon: Users,
  },
  {
    moduleCode: "MBBS_LEADS",
    to: "/mbbs-leads",
    label: "MBBS Leads",
    icon: Users,
  },
  {
    moduleCode: "MASTER_SETTINGS",
    to: "/master-settings",
    label: "Master Settings",
    icon: Settings2,
  },
  {
    moduleCode: "BRANCHES",
    to: "/branches",
    label: "Branches",
    icon: MapPin,
  },
  {
    moduleCode: "ROLES",
    to: "/roles",
    label: "Roles & Permissions",
    icon: ShieldCheck,
  },
  {
    moduleCode: "USERS",
    to: "/users",
    label: "User Management",
    icon: UserCog,
  },
] as const;
