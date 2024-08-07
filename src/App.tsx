import React, { useState } from "react";
import "./App.css";
import { HighChartsTab } from "./highcharts.tab";
import { RechartsTab } from "./recharts.tab";
import { Dashboard } from "./dashboard/dashboard.tab";

const tabs = {
  HighCharts: 0,
  ReCharts: 1,
  Dashboard: 2,
};

function App() {
  const [tab, setTab] = useState(tabs.HighCharts);
  const activeClass =
    "text-yellow-600 shadow bg-white dark:text-white dark:bg-yellow-600";
  function setTabHighCharts() {
    setTab(tabs.HighCharts);
  }

  function setTabReCharts() {
    setTab(tabs.ReCharts);
  }

  function setTabDashboard() {
    setTab(tabs.Dashboard);
  }

  return (
    <>
      <div className="flex justify-center flex-col gap-10">
        <nav className="flex justify-center overflow-x-auto items-center p-1 space-x-1 rtl:space-x-reverse text-sm text-gray-600 bg-gray-500/5 rounded-xl dark:bg-gray-500/20">
          <button
            role="tab"
            type="button"
            className={`flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg focus:ring-2 focus:ring-yellow-600 focus:ring-inset ${
              tab === tabs.HighCharts ? activeClass : ""
            } hover}`}
            onClick={setTabHighCharts}
          >
            HighCharts
          </button>

          <button
            role="tab"
            type="button"
            className={`flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg focus:ring-2 focus:ring-yellow-600 focus:ring-inset ${
              tab === tabs.ReCharts ? activeClass : ""
            } hover}`}
            onClick={setTabReCharts}
          >
            ReCharts
          </button>

          <button
            role="tab"
            type="button"
            className={`flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg focus:ring-2 focus:ring-yellow-600 focus:ring-inset ${
              tab === tabs.Dashboard ? activeClass : ""
            } hover}`}
            onClick={setTabDashboard}
          >
            Highcharts Dashboard
          </button>
        </nav>

        {tab === tabs.HighCharts && <HighChartsTab />}
        {tab === tabs.ReCharts && <RechartsTab />}
        {tab === tabs.Dashboard && <Dashboard />}
      </div>
    </>
  );
}

export default App;
