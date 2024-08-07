import React, { useState } from "react";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	PieChart,
	Pie,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Brush,
	ComposedChart,
	CartesianGrid,
} from "recharts";

import { generateRandomData } from "./generator";

const reverseDataIfNeeded = (dataArr, rtl) => {
	return rtl ? [...dataArr].reverse() : dataArr;
};

export function RechartsTab() {
	const [rtl, setRtl] = useState(false);
	const [columnRtl, setColumnRtl] = useState(false);
	const [barRtl, setBarRtl] = useState(false);
	const [compRtl, setCompRtl] = useState(false);

	const btnStyle =
		"flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg focus:ring-2 focus:ring-yellow-600 focus:ring-inset hover:text-gray-800 focus:text-yellow-600 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-400";

	const numRoutes = 100; // Change this to generate more or fewer routes
	const data = generateRandomData(numRoutes);

	const [lineChartRange, setLineChartRange] = useState([0, data.length - 1]);
	const [columnChartRange, setColumnChartRange] = useState([0, data.length - 1]);
	const [barChartRange, setBarChartRange] = useState([0, data.length - 1]);
	const [compChartRange, setCompChartRange] = useState([0, data.length - 1]);

	const zoomIn = (setRange, range) => {
		const [start, end] = range;
		const newRange = Math.floor((end - start) / 2);
		setRange([start + newRange / 2, end - newRange / 2]);
	};

	const zoomOut = (setRange) => {
		setRange([0, data.length - 1]);
	};

	return (
		<div className="flex-1">
			<div>
				<button type="button" className="btn-direction" onClick={() => setRtl((prev) => !prev)}>
					Direction: {rtl ? "RTL" : "LTR"}
				</button>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={reverseDataIfNeeded(data, rtl).slice(...lineChartRange)}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis orientation={rtl ? "right" : "left"} />
						<Tooltip />
						<Legend />
						<Line dataKey="trips" name="Trips" />
						<Line dataKey="distance" name="Distance (km)" />
						<Line dataKey="duration" name="Duration (hrs)" />
						<Line dataKey="items" name="Items" />
						<Brush dataKey="name" height={30} stroke="#8884d8" />
					</LineChart>
				</ResponsiveContainer>
				<div className="flex gap-3 w-full justify-center">
					<button className={btnStyle} onClick={() => zoomIn(setLineChartRange, lineChartRange)}>
						Zoom In
					</button>
					<button className={btnStyle} onClick={() => zoomOut(setLineChartRange)}>
						Zoom Out
					</button>
				</div>
			</div>
			<div>
				<button type="button" className="btn-direction" onClick={() => setColumnRtl((prev) => !prev)}>
					Direction: {columnRtl ? "RTL" : "LTR"}
				</button>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={reverseDataIfNeeded(data, columnRtl).slice(...columnChartRange)}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis orientation={columnRtl ? "right" : "left"} />
						<Tooltip />
						<Legend />
						<Bar dataKey="trips" name="Trips" />
						<Bar dataKey="distance" name="Distance (km)" />
						<Bar dataKey="duration" name="Duration (hrs)" />
						<Bar dataKey="items" name="Items" />
						<Brush dataKey="name" height={30} stroke="#82ca9d" />
					</BarChart>
				</ResponsiveContainer>
				<div className="flex gap-3 w-full justify-center">
					<button className={btnStyle} onClick={() => zoomIn(setColumnChartRange, columnChartRange)}>
						Zoom In
					</button>
					<button className={btnStyle} onClick={() => zoomOut(setColumnChartRange)}>
						Zoom Out
					</button>
				</div>
			</div>
			<div>
				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie dataKey="items" data={data} nameKey="name" />
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
			<div>
				<button type="button" className="btn-direction" onClick={() => setBarRtl((prev) => !prev)}>
					Direction: {barRtl ? "RTL" : "LTR"}
				</button>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={reverseDataIfNeeded(data, barRtl).slice(...barChartRange)} layout="vertical">
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis type="number" />
						<YAxis type="category" dataKey="name" orientation={barRtl ? "right" : "left"} />
						<Tooltip />
						<Legend />
						<Bar dataKey="trips" name="Trips" />
						<Bar dataKey="distance" name="Distance (km)" />
						<Bar dataKey="duration" name="Duration (hrs)" />
						<Bar dataKey="items" name="Items" />
						<Brush dataKey="name" height={30} stroke="#ffc658" />
					</BarChart>
				</ResponsiveContainer>
				<div className="flex gap-3 w-full justify-center">
					<button className={btnStyle} onClick={() => zoomIn(setBarChartRange, barChartRange)}>
						Zoom In
					</button>
					<button className={btnStyle} onClick={() => zoomOut(setBarChartRange)}>
						Zoom Out
					</button>
				</div>
			</div>
			<div>
				<button type="button" className="btn-direction" onClick={() => setCompRtl((prev) => !prev)}>
					Direction: {compRtl ? "RTL" : "LTR"}
				</button>
				<ResponsiveContainer width="100%" height={300}>
					<ComposedChart data={reverseDataIfNeeded(data, compRtl).slice(...compChartRange)}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis orientation={compRtl ? "right" : "left"} />
						<Tooltip />
						<Legend />
						<Bar dataKey="trips" name="Trips" />
						<Line dataKey="distance" name="Distance (km)" />
						<Line dataKey="duration" name="Duration (hrs)" />
						<Line dataKey="items" name="Items" />
					</ComposedChart>
				</ResponsiveContainer>
				<div className="flex gap-3 w-full justify-center">
					<button className={btnStyle} onClick={() => zoomIn(setCompChartRange, compChartRange)}>
						Zoom In
					</button>
					<button className={btnStyle} onClick={() => zoomOut(setCompChartRange)}>
						Zoom Out
					</button>
				</div>
			</div>
		</div>
	);
}
