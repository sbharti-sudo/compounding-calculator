import './App.css';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { calculateTermDeposit } from './utils/termDepositCalculation';


function App() {
  const [deposit, setDeposit] = useState(1000);
  const [interestRate, setInterestRate] = useState(0);
  const [term, setTerm] = useState(3);
  const [interestPaid, setInterestPaid] = useState('monthly');
  const [finalBalance, setFinalBalance] = useState(''); 
  const [totalInterestEarned, setTotalInterestEarned] = useState(''); 

  const handleCalculate = () => {
    let principalAmount = parseFloat(deposit);
    let interestPerAnnum = parseFloat(interestRate);
    let months = parseInt(term);

    const result = calculateTermDeposit(principalAmount, interestPerAnnum, months, interestPaid);
    
    if (result) {
      setFinalBalance(result.finalBalance);  // Update state with final amount
      setTotalInterestEarned(result.totalInterestEarned);  // Update state with total interest earned
    }
  };

  return (
    <div className="App">
      <Form className="form">
        <Form.Group>
          <Form.Label>Start Deposit Amount</Form.Label>
          <Form.Control
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            min="1000"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Interest Rate (%)</Form.Label>
          <Form.Control
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            min="0"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Investment Term (months)</Form.Label>
          <Form.Control
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            min="3"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Interest Paid</Form.Label>
          <Form.Control
            as="select"
            value={interestPaid}
            onChange={(e) => setInterestPaid(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
            <option value="atMaturity">At Maturity</option>
          </Form.Control>
        </Form.Group>

        <Button className="calculateButton" variant="primary" onClick={handleCalculate}>
          Calculate
        </Button>
        <InputGroup className="finalbalance">
          <InputGroup.Text>Final Amount</InputGroup.Text>
          <FormControl
            readOnly
            value={finalBalance}
          />
        </InputGroup>
        <InputGroup className="totalInterest">
          <InputGroup.Text>Total Interest Earned</InputGroup.Text>
          <FormControl
            readOnly
            value={totalInterestEarned}
          />
        </InputGroup>
      </Form>
    </div>
  );
}

export default App;
