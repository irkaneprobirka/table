import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from './store';
import { getCountries } from './store/countriesStore/countriesApi';
import CountriesTable from './components/CountriesTable';
import ColumnSelector from './components/ColumnSelector';
import { Column } from './types/types';

const columns: Column[] = [
  {
    id: 'index',
    title: '#',
    visible: true,
    contentRenderer: ({ index }) => <span>{index}</span>,
  },
  {
    id: 'name',
    title: 'Name',
    visible: true,
    isWide: true,
    cellColor: 'lightblue',
    emptyCellColor: 'lightgray',
    contentRenderer: ({ country }) => <span>{country?.name?.common}</span>,
  },
  {
    id: 'languages',
    title: 'Languages',
    visible: true,
    isWide: false,
    cellColor: 'lightyellow',
    emptyCellColor: 'lightpink',
    contentRenderer: ({ country }) => {
      const languages = country?.languages
        ? Object.keys(country.languages)
        : [];
      return languages.length > 1
        ? `${languages.length} языка(ов)`
        : languages.join(', ');
    },
  },
  {
    id: 'region',
    title: 'Region',
    visible: true,
    isWide: false,
    emptyCellColor: 'lightpink',
    contentRenderer: ({ country }) => <span>{country?.region}</span>,
  },
  {
    id: 'population',
    title: 'Population',
    visible: true,
    isWide: false,
    cellColor: 'lightgreen',
    contentRenderer: ({ country }) => <span>{country?.population}</span>,
  },
  {
    id: 'status',
    title: 'Status',
    visible: true,
    contentRenderer: ({ country }) => <span>{country?.status}</span>,
  },
  {
    id: 'startOfWeek',
    title: 'Start of Week',
    visible: true,
    contentRenderer: ({ country }) => <span>{country?.startOfWeek}</span>,
  },
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
