import { useState, Fragment, useRef } from 'react';
import data from './data';
import Input from './components/Input';
import Select from './components/Select';
import Results from './components/Results';

function App() {
  const [comparisonPay, setComparisonPay] = useState("");
  const [currentPay, setCurrentPay] = useState("");
  const [comparisonYear, setComparisonYear] = useState(data[0].year);
  const [showResults, setShowResults] = useState(false);

  const scrollRef = useRef(null);

  const onSubmit = event => {
    if (!(currentPay && comparisonPay)) {
      event.preventDefault();
      return;
    }

    setShowResults(true);
    setTimeout(() => scrollRef.current.scrollIntoView({ block: "nearest", inline: "nearest", behavior: 'smooth' }));
    event.preventDefault();
  };

  return (
    <div className="container form-container">
      <div className="row">
        <div className="col-12 col-lg-6 col-xl-5 form-col">
          <p className="">Enter your pay below to find out the full cost of inflation. Try your annual salary, your hourly
            wage, or anything in between.</p>
          <form onSubmit={onSubmit}>
            <fieldset>
              <Select
                label="Year you started work"
                value={comparisonYear}
                setValue={value => {
                  setShowResults(false);
                  setComparisonYear(value);
                }}
                options={data.slice(0, -1).map(entry => entry.year)}
              />
              <Input
                label={<Fragment>Your pay in <span className="font-weight-bold">{comparisonYear}</span></Fragment>}
                setValue={value => {
                  setShowResults(false);
                  setComparisonPay(value);
                }}
              />
              <Input
                label={<Fragment>Your pay <span className="font-weight-bold">now</span></Fragment>}
                setValue={value => {
                  setShowResults(false);
                  setCurrentPay(value);
                }}
              />
              <button type="submit" className="btn btn-calculate btn-primary">CALCULATE</button>
            </fieldset>
          </form>
        </div>
        <div className={`results-card ${showResults ? "" : "d-none d-md-block"} col-12 col-lg-5 offset-lg-1 col-xl-6`} ref={scrollRef}>
          <div style={showResults ? {} : { filter: "blur(4px) grayscale(1) contrast(0.6)" }}>
            {showResults ?
              <Results
                comparisonYear={comparisonYear}
                comparisonPay={comparisonPay}
                currentPay={currentPay}
                data={data}
              /> :
              <Results
                comparisonYear={2010}
                comparisonPay={20000}
                currentPay={24000}
                data={data}
              />}
          </div>
        </div>
      </div >
    </div >

  );
}

export default App;
