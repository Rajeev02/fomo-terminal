import os

file_path = "/Users/rajeevjoshi/Documents/ChadWallet/src/components/swap/SniperPanel.tsx"

with open(file_path, 'r') as f:
    content = f.read()

replacements = {
    "bg-white dark:bg-zinc-900 border border-[var(--chad-green)]/30": "bg-bg-primary border border-[var(--chad-green)]/30",
    "text-lg text-zinc-900 dark:text-white": "text-lg text-foreground",
    "bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800": "bg-bg-secondary border border-foreground/10",
    "text-xs text-zinc-500 font-bold": "text-xs text-foreground/50 font-bold",
    "font-mono text-sm text-zinc-700 dark:text-zinc-300": "font-mono text-sm text-foreground/70",
    "font-mono text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700": "font-mono text-foreground placeholder:text-foreground/30",
    "font-mono text-zinc-900 dark:text-white": "font-mono text-foreground",
    "bg-zinc-100/80 dark:bg-zinc-950/50 rounded-lg p-3 text-sm font-mono text-zinc-600 dark:text-zinc-400 flex items-start gap-2 border border-zinc-200 dark:border-zinc-800": "bg-bg-tertiary rounded-lg p-3 text-sm font-mono text-foreground/60 flex items-start gap-2 border border-foreground/10",
    "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500": "bg-bg-secondary text-foreground/50",
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(file_path, 'w') as f:
    f.write(content)
