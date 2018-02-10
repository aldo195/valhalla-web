import {track, setTheme} from 'bizcharts';
import {Pie} from './pie';

track(false);

const config = {
  defaultColor: '#1089ff',
  shape: {
    interval: {
      fillOpacity: 1,
    },
  },
};

setTheme(config);

export {
  Pie
};