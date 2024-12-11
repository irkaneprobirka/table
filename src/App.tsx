import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from './store';
import { getCountries } from './store/countriesStore/countriesApi';
import CountriesTable from './components/CountriesTable';
import ColumnSelector from './components/ColumnSelector';
import { Column, Country } from './types/types';

const columns: Column[] = [
  {
    id: 'index',
    title: '#',
    visible: true,
    contentRenderer: (_, index) => <span>{index + 1}</span>,
  },
  {
    id: 'name',
    title: 'Name',
    visible: true,
    isWide: true,
    cellColor: 'lightblue',
    emptyCellColor: 'lightgray',
    contentRenderer: ({ name: { common } }: Country) => <span>{common}</span>,
  },
  {
    id: 'languages',
    title: 'Languages',
    visible: true,
    isWide: false,
    cellColor: 'lightyellow',
    emptyCellColor: 'lightpink',
    contentRenderer: (country: Country) => {
      const languages = country.languages ? Object.keys(country.languages) : [];
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
    contentRenderer: ({ region }: Country) => <span>{region}</span>,
  },
  {
    id: 'population',
    title: 'Population',
    visible: true,
    isWide: false,
    cellColor: 'lightgreen',
    contentRenderer: ({ population }: Country) => <span>{population}</span>,
  },
  {
    id: 'status',
    title: 'Status',
    visible: true,
    contentRenderer: ({ status }: Country) => <span>{status}</span>,
  },
  {
    id: 'startOfWeek',
    title: 'Start of Week',
    visible: true,
    contentRenderer: ({ startOfWeek }: Country) => <span>{startOfWeek}</span>,
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
