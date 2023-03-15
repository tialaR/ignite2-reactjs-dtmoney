import React from 'react'
import { useContextSelector } from 'use-context-selector'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

import {
  Overlay,
  Content,
  CloseButton,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})
// Utilizamos o enum quando queremos restringir as opções

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

// Componente contendo o conteúdo do modal
const NewTransactionModal: React.FC = () => {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      /* Nesse caso passo uma função como segundo parâmetro. Essa função recebe o nosso
      contexto como parâmetro e devo retornar de dentro da função quais informações desse
      contexto eu quero observar para saber se elas mudaram ou não. 
      -> Eu consigo "segregar"/observar as únicas informações que eu quero p/ determinado
      componente ou página. 
      -> Nesse exemplo a única informação que eu quero observar é a função createTransaction
      */
      return context.createTransaction
    },
  )

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data

    createTransaction({
      description,
      price,
      category,
      type,
    })

    reset()
  }

  return (
    <>
      {/* Portal no React -> É uma funcionalidade do React que fornece uma forma
              elegante de renderizar um elemento filho dentro de um outro local da DOM
              -> Com o porto eu posso fazer com que um conteúdo de determinada tela vá parar
              em outro lugar de nossa aplicação. 
              -> Ex: Se formos pensar, quando o modal for abrir por volta de determinada tela
              não faz muito sentido o Modal pertencer a outro componente da aplicação. Ex: O modal 
              pertencer ao Header da aplicação. Porque o Header se restringe a um componente e 
              o Modal a outro (o contúdo do Modal não tem muito a ver com o Header).
              -> O Modal é algo que fica sobreposto a aplicação (ele ta fora de qualquer container
                pois ele tem o seu próprio container).
              -> O Portal nos ajuda a colocar o conteúdo desse modal fora de todas as <divs > que temos
              ex: Fora do Header, fora da Table, é como se fosse algo a parte da página da nossa aplicação
              */}
      <Dialog.Portal>
        <Overlay />

        {/* Dentro do Dialog.Content podemos ter o Content que quisermos
                  Sendo que se tivermos elementos mapeados pelo Dialog é bom o utilizarmos
                  pois o Radix vai anunciar para o leitor de tela que tipo de modal é esse
                  que foi aberto em tela (A pessoa vai ouvir que determinado modal abriu)
                */}
        <Content>
          <Dialog.Title>Nova transação</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              type="text"
              placeholder="Descrição"
              required
              {...register('description')}
            />

            <input
              type="number"
              placeholder="Preço"
              required
              {...register('price', { valueAsNumber: true })}
            />
            {/* valueAsNumber -> Converte o valor do input para numero */}

            <input
              type="text"
              placeholder="Categoria"
              required
              {...register('category')}
            />

            {/* Dentro do método render eu tenho acesso a uma série de 
                  propriedades:
                  formState -> Trás informações sobre o formmulário como um todo
                  (ex: se o formulário está em submite, se não tá, se ta com erro,etc),
                  ou  seja, eu tenho acesso as informações do contexto do formulário.
                  fieldState -> trás informações sobre o campo "type" (ex: consigo saber se 
                  tem algum erro relacionado ao campo "type" por exemplo)
                  field -> É onde está os eventos para conseguirmos alterar os valores 
                  desse campo (são as funções responsáveis por manipular os valores dentro
                  do form) */}
            <Controller
              control={control}
              name="type" // nome do campo no schema
              render={({ field }) => {
                // Retorna o conteúdo relacionado ao campo no form
                return (
                  <TransactionType
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <TransactionTypeButton variant="income" value="income">
                      <ArrowCircleUp size={24} />
                      Entrada
                    </TransactionTypeButton>
                    <TransactionTypeButton variant="outcome" value="outcome">
                      <ArrowCircleDown size={24} />
                      Saída
                    </TransactionTypeButton>
                  </TransactionType>
                )
              }}
            />

            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Dialog.Portal>
    </>
  )
}

export { NewTransactionModal }
