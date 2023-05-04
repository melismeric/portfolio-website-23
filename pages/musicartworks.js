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
import { Swiper, SwiperSlide } from "swiper/react";
import swiperStyles from '../styles/swiper.module.css';
import { Spotify } from 'react-bootstrap-icons';
import Link from 'next/link'
import Button from 'react-bootstrap/Button';

import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper";

export default function Home() {
  const videoRef_0 = useRef(null);
  const videoRef_1 = useRef(null);
  const videoRef_2 = useRef(null);

  useEffect(() => {
    videoRef_0.current.play();
    videoRef_1.current.play();
    videoRef_2.current.play();
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
        <h3 className={styles.title} >Mood-Based Music Visualizations: Spotify Canvases, Cover Arts, and Music Clips</h3>
        <p className={styles.text} > I've had the opportunity to collaborate with a variety of talented musicians, creating bespoke visual content for their music. Among the projects I'm proudest of are the Spotify canvases, cover arts, and music clips I created for a range of artists.</p>
        <p className={styles.text} >To ensure that each visual element is a faithful representation of the music it accompanies, I developed a custom software that analyzes the mood and tempo of each song and uses that information to select a color palette and generate text prompts for the artwork. I then use the VQGAN-CLIP animations notebook to generate images that further refine the visual elements and add a dynamic, textured quality to each piece.</p>
        <p className={styles.text} >By combining cutting-edge technology with my own artistic vision, I'm able to create visually stunning works that capture the essence of the music they represent. Whether I'm creating a moody and evocative cover art or a vibrant and energetic music clip, my ultimate goal is to help create a cohesive and immersive experience for listeners that truly brings the music to life. With the addition of tempo in my recent music clip works, I'm able to animate the images in a way that further enhances the overall experience.</p>


        <Row>
           <Col xs={12} sm={6} md={3} >
              <video ref={videoRef_0} height="auto" width="100%" src="src/Arda Alper - Magic Trick.mov" class="w-100 shadow-1-strong rounded mb-4" autoplay loop> </video>
              <video ref={videoRef_2} height="auto" width="100%" src="src/Kadirhan - Kediler Haklı.MP4" class="w-100 shadow-1-strong rounded mb-4" autoplay loop> </video>
           </Col>

          <Col xs={12} sm={6} md={3} >
            <img height="auto" width="100%"  src="src/arda-magic.png" class="w-100 shadow-1-strong rounded mb-4"/>
            <video ref={videoRef_1} height="auto" width="100%" src="src/Beliz - Son Beyaz Gergedan.MP4" class="w-100 shadow-1-strong rounded mb-4" autoplay loop> </video>
          </Col>

          <Col xs={12} sm={6} md={6}>
            <iframe width="100%"height="315"  src="https://www.youtube.com/embed/od2eJIdL46w" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <iframe width="100%"height="315" src="https://www.youtube.com/embed/LbebSCRkho8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <iframe width="100%" height="315"  src="https://www.youtube.com/embed/VRGdcQj97uU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </Col>

        </Row>

        <div className={styles.buttonContainer} className={styles.text} >
          <div style={{paddingTop: "10px"}}>
            <Button variant="dark" href="https://open.spotify.com/track/0tthYPmo4XufTsApBDRkkA?si=5e8c77043bea442a" >
              <Spotify size={40} color="#1DB954" /> &nbsp;Arda Alper - Magic Trick
            </Button>
          </div>

          <div style={{paddingTop: "10px"}}>
            <Button variant="dark" href="https://open.spotify.com/track/0tthYPmo4XufTsApBDRkkA?si=5e8c77043bea442a" >
              <Spotify size={40} color="#1DB954" /> &nbsp;Beliz - Son Beyaz Gergedan'dan
            </Button>
          </div>
          <div style={{paddingTop: "10px"}}>
            <Button variant="dark" href="https://open.spotify.com/track/0tthYPmo4XufTsApBDRkkA?si=5e8c77043bea442a" >
              <Spotify size={40} color="#1DB954" /> &nbsp;Kadirhan Ayter - Kediler Haklı
            </Button>
          </div>
        </div>

        <h3 className={styles.title} style={{paddingTop: "20px"}}>Sources:</h3>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://colab.research.google.com/drive/11b-NGMrYnOxRLsEd-ts6hxk0vrSbeS96?usp=share_link">Picstape Colab Notebook</a></h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://colab.research.google.com/drive/1yLvEjEKMPVRP2QzvIPP5Qy88GocIRFMg?usp=sharing">VQGAN-CLIP Animations</a></h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://colab.research.google.com/drive/1K35WYKiHKp8mRkHcO3kqnS1-ozqmZ7kO?usp=sharing">Modified of Text-to-Video VQGAN+CLIP turbo 3D animations</a></h6>
      </div>
    </main>


    <Footer/>
      
    </div>
  )
}