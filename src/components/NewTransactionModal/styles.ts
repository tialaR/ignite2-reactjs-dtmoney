import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'

import styled from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  /*
    Diferente do position absolute o position fixed deixa o 
    elemento sempre no mesmo lugar da tela, até mesmo quando a tela tem scroll 
    (no position fized o conteudo não se posiciona de acordo com elemento nenhum
    ele se posiciona somente relativamente a tela)
    */
  position: fixed;

  //Especificando que o overlay deve ocupar a tela toda
  width: 100vw;
  height: 100vh;
  inset: 0; //é equivalente a usarmos (top:0; left: 0, right: 0; bottom: 0)

  background-color: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};

  //Hack CSS para centralizar elementos na tela
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;

    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme['gray-500']};
      }
    }

    button[type='submit'] {
      height: 50px;
      border: 0;

      background: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};

      font-weight: bold;

      padding: 0 1.25rem;
      margin-top: 1.25rem;

      border-radius: 6px;

      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      //O hover só é aplicado se o botão não estiver desabilitado
      //O usuário só pode fazer hover no botão habilitado
      &:not(:disabled):hover {
        background: ${(props) => props.theme['green-700']};
        transition: background-color 0.2s;
      }
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;

  background: transparent;
  color: ${(props) => props.theme['gray-500']};

  border: 0;
  cursor: pointer;

  top: 1.5rem;
  right: 1.5rem;

  /* Quando estou com foco no botão -> Para evitar que a caixinha do onFocus
    do botão fique maior do que o espaço que o botão realmente ocupa na tela 
    devemos ajustar a o line-height porque o botão é um ícone e seu tamanho 
    se baseia no font-size 
    -> O tamanho do focus do botão é relativo ao font-size do botão
    -> para ajustar usamos o font-size:0 ou o line-height:0 
    */
  line-height: 0;
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  margin-top: 0.5rem;
`

interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item,
)<TransactionTypeButtonProps>`
  border: 0;
  border-radius: 6px;

  cursor: pointer;

  background: ${(props) => props.theme['gray-700']};
  color: ${(props) => props.theme['gray-300']};

  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  svg {
    color: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-300']
        : props.theme['red-300']};
  }

  /*
    data-state -> É um conceito do JavaScript utilizado para armazenar algumas informações
    sobre o estado de determinado componente

    Estilização utilizada quando a prop data-state estiver com o valor checked
    */
  &[data-state='checked'] {
    color: ${(props) => props.theme.white};

    /* Colocando hover somente no botão que não tiver com a prop
    data-state='checked'*/
    &[data-state='unchecked']:hover {
      transition: background-color 0.2s;
      background: ${(props) => props.theme['gray-600']};
    }

    background: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-500']
        : props.theme['red-500']};

    svg {
      color: ${(props) => props.theme.white};
    }
  }
`
