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
              <iframe width="100%" height="440" src="https://www.youtube.com/embed/wJTTk-5Lvow?autoplay=1&mute=1&loop=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </Col>
          <Col xs={12} sm={6} md={6}>

              <h2 className={styles.title} >Interactive Polylines</h2>
              <h6 className={styles.text}>This project was implemented using Openframeworks. There are a series of polylines affected by the movements of the camera. OfxCv and ofxOpencv add-ons are used. Using the pixels we get the difference of the image, and they construct the polylines. The polylines are going from left to right on the screen, and they're affected by the brightness. When there is a change in brightness, the brightness will send it to the y-coordinates of the polylines, and they will go upwards. When we stay still they will go back to normal. We need to use the get smoothed() function to smooth the lines and see them better.</h6>

      
              <h6 className={styles.text}><a style={{color:"wheat"}} href="//github.com/melismeric/Openframeworks-Projects/tree/main/interactive_polyline">Github Source Code</a></h6>

          </Col>
        </Row>
      </div>
      
      </main>


    <Footer/>
      
    </div>
  )
}