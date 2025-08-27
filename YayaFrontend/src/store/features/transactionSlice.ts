

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
  lastPage: number;
  total: number;
  perPage: number;
  incomingSum: number;
  outgoingSum: number;
  query: string;
}


const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
  page: 1,
  lastPage: 1,
  total: 0,
  perPage: 1,
  incomingSum: 0,
  outgoingSum: 0,
  query: "",
};

// Async thunk to fetch transactions
export const fetchTransactions = createAsyncThunk<
  {
    transactions: Transaction[];
    lastPage: number;
    total: number;
    perPage: number;
    incomingSum: number;
    outgoingSum: number;
  },
  { page?: number; query?: string }
>(
  "transactions/fetchTransactions",
  async ({ page = 1, query = "" }, { rejectWithValue }) => {
    try {
      const params: any = { p: page };
      if (query) params.query = query;

      const response = await axios.get(
        "http://localhost:8000/transactions/fetch-transactions/",
        { params }
      );

      const dataArray = Array.isArray(response.data.transactions)
        ? response.data.transactions
        : [];

      const transactions: Transaction[] = dataArray.map((tx: any) => ({
        id: tx.id,
        sender: tx.sender.account || tx.sender, // support both search & find-by-user
        receiver: tx.receiver.account || tx.receiver,
        amount: tx.amount,
        currency: tx.currency,
        cause: tx.cause,
        createdAt: new Date(tx.created_at_time * 1000).toISOString(),
      }));

      return {
        transactions,
        lastPage: response.data.lastPage || 1,
        total: response.data.total || 0,
        perPage: response.data.perPage || 10,
        incomingSum: response.data.incomingSum || 0,
        outgoingSum: response.data.outgoingSum || 0,
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
      state.lastPage = 1;
      state.total = 0;
      state.perPage = 1;
      state.incomingSum = 0;
      state.outgoingSum = 0;
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
        state.lastPage = action.payload.lastPage;
        state.total = action.payload.total;
        state.perPage = action.payload.perPage;
        state.incomingSum = action.payload.incomingSum;
        state.outgoingSum = action.payload.outgoingSum;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQuery, setPage, clearTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
