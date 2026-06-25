import os

replacements = {
    "/Users/rajeevjoshi/Documents/ChadWallet/src/components/swap/SwapPanel.tsx": [
        ("bg-zinc-100 dark:bg-zinc-800 text-foreground/50 dark:text-foreground/50", "bg-bg-tertiary text-foreground/50"),
    ],
    "/Users/rajeevjoshi/Documents/ChadWallet/src/app/page.tsx": [
        ("bg-zinc-900 rounded-full border border-zinc-700", "bg-bg-secondary rounded-full border border-foreground/10"),
        ("bg-zinc-900 rounded-full border border-[var(--chad-purple)]", "bg-bg-secondary rounded-full border border-[var(--chad-purple)]"),
    ],
    "/Users/rajeevjoshi/Documents/ChadWallet/src/app/trade/[token]/page.tsx": [
        ("bg-zinc-800 rounded animate-pulse", "bg-bg-tertiary rounded animate-pulse"),
    ],
    "/Users/rajeevjoshi/Documents/ChadWallet/src/components/auth/AuthButton.tsx": [
        ("border-zinc-500 border-t-transparent", "border-foreground/50 border-t-transparent"),
        ("text-xs text-zinc-500", "text-xs text-foreground/50"),
        ("text-zinc-400 hover:text-red-400", "text-foreground/50 hover:text-red-400"),
    ],
    "/Users/rajeevjoshi/Documents/ChadWallet/src/components/auth/ProtectedRoute.tsx": [
        ("border-zinc-800 border-t-[var(--chad-green)]", "border-foreground/10 border-t-[var(--chad-green)]"),
        ("text-zinc-500 font-mono", "text-foreground/50 font-mono"),
    ],
    "/Users/rajeevjoshi/Documents/ChadWallet/src/components/ui/Input.tsx": [
        ("placeholder:text-zinc-500", "placeholder:text-foreground/50"),
    ],
    "/Users/rajeevjoshi/Documents/ChadWallet/src/components/wallet/PortfolioBalances.tsx": [
        ("bg-zinc-900 border border-foreground/10", "bg-bg-secondary border border-foreground/10"),
    ]
}

for file_path, file_replacements in replacements.items():
    with open(file_path, 'r') as f:
        content = f.read()
    
    for old, new in file_replacements:
        content = content.replace(old, new)
        
    with open(file_path, 'w') as f:
        f.write(content)
