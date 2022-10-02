import { Container, Row, Col } from 'react-bootstrap'
import InputRange from './InputRange'
import { useState } from 'react'

function App() {
  const [price, setPrice] = useState(1000000)
  const [initialProcentFee, setInitialProcentFee] = useState(10)
  const [term, setTerm] = useState(1)

  const getInitialFee = () => {
    return Math.ceil((initialProcentFee * 100) / price)
  }

  const handleChangePrice = (price) => {
    setPrice(price)
  }

  const handleChangeInitialProcentFee = (initialFee) => {
    setInitialProcentFee(initialFee)
  }

  const handleChangeTerm = (term) => {
    setTerm(term)
  }

  return (
    <Container className='p-0 m-5'>
      <Row className='mt-5'>
        <Col md={'6'}>
          <h1 className='title'>Рассчитайте стоимость автомобиля в лизинг</h1>
        </Col>
      </Row>
      <Row>
        <Col md={'4'}>
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
        <Col md={'4'}>
          <InputRange
            data={`${initialProcentFee}%`}
            min={10}
            max={60}
            label={'Первоначальный взнос'}
            value={initialProcentFee}
            onChange={handleChangeInitialProcentFee}
          />
        </Col>
        <Col md={'4'}>
          <InputRange
            data={'мес.'}
            min={1}
            max={60}
            label={'Срок лизинга'}
            value={term}
            onChange={handleChangeTerm}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App
