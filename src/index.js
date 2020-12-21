import React, {Component, useState, useContext, useEffect} from 'react';
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

  return <p style={{marginTop: '50px'}}>{value}</p>
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
      <TestUseEffect />
    </div>
  )
}

const TestUseEffect = () => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div style={{marginTop: '50px'}}>
        <button onClick={() => setValue((v) => v + 1)}>+</button>
        <button onClick={() => setVisible(false)}>hide</button>

        <ClassCounter value={value} />
        <HookCounter value={value} />
      </div>
    )
  } else {
    return <button onClick={() => setVisible(true)}>show</button>
  }
};

const HookCounter = ({value}) => {
  useEffect(() => {
    console.log('useEffect()');

    return () => console.log('clear');
  }, [value]);

  return <p>{value}</p>
};

class ClassCounter extends Component {
  componentDidMount() {
    console.log('class: mount');
  }

  componentDidUpdate() {
    console.log('class: update');
  }

  componentWillUnmount() {
    console.log('class: unmount');
  }

  render() {
    return <p>{this.props.value}</p>;
  }
}

ReactDOM.render(<App />,
  document.getElementById('root'));
