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
