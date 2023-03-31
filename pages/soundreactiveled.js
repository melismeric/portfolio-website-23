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

      <div className={styles.container}> 
      <img alt="intpaint" style={{display: "flex", margin: "auto", flexDirection: "row", justifyContent: "center"}} width="100%" height="auto" className={styles.img} src="/src/led5.png"/>
      <Row style={{paddingTop: "40px"}}>
      
      <Col xs={12} sm={6} md={6}>
        <h2 className={styles.title}  >Sound Reactive Led StripSound Reactive Led Strip</h2>
        <h6 className={styles.text}>Personal Project - 2021</h6>
        <h6 className={styles.text}>Equipments:</h6>
        <ul className={styles.text}>
          <li>Arduino Nano</li>
          <li>Addressable RGB Led strip</li>
          <li>Resistors (220 ohm, 10M ohm)</li>
          <li>Sound Detector</li>
          <li>Jumper wires</li>
          <li>Breadboard</li>
          <li>Solder</li>
          <li>330 r ohm resistor</li>
          <li>Electrolytic Decoupling Capacitors - 1000uF/25V</li>
          </ul>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/UAL-CCI-PCOMP/blob/main/portfolio_of_work/Final%20Project%20Blog/final_proj/final_proj_wetmixer.ino">Source Code</a></h6>
      </Col>

      <Col xs={12} sm={6} md={6}>
        <p className={styles.text}>This project aims to create sounds and turn on LEDs by touching the water. I aim to use water as an interface and use the conductivity of both water and skin. I built a set using two metal bowls, a LED strip, and speakers. Inside the bowls, I put salty water to increase the conductivity. When someone touches the water in one bowl it increases the number of LEDs turning on. According to the electrical charge of that person the number of LEDs turning on changes. Also if multiple people touch the water they have a chance to turn up more LEDs than one person. Using the potentiometer the sensitivity of the LEDs can be changed. If a person touches the water in the other bowl and also touches the conductive surface near it, it activates the analog synthesizer and creates sound. The sound changes according to the electrical charge of the person touching it and their interaction with water. If someone else touches that person or water it creates a different sound.</p>

      </Col>
      </Row>
       <Row style={{paddingTop: "40px"}}>
          <Col xs={12} sm={6} md={6}>

            <img height="auto" width="100%" className={styles.img} src="/src/led1.png"/>

          </Col>

          <Col xs={12} sm={6} md={6}>
           <img height="auto" width="100%" className={styles.img} src="/src/led3.png"/>
          </Col>
          </Row>



         <div className={styles.videoContainer} style={{paddingTop: "40px"}}>
          <iframe width="60%" height="400px" class="responsive-iframe" src="https://www.youtube.com/embed/PqM89UJ7gqA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>



      </div>
      
    
    


      </main>


    <Footer/>
      
    </div>
  )
}