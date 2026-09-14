import { ArrowUp, Clock } from "lucide-react";
import { Trash } from "lucide-react";
import { ArrowDown } from "lucide-react";

export const History = ({ transaction, deleteTransaction }) => {
  return (
    <div className="mt-16 bg-gray-800/30 rounded-xl border border-white/10 backdrop-blur-xl p-8">
      <h2 className="text-white font-semibold text-xl sm:text-2xl lg:text-3xl">History</h2>
      <br className="bg-white w-full" />

      <div className="flex flex-col gap-3 sm:gap-5">
        {transaction.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between items-center bg-slate-950 rounded-lg px-3 sm:px-6 py-1 border-t ${item.type === "expense" ? "border-red-500" : "border-green-500"}`}
          >
            <div className="flex items-center justify-between gap-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-gray-300" />
              <div className="flex flex-col gap-1 ">
                <h2 className="text-sm sm:text-lg lg:text-xl text-gray-300">
                  {item.description}
                </h2>
                <p
                  className={`text-xs sm:text-sm lg:text-md flex gap-0.5 items-center w-fit ${item.type === "expense" ? "bg-red-500/15 border-red-500" : "bg-green-500/15 border-green-500"} rounded-full py-0 px-1 sm:px-2 border text-gray-300`}
                >
                  {item.type === "expense" ? (
                    <span>↓</span>
                  ) : (
                    <span>↑</span>
                  )}
                  <span className="text-gray-300">{item.amount}</span>
                </p>
              </div>
            </div>
            <div>
              <div className="text-xs sm:text-sm lg:text-xl text-gray-300">
                {item.date.day}/{item.date.month}/{item.date.year}
              </div>
              <div className="text-xs sm:text-sm lg:text-md text-gray-300">
                {item.date.hour % 12 || 12}:
                {String(item.date.minute).padStart(2, "0")}
                {item.date.hour >= 12 ? "pm" : "am"}
              </div>
            </div>
            <div>
              <Trash className="text-red-500 w-4 h-4 sm:w-5 sm:h-5 lg:w-7 md:w-6 md:h-6 lg:h-7 cursor-pointer" onClick={() => deleteTransaction(item.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
