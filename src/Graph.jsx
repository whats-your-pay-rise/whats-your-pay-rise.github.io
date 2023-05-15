function Graph(props) {
    const dimension = 200;
    const axisOffset = 20;
    const barPadding = 10;
    const axisStrokeWidth = 2;
    const horizontalTextPadding = 5;
    const verticalTextPadding = 13;

    const height = dimension;
    const width = dimension;
    const axisLength = dimension - 2 * axisOffset;
    const barWidth = (axisLength - 3 * barPadding) / 2;

    return (
        <svg height={height} width={width}>
            <line
                x1={axisOffset - axisStrokeWidth}
                x2={axisOffset + axisLength}
                y1={height - axisOffset + axisStrokeWidth / 2}
                y2={height - axisOffset + axisStrokeWidth / 2}
                stroke="black"
                strokeWidth={axisStrokeWidth}
            />
            <line
                x1={axisOffset - axisStrokeWidth / 2}
                x2={axisOffset - axisStrokeWidth / 2}
                y1={height - axisOffset + axisStrokeWidth}
                y2={height - axisOffset - axisLength}
                stroke="black"
                strokeWidth={axisStrokeWidth}
            />
            <line
                x1={axisOffset + barPadding + barWidth / 2}
                x2={axisOffset + barPadding + barWidth / 2}
                y1={height - axisOffset}
                y2={height - axisOffset - axisLength * 0.9 * props.comparisonPay / Math.max(props.comparisonPay, props.currentPay)}
                stroke="green"
                strokeWidth={barWidth}
            />
            <line
                x1={axisOffset + 2 * barPadding + 3 * barWidth / 2}
                x2={axisOffset + 2 * barPadding + 3 * barWidth / 2}
                y1={height - axisOffset}
                y2={height - axisOffset - axisLength * 0.9 * props.currentPay / Math.max(props.comparisonPay, props.currentPay)}
                stroke={props.comparisonPay > props.currentPay ? "red" : "green"}
                strokeWidth={barWidth}
            />
            <text
                x={axisOffset + barPadding + barWidth / 2}
                y={height - axisOffset + horizontalTextPadding}
                dominantBaseline="hanging"
                textAnchor="middle">
                {props.comparisonYear}
            </text>
            <text
                x={axisOffset + 2 * barPadding + 3 * barWidth / 2}
                y={height - axisOffset + horizontalTextPadding}
                dominantBaseline="hanging"
                textAnchor="middle">
                {props.currentYear}
            </text>
            <text
                x={axisOffset - verticalTextPadding}
                y={height - axisOffset - (axisLength)/2}
                dominantBaseline="middle"
                textAnchor="middle"
                transform={`rotate(270 ${axisOffset - verticalTextPadding},${height - axisOffset - (axisLength)/2})`}
                >
                Real terms pay
            </text>
        </svg>
    );
}

export default Graph;