import React, {Component, useState, useContext, useEffect, useCallback, useMemo} from 'react';
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
  const [value, setValue] = useState(1);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div style={{marginTop: '50px'}}>
        <button onClick={() => setValue((v) => v + 1)}>+</button>
        <button onClick={() => setVisible(false)}>hide</button>

        {/*<ClassCounter value={value} />*/}
        <HookCounter value={value} />
        <Notification />
        <PlanetInfo id={value} />
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

const Notification = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false)}, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {visible && <p>Hello</p>}
    </div>
  );
}

const getPlanet = (id) => {
  return fetch(`https://swapi.dev/api/planets/${id}`)
    .then(res => res.json())
    .then(data => data);
};

const useRequest = (request) => {
  const initialState = useMemo(() => ({
    data: null,
    loading: true,
    error: false,
  }), []);

  const [dataState, setDataState] = useState(initialState);

  useEffect(() => {
    setDataState(initialState);

    let cancelled = false;

    request()
      .then(data => !cancelled && setDataState({
        data,
        loading: false,
        error: false,
      }))
      .catch(error => !cancelled && setDataState({
        data: null,
        loading: false,
        error: true,
      }));

    return () => cancelled = true;
  }, [request, initialState]);

  return dataState;
};

const usePlanetInfo = (id) => {
  const request = useCallback(() => getPlanet(id), [id]);

  return useRequest(request);
};

const PlanetInfo = ({id}) => {
  const {data, loading, error} = usePlanetInfo(id);

  if (error) {
    return <div>Something is wrong</div>;
  }

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div>{id} - {data.name}</div>
  );
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
