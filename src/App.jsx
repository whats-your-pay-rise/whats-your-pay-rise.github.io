import './App.css';
import { useState } from 'react';

// Source: https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7bt
const data = [
  { year: 2010, index: 89.4 },
  { year: 2011, index: 93.4 },
  { year: 2012, index: 96.1 },
  { year: 2013, index: 98.5 },
  { year: 2014, index: 100.0 },
  { year: 2015, index: 100.0 },
  { year: 2016, index: 100.7 },
  { year: 2017, index: 103.4 },
  { year: 2018, index: 105.9 },
  { year: 2019, index: 107.8 },
  { year: 2020, index: 108.7 },
  { year: 2021, index: 111.6 },
  { year: 2022, index: 121.7 },
  { year: 2023, index: 128.9 }
];

const formatCurrency = amount => `£${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

function App() {
  const [comparisonPay, setComparisonPay] = useState(0);
  const [currentPay, setCurrentPay] = useState(0);

  const [showCurrentYearSelector, setShowCurrentYearSelector] = useState(false);
  const [comparisonYear, setComparisonYear] = useState(data[0].year);
  const currentYear = data[data.length - 1].year;

  const comparisonYearIndex = data.find(entry => entry.year === comparisonYear).index;
  const currentYearIndex = data.find(entry => entry.year === currentYear).index;

  const comparisonPayInCurrentTerms = comparisonPay * currentYearIndex / comparisonYearIndex;

  const isPayRise = currentPay > comparisonPayInCurrentTerms;

  const payChange = Math.round(Math.abs(100 * (currentPay - comparisonPayInCurrentTerms) / comparisonPayInCurrentTerms));

  return (
    <div className="App">


      <form>
        <fieldset>
          <div className='row'>
            <div className='col-md'>

              <div className="input-group mb-3 px-3">
                <span className="input-group-text">£</span>
                <div className="form-floating">
                  <input type="number" className="form-control" id="comparisonPayInput" aria-describedby="comparisonPay" placeholder='placeholder'
                    onChange={e => setComparisonPay(e.target.valueAsNumber)} />
                  <label for="comparisonPayInput">Your pay in {comparisonYear}</label>
                </div>
              </div>

              {/* <div id="passwordHelpBlock" className="form-text">
                Guidance on inserting your old pay.
              </div> */}
              <details open={showCurrentYearSelector} onClick={e => {
                e.preventDefault();
                setShowCurrentYearSelector(!showCurrentYearSelector);
              }}>
                <summary>Weren't working in {comparisonYear}?</summary>
                <p onClick={e => e.stopPropagation()}>Select a year when you were working:</p>
                <select className="form-select" value={comparisonYear} onClick={e => e.stopPropagation()}
                  onChange={e => {
                    setComparisonYear(parseInt(e.target.value, 10));
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
                    onChange={e => setCurrentPay(e.target.valueAsNumber)} />
                  <label for="currentPayInput">Your pay now</label>
                </div>
              </div>

              {/* <div id="passwordHelpBlock" className="form-text">
                Guidance on inserting your new pay.
              </div> */}
            </div>
          </div>
        </fieldset>
        <br />
        <div>
          {comparisonPay ? <p>To earn the equivalent today of what you earned in {comparisonYear}, your pay would have to be {formatCurrency(comparisonPayInCurrentTerms)}</p> : null}
          {comparisonPay && currentPay && isPayRise ? <p>Since {comparisonYear} you have had a real terms pay rise of {payChange}% since {comparisonYear}</p> : null}
          {comparisonPay && currentPay && !isPayRise ? <p>Since {comparisonYear} you have had a real terms pay cut of {payChange}%</p> : null}
        </div>
      </form>
    </div>
  );
}

export default App;
