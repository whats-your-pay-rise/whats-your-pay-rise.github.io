import './App.css';
import { useState, Fragment } from 'react';
import data from './data';
import Graph from './Graph';
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

  const onSubmit = event => {
    setComparisonPay(provisionalComparisonPay);
    setCurrentPay(provisionalCurrentPay);
    setComparisonYear(provisionalComparisonYear);
    setShowResults(true);
    event.preventDefault();
  };

  return (
    <div className="App container">
      <div className="row">
        <div className='col-md'>
          <p className="">Enter your pay below to find out the full cost of inflation. Try your annual salary, your hourly
            wage, or anything in between.</p>
          <form onSubmit={onSubmit}>
            <fieldset>
              <Select
                label="Year you started work"
                value={provisionalComparisonYear}
                setValue={setProvisionalComparisonYear}
                options={data.slice(0, -1).map(entry => entry.year)}
                isPristine={setShowResults}
              />
              <Input
                label={<Fragment>Your pay in <span className="font-weight-bold">{provisionalComparisonYear}</span></Fragment>}
                setValue={setProvisionalComparisonPay}
                isPristine={setShowResults}
              />
              <Input
                label={<Fragment>Your pay <span className="font-weight-bold">now</span></Fragment>}
                setValue={setProvisionalCurrentPay}
                isPristine={setShowResults}
              />
              <button type="submit" className="btn btn-calculate btn-primary" disabled={!(provisionalCurrentPay && provisionalComparisonPay)}>CALCULATE</button>
            </fieldset>
          </form>
        </div>
        {showResults ?
          <div className='results-card'>
            {/* <div className="results-graph"> */}
              <Graph
                comparisonPay={comparisonPayInCurrentTerms}
                currentPay={currentPay}
                comparisonYear={comparisonYear}
                currentYear={currentYear}
              />
            {/* </div> */}
            <div className="card-body">
              {isPayRise ? <p>Since {comparisonYear} you have had a real terms pay rise of {realTermsPayChange}%</p> : null}
              {isPayRise ? <p>This is less than the {nominalTermsPayChange}% nominal pay rise you might have expected</p> : null}
              {!isPayRise ? <p>Since {comparisonYear} you have had a real terms <span className="text-danger">pay cut</span> of {realTermsPayChange}%</p> : null}
              {<p>Your {comparisonYear} pay is equivalent to {formatCurrency(comparisonPayInCurrentTerms)} today</p>}
              {/* <a target="_blank" rel="noreferrer" className="btn btn-primary btn-lg" href="https://twitter.com/intent/tweet?text=Know%20how%20inflation%20has%20impacted%20your%20pay%3F%0A%0AFind%20out%20at%20https%3A%2F%2Fwhatsyourwageworth.com%2C%20you%20may%20be%20surprised!" role="button">Share on Twitter</a> */}
            </div>
          </div> : null}
      </div >
    </div >
  );
}

export default App;
