import styled from 'styled-components'

// Centralizando a tabela com o componente Header
export const TransactionContainer = styled.main`
  width: 100%; //Se a tela for menor que 1120px ela terá 100% de largura
  max-width: 1120px; // O conteúdo dentro dessa div só cresce até 1120px
  margin: 0 auto;
  padding-top: 4rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 0;
`

export const TransactionsTable = styled.table`
  width: 100%;

  /* Quando uso o border-collapse: separate eu consigo usar o 
    border-spacing nos elementos da tabela  */
  border-collapse: separate;
  border-spacing: 0 0.5rem; //Espaçamento de 8px entre cada linha da tabela

  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background-color: ${(props) => props.theme['gray-700']};

    //Escrever dessa forma deixa mais descritivo (evita esquecer qual a ordem dos parâmetros)
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    //Escrever dessa forma deixa mais descritivo (evita esquecer qual a ordem dos parâmetros)
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`
