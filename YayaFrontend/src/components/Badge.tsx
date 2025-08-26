import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
export function Badge({ intent, children }: { intent: "incoming" | "outgoing"; children: React.ReactNode }) {
const intentClasses = intent === "incoming" ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-rose-50 text-rose-700 ring-rose-200";
const Icon = intent === "incoming" ? ArrowDownLeft : ArrowUpRight;
return (
<span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ring-1 ${intentClasses}`}>
<Icon className="w-3.5 h-3.5" />
{children}
</span>
);
}