import 'vuetify/styles'; 
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { md3 } from 'vuetify/blueprints';
import '@mdi/font/css/materialdesignicons.css'; 

export default createVuetify({
  components,
  directives,
  blueprint: md3,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1B3C53',
          secondary: '#424242',
          accent: '#82B1FF',
          
          error: '#EF5350',
          info: '#64B5F6',
          success: '#66BB6A',
          warning: '#FFCA28',

          'light-blue-1': '#E0F7FA',
          'light-blue-8': '#0277BD',
          'light-blue-10': '#01579B',

          'green-1': '#E8F5E9',
          'green-8': '#4CAF50',
          'green-10': '#388E3C',

          'orange-1': '#FFF3E0',
          'orange-8': '#FB8C00',
          'orange-10': '#E65100',

          'purple-1': '#F3E5F5',
          'purple-8': '#9C27B0',
          'purple-10': '#7B1FA2',

          'red': '#FF5252',
          'red-lighten-1': '#EF9A9A', 
          'red-darken-1': '#C62828',
        },
      },
    },
  },
});