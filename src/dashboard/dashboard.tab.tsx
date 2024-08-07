import React, { useEffect } from "react";
import "./dashboard.css";
import Highcharts from "highcharts";
import Dashboards from "@highcharts/dashboards";
import DataGrid from "@highcharts/dashboards/datagrid";
import LayoutModule from "@highcharts/dashboards/modules/layout";
import { generateRandomData } from "../generator";

LayoutModule(Dashboards);

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.DataGridPlugin.custom.connectDataGrid(DataGrid);

Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);
Dashboards.PluginHandler.addPlugin(Dashboards.DataGridPlugin);

const numRoutes = 20; // Change this to generate more or fewer routes
// Random dataset
const randomData = generateRandomData(numRoutes);
const fullData = randomData.map((item) => Object.values(item));
const metricsData = randomData.map((item) => [item.trips, item.distance, item.duration]);
const numbersData = randomData.map((item) => [item.route, item.items]);

const config = {
	dataPool: {
		connectors: [
			{
				id: "full",
				type: "JSON",
				options: {
					firstRowAsNames: false,
					columnNames: ["Routes", "Trips", "Distance (km)", "Duration (hrs)", "Items"],
					data: fullData,
				},
			},
			{
				id: "metrics",
				type: "JSON",
				options: {
					firstRowAsNames: false,
					columnNames: ["Trips", "Distance (km)", "Duration (hrs)"],
					data: metricsData,
				},
			},
			{
				id: "numbers",
				type: "JSON",
				options: {
					firstRowAsNames: false,
					columnNames: ["Routes", "Items"],
					data: numbersData,
				},
			},
		],
	},
	editMode: {
		enabled: true,
		contextMenu: {
			enabled: true,
			items: ["editMode"],
		},
	},
	gui: {
		layouts: [
			{
				rows: [
					{
						cells: [
							{
								id: "kpi-wrapper",
								layout: {
									rows: [
										{
											cells: [
												{
													id: "kpi-vitamin-a",
												},
												{
													id: "kpi-iron",
												},
											],
										},
									],
								},
							},
							{
								id: "dashboard-col-0",
							},
							{
								id: "dashboard-col-1",
							},
						],
					},
					{
						cells: [
							{
								id: "dashboard-col-2",
							},
						],
					},
				],
			},
		],
	},
	components: [
		{
			type: "KPI",
			cell: "kpi-vitamin-a",
			value: fullData.length,
			valueFormat: "{value}",
			title: "Routes",
			subtitle: "total number of routes",
		},
		{
			type: "KPI",
			cell: "kpi-iron",
			value: randomData.reduce((acc, item) => {
				acc = acc + item.trips;
				return acc;
			}, 0),
			title: "Trips",
			valueFormat: "{value}",
			subtitle: "total number of trips",
		},
		{
			cell: "title",
			type: "HTML",
			elements: [
				{
					tagName: "h1",
					textContent: "MicroElement amount in Foods",
				},
			],
		},
		{
			sync: {
				visibility: true,
				highlight: true,
				extremes: true,
			},
			connector: {
				id: "metrics",
			},
			cell: "dashboard-col-0",
			type: "Highcharts",
			columnAssignment: {
				Food: "x",
				"Vitamin A": "value",
			},
			chartOptions: {
				xAxis: {
					type: "category",
					accessibility: {
						description: "Groceries",
					},
				},
				yAxis: {
					plotLines: [
						{
							value: 900,
							zIndex: 7,
							dashStyle: "shortDash",
							label: {
								text: "RDA",
								align: "right",
								style: {
									color: "#B73C28",
								},
							},
						},
					],
				},
				credits: {
					enabled: false,
				},
				plotOptions: {
					series: {
						marker: {
							radius: 6,
						},
					},
				},
				legend: {
					enabled: true,
					verticalAlign: "top",
				},
				chart: {
					animation: false,
					type: "column",
					spacing: [30, 30, 30, 20],
				},
				title: {
					text: "",
				},
				tooltip: {
					stickOnContact: true,
				},
				lang: {
					accessibility: {
						chartContainerLabel: "Vitamin A in food. Highcharts Interactive Chart.",
					},
				},
				accessibility: {
					description: `The chart is displaying the Vitamin A amount in
              micrograms for some groceries. There is a plotLine demonstrating
              the daily Recommended Dietary Allowance (RDA) of 900
              micrograms.`,
					point: {},
				},
			},
		},
		{
			cell: "dashboard-col-1",
			sync: {
				visibility: true,
				highlight: true,
				extremes: true,
			},
			connector: {
				id: "numbers",
			},
			type: "Highcharts",
			columnAssignment: {
				Food: "x",
				Iron: "y",
			},
			chartOptions: {
				xAxis: {
					type: "category",
					accessibility: {
						description: "Groceries",
					},
				},
				yAxis: {
					title: {},
					max: Math.max(...randomData.map((item) => item.items)) + 100,
					plotLines: [
						{
							value: 8,
							dashStyle: "shortDash",
							label: {
								text: "RDA",
								align: "right",
								style: {
									color: "#B73C28",
								},
							},
						},
					],
				},
				credits: {
					enabled: false,
				},
				plotOptions: {
					series: {
						marker: {
							radius: 6,
						},
					},
				},
				title: {
					text: "",
				},
				legend: {
					enabled: true,
					verticalAlign: "top",
				},
				chart: {
					animation: false,
					type: "column",
					spacing: [30, 30, 30, 20],
				},
				tooltip: {
					stickOnContact: true,
				},
				lang: {
					accessibility: {
						chartContainerLabel: "Iron in food. Highcharts Interactive Chart.",
					},
				},
				accessibility: {
					description: `The chart is displaying the Iron amount in
              micrograms for some groceries. There is a plotLine demonstrating
              the daily Recommended Dietary Allowance (RDA) of 8
              micrograms.`,
				},
			},
		},
		{
			cell: "dashboard-col-2",
			connector: {
				id: "full",
			},
			type: "DataGrid",
			editable: true,
			sync: {
				highlight: true,
				visibility: true,
			},
		},
	],
};

export function Dashboard() {
	useEffect(() => {
		Dashboards.board("container", config);
	}, [config]);

	return <div id="container" />;
}
