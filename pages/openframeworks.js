import Head from 'next/head'
import styles from '../styles/Project.module.css';
import Header from '../components/Header'
import Image from 'next/image'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel, CarouselItem } from 'react-responsive-carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../components/Footer'
import React, { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';


export default function Home() {
const videoSources = [
  '/src/gl3-n.mov',
  '/src/egon.mov',
]
  return (
    <div className={styles.page}>
      <Head>
        <title>Melis Meriç Portfolio Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <main>
      <div className={styles.container} style={{paddingTop: "40px"}}>
      <h2 className={styles.title} >Openframeworks Basics</h2>
      <h3 className={styles.title} >GEOMETRIC LOOPS </h3>
      <p className={styles.text} >These animations are constructed using a geometric shape on the center and rotating and scaling it.</p>

        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} className="text-center">
            <video width="100%" height="400px" autoPlay loop muted>
              <source src={'/src/gl3-n.mov'} type="video/mp4" />
            </video>
            <video width="100%" height="400px" autoPlay loop muted>
              <source src={'/src/g6.mov'} type="video/mp4" />
            </video>

          </Col>

          <Col xs={12} sm={6} md={4} className="text-center">
            <video width="100%" height="400px" autoPlay loop muted>
              <source src={'/src/g1.mov'} type="video/mp4" />
            </video>
            <video width="100%" height="400px" autoPlay loop muted>
              <source src={'/src/gl5-n.mov'} type="video/mp4" />
            </video>
          </Col>

          <Col xs={12} sm={6} md={4} className="text-center">
            <video width="100%" height="400px" autoPlay loop muted>
              <source src={'/src/gl2-n.mov'} type="video/mp4" />
            </video>
            <video width="100%" height="400px" autoPlay loop muted>
              <source src={'/src/gl4-n.mov'} type="video/mp4" />
            </video>
          </Col>


        </Row>


      <h3 className={styles.title} >OBJECT ORIENTED PROGRAMMING</h3>
      <p className={styles.text} >I implemented this project by defining a class of balls. Using the class we can set a ball's position, color, speed, and direction. The advantage of defining classes is, we can later reproduce as many objects as we need. We can keep our code clean by just calling the appropriate methods when wanted. I used this class in two ways; the first one is in the mouseDragged function, we create balls using the mouse position. The direction and color of the balls are random. The second one randomizes the position along with other parameters, creating a certain number of balls on the screen.
      </p>
      <Row>
        <Col xs={12} sm={6} md={6}>
            <video width="100%" height="400px" autoPlay loop muted>
              <source src={'/src/g7.mov'} type="video/mp4" />
            </video>
                  </Col>

      </Row>

      </div>

      </main>


    <Footer/>
      
    </div>
  )
}