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

        <img src="https://res.cloudinary.com/dfn3uxsf6/image/upload/v1680626262/wtmxer_k25ecn.gif" alt="abc" height="auto" width="100%" id="image-section"/>

  
        <h2 className={styles.title} >WETMIXER</h2>
        <h6 className={styles.text}>Advanced Physical Computing Final Project - 2021</h6>

        <p className={styles.text}>This project aims to create sounds and turn on LEDs by touching the water. I aim to use water as an interface and use the conductivity of both water and skin. I built a set using two metal bowls, a LED strip, and speakers. Inside the bowls, I put salty water to increase the conductivity. When someone touches the water in one bowl it increases the number of LEDs turning on. According to the electrical charge of that person the number of LEDs turning on changes. Also if multiple people touch the water they have a chance to turn up more LEDs than one person. Using the potentiometer the sensitivity of the LEDs can be changed. If a person touches the water in the other bowl and also touches the conductive surface near it, it activates the analog synthesizer and creates sound. The sound changes according to the electrical charge of the person touching it and their interaction with water. If someone else touches that person or water it creates a different sound.</p>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/UAL-CCI-PCOMP/blob/main/portfolio_of_work/Final%20Project%20Blog/final_proj/final_proj_wetmixer.ino">Arduino Code</a></h6>
      </div>

      <div className={styles.videoContainer}>
          <iframe width="60%" height="400px" src="https://www.youtube.com/embed/AfvHVy7qO-c" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      </div>
    
      
      <div className={styles.container} style={{paddingTop: "6px"}}>


          <Row className="justify-content-center" >
            <Col xs={12} sm={6} md={4} style={{paddingTop: "6px"}} >
            <img src="/src/wm1.png" alt="abc" height="auto" width="100%" id="image-section"/>
    <p className={styles.text} style={{paddingTop: "10px"}}>The project consists of two parts. The first part is the LED strip circuit consisting of a LED strip, Arduino Leonardo, resistors, a potentiometer, a conductive surface to put water in it. The second part is the analog synthesizer which consists of a CD40106BE chip, two conductive surfaces (creates sound when you touch both of them), speakers, and a capacitor. I used cardboard to build the housing.</p>
          </Col>

 

            <Col xs={12} sm={6} md={4} className={styles.text} style={{paddingTop: "6px"}} >
              <h6>Equipments:</h6>
            <ul>
                <li>Arduino Leonardo</li>
                <li>LED strip</li>
                <li>Resistors (220 ohm, 10M ohm)</li>
                <li>Sound Detector</li>
                <li>Conductive tape</li>
                <li>9V battery</li>
                <li>10nF capacitor</li>
                <li>Two metal bowls</li>
                <li>Speakers</li>
                <li>One potentiometer </li>
              </ul>
  
            <img src="/src/IMG_3813.jpg" alt="abc" height="auto" width="100%" id="image-section"/>

            </Col>
          </Row>
             <p className={styles.text}>In the project, the sound is both an input and output, which makes the circuit a feedback system. By touching the water and the conductive surface we create sound. The pressure we make while holding the conductive surface changes the sound. The sound detector takes the sound and changes the color of LEDs accordingly. This makes sound input for the color of the LEDs. Also by touching the water we increase the number of LEDs turning on which makes the water touch an input and LEDs an output. The potentiometer is connected as an analog input to the circuit, we use it to change. the sensitivity of the LED strip. Higher values make it easier to turn on more LEDs.</p>


          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} className="text-center">
              <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="/src/circ1.png"/>
              <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="/src/circ2.png"/>

            </Col>

            <Col xs={12} sm={6} md={4} className="text-center">
              <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="/src/test2.jpg"/>
              <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="/src/lehim.jpg"/>

            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4} className="text-center">
              <video width="320" height="440"
              src="src/IMG_3824.mp4" controls>
              </video>
            </Col>
            <Col xs={12} sm={6} md={4} className="text-center">
              <video width="320" height="440"
              src="src/IMG_3861.mp4" controls>
              </video>
            </Col>
          </Row>
        </div>
 

      </main>


    <Footer/>
      
    </div>
  )
}