// import { useEffect, useState } from "react";
// import { api } from "./services/api";
// import PriceChart from "./components/PriceChart";

// function App() {
//   const [assets, setAssets] = useState([]);

//   useEffect(() => {
//     api.get("/assets").then(res => setAssets(res.data));
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Digital Assets Dashboard</h2>
//       <PriceChart assets={assets} />
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import PriceChart from "./components/PriceChart";
import { api } from "./services/api";
import "./App.css";

export default function App() {
  const [assets, setAssets] = useState([]);
  const [trades, setTrades] = useState([]);
  const [balance, setBalance] = useState({ USD: 10000, BTC: 0 });

  const [form, setForm] = useState({
    user: "Alice",
    type: "buy",
    asset: "BTC",
    amount: 0.01,
    price: 30000
  });

  // Load assets
  useEffect(() => {
    api.get("/assets").then(res => setAssets(res.data));
  }, []);

  // Handle form input
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Submit trade
  const handleSubmit = e => {
    e.preventDefault();

    // Simple balance simulation
    const { type, amount, price, asset } = form;
    let newBalance = { ...balance };
    if (type === "buy") {
      const cost = amount * price;
      if (cost > balance.USD) {
        alert("Insufficient USD");
        return;
      }
      newBalance.USD -= cost;
      newBalance[asset] = (newBalance[asset] || 0) + parseFloat(amount);
    } else {
      if ((balance[asset] || 0) < amount) {
        alert("Insufficient asset");
        return;
      }
      newBalance.USD += amount * price;
      newBalance[asset] -= amount;
    }
    setBalance(newBalance);

    // Add trade to recent trades
    const newTrade = { ...form, timestamp: new Date().toISOString() };
    setTrades(prev => [newTrade, ...prev]);

    // Optionally POST to backend
    api.post("/assets", newTrade).catch(err => console.error(err));
  };

  const handleRefresh = () => {
    api.get("/assets").then(res => setAssets(res.data));
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <div className="mark" aria-hidden="true"></div>
          <h1>Asset Trade Tracker</h1>
        </div>
        <nav className="small">
          Local demo • <strong id="hostAddr">localhost</strong>
        </nav>
      </header>

      <main className="grid">
        {/* Chart + Recent Trades */}
        <section className="panel chart-panel">
          <div className="chartWrap">
            <PriceChart assets={assets} />
          </div>

          <div className="tableWrap">
            <h3>Recent Trades</h3>
            <div className="tradesList">
              {trades.map((t, i) => (
                <div key={i}>
                  [{t.type.toUpperCase()}] {t.amount} {t.asset} @ ${t.price} ({new Date(t.timestamp).toLocaleTimeString()})
                </div>
              ))}
            </div>
            <div className="footerNote">Tip: Click a trade to copy the price</div>
          </div>
        </section>

        {/* Trade Form + Balance */}
        <aside className="panel trade-panel">
          <div className="small balanceInfo">
            USD: <strong>{balance.USD.toFixed(2)}</strong><br />
            {form.asset}: <strong>{(balance[form.asset] || 0).toFixed(4)}</strong>
          </div>

          <h3>Submit Trade</h3>
          <form className="formRow" onSubmit={handleSubmit}>
            <label>User</label>
            <input name="user" value={form.user} onChange={handleChange} />

            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>

            <label>Asset</label>
            <input name="asset" value={form.asset} onChange={handleChange} />

            <label>Amount</label>
            <input name="amount" type="number" step="any" value={form.amount} onChange={handleChange} />

            <label>Price (USD)</label>
            <input name="price" type="number" step="any" value={form.price} onChange={handleChange} />

            <div className="formActions">
              <button className="btn buy" type="submit">Submit</button>
              <button className="btn secondary" type="button" onClick={handleRefresh}>Refresh</button>
            </div>

            <div className="small lastPrice">Last price: <strong>{assets[assets.length - 1]?.price || "—"}</strong></div>
          </form>
        </aside>
      </main>
    </div>
  );
}
