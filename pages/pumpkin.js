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
              <iframe width="100%" height="440" src="https://www.youtube.com/embed/fp3bxvXpxOA?autoplay=1&mute=1&loop=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </Col>
          <Col xs={12} sm={6} md={6}>

              <h2 className={styles.title} >Dark detecting Circuit for Pumpkins</h2>
              <h6 className={styles.text}>In this project, I used a photoresistor, 10K ohm resistor, 2N3904 NPN transistor to build a dark detecting circuit. As shown in the circuit schematic below, when there is light, the particles of light hit the phototransistor, which enables the current to pass through the transistor, and with it the LED is switched off. When there is no light current freely passes through the transistor, lighting up the LED. Then I carved a pumpkin and placed it on the circuit. The pumpkin lights up when it is dark.</h6>

              <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/UAL-CCI-PCOMP/tree/main/portfolio_of_work/week3#lab-03-dark-detecting-circuit-for-your-pumpkins">Github Source Code</a></h6>

          </Col>
        </Row>
      </div>
      
      </main>


    <Footer/>
      
    </div>
  )
}