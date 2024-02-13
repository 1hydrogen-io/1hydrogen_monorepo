import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
import { Plus_Jakarta_Sans } from 'next/font/google';

export const MAX_CONTENT_WIDTH = 960;

export const liner_bg = 'linear-gradient(163deg, rgba(6, 11, 40, 0.94) 11.89%, rgba(10, 14, 35, 0.49) 99.97%)';

export const plus_jakarta_san = Plus_Jakarta_Sans({ 
  weight: ['400', '500', '600' ,'700', '800' ],
  subsets: ['latin'],
})

export const colors = {
  primaryBlue: '#13FCE4',
  blue10: '#13FCE41A10',
  whiteFd: '#FDFDFF',
  black06: '#060606',
  bg: '#060106',
}

const Text: ComponentStyleConfig = {
  variants: {
    "with-400": {
      fontSize: "14px",
      fontWeight: "400",
      color: "white",
    }
  },
};

export const TextVariants = {  
  WITH_400: "with-400", 
}

const components = {
  Text,
};


const theme = extendTheme({
    fonts: {
        body: plus_jakarta_san.style.fontFamily,
        heading: plus_jakarta_san.style.fontFamily,
    },
    components
});


export default theme;