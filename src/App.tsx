// App.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ColumnSelector from './components/ColumnSelector';
import CountriesTable from './components/CountriesTable';
import { getCountries } from './store/countriesStore/countriesApi';
import { AppDispatch } from './store';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="container">
      <ColumnSelector />
      <CountriesTable />
    </div>
  );
};

export default App;
