import React, {useEffect, useState, useRef} from 'react';

const GaugeChart = ({currentFuelAvailable = 75, totalQty = 100}) => {
    const [percentage, setPercentage] = useState(0);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({width: 0, height: 0});

    useEffect(() => {
        const newPercentage = Math.min(100, Math.max(0, (currentFuelAvailable / totalQty) * 100));
        setPercentage(newPercentage);
    }, [currentFuelAvailable, totalQty]);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const {width} = containerRef.current.getBoundingClientRect();
                setDimensions({width, height: width * 0.4});
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const getFontSize = (baseSize) => Math.max(8, Math.min(dimensions.width * baseSize, 13));

    const getColor = (value) => {
        if (value <= 10) {
            return '#FF0000';
        }
        if (value <= 25) {
            return '#FF6B00';
        }
        if (value <= 50) {
            return '#FFC700';
        }
        if (value <= 75) {
            return '#8EFF00';
        }
        return '#00FF0A';
    };

    const segments = [
        {start: 80, end: 100, color: '#00FF0A'},
        {start: 60, end: 80, color: '#8EFF00'},
        {start: 40, end: 60, color: '#FFC700'},
        {start: 20, end: 40, color: '#FF6B00'},
        {start: 0, end: 20, color: '#FF0000'}
    ];

    const radius = Math.min(dimensions.width, dimensions.height) * 0.7;
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height * 0.85;

    const createSegment = (startAngle, endAngle, color) => {
        const start = (startAngle * Math.PI) / 180;
        const end = (endAngle * Math.PI) / 180;
        const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
        const outerRadius = radius;
        const innerRadius = radius * 0.65;

        const x1 = centerX + outerRadius * Math.cos(start);
        const y1 = centerY - outerRadius * Math.sin(start);
        const x2 = centerX + outerRadius * Math.cos(end);
        const y2 = centerY - outerRadius * Math.sin(end);
        const x3 = centerX + innerRadius * Math.cos(end);
        const y3 = centerY - innerRadius * Math.sin(end);
        const x4 = centerX + innerRadius * Math.cos(start);
        const y4 = centerY - innerRadius * Math.sin(start);

        return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${x2} ${y2} 
                L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${x4} ${y4} Z`;
    };

    const needleAngle = 180 - (percentage * 180) / 100;
    const needleLength = radius * 0.75;
    const needleX = centerX + needleLength * Math.cos((needleAngle * Math.PI) / 180);
    const needleY = centerY - needleLength * Math.sin((needleAngle * Math.PI) / 180);

    const getTickColor = (tickValue) => segments.find((seg) => tickValue >= seg.start && tickValue <= seg.end)?.color || '#333';

    const getTickLabelPosition = (tick) => {
        const angle = 180 - (tick * 180) / 100;
        const tickLength = radius * 0.08;
        const labelRadius = radius * (dimensions.width < 300 ? 1.12 : 1.05);
        const x1 = centerX + radius * Math.cos((angle * Math.PI) / 180);
        const y1 = centerY - radius * Math.sin((angle * Math.PI) / 180);
        const x2 = centerX + (radius - tickLength) * Math.cos((angle * Math.PI) / 180);
        const y2 = centerY - (radius - tickLength) * Math.sin((angle * Math.PI) / 180);
        const labelX = centerX + labelRadius * Math.cos((angle * Math.PI) / 180);
        const labelY = centerY - labelRadius * Math.sin((angle * Math.PI) / 180);

        return {x1, y1, x2, y2, labelX, labelY};
    };

    return (
        <div className="w-full h-full" ref={containerRef}>
            {dimensions.width > 0 && (
                <svg width={dimensions.width} height={dimensions.height} className="overflow-visible">
                    <path d={createSegment(0, 180, '#f0f0f0')} fill="#f0f0f0" className="opacity-50"/>

                    {segments.map(({start, end, color}) => (
                        <path
                            key={start}
                            d={createSegment(180 - (end * 180) / 100, 180 - (start * 180) / 100, color)}
                            fill={color}
                            className="transition-all duration-300"
                            style={{filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.1))'}}
                        />
                    ))}

                    {[0, 25, 50, 75, 100].map((tick) => {
                        const {x1, y1, x2, y2, labelX, labelY} = getTickLabelPosition(tick);
                        return (
                            <g key={tick}>
                                <line
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke={getTickColor(tick)}
                                    strokeWidth={2}
                                    className="transition-all duration-300"
                                />
                                <text
                                    x={labelX}
                                    y={labelY}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill={getTickColor(tick)}
                                    style={{
                                        fontSize: getFontSize(0.04),
                                        filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.1))',
                                        fontWeight: 500
                                    }}
                                    className="transition-all duration-300"
                                >
                                    {tick}%
                                </text>
                            </g>
                        );
                    })}

                    <line
                        x1={centerX}
                        y1={centerY}
                        x2={needleX}
                        y2={needleY}
                        stroke={getColor(percentage)}
                        strokeWidth={3}
                        className="transition-all duration-300"
                        style={{filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.2))'}}
                    />
                    <circle cx={centerX} cy={centerY} r={radius * 0.04} fill={getColor(percentage)}/>

                    <g className="text-center">
                        <text
                            x={centerX}
                            y={centerY - radius * 0.2}
                            textAnchor="middle"
                            fill={getColor(percentage)}
                            style={{
                                fontSize: getFontSize(0.07),
                                filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))',
                                fontWeight: 'bold'
                            }}
                            className="transition-all duration-300"
                        >
                            {percentage.toFixed(1)}%
                        </text>
                        <text
                            x={centerX}
                            y={centerY - radius * 0.1}
                            textAnchor="middle"
                            fill={getColor(percentage)}
                            style={{
                                fontSize: getFontSize(0.05),
                                filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))',
                                fontWeight: 600
                            }}
                            className="transition-all duration-300"
                        >
                            Fuel Level
                        </text>
                    </g>
                </svg>
            )}
        </div>
    );
};

export default GaugeChart;
