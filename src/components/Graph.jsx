function Graph(props) {
    const height = props.height;
    const width = props.width;
    const axisOffset = 0;
    const barPadding = 40;
    const horizontalTextPadding = -5;

    const xAxisLength = width - 2 * axisOffset;
    const yAxisLength = height - 2 * axisOffset;
    const barWidth = (xAxisLength - 3 * barPadding) / 2;

    const thenBarHeight = yAxisLength * 0.7 * props.comparisonPay / Math.max(props.comparisonPay, props.currentPay);
    const nowBarHeight = yAxisLength * 0.7 * props.currentPay / Math.max(props.comparisonPay, props.currentPay);

    return (
        <svg width="100%" viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i =>
                <line
                    x1={0}
                    x2={width}
                    y1={i * height / 12}
                    y2={i * height / 12}
                    stroke="black"
                    strokeWidth={0.5}
                    strokeOpacity={0.2}
                />)}
            {/* <line
                x1={axisOffset - axisStrokeWidth}
                x2={axisOffset + xAxisLength}
                y1={height - axisOffset + axisStrokeWidth / 2}
                y2={height - axisOffset + axisStrokeWidth / 2}
                stroke="black"
                strokeWidth={axisStrokeWidth}
            />
            <line
                x1={axisOffset - axisStrokeWidth / 2}
                x2={axisOffset - axisStrokeWidth / 2}
                y1={height - axisOffset + axisStrokeWidth}
                y2={height - axisOffset - yAxisLength}
                stroke="black"
                strokeWidth={axisStrokeWidth}
            /> */}
            <line
                x1={axisOffset + barPadding + barWidth / 2}
                x2={axisOffset + barPadding + barWidth / 2}
                y1={height - axisOffset}
                y2={height - axisOffset - thenBarHeight}
                stroke="green"
                strokeWidth={barWidth}
            />
            <line
                x1={axisOffset + 2 * barPadding + 3 * barWidth / 2}
                x2={axisOffset + 2 * barPadding + 3 * barWidth / 2}
                y1={height - axisOffset}
                y2={height - axisOffset - nowBarHeight}
                stroke={props.comparisonPay > props.currentPay ? "red" : "green"}
                strokeWidth={barWidth}
            />
            <text
                x={axisOffset + barPadding + barWidth / 2}
                y={height - axisOffset - thenBarHeight + horizontalTextPadding}
                // dominantBaseline="hanging"
                textAnchor="middle">
                {props.comparisonYear}
            </text>
            <text
                x={axisOffset + 2 * barPadding + 3 * barWidth / 2}
                y={height - axisOffset - nowBarHeight + horizontalTextPadding}
                // dominantBaseline="hanging"
                textAnchor="middle">
                {props.currentYear}
            </text>
            {/* <text
                x={axisOffset - verticalTextPadding}
                y={height - axisOffset - (yAxisLength)/2}
                dominantBaseline="middle"
                textAnchor="middle"
                transform={`rotate(270 ${axisOffset - verticalTextPadding},${height - axisOffset - (yAxisLength)/2})`}
                >
                Real terms pay
            </text> */}
            <rect x="0.5" y="0.5" width={width - 1} height={height - 1} stroke="black" strokeWidth="1" fill="none" />
        </svg>
    );
}

export default Graph;