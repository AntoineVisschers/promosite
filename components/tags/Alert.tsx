import { ReactNode } from "react";

type AlertProps = {
  variant: "info" | "warning" | "error";
  children: ReactNode;
};

export default function Alert({ variant, children }: AlertProps) {
  return (
    <div>
      <strong className="mb-1 block capitalize">{variant}</strong>
      <div>{children}</div>
    </div>
  );
}
