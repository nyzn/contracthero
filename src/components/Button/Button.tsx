import { ButtonHTMLAttributes, forwardRef } from "react";
import styled from "styled-components";
import tw, { TwStyle } from "twin.macro";

type Size = "small" | "medium" | "large";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  size?: Size;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

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

const Root = styled.button<{ primary: boolean; size: Size; disabled: boolean }>(
  ({ primary = true, size = "medium", disabled = false }) => [
    tw`
      rounded-lg
      border
      bg-orange-100
      cursor-pointer
      transition
      hover:border-white
      w-fit
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      label,
      type = "button",
      disabled = false,
      primary = true,
      size = "medium",
      ...rest
    } = props;

    return (
      <Root
        primary={primary}
        ref={ref}
        type={type}
        size={size}
        disabled={disabled}
        {...rest}
      >
        {label}
      </Root>
    );
  }
);
