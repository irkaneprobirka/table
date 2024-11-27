import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { getCountries } from './store/countriesStore/countriesApi';
import CountriesTable from './components/CountriesTable';
import ColumnSelector from './components/ColumnSelector';
import { Column } from './types/types';

const columns: Column[] = [
  { id: 'index', title: '#', visible: true },//убран параметр, все и правда работает без него 
  {
    id: 'name',
    title: 'Name',
    visible: true,
    isWide: true,
    cellColor: 'lightblue',
    emptyCellColor: 'lightgray',
    contentRenderer: (country) => country.name.common, 
  },
  {
    id: 'languages',
    title: 'Languages',
    visible: true,
    isWide: false,
    cellColor: 'lightyellow',
    emptyCellColor: 'lightpink',
    contentRenderer: (country) => {
      const languages = country.languages ? Object.keys(country.languages) : [];
      return languages.length > 1
        ? `${languages.length} языка(ов)`
        : languages.join(', ');
    },
  },
  { id: 'region', title: 'Region', visible: true, isWide: false, emptyCellColor: 'lightpink', },
  {
    id: 'population',
    title: 'Population',
    visible: true,
    isWide: false,
    cellColor: 'lightgreen',
    contentRenderer: (country) => country.population,
  },
  { id: 'status', title: 'Status', visible: true, contentRenderer: (country) => country.status },
  { id: 'startOfWeek', title: 'Start of Week', visible: true, contentRenderer: (country) => country.startOfWeek },
];

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="container">
      <ColumnSelector columns={columns} />
      <CountriesTable columns={columns} />
    </div>
  );
};

export default App;
