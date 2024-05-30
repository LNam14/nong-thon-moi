"use client"
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import moment from 'moment';

interface Props {
    data: number[]
}
const ChartComponent = ({ data }: Props) => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                const labels = [];
                for (let i = 0; i < 7; i++) {
                    labels.unshift(moment().subtract(i, 'days').format('DD-MM'));

                }
                labels.reverse();

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Số bài viết',
                            data: data,
                            backgroundColor: "#570000",
                            borderColor: "#570000",
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                gridLines: {
                                    display: false // Loại bỏ sọc kẻ dọc
                                }
                            }]
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        }
                    }
                });
            }
        }
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default ChartComponent;
