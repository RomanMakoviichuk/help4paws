import { useEffect, useState, useRef } from "react";

const BASE_URL = "https://api.monobank.ua";
const TOKEN = import.meta.env.VITE_MONOBANK_TOKEN;
const JAR_ID = import.meta.env.VITE_JAR_ID;

const MIN_FETCH_INTERVAL = 1 * 60 * 1000;

export const useJarBalance = () => {
	const [balance, setBalance] = useState(() => {
		const storedBalance = localStorage.getItem("balance");
		return storedBalance ? parseInt(storedBalance, 10) : null;
	 });

  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchJarBalance = async () => {
		const lastFetchTime = localStorage.getItem("lastBalanceFetchTime");
		if (lastFetchTime && Date.now() - lastFetchTime < MIN_FETCH_INTERVAL) {
			return;
		}

      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(`${BASE_URL}/personal/client-info`, {
          method: "GET",
          headers: { "X-Token": TOKEN },
          signal: abortControllerRef.current?.signal,
        });

        const data = await response.json();
        const jar = data.jars.find((j) => j.id === JAR_ID);
        const jarBalance = jar ? (jar.balance / 100).toFixed(2) : "0.00";

        setBalance(jarBalance);
        localStorage.setItem("balance", jarBalance);
		  localStorage.setItem("lastBalanceFetchTime", Date.now());
      } catch (e) {
        console.error(`Error fetching balance: ${e}`);
      }
    };

    fetchJarBalance();
  }, []);

  return balance;
};
