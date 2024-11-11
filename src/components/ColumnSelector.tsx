import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleColumn } from '../store/countriesStore/countriesSlice';

const ColumnSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { activeColumns } = useSelector((state: RootState) => state.countries);

  const columns = [
    'name',
    'languages',
    'region',
    'population',
    'status',
    'startOfWeek',
  ];

  return (
    <div className="column-selector">
      <h3>Toggle column</h3>
      {columns.map((column) => (
        <label key={column}>
          <input
            type="checkbox"
            checked={activeColumns.includes(column)}
            onChange={() => dispatch(toggleColumn(column))}
          />
          {column}
        </label>
      ))}
    </div>
  );
};

export default ColumnSelector;
