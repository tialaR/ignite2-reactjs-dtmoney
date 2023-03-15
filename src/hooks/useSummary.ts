import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  /* Reduce -> É um método que nos permite percorrer um Array e reduzir 
  esse array a alguma nova estrututa de dados

  ex: reduzir um array a um objeto com um determinado tipo de formato de dado
   { income: 0, outcome: 0, total: 0  }

  -> Ele recebe uma função como primeiro parâmetro e o segundo parâmetro é
  a estrutura de dados inicial que eu vou começar.
  -> Na função eu recebo 2 parâmetros o "acumulator" que nada mais é do que o objeto 
  inicial no qual vai sofrer mutações em seus respectivos valores (ex: aumentar ou 
  diminuir o income/outcome/total). Ou seja, todas essas operações dentro do reduce 
  eu faço no acumulator que será o que vai ser retornado no final.
  O segundo parâmetro é o objeto atual.
  */

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])

  return summary
}
