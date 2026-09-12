import { useState } from "react";

export const Details = ({ income, expense }) => {
  const [selectedTab, setSelectedTab] = useState("balance");

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-25*0.25rem)] gap-10 lg:gap-0 justify-center items-center">
      <div className="flex flex-col justify-center items-center lg:items-start w-full text-center px-6 animate-slide-up transition-all">
        <div className="relative">
          <div className="absolute -inset-6 bg-cyan-500/10 blur-3xl rounded-full" />

          <div className="flex flex-col gap-2">
            <h1 className="text-6xl sm:text-7xl xl:text-8xl font-bold tracking-tight text-white">
              Spendly
            </h1>

            <p className="mt-2 text-cyan-400 lg:text-left text-sm sm:text-base xl:text-lg font-medium tracking-[0.2em] uppercase">
              Every Penny Matters
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col lg:items-start">
          <p className="text-white text-xl sm:text-2xl xl:text-3xl font-medium lg:text-left leading-relaxed tracking-wide">
            Track smarter. Spend better. Save more.
          </p>

          <p className="mt-3 text-gray-400 text-sm sm:text-base xl:text-lg leading-relaxed lg:text-left tracking-wide">
            Take control of your finances by keeping track of every expense,
            income, and saving goal.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <span className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs sm:text-sm backdrop-blur-md cursor-pointer">
            <p className="bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              {" "}
              ✦ Expense Tracking
            </p>
          </span>

          <span className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs sm:text-sm backdrop-blur-md cursor-pointer">
            <p className="bg-gradient-to-br from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              ✦ Smart Insights
            </p>
          </span>
        </div>
      </div>
      <div className=" items-center p-6 bg-gray-800/30 backdrop-blur-xl border border-white/10 rounded-xl mx-auto w-full animate-slide-down">
        <div className="bg-slate-950 text-white flex items-center rounded-full sm:text-sm md:text-lg lg:text-xl w-fit mx-auto lg:mx-0">
          <div
            className={`m-2 px-4 py-3 rounded-full transition-all cursor-pointer ${selectedTab === "balance" ? "bg-cyan-500/15 scale-105 text-cyan-400" : "hover:text-white text-gray-300"}`}
            onClick={() => setSelectedTab("balance")}
          >
            BALANCE
          </div>
          <div
            className={`m-2 px-4 py-3 rounded-full transition-all cursor-pointer ${selectedTab === "expenses" ? "bg-cyan-500/15 scale-105 text-cyan-400" : "hover:text-white text-gray-300"}`}
            onClick={() => setSelectedTab("expenses")}
          >
            EXPENSES
          </div>
        </div>
        {selectedTab === "balance" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 lg:mt-12">
            <div className="flex items-center justify-center w-full">
              <div className="flex flex-col justify-center items-center gap-2 lg:gap-3 border-b lg:border-b-0 border-cyan-500 lg:bg-cyan-500/15 pb-8 lg:pb-0 lg:rounded-xl lg:h-full w-full lg:w-full">
                <p className="text-xs sm:text-sm md:text-lg lg:text-md xl:text-lg text-cyan-400">
                  CURRENT BALANCE
                </p>
                <h1 className="text-5xl lg:text-4xl xl:text-5xl text-white font-semibold">
                  {income - expense}
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 divide-x divide-cyan-500 lg:divide-x-0 lg:divide-y lg:h-60">
              <div className="flex flex-col items-center justify-center text-center gap-1 h-full">
                <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-300">
                  TOTAL INCOME:
                </p>
                <h4 className="text-3xl text-green-500 font-semibold">
                  {income}
                </h4>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-1 h-full">
                <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-300">
                  TOTAL EXPENSE:
                </p>
                <h4 className="text-3xl text-red-500 font-semibold">
                  {expense}
                </h4>
              </div>
            </div>
          </div>
        )}
        {selectedTab === "expenses" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 lg:mt-12">
            <div className="flex items-center justify-center w-full">
              <div className="flex flex-col justify-center items-center gap-2 lg:gap-3 border-b lg:border-b-0 border-cyan-500 lg:bg-cyan-500/15 pb-8 lg:pb-0 lg:rounded-xl lg:h-full w-full lg:w-full">
                <p className="text-xs sm:text-sm md:text-lg lg:text-md xl:text-lg text-cyan-400">
                  MONTHLY EXPENSES
                </p>
                <h1 className="text-5xl lg:text-4xl xl:text-5xl text-red-500 font-semibold">
                  {expense}
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 divide-x divide-cyan-500 lg:divide-x-0 lg:divide-y lg:h-60">
              <div className="flex flex-col items-center justify-center text-center gap-1 h-full">
                <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-300">
                  MONTH INCOME:
                </p>
                <h4 className="text-3xl text-green-500 font-semibold">
                  {income}
                </h4>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-1 h-full">
                <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-300">
                  MONTH EXPENSE:
                </p>
                <h4 className="text-3xl text-red-500 font-semibold">
                  {expense}
                </h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
