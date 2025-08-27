


import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "./components/DataTable";
import SearchBar from "./components/SearchBar";
import type { AppDispatch, RootState } from "./store/store";
import { fetchTransactions, setPage, setQuery } from "./store/features/transactionSlice";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const currentAccount = "yayawalletpi"; // pretend logged-in user

  const { transactions, loading, error, page, total, perPage, query, incomingSum, outgoingSum } = useSelector(
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
    if (newPage >= 1 && newPage <= total) {
      dispatch(setPage(newPage));
    }
  };

  // Generate page buttons array
  const renderPageButtons = () => {
    const buttons = [];
    const numPages = perPage > 0 ? Math.ceil(total / perPage) : 1;
    for (let i = 1; i <= numPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`px-3 py-1 rounded-lg border border-gray-300 ${
            i === page ? "bg-blue text-white" : "blue"
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
      <div className="flex flex-col justify-center items-center">

         <h1 className="text-md md:text-2xl font-bold mb-6 blue">Yaya Wallet Transactions Dashboard</h1>

      <div className="mb-4 flex gap-8">
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
          Incoming Total: {incomingSum} ETB
        </div>
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-semibold">
          Outgoing Total: {outgoingSum} ETB
        </div>
      </div>
      
      <div className="mb-6">
        <SearchBar
          placeholder="Search transactions..."
          value={query}
          onSearch={handleSearch}
        />
      </div>

      </div>
     


      <DataTable
        rows={transactions}
        currentAccount={currentAccount}
        loading={loading}
      />

      {total > 1 && (
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
            disabled={page === total}
          >
            Next
          </button>
        </div>
      )}

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}







