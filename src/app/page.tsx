"use client";
import { useMemo, useState } from "react";

function calcVibe(input: string) {
  if (!input) return 0;
  let sum = 0;
  for (let i = 0; i < input.length; i++) sum += input.charCodeAt(i) * (i + 1);
  const score = (sum % 101);
  return score;
}

function verdict(score: number) {
  if (score < 25) return "Low-key";
  if (score < 50) return "Chill";
  if (score < 75) return "Vibey";
  if (score < 90) return "Spicy";
  return "Off the charts";
}

export default function Home() {
  const [handle, setHandle] = useState("");
  const score = useMemo(() => calcVibe(handle.trim().toLowerCase()), [handle]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
      <main className="flex w-full max-w-xl flex-col gap-8 rounded-2xl border border-black/10 bg-white p-8 dark:border-white/20 dark:bg-black">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">Farcaster Vibe Check</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Enter a Farcaster username or FID to check the vibe.</p>
        </div>

        <div className="flex w-full items-center gap-3">
          <input
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="e.g. @alice or 12345"
            className="flex-1 rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none ring-0 focus:border-black/20 dark:border-white/20 dark:focus:border-white/30"
          />
          <button
            className="rounded-xl bg-foreground px-5 py-3 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            onClick={() => setHandle(handle)}
          >
            Check
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Score</span>
            <span className="text-lg font-medium">{score}/100</span>
          </div>
          <div className="h-4 w-full rounded-full bg-black/10 dark:bg-white/10">
            <div
              style={{ width: `${score}%` }}
              className="h-4 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-500"
            />
          </div>
          <div className="text-center text-xl font-semibold">{verdict(score)}</div>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          Placeholder scoring. Hook this up to Farcaster APIs or your own heuristics.
        </p>
      </main>
    </div>
  );
}
