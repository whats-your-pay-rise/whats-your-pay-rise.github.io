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

  const [showComparisonYearSelector, setShowComparisonYearSelector] = useState(false);

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
    <div className="App">
      <form onSubmit={onSubmit}>
        <fieldset>
          <div className='row'>
            <div className='col-md'>
              <div className="input-group mb-3 px-3">
                <span className="input-group-text">£</span>
                <div className="form-floating">
                  <input type="number" step="0.01" className="form-control" id="comparisonPayInput" aria-describedby="comparisonPay" placeholder='placeholder'
                    onChange={e => {
                      setProvisionalComparisonPay(e.target.valueAsNumber);
                      setShowResults(false);
                    }} />
                  <label htmlFor="comparisonPayInput">Your pay in {provisionalComparisonYear}*</label>
                </div>
              </div>

              {/* <div id="passwordHelpBlock" className="form-text">
                Guidance on inserting your old pay.
              </div> */}
              <div className="text-start px-3">
                <details open={showComparisonYearSelector} onClick={e => {
                  e.preventDefault();
                  setShowComparisonYearSelector(!showComparisonYearSelector);
                }}>
                  <summary className="link-primary">*Weren't working in {provisionalComparisonYear}?</summary>
                  <div className="animate-details">
                    <p onClick={e => e.stopPropagation()}>Select a year when you were working:</p>
                    <select className="form-select" id="comparisonYearSelect" value={provisionalComparisonYear} onClick={e => e.stopPropagation()}
                      onChange={e => {
                        setProvisionalComparisonYear(parseInt(e.target.value, 10));
                        setShowComparisonYearSelector(false);
                        setShowResults(false);
                      }}>
                      {data.slice(0, -1).map(entry => <option key={entry.year}>{entry.year}</option>)}
                    </select>
                  </div>
                </details>
              </div>

              <br />
            </div>

            <div className='col-md'>
              <div className="input-group mb-3 px-3">
                <span className="input-group-text">£</span>
                <div className="form-floating">
                  <input type="number" step="0.01" className="form-control" id="currentPayInput" aria-describedby="currentPay" placeholder='placeholder'
                    onChange={e => {
                      setProvisionalCurrentPay(e.target.valueAsNumber);
                      setShowResults(false);
                    }} />
                  <label htmlFor="currentPayInput">Your pay now</label>
                </div>
              </div>

              {/* <div id="passwordHelpBlock" className="form-text">
                Guidance on inserting your new pay.
              </div> */}
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg" disabled={!(provisionalCurrentPay && provisionalComparisonPay)}>Calculate</button>
        </fieldset>
        <br />
        {showResults ?
          <div className="row">
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
            </div>
          </div> : null}
      </form>
    </div>
  );
}

export default App;
