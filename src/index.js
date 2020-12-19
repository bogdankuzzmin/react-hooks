import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import '../src/index.css';

const App = () => {
  return (
    <HookSwitcher />
  );
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
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root'));
