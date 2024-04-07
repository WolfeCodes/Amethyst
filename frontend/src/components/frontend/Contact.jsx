import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import phone from '../../assets/phone.svg';
import location from '../../assets/location.svg';
import envelope from '../../assets/envelope.svg';


function Contact() {
  return (
    <section id="contact" className="block contact-block">
      <Container fluid>
        <div className="title-holder">
          <h2>Contact us</h2>
          <div className="subtitle">get connected with us</div>
        </div>
        <Form className='contact-form'>
          <Row>
            <Col sm={4}>
              <Form.Control type="text" placeholder="Enter your full name" required />
            </Col>
            <Col sm={4}>
              <Form.Control type="email" placeholder="Enter your email address" required />
            </Col>
            <Col sm={4}>
              <Form.Control type="tel" placeholder="Enter your contact number" required />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Form.Control as="textarea" placeholder="Enter your contact message" required />
            </Col>
          </Row>
          <div className='btn-holder'>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Container>
      <div className='google-map'>
        <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19747.603956328764!2d-90.31479173534605!3d38.61283556817623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1649275459570!5m2!1sen!2sus"></iframe>
      </div>
      <Container fluid>
        <div className='contact-info'>
          <ul>
            <li>
              <img src={envelope} style={{ width: '30px', margin: '15px' }} />
              hello@domain.com
            </li>
            <li>
              <img src={phone} style={{ width: '30px', margin: '15px' }} />
              000-000-0000
            </li>
            <li>
              <img src={location} style={{ width: '30px', margin: '15px' }} />
              Saint Louis, Missouri
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default Contact;