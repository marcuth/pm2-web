import { Outfit, Geist_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Providers from "./providers"
import AppSidebar from "@/components/layout/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={cn("font-sans", outfit.variable, geistMono.variable)}>
            <body className="antialiased min-h-screen bg-background text-foreground transition-colors text-sm">
                <Providers>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <TooltipProvider delayDuration={0}>
                            <SidebarProvider>
                                <AppSidebar />
                                <SidebarInset className="bg-background flex flex-col transition-all">
                                    <header className="flex h-[70px] shrink-0 items-center justify-between px-4 md:px-8 lg:px-12 border-b transition-all ease-linear">
                                        <div className="flex items-center gap-2">
                                            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-primary transition-colors" />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <ModeToggle />
                                        </div>
                                    </header>
                                    <div className="flex flex-1 flex-col p-4 md:p-8 lg:p-12 overflow-hidden">
                                        {children}
                                    </div>
                                </SidebarInset>
                            </SidebarProvider>
                        </TooltipProvider>
                    </ThemeProvider>
                </Providers>
            </body>
        </html>
    )
}
