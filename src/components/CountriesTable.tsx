import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import '../styles/countriesTable.scss';
import { CountriesTableProps } from '../types/types';

const CountriesTable: React.FC<CountriesTableProps> = ({ columns }) => {
  const { countries, activeColumns } = useSelector(
    (state: RootState) => state.countries,
  );
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (countryName: string) =>
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      newSet.has(countryName) ? newSet.delete(countryName) : newSet.add(countryName);
      return newSet;
    });

  const visibleColumns = columns.filter(
    (col) => col.visible && activeColumns.includes(col.id),
  );

  const maxLength = Math.max(
    ...countries.map((country) => country.name.common.length),
  );

  const gridStyle = {
    gridTemplateColumns: visibleColumns
      .map((col) => {
        if (col.id === 'index') {
          return '60px';
        }
        return col.isWide ? '2fr' : `minmax(${maxLength * 5}px, 1fr)`;
      })
      .join(' '),
  };

  return (
    <div className="table">
      <div className="table-header" style={gridStyle}>
        {visibleColumns.map((col) => (
          <div key={col.id} className="header-cell">
            {col.title}
          </div>
        ))}
      </div>

      <div className="table-body">
        {countries.map((country) => {
          const languages = country.languages ? Object.keys(country.languages) : [];
          const canExpand = languages.length > 1;

          const countryRow = (
            <div
              className={`table-row ${expandedRows.has(country.name.common) ? 'expanded' : ''}`}
              style={gridStyle}
              key={country.name.common}
            >
              {visibleColumns.map((col) => {
                const cellContent = (() => {
                  switch (col.id) {
                    case 'index':
                      return countries.indexOf(country) + 1;
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
                            ></span>
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

                return (
                  <div
                    key={col.id}
                    className="table-cell"
                    style={{ backgroundColor: col.cellColor }}
                  >
                    {cellContent}
                  </div>
                );
              })}
            </div>
          );

          const languageRows = canExpand
            ? languages.map((language, index) => (
                <div
                  className={`table-row language-row ${expandedRows.has(country.name.common) ? 'expanded' : ''}`}
                  style={gridStyle}
                  key={`${country.name.common}-lang-${index}`}
                >
                  {visibleColumns.map((col) => (
                    <div
                      key={col.id}
                      className={`table-cell ${col.id === 'languages' ? '' : 'empty'}`}
                      style={{
                        backgroundColor:
                          col.id === 'languages' ? col.cellColor || 'transparent' : col.emptyCellColor || 'transparent',
                      }}
                    >
                      {col.id === 'languages' ? language : ''}
                    </div>
                  ))}
                </div>
              ))
            : [];

          return (
            <div key={country.name.common}>
              {countryRow}
              {languageRows}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountriesTable;
