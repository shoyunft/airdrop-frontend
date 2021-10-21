import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/App.css";
import NFTAirdrop from "./components/NFTAirdrop";
import ShoyuLogo from "./components/ShoyuLogo";
import useEthereum from "./hooks/useEthereum";
import sak3 from "./data/sak3.json";

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
        <div>
          <Switch>
            <Route path="/">
              <NFTAirdrop data={sak3} context={context} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
