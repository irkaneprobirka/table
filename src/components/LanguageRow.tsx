import React from 'react';

import { Column, Country } from '../types/types';

interface LanguageRowProps {
  country: Country;
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
  const isLanguagesVisible = visibleColumns.some(col => col.id === 'languages');
  if (!isLanguagesVisible) return null;

  const isRowExpanded = expandedRows.has(country.name.common);
  const isIndexColumnVisible = visibleColumns[0]?.id === 'index';

  return languages.map((language, index) => (
    <div
      className={`table-row language-row ${
        isIndexColumnVisible ? 'table-row-index language-row-index' : ''
      } ${isRowExpanded ? 'expanded' : ''}`}
      key={`${country.name.common}-lang-${index}`}
    >
      {visibleColumns.map(col => {
        const isLanguageColumn = col.id === 'languages';

        return (
          <div
            key={col.id}
            className={`table-cell ${
              isLanguageColumn ? '' : 'empty'
            } ${col.isWide ? 'wide' : ''}`}
            style={{
              backgroundColor: isLanguageColumn
                ? col.cellColor || 'transparent'
                : col.emptyCellColor || 'transparent',
            }}
          >
            {isLanguageColumn ? language : ''}
          </div>
        );
      })}
    </div>
  ));
};

export default LanguageRow;
