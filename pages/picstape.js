import Head from 'next/head'
import styles from '../styles/Project.module.css';
import Header from '../components/Header'
import Image from 'next/image'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../components/Footer'
import Container from 'react-bootstrap/Container';
import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

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
      <div className={styles.container}> 
      <h2 className={styles.title} >Picstape - Mood-Based Image Generation for Spotify Playlists</h2>
      <h6 className={styles.text}>Creative Computing MSc Final Project - 2022</h6>
    


        <p className={styles.text}>Pixtape is a custom software that I developed for mood-based image generation, built upon the VQGAN-CLIP technology. The software takes Spotify playlist URLs as input and generates a text prompt for each song in the playlist, including the mood and color of the songs.</p>
        <p className={styles.text}>To predict the mood for each song, I used multi-modal mood classification with neural networks, along with a mood map based on Russell's mood model and Last.fm user-generated tags. The color is calculated by mapping audio features to RGB and HSV codes.</p>
        <p className={styles.text}>Using this data, the software creates iteratively generated images for each song in the playlist, depicting the mood by using colors and abstract representations of the given text. VQGAN-CLIP is used to refine the visual elements and add a dynamic, textured quality to each image.</p>
        <p className={styles.text}>The final output is a video that visualizes the playlist, bringing the music to life with visuals that accurately represent the mood and color of each song. With Pixtape, I am able to create a cohesive and immersive experience for listeners, and showcase my skills in using cutting-edge technology to create beautiful, dynamic art.</p>

        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://colab.research.google.com/drive/11b-NGMrYnOxRLsEd-ts6hxk0vrSbeS96">Colab Notebook</a></h6>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://docs.google.com/document/d/1C0LmXtY96Pp--dE1nlUuGItf-aMVxqTbOmMeDs7asz8/edit?usp=sharing">Research Paper</a></h6>

      <Carousel className={styles.videoContainer}>
        <div>
          <iframe width="100%" height="400px" src="https://www.youtube.com/embed/TUmbndoxrEo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>        </div>
        <div>
          <iframe width="100%" height="400px" src="https://www.youtube.com/embed/i3s6jjDFfUQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>        </div>
        <div>
          <iframe width="100%" height="400px" src="https://www.youtube.com/embed/DLE3Qntk2tg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>        </div>
        <div>
          <iframe width="100%" height="400px" src="https://www.youtube.com/embed/YjsmCsk78JI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </Carousel>
      

<h2 data-content="How Picstape Works" class={styles.hrText}></h2>




      <Image alt="picsprocess" width={1000} height={600} className={styles.img} style={{marginTop: "20px"}}  src="/src/picstape-process.png"/>
      
      <h4 className={styles.title} style={{marginTop: "10px"}} >Text Prompt Building Blocks</h4>


      <Image alt="textcon" width={500} height={200} className={styles.img} style={{margin: "auto"}} src="/src/textcon.png"/>



  <Row style={{marginTop: "10px"}} >
          <Col md={8}>
            <h4 className={styles.title} > Generated Prompt Example</h4>
              <p className={styles.text}>['abstract Fauvist watercolor painting of First Rain: 2 | blueviolet thistle: 0.9 | Relaxing: 1.8  | cynical: 0.8  | glowing neon: 0.9 | concert poster: 0.9',

         'abstract Fauvist watercolor painting of Magical Mountains: 2 | blue black: 0.9 | Focused: 1.8  | sad: 0.8  | glowing neon: 0.9',

         'abstract Fauvist watercolor painting of Oh, Lovely Appearance of Death: 2 | blue black: 0.9 | Relaxing: 1.8  | sad: 0.8  | glowing neon: 0.9',

         'abstract Fauvist watercolor painting of Claudia, Wilhelm R And Me: 2 | royalblue black: 0.9 | Focused: 1.8  | calm: 0.8  | glowing neon: 0.9',

         'abstract Fauvist watercolor painting of 33 “GOD”: 2 | slateblue black: 0.9 | Sad: 1.8  | dreamy: 0.8  | glowing neon: 0.9']</p>
          </Col>
          <Col md={4}>
            <h4 className={styles.title} >Output Video</h4>
            <video ref={videoRef} height="auto" width="150%"  className={styles.img}  src="https://res.cloudinary.com/dfn3uxsf6/video/upload/v1682540925/video_3_szbljy.mp4" autoplay loop controls> </video>

          </Col>
    </Row>
      </div>

      </main>


    <Footer/>
      
    </div>
  )
}