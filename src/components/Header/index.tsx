import React from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { NewTransactionModal } from '../NewTransactionModal'

import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

import logoImg from '../../assets/logo.svg'

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        {/* Dialog.Root precisa estar por volta do botão que vai abrir o modal
            e também por volta do modal a ser aberto em sí */}
        <Dialog.Root>
          {/* Dialog.Trigger -> É um botão
              asChild -> faz com que o Dialog.Trigger não crie um novo botão 
              permitindo que ele use o botão que já tem dentro da tag <NewTransactionButton />,
              ou seja, o asChild impede que tenhamos 2 botões */}
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}

export { Header }

/* O Radix traz o componente PRIMITIVO, ou seja, sem nenhum visual
  e todo CSS somos nós que vamos adicionar.

  o Portal fica por fora até mesmo da <div> root que é a div onde fica todo o código de
  nossa aplicação. -> Ele permite a criação do componente totalmente fora do contexto da aplicação.

  -> Toda parte de acessibilidade, bem como teclado vem junto com o Radix.
 */
