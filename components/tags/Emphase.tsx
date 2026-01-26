import React from "react";

interface EmphaseProps {
  children: React.ReactNode;
}

export default function Emphase({ children }: EmphaseProps) {
  return (
      <em className="italic">{children}</em>
  );
}
