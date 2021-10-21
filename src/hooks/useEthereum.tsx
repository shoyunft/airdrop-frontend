import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

export interface EthereumContext {
  ethereum: unknown;
  address: string;
  isConnected: boolean;
  onConnect: () => void;
}

const useEthereum = (): EthereumContext => {
  const [address, setAddress] = useState("");
  const [ethereum, setEthereum] = useState();

  useEffect(() => {
    detectEthereumProvider().then((p) => {
      setEthereum(p);
      if (!p) alert("Please install MetaMask!");
    });
  }, [window.ethereum]);

  const isConnected = ethereum?.isConnected() && !!address;

  const onConnect = () => {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => setAddress(accounts[0]))
      .catch((e) => {
        console.error(e);
        alert(e.message);
      });
  };
  return { ethereum, address, isConnected, onConnect };
};

export default useEthereum;
