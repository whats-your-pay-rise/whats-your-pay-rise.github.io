import './App.css';
import { useEffect, useState } from 'react';
import data from './data';

const formatCurrency = amount => `£${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

const numberIsDefined = input => input || input === 0;

const periods = ["yearly", "monthly", "weekly", "daily", "hourly"];

function App() {
  const [comparisonPay, setComparisonPay] = useState("");
  const [currentPay, setCurrentPay] = useState("");
  const [comparisonYear, setComparisonYear] = useState(data[0].year);
  const [index, setIndex] = useState(0);

  const [provisionalComparisonPay, setProvisionalComparisonPay] = useState("");
  const [provisionalCurrentPay, setProvisionalCurrentPay] = useState("");
  const [provisionalComparisonYear, setProvisionalComparisonYear] = useState(comparisonYear);

  const [showCurrentYearSelector, setShowCurrentYearSelector] = useState(false);

  const currentYear = data[data.length - 1].year;

  const comparisonYearIndex = data.find(entry => entry.year === comparisonYear).index;
  const currentYearIndex = data.find(entry => entry.year === currentYear).index;

  const comparisonPayInCurrentTerms = comparisonPay * currentYearIndex / comparisonYearIndex;

  const isPayRise = currentPay > comparisonPayInCurrentTerms;

  const realTermsPayChange = Math.round(Math.abs(100 * (currentPay - comparisonPayInCurrentTerms) / comparisonPayInCurrentTerms));
  const nominalTermsPayChange = Math.round(Math.abs(100 * (currentPay - comparisonPay) / comparisonPay));

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000
    );
    return () => clearTimeout(intervalId);
  }, []);

  const onSubmit = event => {
    setComparisonPay(provisionalComparisonPay);
    setCurrentPay(provisionalCurrentPay);
    setComparisonYear(provisionalComparisonYear);
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
                  <input type="number" className="form-control" id="comparisonPayInput" aria-describedby="comparisonPay" placeholder='placeholder'
                    onChange={e => setProvisionalComparisonPay(e.target.valueAsNumber)} />
                  <label htmlFor="comparisonPayInput">What was your {periods[index % periods.length]} pay in {provisionalComparisonYear}?*</label>
                </div>
              </div>

              {/* <div id="passwordHelpBlock" className="form-text">
                Guidance on inserting your old pay.
              </div> */}
              <details open={showCurrentYearSelector} onClick={e => {
                e.preventDefault();
                setShowCurrentYearSelector(!showCurrentYearSelector);
              }}>
                <summary><a href="">*Weren't working in {provisionalComparisonYear}?</a></summary>
                <p onClick={e => e.stopPropagation()}>Select a year when you were working:</p>
                <select className="form-select" id="comparisonYearSelect" value={provisionalComparisonYear} onClick={e => e.stopPropagation()}
                  onChange={e => {
                    setProvisionalComparisonYear(parseInt(e.target.value, 10));
                    setShowCurrentYearSelector(false);
                  }}>
                  {data.slice(0, -1).map(entry => <option key={entry.year}>{entry.year}</option>)}
                </select>
              </details>
              <br/>
            </div>

            <div className='col-md'>

              <div className="input-group mb-3 px-3">
                <span className="input-group-text">£</span>
                <div className="form-floating">
                  <input type="number" className="form-control" id="currentPayInput" aria-describedby="currentPay" placeholder='placeholder'
                    onChange={e => setProvisionalCurrentPay(e.target.valueAsNumber)} />
                  <label htmlFor="currentPayInput">What is your {periods[index % periods.length]} pay now?</label>
                </div>
              </div>

              {/* <div id="passwordHelpBlock" className="form-text">
                Guidance on inserting your new pay.
              </div> */}
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg" disabled={!numberIsDefined(provisionalCurrentPay) || !numberIsDefined(provisionalComparisonPay)}>Calculate</button>
        </fieldset>
        <br />
        <div>
          {numberIsDefined(comparisonPay) && numberIsDefined(currentPay) && isPayRise ? <p>Since {comparisonYear} you have had a real terms pay rise of {realTermsPayChange}%, less than the {nominalTermsPayChange}% nominal pay rise the numbers might suggest</p> : null}
          {numberIsDefined(comparisonPay) && numberIsDefined(currentPay) && !isPayRise ? <p>Since {comparisonYear} you have had a real terms pay cut of {realTermsPayChange}%</p> : null}
          {numberIsDefined(comparisonPay) ? <p>Your pay in {comparisonYear} is equivalent to {formatCurrency(comparisonPayInCurrentTerms)} today</p> : null}
        </div>
      </form>
    </div>
  );
}

export default App;
