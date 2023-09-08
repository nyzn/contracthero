import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from "react";
import styled from "styled-components";
import tw, { TwStyle } from "twin.macro";

type Size = "small" | "medium" | "large";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  size?: Size;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: string;
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

const Root = styled.button<{
  $primary: boolean;
  $size: Size;
  disabled: boolean;
}>(({ $primary = false, $size = "medium", disabled = false }) => [
  tw`
      rounded-lg
      border
      !bg-orange-400
      cursor-pointer
      hover:border-white
      w-fit
  `,
  !$primary &&
    tw`
      !bg-orange-600  
    `,
  disabled &&
    tw`
      opacity-70
      text-gray-500
      cursor-default
      !bg-orange-200
      `,
  rootSizeVariant[$size],
]);

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>((props, ref) => {
  const {
    children,
    label,
    disabled = false,
    primary = false,
    type = "button",
    size = "medium",
    ...rest
  } = props;

  return (
    <Root
      ref={ref}
      $primary={primary}
      $size={size}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {label}
    </Root>
  );
});
