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

export interface ColumnConfig {
  id: string;
  title: string;
  width?: string;
  visible: boolean;
  isWide?: boolean;
  cellColor?: string;
  emptyCellColor?: string;
  renderCell?: (country: Country) => React.ReactNode;
}

export interface CountriesTableProps {
  columns: ColumnConfig[];
}

export interface Column {
  id: string;
  title: string;
  visible: boolean;
  isWide?: boolean;
  cellColor?: string;
  emptyCellColor?: string;
  contentRenderer?: (country: Country, index: number) => React.ReactNode;
}
