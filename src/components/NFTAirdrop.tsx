import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";

import "../styles/NFTAirdrop.css";
import useClaimer, { ClaimInfo } from "../hooks/useClaimer";
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
  const [audio] = useState(new Audio("./sak3.wav"));
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const isSak3 = data.address == "0x5d1f6A91C7B4A575576A7Ba8d6227bcA2e807C44";
    if (isSak3) {
      audio.loop = true;
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [data.address]);
  const { claimInfo, loadingClaimEvent, onClaim, claiming, claimError } =
    useClaimer(
      context.ethereum,
      data.standard == "ERC1155",
      data.address,
      data.recipients,
      context.address,
      location
    );
  const onView = (info: ClaimInfo) => () => {
    let url;
    if (data.standard == "ERC721" && info.address && info.tokenId) {
      url =
        "https://opensea.io/assets/" +
        info.address +
        "/" +
        info.tokenId.toString();
    } else {
      url = "https://etherscan.io/tx/" + info.txHash;
    }
    window.open(url);
  };
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
            context.chainId != 1 ? (
              <button
                className={"button inverted"}
                onClick={context.onSwitchToMainnet}
              >
                Change Network to Ethereum Mainnet
              </button>
            ) : loadingClaimEvent ? (
              <button className={"button inverted disabled"}>Loading...</button>
            ) : claiming ? (
              <button className={"button inverted disabled"}>
                Claiming...
              </button>
            ) : claimInfo ? (
              <button className={"button"} onClick={onView(claimInfo)}>
                You already claimed this NFT <HiOutlineExternalLink size={20} />
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
        {claimInfo && (
          <div className={"warning"}>
            ⚠️ Claimed NFT will be locked until the launch of Shoyu
          </div>
        )}
        {claimError && <div className={"error"}>{claimError}</div>}
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
