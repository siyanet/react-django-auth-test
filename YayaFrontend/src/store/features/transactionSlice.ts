

// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// // Transaction type
// export interface Transaction {
//   id: string;
//   sender: string;
//   receiver: string;
//   amount: number;
//   currency: string;
//   cause: string;
//   createdAt: string;
// }

// // Slice state
// interface TransactionsState {
//   transactions: Transaction[];
//   loading: boolean;
//   error: string | null;
//   page: number;
//   totalPages: number;
//   query: string;
// }

// const initialState: TransactionsState = {
//   transactions: [],
//   loading: false,
//   error: null,
//   page: 1,
//   totalPages: 1,
//   query: "",
// };

// // Async thunk to fetch transactions
// export const fetchTransactions = createAsyncThunk<
//   { transactions: Transaction[]; totalPages?: number },
//   { page?: number; query?: string }
// >(
//   "transactions/fetchTransactions",
//   async ({ page = 1, query = "" }, { rejectWithValue }) => {
//     try {
//       const params: any = { p: page };
//       if (query) params.query = query;

//       const response = await axios.get("http://localhost:8000/transactions/fetch-transactions/", { params });

//       // Normalize API response
//       const dataArray = Array.isArray(response.data.data) ? response.data.data : [];
//       console.log("dataarray");
//       console.log(dataArray);

//       const transactions: Transaction[] = dataArray.map((tx: any) => ({
//         id: tx.id,
//         sender: tx.sender.account,
//         receiver: tx.receiver.account,
//         amount: tx.amount,
//         currency: tx.currency,
//         cause: tx.cause,
//         createdAt: new Date(tx.created_at_time * 1000).toISOString(),
//       }));

//       return {
//         transactions,
//         totalPages: response.data.total_pages || 1,
//       };
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.error || error.message);
//     }
//   }
// );

// const transactionsSlice = createSlice({
//   name: "transactions",
//   initialState,
//   reducers: {
//     setQuery(state, action: PayloadAction<string>) {
//       state.query = action.payload;
//       state.page = 1; // reset page when search changes
//     },
//     setPage(state, action: PayloadAction<number>) {
//       state.page = action.payload;
//     },
//     clearTransactions(state) {
//       state.transactions = [];
//       state.page = 1;
//       state.totalPages = 1;
//       state.query = "";
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTransactions.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchTransactions.fulfilled, (state, action) => {
//         state.loading = false;
//         state.transactions = action.payload.transactions;
//         state.totalPages = action.payload.totalPages || 1;
//       })
//       .addCase(fetchTransactions.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { setQuery, setPage, clearTransactions } = transactionsSlice.actions;
// export default transactionsSlice.reducer;



import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Transaction type
export interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  currency: string;
  cause: string;
  createdAt: string;
}

// Slice state
interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  query: string;
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  query: "",
};

// Async thunk to fetch transactions
export const fetchTransactions = createAsyncThunk<
  { transactions: Transaction[]; totalPages?: number },
  { page?: number; query?: string }
>(
  "transactions/fetchTransactions",
  async ({ page = 1, query = "" }, { rejectWithValue }) => {
    try {
      const params: any = { p: page };
      if (query) params.query = query;

      const response = await axios.get("http://localhost:8000/transactions/fetch-transactions/", { params });

      // Normalize API response
      const dataArray = Array.isArray(response.data.data) ? response.data.data : [];

      const transactions: Transaction[] = dataArray.map((tx: any) => ({
        id: tx.id,
        sender: tx.sender.account,
        receiver: tx.receiver.account,
        amount: tx.amount,
        currency: tx.currency,
        cause: tx.cause,
        createdAt: new Date(tx.created_at_time * 1000).toISOString(),
      }));

      return {
        transactions,
        totalPages: response.data.total_pages || 1,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.page = 1; // reset page when search changes
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clearTransactions(state) {
      state.transactions = [];
      state.page = 1;
      state.totalPages = 1;
      state.query = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQuery, setPage, clearTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
