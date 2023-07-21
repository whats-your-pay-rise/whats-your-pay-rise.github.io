import { useState, Fragment, useRef } from 'react';
import data from './data';
import Graph from './components/Graph';
import Input from './components/Input';
import Select from './components/Select';

const formatCurrency = amount => `£${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

function App() {
  const [comparisonPay, setComparisonPay] = useState("");
  const [currentPay, setCurrentPay] = useState("");
  const [comparisonYear, setComparisonYear] = useState(data[0].year);

  const [provisionalComparisonPay, setProvisionalComparisonPay] = useState("");
  const [provisionalCurrentPay, setProvisionalCurrentPay] = useState("");
  const [provisionalComparisonYear, setProvisionalComparisonYear] = useState(comparisonYear);

  const [showResults, setShowResults] = useState(false);

  const currentYear = new Date().getFullYear();

  const comparisonYearIndex = data.find(entry => entry.year === comparisonYear).index;
  const currentYearIndex = data[data.length - 1].index;

  const comparisonPayInCurrentTerms = comparisonPay * currentYearIndex / comparisonYearIndex;

  const isPayRise = currentPay > comparisonPayInCurrentTerms;

  const realTermsPayChange = Math.round(Math.abs(100 * (currentPay - comparisonPayInCurrentTerms) / comparisonPayInCurrentTerms));
  const nominalTermsPayChange = Math.round(Math.abs(100 * (currentPay - comparisonPay) / comparisonPay));

  const scrollRef = useRef(null);

  const onSubmit = event => {
    setComparisonPay(provisionalComparisonPay);
    setCurrentPay(provisionalCurrentPay);
    setComparisonYear(provisionalComparisonYear);
    setShowResults(true);
    setTimeout(() => scrollRef.current.scrollIntoView({ block: "nearest", inline: "nearest", behavior: 'smooth' }));
    event.preventDefault();
  };

  return (
    <div className="container form-container">
      <div className="row">
        <div className="col-12 col-lg-6 form-col">
          <p className="">Enter your pay below to find out the full cost of inflation. Try your annual salary, your hourly
            wage, or anything in between.</p>
          <form onSubmit={onSubmit}>
            <fieldset>
              <Select
                label="Year you started work"
                value={provisionalComparisonYear}
                setValue={value => {
                  setProvisionalComparisonYear(value);
                  setShowResults(false);
                }}
                options={data.slice(0, -1).map(entry => entry.year)}
              />
              <Input
                label={<Fragment>Your pay in <span className="font-weight-bold">{provisionalComparisonYear}</span></Fragment>}
                setValue={value => {
                  setProvisionalComparisonPay(value);
                  setShowResults(false);
                }}
              />
              <Input
                label={<Fragment>Your pay <span className="font-weight-bold">now</span></Fragment>}
                setValue={value => {
                  setProvisionalCurrentPay(value);
                  setShowResults(false);
                }}
              />
              <button type="submit" className="btn btn-calculate btn-primary">CALCULATE</button>
            </fieldset>
          </form>
        </div>
        <div className={`${showResults ? "col-12" : "d-none d-lg-block"} col-lg-5 offset-lg-1`} ref={scrollRef} style={showResults ? {} : { filter: "blur(4px) grayscale(1) contrast(0.6)" }}>
          <div className='results-graph'>
            <Graph
              comparisonPay={showResults ? comparisonPayInCurrentTerms : 10000}
              currentPay={showResults ? currentPay : 8000}
              comparisonYear={showResults ? comparisonYear : 2010}
              currentYear={currentYear}
            />
          </div>
          <div className="text-center">
            {isPayRise ? <p>Since {comparisonYear} you have had a real terms pay&nbsp;rise of {realTermsPayChange}%.</p> : null}
            {isPayRise ? <p>This is less than the {nominalTermsPayChange}% nominal pay rise you might have expected.</p> : null}
            {!isPayRise ? <p>Since {comparisonYear} you have had a real terms <span className="text-danger">pay&nbsp;cut</span> of {realTermsPayChange}%.</p> : null}
            {<p>Your {formatCurrency(comparisonPay)} pay in {comparisonYear} is equivalent to {formatCurrency(comparisonPayInCurrentTerms)} today.</p>}
            {/* <a target="_blank" rel="noreferrer" className="btn btn-primary btn-lg" href="https://twitter.com/intent/tweet?text=Know%20how%20inflation%20has%20impacted%20your%20pay%3F%0A%0AFind%20out%20at%20https%3A%2F%2Fwhatsyourwageworth.com%2C%20you%20may%20be%20surprised!" role="button">Share on Twitter</a> */}
          </div>
        </div>
      </div >
    </div >

  );
}

export default App;
