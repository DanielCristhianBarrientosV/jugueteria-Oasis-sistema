import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const TruckIcon = ({ className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M10 17h4V5H2v12h3" />
    <path d="M22 17h-4.32a1 1 0 0 0-.895.553L16 20H8l-1.785-2.447A1 1 0 0 0 5.32 17H2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);
export default TruckIcon;
