import React from 'react';
import { Column } from '../types/types';

interface LanguageRowProps {
  country: any;
  languages: string[];
  visibleColumns: Column[];
  expandedRows: Set<string>;
}

const LanguageRow: React.FC<LanguageRowProps> = ({
  country,
  languages,
  visibleColumns,
  expandedRows,
}) => {
  return languages.map((language, index) => (
    <div
      className={`table-row language-row ${expandedRows.has(country.name.common) ? 'expanded' : ''} `}
      key={`${country.name.common}-lang-${index}`}
    >
      {visibleColumns.map((col) => (
        <div
          key={col.id}
          className={`table-cell ${col.id === 'languages' ? '' : 'empty'}  ${col.isWide ? 'wide' : ''}`}
          style={{
            backgroundColor:
              col.id === 'languages' ? col.cellColor || 'transparent' : col.emptyCellColor || 'transparent',
          }}
        >
          {col.id === 'languages' ? language : ''}
        </div>
      ))}
    </div>
  ));
};

export default LanguageRow;