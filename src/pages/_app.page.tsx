import AppBarCustom from '@/component/appBarCustom'
import InitUser from '@/component/initUser'
import '@/styles/globals.css'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <RecoilRoot>
        <AppBarCustom />
        <InitUser />
        <Component {...pageProps} />
      </RecoilRoot>
    </ThemeProvider>

  )
}
