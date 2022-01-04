const dataset = require('../../assets/salary-map.json');

exports.handler = async (event, context) => {
  const amount = parseFloat(event.queryStringParameters.amount) || null;
  const index = dataset.findIndex((entry) => {
    return parseFloat(entry.salary) > amount
  });
  const res = dataset[index - 1];
  const taxToPay = parseFloat(res['with-payroll-tax-credit'].replace(',', '.'));
  console.log('taxToPay', taxToPay);
  const paidTaxPercentage = Math.round((100 / amount * taxToPay) * 10) / 10;
  const result = {
    bruto: amount,
    netto: amount - taxToPay,
    taxToPay: taxToPay,
    'paid-tax-percentage': `${paidTaxPercentage}%`
  }
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};