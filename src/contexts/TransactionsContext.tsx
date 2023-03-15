import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../services/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  /* 
    Tudo que jogamos diretamente do componente vai executar sempre 
    que o componente entrar em um novo fluxo de renderização, ou seja, 
    sempre que o componente pai (nesse caso o componente Transactions) 
    renderizar novamente (por uma alteração de estado, propridedade, por
    atualização de algum componente fora dele (componente pai) atualizou)
    a função escrita de forma direta no arquivo de tal componete vai ser 
    renderizada de novo, ou seja, criada do total zero.

    Para evitar isso podemos fazer uso dos hooks forneceidos pelo react,
    como por exemplo o useEffect. 
  */

  // Utilizando a api fetch api
  // async function fetchTransactions(query?: string) {
  //   const url = new URL('http://localhost:3333/transactions');

  //   /* se eu tiver enviado algum tipo de query eu vou inserir a
  //   busca na na url da seguinte forma: q=query */
  //   if (query) {
  //     url.searchParams.append('q', query);
  //   }

  //   const response = await fetch(url)
  //   const data = await response.json()

  //   setTransactions(data)
  // }

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt', // Ordenando a lista p/ que os criados mais recentes estejam em cima
        _order: 'desc', // Estabelecendo que a ordem será decrescente
        q: query, // transactions?q=query
      },
    })

    setTransactions(response.data)
  }, [])

  // Utilizando o axios
  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data

      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      /* Sempre que eu for fazer uma atualização do valor anterior daquele estado 
    eu devo atualizar esse valor utilizando um callback */
      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
