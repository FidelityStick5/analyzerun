"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "@/icons/dashboard.svg";
import RunningIcon from "@/icons/running.svg";
import SettingsIcon from "@/icons/settings.svg";

type NavbarElementsType = {
  name: string;
  path: string;
  Icon: React.FC<React.SVGProps<SVGElement>>;
};

type NavbarElementType = NavbarElementsType & { isActive: boolean };

const navbarElements: Array<NavbarElementsType> = [
  {
    name: "Dashboard",
    path: "/dashboard",
    Icon: DashboardIcon,
  },
  {
    name: "Activities",
    path: "/dashboard/activities",
    Icon: RunningIcon,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    Icon: SettingsIcon,
  },
];

function NavbarElement({ name, path, Icon, isActive }: NavbarElementType) {
  return (
    <Link
      href={path}
      className={`flex h-full items-center justify-center rounded transition-colors max-md:flex-grow max-md:flex-col md:h-16 md:w-full md:justify-start md:gap-4 md:px-4 ${isActive ? "bg-background fill-accent text-accent hover:fill-text hover:text-text" : "fill-text text-text hover:fill-accent hover:text-accent"}`}
    >
      <Icon className="h-8 w-8 fill-inherit md:h-12 md:w-12" />
      <span className="text-xs md:text-sm">{name}</span>
    </Link>
  );
}

export default function Navbar() {
  const location = usePathname();

  return (
    <nav className="text-text flex items-center justify-center gap-4 max-md:order-1 max-md:p-4 md:flex-col md:justify-start">
      {navbarElements.map((navbarElement) => (
        <NavbarElement
          {...navbarElement}
          isActive={location === navbarElement.path}
          key={navbarElement.path}
        />
      ))}
    </nav>
  );
}
