const BASE_URL = 'https://eoj3r7f3r4ef6v4.m.pipedream.net';

export default function postData(data) {
  return fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        price: data.price,
        procentFee: data.procentFee,
        months: data.months,
        amountAgreement: data.amountAgreement,
        monthPay: data.monthPay,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
}