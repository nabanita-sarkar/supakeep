import { MantineProvider, Global, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Layout from "components/Layout";
// import Login from "pages/login";
import Main from "pages/main";
import Note from "pages/note";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useState<ColorScheme | undefined>(document.body.dataset.theme as ColorScheme);

  const toggleColorScheme = (value?: ColorScheme) => setTheme(value || (theme === "dark" ? "light" : "dark"));

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme as ColorScheme);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme) {
      document.body.dataset.theme = theme;
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <ColorSchemeProvider colorScheme={theme ?? "light"} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: theme,
          fontFamily: "Inter",
          fontSizes: [400, 500, 600, 700],
          defaultRadius: 6,
          colors: {
            primary: [
              "#f8fafc",
              "#f1f5f9",
              "#e2e8f0",
              "#cbd5e1",
              "#94a3b8",
              "#64748b",
              "#475569",
              "#334155",
              "#1e293b",
              "#1d232f",
            ],
            gray: [
              "#f8fafc",
              "#f1f5f9",
              "#e2e8f0",
              "#cbd5e1",
              "#94a3b8",
              "#64748b",
              "#475569",
              "#334155",
              "#1e293b",
              "#1d232f",
            ],
            dark: [
              "#f8fafc",
              "#f1f5f9",
              "#e2e8f0",
              "#cbd5e1",
              "#94a3b8",
              "#64748b",
              "#475569",
              "#334155",
              "#1e293b",
              "#1d232f",
            ],
          },
          primaryColor: "primary",
          primaryShade: 4,
          components: {
            Button: {
              styles: () => ({
                label: {
                  fontWeight: 400,
                },
              }),
            },
            ActionIcon: {
              defaultProps: {
                radius: "xl",
              },
              styles: (theme) => ({
                root: {
                  color: theme.colors.gray[4],
                },
              }),
            },
            TextInput: {
              styles: (theme) => ({
                input: {
                  borderWidth: "2px",
                  borderColor: theme.colorScheme === "dark" ? theme.colors.gray[7] : theme.colors.gray[2],
                  "&:focus": {
                    borderColor: theme.colorScheme === "dark" ? theme.colors.primary[7] : theme.colors.primary[2],
                  },
                },
              }),
            },
            Tooltip: {
              styles: () => ({
                tooltip: {
                  background: "black",
                  fontSize: 12,
                  fontWeight: 500,
                },
              }),
            },
          },
        }}
      >
        <Global
          styles={(theme) => ({
            body: {
              fontFamily: "Inter",
              fontSize: 14,
              color: theme.colorScheme === "dark" ? theme.colors.gray[2] : theme.colors.gray[7],
              background: theme.colorScheme === "dark" ? theme.colors.gray[7] : theme.colors.gray[0],
            },
            "p, h1, h2, h3, h4, h5": {
              margin: 0,
              color: theme.colorScheme === "dark" ? theme.colors.gray[2] : theme.colors.gray[8],
              fontFamily: "Inter",
            },
            p: {
              fontSize: 14,
            },
            h1: {
              fontSize: 28,
              fontWeight: 700,
            },
            h2: {
              fontSize: 24,
              fontWeight: 600,
            },
            h3: {
              fontSize: 20,
              fontWeight: 600,
            },
            h4: {
              fontSize: 18,
              fontWeight: 600,
            },
            h5: {
              fontSize: 16,
              fontWeight: 600,
            },
            small: {
              fontSize: 12,
              color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.colors.gray[5],
            },
            b: {
              fontWeight: 500,
            },
          })}
        />
        <IconContext.Provider value={{ style: { width: 20, height: 20, verticalAlign: "middle" } }}>
          <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <BrowserRouter>
              <Routes>
                {/* <Route path="/" element={<Login />} /> */}
                <Route path="note" element={<Note />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Main />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </IconContext.Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
