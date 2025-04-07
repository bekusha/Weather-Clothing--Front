export interface ForecastData {
    city: {
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
    };
    list: Array<{
      dt_txt: string;
      main: {
        temp: number;
      };
      weather: Array<{
        description: string;
      }>;
    }>;
  }

  export interface WeatherModalProps {
    open: boolean;
    onClose: () => void;
    forecastData: any;
}