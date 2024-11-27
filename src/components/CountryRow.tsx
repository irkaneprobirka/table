import React from 'react';
import { Column } from '../types/types';

interface CountryRowProps {
  country: any;
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
    <div className={`table-row ${expandedRows.has(country.name.common) ? 'expanded' : ''}`}>
      {visibleColumns.map((col) => {
        const cellContent = (() => {
          switch (col.id) {
            case 'index':
              return index + 1;
            case 'name':
              return country.name.common;
            case 'languages':
              return (
                <div
                  className={`languages-cell ${canExpand ? 'can-expand' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (canExpand) toggleRow(country.name.common);
                  }}
                >
                  {canExpand && (
                    <span
                      className={`arrow ${expandedRows.has(country.name.common) ? 'expanded' : ''}`}
                    />
                  )}
                  {canExpand ? `${languages.length} языка(ов)` : languages.join(', ')}
                </div>
              );
            case 'region':
              return country.region;
            case 'population':
              return country.population;
            case 'status':
              return country.status; 
            case 'startOfWeek':
              return country.startOfWeek;
            default:
              return '';
          }
        })();

        const isEmpty = !cellContent;

        return (
          <div
            key={col.id}
            className={`table-cell ${col.isWide ? 'wide' : ''} ${isEmpty ? 'empty' : ''}`}
            style={{ backgroundColor: isEmpty ? col.emptyCellColor : col.cellColor }}
          >
            {cellContent}
          </div>
        );
      })}
    </div>
  );
};

export default CountryRow;
