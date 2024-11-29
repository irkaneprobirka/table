import React from 'react';
import { Column, Country } from '../types/types';

interface CountryRowProps {
  country: Country;
  visibleColumns: Column[];
  expandedRows: Set<string>;
  toggleRow: (countryName: string) => void;
  index: number;
}

const CountryRow: React.FC<CountryRowProps> = ({
  country,
  visibleColumns,
  expandedRows,
  toggleRow,
  index,
}) => {
  const languages = country.languages ? Object.keys(country.languages) : [];
  const canExpand = languages.length > 1;

  return (
    <div
      className={`table-row ${expandedRows.has(country.name.common) ? 'expanded' : ''}`}
    >
      {visibleColumns.map(col => {
        const cellContent = col.contentRenderer
          ? col.contentRenderer(country, index)
          : null;

        const isEmpty = !cellContent;

        return (
          <div
            key={col.id}
            className={`table-cell ${col.isWide ? 'wide' : ''} ${isEmpty ? 'empty' : ''}`}
            style={{
              backgroundColor: isEmpty ? col.emptyCellColor : col.cellColor,
            }}
          >
            {col.id === 'languages' ? (
              <div
                className={`languages-cell ${canExpand ? 'can-expand' : ''}`}
                onClick={e => {
                  e.stopPropagation();
                  if (canExpand) toggleRow(country.name.common);
                }}
              >
                {canExpand && (
                  <span
                    className={`arrow ${expandedRows.has(country.name.common) ? 'expanded' : ''}`}
                  />
                )}
                {canExpand
                  ? `${languages.length} языка(ов)`
                  : languages.join(', ')}
              </div>
            ) : (
              cellContent
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CountryRow;
