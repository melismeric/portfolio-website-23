import Head from 'next/head'
import styles from '../styles/Project.module.css';
import Header from '../components/Header'
import Image from 'next/image'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../components/Footer'


export default function Home() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Melis Meriç Portfolio Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <main>
      <div className={styles.container} style={{paddingTop: "40px"}}>
        <Row>
          <Col xs={12} sm={6} md={6}>
            <div >
              <iframe width="100%" height="440" src="https://www.youtube.com/embed/Ws6_Eic4cso" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </Col>
          <Col xs={12} sm={6} md={6}>

              <h2 className={styles.title} >Feedback System</h2>
              <h6 className={styles.text}>A feedback system is one in which the output signal is sampled and then fed back to the input to form an output that drives the system. Meaning, a feedback systems gets input on itself. I designed two Feedback systems using multiple LEDs and a LDR the circuit is same for both of them but the codes are different. LDR reads the input from the flashed LEDs and according to that input turns on or off other LEDs.
                    Basic Feedback System: In this circuit red and yellow leds' brightness change through time and LDR uses their brightness as input and flashes the green led. I used analogWrite(ledPin,sensorValue) to change the brightness of the green led. Green led's brightness change according to the LDR sensor's value. So, it changes according to other two leds brightness. That way the circuit takes input from itself.</h6>

              <h6 className={styles.text}><a style={{color:"wheat"}} href="https://git.arts.ac.uk/21004071/portfolio_of_work/blob/master/week3/week3-Lab04/week3-lab04-feedback.ino">Github Source Code</a></h6>
 
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6} md={6}>
            <div >
              <iframe width="100%" height="440" src="https://www.youtube.com/embed/tLD5xPyZH94" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </Col>
          <Col xs={12} sm={6} md={6}>

              <h2 className={styles.title} >Feedback System Game</h2>
              <h6 className={styles.text}>Turn The Lights On! This circuit can be used as a game that the player is trying to turn on all the leds moving the LDR closer or further from the LEDs. The red light is always on but it's brightness change according to the LDR's value, so when we move LDR closer to the red LED it's brightness increase. When the LDR's value is in between 30 and 140 all the LEDs turn on. But LDR's value is calculated with a delay of 1000 miliseconds, so it will be tricky to get the value at the right time to turn on all the lights.</h6>

              <h6 className={styles.text}><a style={{color:"wheat"}} href="https://git.arts.ac.uk/21004071/portfolio_of_work/blob/master/week3/week3-Lab04/week3-lab04-game.ino">Github Source Code</a></h6>
 
          </Col>

        </Row>
      </div>
      
      </main>


    <Footer/>
      
    </div>
  )
}