import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export const formatBalance = (balance) => {
  const formattedBalance = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(balance);

  return formattedBalance?.replace('R$', '');
};
