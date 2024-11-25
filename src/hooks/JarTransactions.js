import { useEffect, useState, useRef } from "react";

const BASE_URL = "https://api.monobank.ua";

const TOKEN = import.meta.env.VITE_MONOBANK_TOKEN;
const JAR_ID = import.meta.env.VITE_JAR_ID;
const jarCreationDate = Date.parse("28 Oct 2024 00:00:00 GMT") / 1000;

const MIN_FETCH_INTERVAL = 1 * 60 * 1000;

export const useJarTransactions = () => {
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem("transactions")) || []);
console.log(transactions)
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchJarTransactions = async () => {
		const lastFetchTime = localStorage.getItem("lastTransactionsFetchTime");
		if (lastFetchTime && Date.now() - lastFetchTime < MIN_FETCH_INTERVAL) {
			return;
		}

		abortControllerRef.current?.abort()
		abortControllerRef.current = new AbortController()

		try {
			const response = await fetch(
			  `${BASE_URL}/personal/statement/${JAR_ID}/${jarCreationDate}`,
			  {
				 method: "GET",
				 headers: { "X-Token": TOKEN },
				 signal: abortControllerRef.current?.signal,
			  }
			);
			const transactions = await response.json()
			const parsedTransactions = transactions.map((transaction) => ({
				time: new Date(transaction.time * 1000).toLocaleDateString(),
				amount: (transaction.amount / 100).toFixed(2),
				description: transaction.description || "—",
				comment: transaction.comment || "—",
				counterName: transaction.counterName || "—",
			 }));

			setTransactions(parsedTransactions)
			localStorage.setItem("transactions", JSON.stringify(parsedTransactions))
			localStorage.setItem("lastTransactionsFetchTime", Date.now());
		} catch (e) {
			console.log(`Error: ${e}`)
		}
    };

	 fetchJarTransactions();
  }, []);

  return transactions
};
