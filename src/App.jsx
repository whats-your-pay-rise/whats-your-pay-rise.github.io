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
      <div id="shareModal" className="modal show" tabIndex="-1" style={{ "display": "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Share to Twitter</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Select how much detail you want to share</p>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                <label class="form-check-label" for="flexRadioDefault1">
                  Just a link
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label class="form-check-label" for="flexRadioDefault2">
                  A link with a bar chart
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                <label class="form-check-label" for="flexRadioDefault3">
                  Full details
                </label>
              </div>
              <img></img>
              <img></img>
              <img></img>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?text=${encodeURI("See the impact of inflation on your pay")}&url=${encodeURI("https://whatsyourwageworth.com")}&hashtags=costofliving`}
                type="button"
                className="btn btn-primary">
                Share
              </a>
            </div>
          </div>
        </div>
      </div>
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
                  <button className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#shareModal">Share</button>
                </div>
              </div>
            </div>
          </div> : null}
      </form>
    </div>
  );
}

export default App;
