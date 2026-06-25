import os

file_path = "/Users/rajeevjoshi/Documents/ChadWallet/src/components/swap/SwapPanel.tsx"

with open(file_path, 'r') as f:
    content = f.read()

replacements = {
    "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800": "bg-bg-primary border border-foreground/10",
    "bg-zinc-100 dark:bg-zinc-950 rounded-xl p-1 mb-6 border border-zinc-200 dark:border-zinc-800": "bg-bg-secondary rounded-xl p-1 mb-6 border border-foreground/10",
    "text-zinc-500 hover:text-zinc-900 dark:hover:text-white": "text-foreground/50 hover:text-foreground",
    "bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800": "bg-bg-secondary border border-foreground/10",
    "focus-within:border-[var(--chad-green)]": "focus-within:border-[var(--chad-green)]",
    "text-xs text-zinc-500 font-bold": "text-xs text-foreground/50 font-bold",
    "font-mono text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700": "font-mono text-foreground placeholder:text-foreground/30",
    "bg-zinc-200 dark:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700": "bg-bg-tertiary px-3 py-1.5 rounded-lg border border-foreground/10",
    "text-sm text-zinc-900 dark:text-white": "text-sm text-foreground",
    "bg-white dark:bg-zinc-800 p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white": "bg-bg-secondary p-2 rounded-xl border border-foreground/10 text-foreground",
    "text-zinc-400": "text-foreground/50",
    "text-zinc-500": "text-foreground/50",
    "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500": "bg-bg-tertiary text-foreground/40",
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(file_path, 'w') as f:
    f.write(content)
