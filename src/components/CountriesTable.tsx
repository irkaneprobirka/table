import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { CountriesTableProps } from '../types/types';
import CountryRow from './CountryRow';
import LanguageRow from './LanguageRow';
import '../styles/countriesTable.scss';

const CountriesTable: React.FC<CountriesTableProps> = ({ columns }) => {
  const { countries, activeColumns } = useSelector((state: RootState) => state.countries);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (countryName: string) => setExpandedRows((prev) => {
    const newSet = new Set(prev);
    newSet.has(countryName) ? newSet.delete(countryName) : newSet.add(countryName);
    return newSet;
  });

  const visibleColumns = columns.filter((col) => col.visible && activeColumns.includes(col.id));

<<<<<<< HEAD
  const maxLength = Math.max(...countries.map((country) => country.name.common.length));
=======
  const maxLength = Math.max(
    ...countries.map((country) => country.name.common.length),
  );

  // TODO: Перенеси стили в .scss, инлайновые стили не очень рекомендуется использовать,
  // к тому же в данном случае острой потребности в их использовании я здесь не вижу.
  // Повторяющиеся значения для свойства grid-template-columns следует обернуть в repeat.
  // P.S. Ширину колонки со свойством isWide можно регулировать через определение класса элемента
  // и например свойства grid-column. В целом получается всего два сценария: колонка нумерации с шириной 60px
  // либо присутствует либо нет.
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
>>>>>>> 8859a902595b9691551f897e002688e29982beb5

  return (
    <div className="table">
      <div className="table-header">
        {visibleColumns.map((col) => (
          <div key={col.id} className={`header-cell ${col.isWide ? 'wide' : ''}`}>
            {col.title}
          </div>
        ))}
      </div>

      <div className="table-body">
        {countries.map((country, index) => {
          const languages = country.languages ? Object.keys(country.languages) : [];
          const canExpand = languages.length > 1;

<<<<<<< HEAD
=======
          // TODO: Функция которая возвращает JSX по своей сути является компонентом и должна быть названа и
          // оформлена в соответствии с правилами оформления компонентов. Компонент следует переопределить
          // где-нибудь в другом месте, чтобы не пересоздавать его при каждом рендере.
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

>>>>>>> 8859a902595b9691551f897e002688e29982beb5
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
