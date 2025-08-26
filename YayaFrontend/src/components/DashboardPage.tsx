// -----------------------------
// src/pages/Dashboard.tsx
// -----------------------------
import { useState } from "react";
import { DataTable, type Transaction,  } from "../components/DataTable";
import SearchBar from "./SearchBar";

export default function Dashboard() {
  const currentAccount = "my-account"; // pretend this is the logged-in user

  const dummyTransactions: Transaction[] = [
    {
      id: "tx_001",
      sender: "alice",
      receiver: "my-account",
      amount: 120.5,
      currency: "USD",
      cause: "Payment from Alice",
      createdAt: "2025-08-20T12:45:00Z",
    },
    {
      id: "tx_002",
      sender: "my-account",
      receiver: "bob",
      amount: 75.0,
      currency: "USD",
      cause: "Dinner split",
      createdAt: "2025-08-21T18:30:00Z",
    },
    {
      id: "tx_003",
      sender: "my-account",
      receiver: "my-account",
      amount: 200.0,
      currency: "USD",
      cause: "Top-up",
      createdAt: "2025-08-22T09:10:00Z",
    },
    {
      id: "tx_004",
      sender: "carol",
      receiver: "my-account",
      amount: 99.99,
      currency: "USD",
      cause: "Refund",
      createdAt: "2025-08-24T15:00:00Z",
    },
  ];


    const [query, setQuery] = useState("");

  // -----------------------------
  // 🔹 Filter logic
  // -----------------------------
  const filteredTransactions = dummyTransactions.filter((tx) =>
    [tx.sender, tx.receiver, tx.cause, tx.currency, tx.amount.toString()]
      .some((field) => field.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 blue">Transactions Dashboard</h1>
      
        <div className="mb-6">
      <SearchBar
        placeholder="Search transactions..."
        value={query} // make it controlled
        onSearch={(e) => setQuery(e.target.value)}
      />
    </div>
      <DataTable rows={filteredTransactions} currentAccount={currentAccount} />
    </div>
  );
}
