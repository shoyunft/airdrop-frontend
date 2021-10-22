import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/App.css";
import NFTAirdrop from "./components/NFTAirdrop";
import ShoyuLogo from "./components/ShoyuLogo";
import useEthereum from "./hooks/useEthereum";
import LogoSquared from "./images/logo-squared.jpeg";
import sak3 from "./data/sak3.json";
import mover from "./data/mover.json";

const sak3Page = {
  name: sak3.name + " - " + sak3.title,
  path: "/",
};

const moverPage = {
  name: mover.name + " - " + mover.title,
  path: "/mover",
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
            <Route path="/mover">
              <NFTAirdrop data={mover} context={context} prev={sak3Page} />
            </Route>
            <Route path="/">
              <NFTAirdrop data={sak3} context={context} next={moverPage} />
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
