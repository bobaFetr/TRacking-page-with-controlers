// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale
// } from "chart.js";

// ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

// export default function PriceChart({ assets }) {
//   const data = {
//     labels: assets.map(a => new Date(a.timestamp).toLocaleTimeString()),
//     datasets: [
//       {
//         label: "Price",
//         data: assets.map(a => a.price),
//         borderWidth: 2
//       }
//     ]
//   };

//   return <Line data={data} />;
// }
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";
import { useState } from "react";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function PriceChart({ assets }) {
  const [log, setLog] = useState([]); // to show buy/sell actions

  const handleBuy = () => {
    if (assets.length === 0) return;
    const latest = assets[assets.length - 1];
    setLog(prev => [...prev, `Bought ${latest.symbol} at $${latest.price}`]);
    alert(`Bought ${latest.symbol} at $${latest.price}`);
  };

  const handleSell = () => {
    if (assets.length === 0) return;
    const latest = assets[assets.length - 1];
    setLog(prev => [...prev, `Sold ${latest.symbol} at $${latest.price}`]);
    alert(`Sold ${latest.symbol} at $${latest.price}`);
  };

  const data = {
    labels: assets.map(a => new Date(a.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "Price",
        data: assets.map(a => a.price),
        borderWidth: 2,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
        tension: 0.3
      }
    ]
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
      <Line data={data} />
      
      {/* Buy/Sell Buttons */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={handleBuy} style={{ padding: "10px 20px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px" }}>
          Buy
        </button>
        <button onClick={handleSell} style={{ padding: "10px 20px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px" }}>
          Sell
        </button>
      </div>

      {/* Optional Log of Actions */}
      <div style={{ marginTop: "10px" }}>
        {log.map((entry, idx) => (
          <div key={idx}>{entry}</div>
        ))}
      </div>
    </div>
  );
}
