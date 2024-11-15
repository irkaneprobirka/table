import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import '../styles/countriesTable.scss';

const CountriesTable: React.FC = () => {
  const { countries, activeColumns } = useSelector(
    (state: RootState) => state.countries,
  );
//вычмсляем максимальное значение относительно первого столбца
  const maxLength = Math.max(
    ...countries.map((country) => country.name.common.length),
  );

  const gridStyle = {
    gridTemplateColumns: `minmax(${maxLength * 5 }px, 1fr) minmax(${maxLength * 5 }px, 1fr) repeat(${activeColumns.length - 2}, 1fr)`,
  };

  return (
    <div className="table">
      <div className="table-header" style={gridStyle}>
        {activeColumns.map((column) => (
          <div key={column} className="header-cell">
            {column}
          </div>
        ))}
      </div>

      <div className="table-body">
        {countries.map((country) => (
          <React.Fragment key={country.name.common}>
            <div className="table-row" style={gridStyle}>
              {activeColumns.includes('name') && (
                <div className="table-cell">{country.name.common}</div>
              )}
              {activeColumns.includes('languages') && (
                <div className="table-cell">
                  {Object.keys(country.languages).length > 1
                    ? `${Object.keys(country.languages).length} языка(ов)`
                    : Object.values(country.languages)}
                </div>
              )}
              {activeColumns.includes('region') && (
                <div className="table-cell">{country.region}</div>
              )}
              {activeColumns.includes('population') && (
                <div className="table-cell">{country.population}</div>
              )}
              {activeColumns.includes('status') && (
                <div className="table-cell">{country.status}</div>
              )}
              {activeColumns.includes('startOfWeek') && (
                <div className="table-cell">{country.startOfWeek}</div>
              )}
            </div>

            {activeColumns.includes('languages') &&
              Object.keys(country.languages).length > 1 &&
              Object.values(country.languages).map((language, index) => (
                <div key={index} className="table-row" style={gridStyle}>
                  <div className="table-cell"></div>
                  <div className="table-cell">{language}</div>
                  {/* создаем массив, из длинны которого вычитается -2, так как первая ячейка пустая, а вторая содержит в себе язык */}
                  {Array.from({ length: activeColumns.length - 2 }).map(
                    (_, idx) => (
                      <div key={idx} className="table-cell"></div>
                    ),
                  )}
                </div>
              ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CountriesTable;
