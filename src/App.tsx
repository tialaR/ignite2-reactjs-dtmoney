import { ThemeProvider } from 'styled-components'

import { Transactions } from './pages/Transactions'

import { TransactionsProvider } from './contexts/TransactionsContext'

import { defaultTheme } from './styles/theme/default'
import { GlobalStyle } from './styles/global'

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>

      <GlobalStyle />
    </ThemeProvider>
  )
}

export { App }
