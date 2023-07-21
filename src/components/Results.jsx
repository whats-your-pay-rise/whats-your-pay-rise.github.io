import { Fragment } from "react";
import Graph from './Graph';

const formatCurrency = (amount, showDecimals) => {
  const fractionDigits = showDecimals ? 0 : 2;
  return `£${amount.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  })}`;
};

function Results(props) {
  const currentYear = new Date().getFullYear();

  const comparisonYearIndex = props.data.find(entry => entry.year === props.comparisonYear).index;
  const currentYearIndex = props.data[props.data.length - 1].index;

  const comparisonPayInCurrentTerms = props.comparisonPay * currentYearIndex / comparisonYearIndex;

  const isPayRise = props.currentPay > comparisonPayInCurrentTerms;

  const realTermsPayChange = Math.round(Math.abs(100 * (props.currentPay - comparisonPayInCurrentTerms) / comparisonPayInCurrentTerms));
  const nominalTermsPayChange = Math.round(Math.abs(100 * (props.currentPay - props.comparisonPay) / props.comparisonPay));

  return (
    <Fragment>
      <div className='results-graph'>
        <Graph
          comparisonPay={comparisonPayInCurrentTerms}
          currentPay={props.currentPay}
          comparisonYear={props.comparisonYear}
          currentYear={currentYear}
        />
      </div>
      <div className="text-center">
        {isPayRise ? <p>Since {props.comparisonYear} you have had a real terms pay&nbsp;rise of {realTermsPayChange}%.</p> : null}
        {isPayRise ? <p>This is less than the {nominalTermsPayChange}% nominal pay rise you might have expected.</p> : null}
        {!isPayRise ? <p>Since {props.comparisonYear} you have had a real terms <span className="text-danger">pay&nbsp;cut</span> of {realTermsPayChange}%.</p> : null}
        {<p>Your {formatCurrency(props.comparisonPay, props.comparisonPay > 100)} pay in {props.comparisonYear} is equivalent to {formatCurrency(comparisonPayInCurrentTerms, props.comparisonPay > 100)} today.</p>}
        {/* <a target="_blank" rel="noreferrer" className="btn btn-primary btn-lg" href="https://twitter.com/intent/tweet?text=Know%20how%20inflation%20has%20impacted%20your%20pay%3F%0A%0AFind%20out%20at%20https%3A%2F%2Fwhatsyourwageworth.com%2C%20you%20may%20be%20surprised!" role="button">Share on Twitter</a> */}
      </div>
    </Fragment>
  );
}

export default Results;
