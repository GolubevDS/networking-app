import React             from 'react';
import ReactDOM          from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { Router }        from '@/routes';
import { defaultTheme }  from '@/styles/theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={defaultTheme}>
			<Router />
		</ThemeProvider>
	</React.StrictMode>,
);
