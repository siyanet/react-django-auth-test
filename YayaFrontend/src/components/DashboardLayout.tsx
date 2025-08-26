import React from "react";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen white">
      <header className="px-8 py-6 shadow-md blue">
        <h1 className="text-2xl font-bold tracking-tight white">YaYa Wallet Transactions Dashboard</h1>
      </header>
      <main className="w-full max-w-5xl p-8 mx-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
