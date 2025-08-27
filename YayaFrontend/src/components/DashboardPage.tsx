// // -----------------------------
// // src/pages/Dashboard.tsx
// // -----------------------------
// import { useState } from "react";
// import { DataTable, type Transaction,  } from "../components/DataTable";
// import SearchBar from "./SearchBar";

// export default function Dashboard() {
//   const currentAccount = "my-account"; // pretend this is the logged-in user

//   const dummyTransactions: Transaction[] = [
//     {
//       id: "tx_001",
//       sender: "alice",
//       receiver: "my-account",
//       amount: 120.5,
//       currency: "USD",
//       cause: "Payment from Alice",
//       createdAt: "2025-08-20T12:45:00Z",
//     },
//     {
//       id: "tx_002",
//       sender: "my-account",
//       receiver: "bob",
//       amount: 75.0,
//       currency: "USD",
//       cause: "Dinner split",
//       createdAt: "2025-08-21T18:30:00Z",
//     },
//     {
//       id: "tx_003",
//       sender: "my-account",
//       receiver: "my-account",
//       amount: 200.0,
//       currency: "USD",
//       cause: "Top-up",
//       createdAt: "2025-08-22T09:10:00Z",
//     },
//     {
//       id: "tx_004",
//       sender: "carol",
//       receiver: "my-account",
//       amount: 99.99,
//       currency: "USD",
//       cause: "Refund",
//       createdAt: "2025-08-24T15:00:00Z",
//     },
//   ];


//     const [query, setQuery] = useState("");

//   // -----------------------------
//   // 🔹 Filter logic
//   // -----------------------------
//   const filteredTransactions = dummyTransactions.filter((tx) =>
//     [tx.sender, tx.receiver, tx.cause, tx.currency, tx.amount.toString()]
//       .some((field) => field.toLowerCase().includes(query.toLowerCase()))
//   );

//   return (
//     <div className="min-h-screen bg-white px-6 py-10">
       
//       <h1 className="text-2xl text-center font-bold mb-6 blue"> Yaya Wallet Transactions Dashboard</h1>
      
//         <div className="mb-6">
//       <SearchBar
//         placeholder="Search transactions..."
//         value={query} // make it controlled
//         onSearch={(e) => setQuery(e.target.value)}
//       />
//     </div>
//       <DataTable rows={filteredTransactions} currentAccount={currentAccount} />
//     </div>
//   );
// }


// -----------------------------
// src/pages/Dashboard.tsx
// -----------------------------




// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { DataTable } from "../components/DataTable";
// import SearchBar from "../components/SearchBar";
// import type { AppDispatch, RootState } from "../store/store";
// import { fetchTransactions, setPage, setQuery } from "../store/features/transactionSlice";

// export default function Dashboard() {
//   const dispatch = useDispatch<AppDispatch>();
//   const currentAccount = "my-account"; // pretend logged-in user

//   const { transactions, loading, error, page, totalPages, query } = useSelector(
//     (state: RootState) => state.transactions
//   );

//   // Fetch transactions whenever page or query changes
// //   useEffect(() => {
// //     dispatch(fetchTransactions({ accountName: currentAccount, page, query }));
// //   }, [dispatch, page, query]);


// useEffect(() => {
//   dispatch(fetchTransactions({ page, query }));
// }, [dispatch, page, query]);

//   // Handle search input
//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(setQuery(e.target.value));
//   };

//   // Handle page change
//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       dispatch(setPage(newPage));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white px-6 py-10">
//       <h1 className="text-2xl font-bold mb-6 blue">Transactions Dashboard</h1>

//       <div className="mb-6">
//         <SearchBar
//           placeholder="Search transactions..."
//           value={query}
//           onSearch={handleSearch}
//         />
//       </div>

//       <DataTable rows={transactions} currentAccount={currentAccount} loading={loading} />

//       {totalPages > 1 && (
//         <div className="flex justify-center items-center mt-6 space-x-2">
//           <button
//             className="px-3 py-1 rounded-lg border border-gray-300 blue"
//             onClick={() => handlePageChange(page - 1)}
//             disabled={page === 1}
//           >
//             Prev
//           </button>
//           <span className="px-3 py-1">{page} / {totalPages}</span>
//           <button
//             className="px-3 py-1 rounded-lg border border-gray-300 blue"
//             onClick={() => handlePageChange(page + 1)}
//             disabled={page === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {error && <p className="text-red-600 mt-4">{error}</p>}
//     </div>
//   );
// }




import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import type { AppDispatch, RootState } from "../store/store";
import { fetchTransactions, setPage, setQuery } from "../store/features/transactionSlice";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const currentAccount = "my-account"; // pretend logged-in user

  const { transactions, loading, error, page, totalPages, query } = useSelector(
    (state: RootState) => state.transactions
  );

  // Fetch transactions whenever page or query changes
  useEffect(() => {
    dispatch(fetchTransactions({ page, query }));
  }, [dispatch, page, query]);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  // Generate page buttons array
  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`px-3 py-1 rounded-lg border border-gray-300 ${
            i === page ? "bg-blue-500 text-white" : "blue"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 blue">Transactions Dashboard</h1>

      <div className="mb-6">
        <SearchBar
          placeholder="Search transactions..."
          value={query}
          onSearch={handleSearch}
        />
      </div>

      <DataTable
        rows={transactions}
        currentAccount={currentAccount}
        loading={loading}
      />

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            className="px-3 py-1 rounded-lg border border-gray-300 blue"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          {renderPageButtons()}
          <button
            className="px-3 py-1 rounded-lg border border-gray-300 blue"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}







