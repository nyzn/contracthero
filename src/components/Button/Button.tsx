import { forwardRef, PropsWithChildren } from "react";
import styled from "styled-components";
import tw, { TwStyle } from "twin.macro";

type Size = "small" | "medium" | "large";

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * How large should the button be?
   */
  size?: Size;
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;

  /**
   * Is Button disabled?
   */
  disabled?: boolean;
}

const rootSizeVariant: Record<Size, TwStyle> = {
  small: tw`
    text-sm
    px-1
    py-0
  `,
  medium: tw`
    text-base
    px-2
    py-1
  `,
  large: tw`
    text-lg
    px-3
    py-2
  `,
};

const Root = styled.button<ButtonProps>(
  ({ primary = true, size = "medium", label, disabled = false }) => [
    tw`
      rounded-lg
      border
      bg-orange-400
      cursor-pointer
      transition
      hover:border-white
    `,
    !primary &&
      tw`
        bg-orange-200  
    `,
    disabled &&
      tw`
      opacity-70
      text-gray-500
      cursor-default
      `,
    rootSizeVariant[size],
  ]
);

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>((props, ref) => {
  const { children, label } = props;

  return <Root {...props}>{label}</Root>;
});
