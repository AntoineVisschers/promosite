import React from "react";

interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export default function Title({ level = 1, children }: TitleProps) {
  return React.createElement(
    `h${level}`,
    { className: `title-h${level}` },
    children
  );
}
