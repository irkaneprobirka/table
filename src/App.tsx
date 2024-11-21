import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { getCountries } from './store/countriesStore/countriesApi';
import CountriesTable from './components/CountriesTable';
import ColumnSelector from './components/ColumnSelector';

// TODO: Протипизируй исходный массив с колонками. Добавь параметр в объект колонки,
// в котором можно будет определить контент ячейки для того, чтобы разгрузить код в CountriesTable.tsx
const columns = [
  // COMMENT: Параметр width дальше нигде не используется? В типах он тоже присутствует, нужно это учитывать.
  { id: 'index', title: '#', width: '60px', visible: true },
  {
    id: 'name',
    title: 'Name',
    visible: true,
    isWide: true,
    cellColor: 'lightblue',
    emptyCellColor: 'lightgray',
  },
  {
    id: 'languages',
    title: 'Languages',
    visible: true,
    isWide: false,
    cellColor: 'lightyellow',
    emptyCellColor: 'lightpink',
  },
  { id: 'region', title: 'Region', visible: true, isWide: false, emptyCellColor: 'lightpink', },
  {
    id: 'population',
    title: 'Population',
    visible: false,
    isWide: false,
    cellColor: 'lightgreen',
  },
  { id: 'status', title: 'Status', visible: true },
  { id: 'startOfWeek', title: 'Start of Week', visible: true },
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
