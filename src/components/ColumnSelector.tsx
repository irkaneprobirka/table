import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleColumn } from '../store/countriesStore/countriesSlice';

interface ColumnConfig {
  id: string;
  title: string;
  visible: boolean;
}

const ColumnSelector: React.FC<{ columns: ColumnConfig[] }> = ({ columns }) => {
  const dispatch = useDispatch();
  const { activeColumns } = useSelector((state: RootState) => state.countries);

  return (
    <div className="column-selector">
      <h3>Toggle Columns</h3>
      {columns.map((column) => (
        <label key={column.id}>
          <input
            type="checkbox"
            checked={activeColumns.includes(column.id)}
            onChange={() => dispatch(toggleColumn(column.id))}
          />
          {column.title}
        </label>
      ))}
    </div>
  );
};

export default ColumnSelector;
