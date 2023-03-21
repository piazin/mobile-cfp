import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export const formatBalance = (balance) => {
  const formatBalance = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(balance);

  return formatBalance.replace('R$', '');
};
