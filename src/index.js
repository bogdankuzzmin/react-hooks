import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';

import '../src/index.css';

const TestContext = React.createContext();

const App = () => {
  return (
    <TestContext.Provider value="Test Context">
      <HookSwitcher />

    </TestContext.Provider>
  );
};

const TestContextC = () => {
  const value = useContext(TestContext);

  return <p>{value}</p>
};

const HookSwitcher = () => {
  const [color, setColor] = useState('black');
  const [fontSize, setFontSize] = useState(14);
  const [fontWeight, setFontWeight] = useState(false);

  const weight = fontWeight ? '700' : '400';

  return (
    <div style={{
      padding: '10px',
      height: '100vh',
      fontSize: `${fontSize}px`,
      fontWeight: weight,
      backgroundColor: color}}>

      <p>Hello, Mother Fucker!</p>

      <button onClick={() => setColor('black')}>
        Dark
      </button>

      <button onClick={() => setColor('white')}>
        Light
      </button>

      <button onClick={() => setFontSize((size) => size + 2)}>
        +
      </button>

      <button onClick={() => setFontSize((size) => size - 2)}>
        -
      </button>

      <button onClick={() => setFontWeight(!fontWeight)}>
        Bold
      </button>

      <TestContextC />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root'));
