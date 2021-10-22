import { Contract, ethers, Event } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { useEffect, useState } from "react";
import NFT721AirdropV1 from "../abis/NFT721AirdropV1.json";
import NFT1155AirdropV1 from "../abis/NFT1155AirdropV1.json";

const useClaimer = (
  ethereum,
  erc1155: boolean,
  contractAddress: string,
  recipients: string[],
  address: string,
  location
) => {
  const [contract, setContract] = useState<Contract>();
  const [loadingClaimEvent, setLoadingClaimEvent] = useState(true);
  const [claimEvent, setClaimEvent] = useState<Event>();
  const [claimError, setClaimError] = useState("");

  const leaves = recipients.map((v) => keccak256(v));
  const tree = new MerkleTree(leaves, keccak256, { sort: true });

  useEffect(() => {
    if (ethereum) {
      const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
      setContract(
        ethers.ContractFactory.getContract(
          contractAddress,
          erc1155 ? NFT1155AirdropV1 : NFT721AirdropV1,
          signer
        )
      );
    }
  }, [ethereum, location.pathname]);

  useEffect(() => {
    if (address && contract) {
      setClaimError(false);
      setLoadingClaimEvent(true);
      const merkleRoot = tree.getHexRoot();
      contract
        .queryFilter(
          contract.filters.Claim(merkleRoot, erc1155 ? 0 : null, address)
        )
        .then((events) => {
          setClaimEvent(events?.[0]);
        })
        .catch((e) => setClaimError(e.message))
        .finally(() => setLoadingClaimEvent(false));
    }
  }, [address, contract]);

  const onClaim = async () => {
    setClaimError("");
    const leaf = keccak256(address);
    const proof = tree
      .getHexProof(leaf)
      .map((item) => ethers.utils.arrayify(item));
    try {
      const params = erc1155
        ? [tree.getHexRoot(), 0, proof]
        : [tree.getHexRoot(), proof];
      const tx = await contract.claim(...params);
      await tx.wait();
    } catch (e) {
      setClaimError(e.message);
    }
  };

  return { claimEvent, loadingClaimEvent, onClaim, claimError };
};

export default useClaimer;
