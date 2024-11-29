import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { CountriesTableProps } from '../types/types';
import CountryRow from './CountryRow';
import LanguageRow from './LanguageRow';
import '../styles/countriesTable.scss';

const CountriesTable: React.FC<CountriesTableProps> = ({ columns }) => {
  const { countries, activeColumns } = useSelector(
    (state: RootState) => state.countries
  );
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (countryName: string) =>
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      newSet.has(countryName)
        ? newSet.delete(countryName)
        : newSet.add(countryName);
      return newSet;
    });

  const visibleColumns = columns.filter(
    col => col.visible && activeColumns.includes(col.id)
  );

  return (
    <div className="table">
      <div className="table-header">
        {visibleColumns.map(col => (
          <div
            key={col.id}
            className={`header-cell ${col.isWide ? 'wide' : ''}`}
          >
            {col.title}
          </div>
        ))}
      </div>

      <div className="table-body">
        {countries.map((country, index) => {
          const languages = country.languages
            ? Object.keys(country.languages)
            : [];
          const canExpand = languages.length > 1;

          return (
            <div key={country.name.common}>
              <CountryRow
                country={country}
                visibleColumns={visibleColumns}
                expandedRows={expandedRows}
                toggleRow={toggleRow}
                index={index}
              />
              {canExpand && (
                <LanguageRow
                  country={country}
                  languages={languages}
                  visibleColumns={visibleColumns}
                  expandedRows={expandedRows}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountriesTable;
