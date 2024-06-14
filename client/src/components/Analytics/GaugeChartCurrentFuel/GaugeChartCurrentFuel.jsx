import React, {useEffect, useState} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer, Sector} from 'recharts';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const renderNeedle = ({cx, cy, radius, angle, needleColor}) => {
    const needleRadius = 10;
    const needleLength = radius * 1.0;
    const needleAngle = angle * (Math.PI / 180);
    const x1 = cx;
    const y1 = cy;
    const x2 = cx + needleLength * Math.cos(needleAngle);
    const y2 = cy - needleLength * Math.sin(needleAngle);
    
    return (
        <g>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={needleColor} strokeWidth={2}/>
            <circle cx={x1} cy={y1} r={needleRadius} fill={needleColor}/>
        </g>
    );
};

const GaugeChartCurrentFuel = ({currentFuelAvailable, totalQty}) => {
    const [fuelToDatePercentage, setFuelToDatePercentage] = useState(0);
    const [fuelToDateColor, setFuelToDateColor] = useState("#33cc33");
    const [fuelToDateText, setFuelToDateText] = useState("75-100% left");
    
    useEffect(() => {
        const percentage = (currentFuelAvailable / totalQty) * 100;
        setFuelToDatePercentage(percentage);
        
        if (percentage <= 25) {
            setFuelToDateColor("#ff3300"); // Red
            setFuelToDateText("<= 25% left");
        } else if (percentage <= 50) {
            setFuelToDateColor("#00ccff"); // Blue
            setFuelToDateText("<= 50% left");
        } else if (percentage <= 75) {
            setFuelToDateColor("#ffcc00"); // Yellow
            setFuelToDateText("<= 75% left");
        } else {
            setFuelToDateColor("#33cc33"); // Green
            setFuelToDateText("75-100% left");
        }
    }, [currentFuelAvailable, totalQty]);
    
    const data = [
        {value: 25, fill: '#ff3300'},
        {value: 25, fill: '#00ccff'},
        {value: 25, fill: '#ffcc00'},
        {value: 25, fill: '#33cc33'},
    ];
    
    const needleAngle = 180 - (fuelToDatePercentage * 1.8);
    
    return (
        <div style={{height: 400}}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="60%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={5}
                        dataKey="value"
                        isAnimationActive={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill}/>
                        ))}
                    </Pie>
                    {renderNeedle({
                        cx: 800, // Center of the PieChart
                        cy: 230, // Center of the PieChart
                        radius: 160, // Radius of the PieChart
                        angle: needleAngle,
                        needleColor: fuelToDateColor
                    })}
                    <text
                        x="50%"
                        y="70%"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={fuelToDateColor}
                        fontSize="20"
                        style={{textAlign: 'center', color: fuelToDateColor, fontWeight: 'bold'}}
                    >
                        {fuelToDateText}
                    </text>
                </PieChart>
            
            
            </ResponsiveContainer>
        
        
        </div>
    );
};

export default GaugeChartCurrentFuel;
