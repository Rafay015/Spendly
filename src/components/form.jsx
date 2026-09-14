import { useEffect, useRef, useState } from "react";
import {
  DateInput,
  DateSegment,
  Label,
  TextField,
  DatePicker,
  Input,
  Button,
} from "react-aria-components";
import {
  CalendarDateTime,
  getLocalTimeZone,
  now,
} from "@internationalized/date";
import { Calendar } from "lucide-react";
import { CircleAlert } from "lucide-react";

const current = now(getLocalTimeZone());

const dateTime = new CalendarDateTime(
  current.year,
  current.month,
  current.day,
  current.hour,
  current.minute,
);

export const Form = ({ addTransaction }) => {
  const [selectedTab, setSelectedTab] = useState("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(dateTime);
  const formRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      },
    );
    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = () => {
    let hasError = false;

    if (!description.trim()) {
      setDescriptionError(true);
      hasError = true;
    }

    if (!amount || Number(amount) <= 0) {
      setAmountError(true);
      hasError = true;
    }

    if (hasError) return;

    const transaction = {
      id: Date.now(),
      type: selectedTab,
      amount: Number(amount),
      description: description,
      date: selectedDate,
    };

    addTransaction(transaction);

    setAmount("");
    setDescription("");
    setSelectedDate(dateTime);
  };

  return (
    <div ref={formRef}>
      <div
        className={` flex flex-col gap-5 items-start p-8 lg:p-12 bg-gray-800/30 backdrop-blur-xl border border-white/10 rounded-xl mx-auto w-full ${isVisible ? "animate-slide-up" : "opacity-0"}`}
      >
        <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold">
          Add New Transaction
        </h1>
        <div className="bg-slate-950 text-white flex justify-center items-center rounded-full text-xs sm:text-sm md:text-lg lg:text-xl w-full px-2 lg:px-3 xl:px-5 py-0 lg:py-1 mt-3 lg:mt-5">
          <div
            className={`py-3 lg:py-4 rounded-full transition-all cursor-pointer w-full flex justify-center border ${selectedTab === "expense" ? "bg-red-500/15 scale-105 text-red-600 border border-red-500" : "hover:text-white text-gray-300 border-transparent"}`}
            onClick={() => setSelectedTab("expense")}
          >
            EXPENSE
          </div>
          <div
            className={`py-3 lg:py-4 rounded-full transition-all cursor-pointer w-full flex justify-center border ${selectedTab === "income" ? "bg-green-500/15 scale-105 text-green-500 border-green-500" : "hover:text-white text-gray-300 border-transparent"}`}
            onClick={() => setSelectedTab("income")}
          >
            INCOME
          </div>
        </div>
        <div className="w-full flex flex-col gap-5 lg:gap-10 mt-5">
          <TextField className="flex flex-col gap-2 w-full">
            <Label className="text-xs sm:text-sm lg:text-md font-medium text-gray-300">
              Description
            </Label>

            <Input
              type="text"
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-3 lg:py-5 text-xs sm:text-sm lg:text-lg text-white outline-none focus:border-cyan-400"
              placeholder="What did you spend on?"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setDescriptionError(false);
              }}
            />
            {descriptionError && (
              <div className="flex gap-2 items-center text-red-500">
                <CircleAlert className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className=" text-xs sm:text-sm lg:text-lg">
                  You cannot leave this empty
                </span>
              </div>
            )}
          </TextField>
          <TextField className="flex flex-col gap-2 w-full">
            <Label className="text-xs sm:text-sm lg:text-md font-medium text-gray-300">Amount</Label>

            <Input
              type="number"
              min="0"
              step="0.01"
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 lg:px-4 py-3 lg:py-5 text-xs sm:text-sm lg:text-lg text-white outline-none focus:border-cyan-400"
              placeholder="0.00"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setAmountError(false);
              }}
            />
            {amountError && (
              <div className="flex gap-2 items-center text-red-500">
                <CircleAlert className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm lg:text-lg">
                  Please enter a valid amount
                </span>
              </div>
            )}
          </TextField>
          <DatePicker
            className="flex flex-col gap-2 w-full"
            value={selectedDate}
            onChange={setSelectedDate}
            granularity="minute"
          >
            <Label className="text-xs sm:text-sm lg:text-md font-medium text-gray-300">Date</Label>
            <div className="flex items-center min-w-0 w-full rounded-lg border border-white/10 bg-slate-950 px-2 sm:px-4 py-3 lg:py-5 text-xs sm:text-sm lg:text-lg">
              <DateInput className="flex items-center min-w-0 overflow-hiddenx flex-1 text-white">
                {(segment) => (
                  <DateSegment
                    segment={segment}
                    className="rounded px-0.5 sm:px-1 min-w-0 outline-none focus:bg-cyan-500/20 focus:text-cyan-400"
                  />
                )}
              </DateInput>
              <Calendar className="w-5 h-5 shrink-0 ml-1 text-white cursor-pointer" />
            </div>
          </DatePicker>
          <Button
            className={`p-3 sm:p-4 w-full rounded-full border cursor-pointer ${selectedTab === "expense" ? "bg-red-500/15 text-red-500 border-red-500" : "bg-green-500/15 text-green-500 border-green-500"}`}
            onClick={handleSubmit}
          >
            {selectedTab === "expense" ? "Add Expense" : "Add Income"}
          </Button>
        </div>
      </div>
    </div>
  );
};
