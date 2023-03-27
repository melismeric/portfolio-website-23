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
          <Col>
            <div >
              <iframe width="580" height="440" src="https://www.youtube.com/embed/__IKR4uh59Q" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </Col>
          <Col>

              <h2 className={styles.title} >BOID SIMULATION</h2>
              <h6 className={styles.text}>A 3D scene of Boid simulation implemented with C++ and OpenFrameworks</h6>

              <ul className={styles.text}>
                <li>Boid.h and Boid.cpp are used as a base class and Child.h/Child.cpp are inherited from it to add size and color functions to create different colored and sized boids.</li>
                <li>Added ofxGUI addon to easily change the movements. We can modify the separation and cohesion weights and see the change of the interaction between boids.</li>
                <li>We used ofEasyCam and lights to create a 3D scene and see the interactions from different angles.
                </li>
              </ul>
              <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/UAL-CODINGTWO/tree/main/coding2Boid">Github Source Code</a></h6>
 
          </Col>
        </Row>
      </div>
      
      </main>


    <Footer/>
      
    </div>
  )
}