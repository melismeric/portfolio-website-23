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
        <h2 className={styles.title} >Picstape - Mood-Based Image Generation for Spotify Playlists</h2>
        <h6 className={styles.text}>Creative Computing MSc Final Project - 2022</h6>

        <p className={styles.text}>Pixtape is a custom software that I developed for mood-based image generation, built upon the VQGAN-CLIP technology. The software takes Spotify playlist URLs as input and generates a text prompt for each song in the playlist, including the mood and color of the songs.</p>
        <p className={styles.text}>To predict the mood for each song, I used multi-modal mood classification with neural networks, along with a mood map based on Russell's mood model and Last.fm user-generated tags. The color is calculated by mapping audio features to RGB and HSV codes.</p>
        <p className={styles.text}>Using this data, the software creates iteratively generated images for each song in the playlist, depicting the mood by using colors and abstract representations of the given text. VQGAN-CLIP is used to refine the visual elements and add a dynamic, textured quality to each image.</p>
        <p className={styles.text}>The final output is a video that visualizes the playlist, bringing the music to life with visuals that accurately represent the mood and color of each song. With Pixtape, I am able to create a cohesive and immersive experience for listeners, and showcase my skills in using cutting-edge technology to create beautiful, dynamic art.</p>



        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://colab.research.google.com/drive/11b-NGMrYnOxRLsEd-ts6hxk0vrSbeS96">Colab Notebook</a></h6>
      
      
      <Carousel className={styles.videoContainer}>
        <div>
          <iframe width="100%" height="400px" src="https://www.youtube.com/embed/R2pufaXqQZc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div>
          <iframe width="100%" height="400px" src="https://www.youtube.com/embed/R2pufaXqQZc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div>
          <iframe width="100%" height="400px" src="https://www.youtube.com/embed/R2pufaXqQZc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </Carousel>
      </div>

      </main>


    <Footer/>
      
    </div>
  )
}