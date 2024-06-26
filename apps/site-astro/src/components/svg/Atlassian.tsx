import type { SVGAttributes } from "react";

export default function AtlassianLogo(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient
          id="a"
          x1="99.687%"
          x2="39.836%"
          y1="15.801%"
          y2="97.438%"
        >
          <stop offset="0%" stopColor="#0052CC" />
          <stop offset="92.3%" stopColor="#2684FF" />
        </linearGradient>
      </defs>
      <path
        d="M75.793 117.95c-3.82-4.08-9.77-3.85-12.367 1.342L.791 244.565a7.488 7.488 0 006.697 10.838h87.228a7.22 7.22 0 006.699-4.14c18.808-38.89 7.413-98.018-25.622-133.314z"
        fill="url(#a)"
      />
      <path
        d="M121.756 4.011c-35.033 55.505-32.721 116.979-9.646 163.13l42.06 84.121a7.488 7.488 0 006.697 4.14h87.227a7.488 7.488 0 006.697-10.838S137.445 9.837 134.493 3.964c-2.64-5.258-9.344-5.33-12.737.047z"
        fill="#2681FF"
      />
    </svg>
  );
}
