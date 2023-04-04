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
              <iframe width="100%" height="440" src="https://www.youtube.com/embed/RKgURQPfy-k?autoplay=1&mute=1&loop=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </Col>
          <Col xs={12} sm={6} md={6}>

              <h2 className={styles.title} >Drawing App</h2>
              <h6 className={styles.text}>This drawing app implemented using Openframeworks. The lines created using Polylines, ofDrawLine, and ofPoint. Line class consists of two points that define the beginning and end of the line. Two vectors called Lines and Drawnlines are defined. The draw() method connects two points of the line. In the mouseDragged() function, every time the mouse is dragged it saves the position of the mouse in the DrawnPoints vector. Then we take the current position of the mouse and compare it with all its previous positions. If the distance between the current position and the previous one is less than 30 pixels, we create a line between them. This method creates a nested effect on the lines we draw. Using ofxGui we put sliders to control the size and color of the line and color of the background.</h6>

      
              <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/Openframeworks-Projects/tree/main/polylines%20drawing%20app">Github Source Code</a></h6>

          </Col>
        </Row>
      </div>
      
      </main>


    <Footer/>
      
    </div>
  )
}