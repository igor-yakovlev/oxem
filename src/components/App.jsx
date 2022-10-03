import { Container, Row, Col } from 'react-bootstrap'
import InputRange from './inputs/InputRange'
import InputProcentRange from './inputs/InputProcentRange'
import ShowDataComponent from '../components/ShowDataComponent'
import Button from '../components/Button'
import { useState } from 'react'
import { fromPercentToNumber } from '../utils/functions'
import postData from '../utils/api'

function App() {
  const [price, setPrice] = useState(1000000)
  const [procentFee, setProcentFee] = useState('10%')
  const [months, setMonths] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const getFee = () => {
    const cleanNumber = fromPercentToNumber(procentFee)
    return Math.ceil((cleanNumber * price) / 100)
  }

  const getMonthPay = () => {
    const period = checkMonthsLimit(months)
    const test = Math.ceil(
      (price - getFee()) *
        ((0.035 * Math.pow(1 + 0.035, period)) / (Math.pow(1 + 0.035, period) - 1)),
    )
    return test;
  }

  const getAmountAgreement = () => {
    const period = checkMonthsLimit(months)
    return getFee() + period * getMonthPay()
  }

  function checkMonthsLimit(months) {
    return months < 1 ? 1: months;
  }

  const handleChangePrice = (price) => {
    setPrice(price)
  }

  const handleChangeProcentFee = (procentFee) => {
    setProcentFee(procentFee)
  }

  const handleChangeMonths = (months) => {
    setMonths(months)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postData({
      price: price,
      procentFee: fromPercentToNumber(procentFee),
      months: months,
      amountAgreement: getAmountAgreement(),
      monthPay:getMonthPay(),
    })
    .then(res => {
      if (res) {

      }
    })
    .finally(() => setIsLoading(false))
  }

  return (
    <Container>
      <Row className='mt-5'>
        <Col lg={'8'} md={'12'} xl={'6'}>
          <h1 className='title'>Рассчитайте стоимость автомобиля в лизинг</h1>
        </Col>
      </Row>
      <form
        action='#'
        method='post'
        onSubmit={handleSubmit}
      >
        <Row>
          <Col lg={'12'} md={'12'} xl={'4'}>
            <InputRange
              data={'₽'}
              step={100000}
              min={1000000}
              max={6000000}
              label={'Стоимость автомобиля'}
              value={price}
              onChange={handleChangePrice}
            />
          </Col>
          <Col md={'12'} xl={'4'}>
            <InputProcentRange
              data={getFee()}
              min={10}
              max={60}
              label={'Первоначальный взнос'}
              value={procentFee}
              onChange={handleChangeProcentFee}
            />
          </Col>
          <Col md={'12'} xl={'4'}>
            <InputRange
              data={'мес.'}
              min={1}
              max={60}
              label={'Срок лизинга'}
              value={months}
              onChange={handleChangeMonths}
            />
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col xl={'4'} md={'6'} lg={'6'}>
            <ShowDataComponent label={'Сумма договора лизинга'} data={getAmountAgreement()} />
          </Col>
          <Col xl={'4'} md={'6'} lg={'4'}>
            <ShowDataComponent label={'Ежемесячный платеж от'} data={getMonthPay()} />
          </Col>
          <Col sm={'8'} md={'6'} lg={'4'} xl={'4'}>
            <Button disabled={isLoading} isLoading={isLoading}>Оставить заявку</Button>
          </Col>
        </Row>
      </form>
    </Container>
  )
}

export default App
