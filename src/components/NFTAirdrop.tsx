import React from "react";
import { Event } from "ethers";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

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
  mime_type: string;
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
  prev,
  next,
}: {
  data: NFTAirdropData;
  context: EthereumContext;
  prev?: { name: string; path: string };
  next?: { name: string; path: string };
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
        {data.type == "3d" ? (
          <div className={"glb-viewer"}>
            <GLBViewer url={data.url} width={720} height={440} />
          </div>
        ) : data.type == "video" ? (
          <div className={"video-container"}>
            <video controls width={720} height={440} autoPlay={true}>
              <source src={data.url} type={data.mime_type} />
            </video>
          </div>
        ) : (
          <div className={"image-container"}>
            <img src={data.url} width={720} height={440} alt={"image"} />
          </div>
        )}
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
        <div className={"pagination"}>
          {prev ? (
            <Link className={"icon-container"} to={prev.path}>
              <BsChevronLeft size={16} />
              <span>{prev.name}</span>
            </Link>
          ) : (
            <div> </div>
          )}
          {next ? (
            <Link className={"icon-container"} to={next.path}>
              <span>{next.name}</span>
              <BsChevronRight size={16} />
            </Link>
          ) : (
            <div> </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTAirdrop;
