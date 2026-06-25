import os

file_path = "/Users/rajeevjoshi/Documents/ChadWallet/src/components/wallet/PortfolioBalances.tsx"

with open(file_path, 'r') as f:
    content = f.read()

replacements = {
    "bg-zinc-950/50 rounded-xl border border-zinc-800": "bg-bg-secondary rounded-xl border border-foreground/10",
    "text-zinc-500": "text-foreground/50",
    "bg-zinc-950/50": "bg-bg-primary",
    "border-zinc-800": "border-foreground/10",
    "bg-zinc-900 hover:bg-zinc-800": "bg-bg-secondary hover:bg-bg-tertiary",
    "text-zinc-400": "text-foreground/60",
    "text-white": "text-foreground",
    "bg-zinc-900 border border-zinc-800": "bg-bg-secondary border border-foreground/10",
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(file_path, 'w') as f:
    f.write(content)
