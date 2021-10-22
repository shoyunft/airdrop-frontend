import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/App.css";
import NFTAirdrop from "./components/NFTAirdrop";
import ShoyuLogo from "./components/ShoyuLogo";
import useEthereum from "./hooks/useEthereum";
import LogoSquared from "./images/logo-squared.jpeg";
import sak3 from "./data/sak3.json";
import ethernaal from "./data/ethernaal.json";
import mover from "./data/mover.json";
import maid from "./data/maid.json";

const sak3Page = {
  name: sak3.name + " - " + sak3.title,
  path: "/",
};

const ethernaalPage = {
  name: ethernaal.name + " - " + ethernaal.title,
  path: "/ethernaal",
};

const moverPage = {
  name: mover.name + " - " + mover.title,
  path: "/mover",
};

const maidPage = {
  name: maid.name + " - " + maid.title,
  path: "/maid",
};

function App() {
  const context = useEthereum();
  return (
    <Router>
      <div className="app">
        <header className={"header-container"}>
          <div className={"header"}>
            <ShoyuLogo width={105.92} height={32} fill={"#000000"} />
            {context.isConnected ? (
              <div className={"connected"}>
                <div className={"dot"} />
                <div>Connected</div>
              </div>
            ) : (
              <button className={"login"} onClick={context.onConnect}>
                Connect Wallet
              </button>
            )}
          </div>
        </header>
        <div className={"body"}>
          <Switch>
            <Route path="/maid">
              <NFTAirdrop data={maid} context={context} prev={moverPage} />
            </Route>
            <Route path="/mover">
              <NFTAirdrop
                data={mover}
                context={context}
                prev={ethernaalPage}
                next={maidPage}
              />
            </Route>
            <Route path="/ethernaal">
              <NFTAirdrop
                data={ethernaal}
                context={context}
                prev={sak3Page}
                next={moverPage}
              />
            </Route>
            <Route path="/">
              <NFTAirdrop data={sak3} context={context} next={ethernaalPage} />
            </Route>
          </Switch>
        </div>
        <div className={"border"} />
        <footer>
          <img src={LogoSquared} alt={"logo"} width={96} height={96} />
          <div className={"social"}>
            <a href={"https://twitter.com/SHOYU_NFT"} target={"_blank"}>
              Twitter
            </a>
            <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <a href={"https://discord.gg/rKuc868Fv3"} target={"_blank"}>
              Discord
            </a>
          </div>
          <div className={"copyright"}>
            Powered by{" "}
            <a href={"https://sushi.com"} target={"_blank"}>
              Sushi.com
            </a>
          </div>
          <div className={"copyright"}>
            Built by{" "}
            <a href={"https://twitter.com/LevxApp"} target={"_blank"}>
              LevX
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
