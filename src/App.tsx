import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { getCountries } from './store/countriesStore/countriesApi';
import CountriesTable from './components/CountriesTable';
import ColumnSelector from './components/ColumnSelector';
import { Column, Country } from './types/types';
import { cellContentRender } from './utils/cellContentRender';

const columns: Column[] = [
  {
    id: 'index',
    title: '#',
    visible: true,
    contentRenderer: (country: Country, index : number) => {
      return <span>{cellContentRender('index', country, index)}</span>;
    },
  },
  {
    id: 'name',
    title: 'Name',
    visible: true,
    isWide: true,
    cellColor: 'lightblue',
    emptyCellColor: 'lightgray',
    contentRenderer: (country: Country) => {
      return <span>{cellContentRender('name', country?.name.common)}</span>;
    },
  },
  {
    id: 'languages',
    title: 'Languages',
    visible: true,
    isWide: false,
    cellColor: 'lightyellow',
    emptyCellColor: 'lightpink',
    contentRenderer: (country: Country) => {
      return <span>{cellContentRender('languages', country.languages)}</span>;
    },
  },
  {
    id: 'region',
    title: 'Region',
    visible: true,
    isWide: false,
    emptyCellColor: 'lightpink',
    contentRenderer: (country: Country) => {
      return <span>{cellContentRender('region', country.region)}</span>;
    },
  },
  {
    id: 'population',
    title: 'Population',
    visible: true,
    isWide: false,
    cellColor: 'lightgreen',
    contentRenderer: (country: Country) => {
      return <span>{cellContentRender('population', country.population)}</span>;
    },
  },
  {
    id: 'status',
    title: 'Status',
    visible: true,
    contentRenderer: (country: Country) => {
      return <span>{cellContentRender('status', country.status)}</span>;
    },
  },
  {
    id: 'startOfWeek',
    title: 'Start of Week',
    visible: true,
    contentRenderer: (country: Country) => {
      return <span>{cellContentRender('startOfWeek', country.startOfWeek)}</span>;
    },
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
