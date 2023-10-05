import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import App from "./App";
// import clsx from "clsx";
import "./styles.css";
// import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google"

// export const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })

// export const fontMono = FontMono({
//   subsets: ["latin"],
//   variable: "--font-mono",
// })

// removed <React.StrictMode>

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div className="dark bg-background">
          <div className="w-screen dark text-foreground bg-background p-8 flex items-start justify-center">
            <App />
          </div>  
        </div>
      </NextThemesProvider>
    </NextUIProvider>

);