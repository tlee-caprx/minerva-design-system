import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/** Shared behavior; the root Judi theme selects all visual values. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { type = "button", className = "", ...props },
  ref,
) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={["judi-button", className].filter(Boolean).join(" ")}
    />
  );
});
