import React from 'react';

export interface Country {
  name: {
    common: string;
  };
  languages: {
    [key: string]: string;
  };
  region: string;
  population: number;
  status: string;
  startOfWeek: string;
}

export interface CountriesState {
  countries: Country[];
  loading: boolean;
  error: string | null;
  activeColumns: string[];
}

export interface CountriesTableProps {
  columns: Column[];
}

interface Content {
  country?: Country;
  index?: number;
}

export interface Column {
  id: string;
  title: string;
  visible: boolean;
  isWide?: boolean;
  cellColor?: string;
  emptyCellColor?: string;
  contentRenderer: (content: Content) => React.ReactNode;
}
