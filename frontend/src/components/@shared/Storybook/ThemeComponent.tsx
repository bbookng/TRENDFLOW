import { ThemeProvider } from '@emotion/react';
import { useAppSelector } from '@/hooks/storeHook';
import { darkTheme, lightTheme } from '@/styles/theme';

// Storybook에서 ThemeProvider를 사용해야하는
interface Props {
  children: React.ReactNode;
}

const ThemeComponent = ({ children }: Props) => {
  const { isDark } = useAppSelector((state) => state);
  return <ThemeProvider theme={isDark ? darkTheme : lightTheme}>{children}</ThemeProvider>;
};

export default ThemeComponent;
