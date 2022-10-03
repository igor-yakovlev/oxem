import { Container, Row, Col } from 'react-bootstrap'
import InputRange from './inputs/InputRange'
import InputProcentRange from './inputs/InputProcentRange'
import ShowDataComponent from '../components/ShowDataComponent'
import Button from '../components/Button'
import { useState } from 'react'
import { fromPercentToNumber } from '../utils/functions'

function App() {
  const [price, setPrice] = useState(1000000)
  const [procentFee, setProcentFee] = useState('10%')
  const [months, setMonths] = useState(1)

  const getFee = () => {
    const cleanNumber = fromPercentToNumber(procentFee)
    return Math.ceil((cleanNumber * price) / 100);
  }

  const getMonthPay = () => {
    return Math.ceil(
      (price - getFee()) *
        ((0.035 * Math.pow(1 + 0.035, months)) / (Math.pow(1 + 0.035, months) - 1)),
    )
  }

  const getAmountAgreement = () => {
    return getFee() + months * getMonthPay()
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

  return (
    <Container>
      <Row className='mt-5'>
        <Col lg={'8'} md={'12'} xl={'6'}>
          <h1 className='title'>Рассчитайте стоимость автомобиля в лизинг</h1>
        </Col>
      </Row>
      <form>
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
          <Col sm={'6'} lg={'4'} xl={'4'}>
            <Button disabled={false}>Оставить заявку</Button>
          </Col>
        </Row>
      </form>
    </Container>
  )
}

export default App
