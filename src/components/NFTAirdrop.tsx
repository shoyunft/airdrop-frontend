import React from "react";
import { Event } from "ethers";

import "../styles/NFTAirdrop.css";
import useClaimer from "../hooks/useClaimer";
import { EthereumContext } from "../hooks/useEthereum";
import GLBViewer from "./GLBViewer";
import IconInfo from "../images/icon-info.png";

export interface NFTAirdropData {
  standard: string;
  type: string;
  announcement?: string;
  url: string;
  title: string;
  name: string;
  artist_name: string;
  artist_url: string;
  description: string;
  address: string;
  recipients: string[];
}

const NFTAirdrop = ({
  data,
  context,
}: {
  data: NFTAirdropData;
  context: EthereumContext;
}) => {
  const { claimEvent, loadingClaimEvent, onClaim, claimError } = useClaimer(
    context.ethereum,
    data.standard == "ERC1155",
    data.address,
    data.recipients,
    context.address
  );
  const onViewTx = (event: Event) => () =>
    window.open("https://etherscan.io/tx/" + event.transactionHash);
  return (
    <div className={"container"}>
      <div className={"content"}>
        <div className={"title"}>{data.title}</div>
        <div className={"glb-viewer"}>
          <GLBViewer url={data.url} width={720} height={440} />
        </div>
        <div className={"name-container"}>
          <div className={"name"}>{data.name}</div>
          {data.announcement && (
            <div className={"info-icon"}>
              <a href={data.announcement} target={"_blank"}>
                <img src={IconInfo} alt={"info"} width={20} height={20} />
              </a>
            </div>
          )}
        </div>
        <a className={"artist"} href={data.artist_url} target={"_blank"}>
          by {data.artist_name}
        </a>
        <div className={"description"}>{data.description}</div>
        <div className={"button-container"}>
          {context.isConnected ? (
            loadingClaimEvent ? (
              <button className={"button inverted disabled"}>Loading...</button>
            ) : claimEvent ? (
              <button className={"button"} onClick={onViewTx(claimEvent)}>
                You already claimed this NFT
              </button>
            ) : (
              <button className={"button"} onClick={onClaim}>
                Claim
              </button>
            )
          ) : (
            <button className={"button inverted"} onClick={context.onConnect}>
              Connect Wallet
            </button>
          )}
        </div>
        {claimError && <div className={"error"}>{claimEvent}</div>}
      </div>
    </div>
  );
};

export default NFTAirdrop;
