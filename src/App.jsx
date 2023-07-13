import './App.css';
import { useState } from 'react';
import data from './data';
import Graph from './Graph';

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
              <div className="input-group mb-3 px-3">
                <label className="input-group-text rounded-0 bg-body" for="comparisonYearSelect">Year you started work</label>
                <select className="form-select form-select-lg rounded-0" id="comparisonYearSelect" value={provisionalComparisonYear}
                  onChange={e => {
                    setProvisionalComparisonYear(parseInt(e.target.value, 10));
                    setShowResults(false);
                  }}>
                  {data.slice(0, -1).map((entry, i) => <option key={entry.year} value={entry.year}>{entry.year}</option>)}
                </select>
              </div>
              <div className="input-group mb-3 px-3">
                <span className="input-group-text rounded-0 bg-body">£</span>
                <div className="form-floating">
                  <input type="number" step="0.01" className="form-control rounded-0" id="comparisonPayInput" aria-describedby="comparisonPay" placeholder='placeholder'
                    onChange={e => {
                      setProvisionalComparisonPay(e.target.valueAsNumber);
                      setShowResults(false);
                    }} />
                  <label htmlFor="comparisonPayInput">Your pay in <span className="font-weight-bold">{provisionalComparisonYear}</span></label>
                </div>
              </div>
              <div className='col-md'>
                <div className="input-group mb-3 px-3">
                  <span className="input-group-text rounded-0 bg-body">£</span>
                  <div className="form-floating">
                    <input type="number" step="0.01" className="form-control rounded-0" id="currentPayInput" aria-describedby="currentPay" placeholder='placeholder'
                      onChange={e => {
                        setProvisionalCurrentPay(e.target.valueAsNumber);
                        setShowResults(false);
                      }} />
                    <label htmlFor="currentPayInput">Your pay <span className="font-weight-bold">now</span></label>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg" disabled={!(provisionalCurrentPay && provisionalComparisonPay)}>Calculate</button>
            </fieldset>
          </form>
        </div>
        {showResults ?
          <div className="col-md-8 offset-md-2 results-card">
            <div className="card">
              <div className="card-header">
                Your results
              </div>
              <div>
                <Graph
                  comparisonPay={comparisonPayInCurrentTerms}
                  currentPay={currentPay}
                  comparisonYear={comparisonYear}
                  currentYear={currentYear}
                />
              </div>
              <div className="card-body">
                {isPayRise ? <p>Since {comparisonYear} you have had a real terms pay rise of {realTermsPayChange}%</p> : null}
                {isPayRise ? <p>This is less than the {nominalTermsPayChange}% nominal pay rise the numbers suggest</p> : null}
                {!isPayRise ? <p>Since {comparisonYear} you have had a real terms <span className="text-danger">pay cut</span> of {realTermsPayChange}%</p> : null}
                {<p>Your {comparisonYear} pay is equivalent to {formatCurrency(comparisonPayInCurrentTerms)} today</p>}
                <a target="_blank" rel="noreferrer" className="btn btn-primary btn-lg" href="https://twitter.com/intent/tweet?text=Know%20how%20inflation%20has%20impacted%20your%20pay%3F%0A%0AFind%20out%20at%20https%3A%2F%2Fwhatsyourwageworth.com%2C%20you%20may%20be%20surprised!" role="button">Share on Twitter</a>
              </div>
            </div>
          </div> : null}
      </div >
    </div >
  );
}

export default App;
