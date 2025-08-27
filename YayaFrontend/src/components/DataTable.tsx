// -----------------------------
// src/components/DataTable.tsx
// -----------------------------

import { motion } from 'framer-motion';
import { Loader2, WalletMinimal } from 'lucide-react';
import { Badge } from './Badge';

export interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  currency: string;
  cause: string;
  createdAt: string;
}

function getDirection(tx: Transaction, currentAccount: string) {
  if (tx.sender === tx.receiver) return "incoming";
  return tx.receiver === currentAccount ? "incoming" : "outgoing";
}

 function formatAmount(amount: number) { return amount.toFixed(2); }

interface DataTableProps {
  rows: Transaction[];
  currentAccount: string;
  loading?: boolean;
}

export function DataTable({ rows, currentAccount, loading }: DataTableProps) {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl ring-1 ring-black/5">
      <div className="max-h-[60vh] overflow-auto">
        <table className="w-full font-sans text-left">
          <thead className="sticky top-0 z-10 bg-gray-50/90 backdrop-blur">
            <tr className="text-xs tracking-wider uppercase blue">
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Sender</th>
              <th className="px-4 py-3">Receiver</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Currency</th>
              <th className="px-4 py-3">Cause</th>
              <th className="px-4 py-3">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-600"><Loader2 className="mx-auto animate-spin" /> Loading...</td></tr>}
            {!loading && rows.length === 0 && <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-500"><WalletMinimal className="w-8 h-8 mx-auto mb-2" />No transactions found.</td></tr>}
            {!loading && rows.map((tx) => {
              const dir = getDirection(tx, currentAccount);
              const isIn = dir === "incoming";
              return (
                <motion.tr key={tx.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }} className="hover:bg-gray-50/60">
                  <td className="px-4 py-3"><Badge intent={dir}>{isIn ? "Incoming" : "Outgoing"}</Badge></td>
                  <td className="px-4 py-3 font-mono text-xs purple">{tx.id}</td>
                  <td className="px-4 py-3 blue">{tx.sender}</td>
                  <td className="px-4 py-3 blue">{tx.receiver}</td>
                  <td className={`px-4 py-3 font-semibold ${isIn ? "text-emerald-700" : "text-rose-700"}`}>{isIn ? "+" : "-"}{formatAmount(tx.amount)}</td>
                  <td className="px-4 py-3 blue">{tx.currency}</td>
                  <td className="px-4 py-3 purple">{tx.cause}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(tx.createdAt).toLocaleString()}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
