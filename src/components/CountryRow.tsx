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
  const isRowExpanded = expandedRows.has(country.name.common);

  const handleLanguageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canExpand) toggleRow(country.name.common);
  };

  return (
    <div
      className={`table-row ${
        visibleColumns[0]?.id === 'index' ? 'table-row-index' : ''
      } ${isRowExpanded ? 'expanded' : ''}`}
    >
      {visibleColumns.map(col => {
        const cellContent = col.contentRenderer
          ? col.contentRenderer(country, index)
          : null;
        const isEmpty = !cellContent;

        return (
          <div
            key={col.id}
            className={`table-cell ${col.isWide ? 'wide' : ''} ${
              isEmpty ? 'empty' : ''
            }`}
            style={{
              backgroundColor: isEmpty ? col.emptyCellColor : col.cellColor,
            }}
          >
            {col.id === 'languages' ? (
              <div
                className={`languages-cell ${canExpand ? 'can-expand' : ''}`}
                onClick={handleLanguageClick}
              >
                {canExpand && (
                  <span
                    className={`arrow ${isRowExpanded ? 'expanded' : ''}`}
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
