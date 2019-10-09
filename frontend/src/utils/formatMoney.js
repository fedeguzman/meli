const formatMoney = (currency, amount) => {
  const options = {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0
  };
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat("es-AR", options);
  return formatter.format(amount);
};

export default formatMoney;
