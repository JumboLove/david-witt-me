import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { getSanityTypeDisplayText } from "@/lib/sanityStrings";
import { getUrlForSanityType } from "@/lib/url";
import { cn } from "@/lib/utils";
import React from "react";

const topNavLinks = {
  projects: {
    href: getUrlForSanityType("project", ""),
    title: getSanityTypeDisplayText("project", true),
  },
};

const digitalGardenNavLinks: {
  href: string;
  title: string;
  description: string;
}[] = [
  {
    href: getUrlForSanityType("post", ""),
    title: getSanityTypeDisplayText("post", true),
    description: "Long form content - guides, tutorials, retrospectives",
  },
  {
    href: getUrlForSanityType("note", ""),
    title: getSanityTypeDisplayText("note", true),
    description: "Small thoughts, quotes, quick jokes",
  },
  {
    href: "/library",
    title: "Library",
    description: "Media I love, or media I hope to love one day",
  },
];

export function SiteNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/about"
            className={navigationMenuTriggerStyle()}
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href={topNavLinks.projects.href}
            className={navigationMenuTriggerStyle()}
          >
            {topNavLinks.projects.title}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Digital Garden</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              {digitalGardenNavLinks.map((navLink) => (
                <ListItem
                  key={navLink.title}
                  title={navLink.title}
                  href={navLink.href}
                >
                  {navLink.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
