// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// import { Bar, Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function DashboardCharts() {
//   // BAR chart: Hours spent per day
//   const hoursSpentData = {
//     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     datasets: [
//       {
//         label: "Hours spent",
//         data: [1.5, 2, 0.5, 3, 2.5, 1, 0],
//         backgroundColor: "#6366f1",
//         borderRadius: 8,
//       },
//     ],
//   };

//   const hoursSpentOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       title: { display: false },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: { stepSize: 1 },
//       },
//     },
//   };

//   // LINE chart: Performance trend (score %)
//   const performanceData = {
//     labels: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5"],
//     datasets: [
//       {
//         label: "Score %",
//         data: [65, 70, 60, 80, 75],
//         borderColor: "#10b981",
//         backgroundColor: "rgba(16, 185, 129, 0.2)",
//         tension: 0.35,
//         fill: true,
//         pointRadius: 4,
//         pointBackgroundColor: "#10b981",
//       },
//     ],
//   };

//   const performanceOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       title: { display: false },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//       },
//     },
//   };

//   return (
//     <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
//       {/* Hours Spent */}
//       <div style={{ flex: 1, minWidth: 320 }}>
//         <h4 className="welcome">Hours Spent</h4>
//         <div style={{ height: 260 }}>
//           <Bar data={hoursSpentData} options={hoursSpentOptions} />
//         </div>
//       </div>

//       {/* Performance */}
//       <div style={{ flex: 1, minWidth: 320 }}>
//         <h4 className="welcome">Performance</h4>
//         <div style={{ height: 260 }}>
//           <Line data={performanceData} options={performanceOptions} />
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
} from "recharts";

export default function DashboardCharts({ hoursData, performanceData }) {
  return (
    <div className="dashboard-charts">
      {/* Hours Spent */}
      <div className="chart-card">
        <h4 className="welcome">Hours Spent</h4>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hoursData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance */}
      <div className="chart-card">
        <h4 className="welcome">Performance</h4>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="percent"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}