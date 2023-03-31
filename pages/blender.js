import Head from 'next/head'
import styles from '../styles/Project.module.css';
import Header from '../components/Header'
import Image from 'next/image'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../components/Footer'
import React, { useRef, useEffect } from 'react';


export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.play();
  }, []);
  return (
    <div className={styles.page}>
      <Head>
        <title>Melis Meriç Portfolio Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <main>
      <div className={styles.container} style={{paddingTop: "40px"}}>
      <h2 className={styles.title} >Blender Projects</h2>
        <Row>
           <Col>
              <video ref={videoRef} height="auto" width="100%" src="src/trimmed.mp4" class="w-100 shadow-1-strong rounded mb-4" autoplay loop> </video>

              <img height="auto" width="100%"  src="src/clouds2.png" class="w-100 shadow-1-strong rounded mb-4"/>

            </Col>
          
            <Col >
                <img height="auto" width="100%" src="src/sand2.png" class="w-100 shadow-1-strong rounded mb-4" />
                <img height="auto" width="100%" src="src/space-pool.png" class="w-100 shadow-1-strong rounded mb-4"/>
            </Col>
          
            <Col >
              <img height="auto" width="100%" src="src/Screen Shot 2022-02-14 at 19.20.34.png" class="w-100 shadow-1-strong rounded mb-4"/>

              <img height="auto" width="100%" src="src/sand.png" class="w-100 shadow-1-strong rounded mb-4"/>

            </Col>
          </Row>
      </div>

      </main>


    <Footer/>
      
    </div>
  )
}