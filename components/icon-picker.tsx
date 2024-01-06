"use client";

type Props = {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
};

import EmojiPicker, { Theme } from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";

const IconPicker = ({ onChange, children, asChild }: Props) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeOptions;

  const themeOptions = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeOptions[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
