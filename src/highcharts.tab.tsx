import React, { useState, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { generateRandomData } from "./generator";

const numRoutes = 100; // Change this to generate more or fewer routes
// Random dataset
const randomData = generateRandomData(numRoutes);

const routeNames = randomData.map((data) => data.route);
const tripsData = randomData.map((data) => data.trips);
const distanceData = randomData.map((data) => data.distance);
const durationData = randomData.map((data) => data.duration);
const itemsData = randomData.map((data) => data.items);

export function HighChartsTab() {
	const [rtl, setRtl] = useState(false);
	const [columnRtl, setColumnRtl] = useState(false);
	const [barRtl, setBarRtl] = useState(false);
	const [pieRtl, setPieRtl] = useState(false);
	const [compRtl, setCompRtl] = useState(false);

	const lineChartRef = useRef(null);
	const columnChartRef = useRef(null);
	const barChartRef = useRef(null);
	const pieChartRef = useRef(null);
	const composedChartRef = useRef(null);

	const btnStyle =
		"flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg focus:ring-2 focus:ring-yellow-600 focus:ring-inset hover:text-gray-800 focus:text-yellow-600 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-400";

	const zoomIn = (chartRef) => {
		const chart = chartRef.current.chart;
		const xAxis = chart.xAxis[0];
		const range = (xAxis.max - xAxis.min) / 2;
		const center = (xAxis.max + xAxis.min) / 2;
		xAxis.setExtremes(center - range / 2, center + range / 2);
	};

	const zoomOut = (chartRef) => {
		const chart = chartRef.current.chart;
		const xAxis = chart.xAxis[0];
		xAxis.setExtremes(null, null);
	};

	const options: Highcharts.Options = {
		lang: { rtl },
		chart: {
			type: "line",
			zooming: { type: "xy" },
		},
		title: { text: "Transport Company Route Data" },
		legend: { rtl },
		yAxis: { opposite: rtl },
		xAxis: { categories: routeNames, reversed: rtl },
		series: [
			{ name: "Trips", data: tripsData },
			{ name: "Distance (km)", data: distanceData },
			{ name: "Duration (hrs)", data: durationData },
			{ name: "Items", data: itemsData },
		],
	};

	const optionsColumn: Highcharts.Options = {
		lang: { rtl: columnRtl },
		chart: {
			type: "column",
			zooming: { type: "xy" },
		},
		title: { text: "Transport Company Route Data" },
		legend: { rtl },
		yAxis: { opposite: columnRtl },
		xAxis: { categories: routeNames, reversed: columnRtl },
		series: [
			{ name: "Trips", data: tripsData },
			{ name: "Distance (km)", data: distanceData },
			{ name: "Duration (hrs)", data: durationData },
			{ name: "Items", data: itemsData },
		],
	};

	const optionsBar: Highcharts.Options = {
		lang: { rtl: barRtl },
		chart: {
			type: "bar",
			zooming: { type: "xy" },
		},
		title: { text: "Transport Company Route Data" },
		yAxis: { opposite: false, reversed: barRtl },
		xAxis: { categories: routeNames, opposite: barRtl },
		series: [
			{ name: "Trips", data: tripsData },
			{ name: "Distance (km)", data: distanceData },
			{ name: "Duration (hrs)", data: durationData },
			{ name: "Items", data: itemsData },
		],
	};

	const optionsPie: Highcharts.Options = {
		lang: { rtl: pieRtl },
		chart: {
			type: "pie",
			zooming: { type: "xy" },
		},
		title: { text: "Transport Company Route Data" },
		series: [
			{
				name: "Routes",
				colorByPoint: true,
				data: randomData.map((data) => ({
					name: data.route,
					y: data.items,
				})),
			},
		],
	};

	const optionsComposed: Highcharts.Options = {
		lang: { rtl: compRtl },
		chart: {
			zooming: { type: "xy" },
		},
		title: { text: "Transport Company Route Data" },
		yAxis: { opposite: compRtl },
		xAxis: { categories: routeNames, reversed: compRtl },
		series: [
			{ type: "column", name: "Trips", data: tripsData },
			{ type: "line", name: "Distance (km)", data: distanceData },
			{ type: "line", name: "Duration (hrs)", data: durationData },
			{ type: "line", name: "Items", data: itemsData },
		],
	};

	return (
		<div className="flex-1">
			<div>
				<button
					role="tab"
					type="button"
					className="flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg focus:ring-2 focus:ring-yellow-600 focus:ring-inset hover:text-gray-800 focus:text-yellow-600 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-400"
					onClick={() => setRtl((p) => !p)}
				>
					Direction: {rtl ? "RTL" : "LTR"}
				</button>
				<HighchartsReact ref={lineChartRef} highcharts={Highcharts} options={options} />
				<div className="flex gap-3 w-full justify-center">
					<button className={btnStyle} onClick={() => zoomIn(lineChartRef)}>
						Zoom In
					</button>
					<button className={btnStyle} onClick={() => zoomOut(lineChartRef)}>
						Zoom Out
					</button>
				</div>
			</div>
			<div>
				<button
					role="tab"
					type="button"
					className="flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg focus:ring-2 focus:ring-yellow-600 focus:ring-inset hover:text-gray-800 focus:text-yellow-600 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-400"
					onClick={() => setColumnRtl((p) => !p)}
				>
					Direction: {columnRtl ? "RTL" : "LTR"}
				</button>
				<HighchartsReact ref={columnChartRef} highcharts={Highcharts} options={optionsColumn} />
				<div className="flex gap-3 w-full justify-center">
					<button className={btnStyle} onClick={() => zoomIn(columnChartRef)}>
						Zoom In
					</button>
					<button className={btnStyle} onClick={() => zoomOut(columnChartRef)}>
						Zoom Out
					</button>
				</div>
			</div>
			<div>
				<button
					role="tab"
					type="button"
					className="flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg focus:ring-2 focus:ring-yellow-600 focus:ring-inset hover:text-gray-800 focus:text-yellow-600 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-400"
					onClick={() => setBarRtl((p) => !p)}
				>
					Direction: {barRtl ? "RTL" : "LTR"}
				</button>
				<HighchartsReact ref={barChartRef} highcharts={Highcharts} options={optionsBar} />
				<div className="flex gap-3 w-full justify-center">
					<button className={btnStyle} onClick={() => zoomIn(barChartRef)}>
						Zoom In
					</button>
					<button className={btnStyle} onClick={() => zoomOut(barChartRef)}>
						Zoom Out
					</button>
				</div>
			</div>
			<div>
				<button
					role="tab"
					type="button"
					className="flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg focus:ring-2 focus:ring-yellow-600 focus:ring-inset hover:text-gray-800 focus:text-yellow-600 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-400"
					onClick={() => setPieRtl((p) => !p)}
				>
					Direction: {pieRtl ? "RTL" : "LTR"}
				</button>
				<HighchartsReact ref={pieChartRef} highcharts={Highcharts} options={optionsPie} />
				<div className="flex gap-3 w-full justify-center">
					<button className={btnStyle} onClick={() => zoomIn(pieChartRef)}>
						Zoom In
					</button>
					<button className={btnStyle} onClick={() => zoomOut(pieChartRef)}>
						Zoom Out
					</button>
				</div>
			</div>
			<div>
				<button
					role="tab"
					type="button"
					className="flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg focus:ring-2 focus:ring-yellow-600 focus:ring-inset hover:text-gray-800 focus:text-yellow-600 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-400"
					onClick={() => setCompRtl((p) => !p)}
				>
					Direction: {compRtl ? "RTL" : "LTR"}
				</button>
				<HighchartsReact ref={composedChartRef} highcharts={Highcharts} options={optionsComposed} />
				<div className="flex gap-3 w-full justify-center">
					<button className={btnStyle} onClick={() => zoomIn(composedChartRef)}>
						Zoom In
					</button>
					<button className={btnStyle} onClick={() => zoomOut(composedChartRef)}>
						Zoom Out
					</button>
				</div>
			</div>
		</div>
	);
}
