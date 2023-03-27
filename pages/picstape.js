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
        <h2 className={styles.title} >Spotify Playlist To Images [Picstape]</h2>
        <h6 className={styles.text}>Creative Computing MSc Final Project - 2022</h6>

        <p className={styles.text}>A Playlist Visualization Tool Based on Mood Built on VQGAN-CLIP</p>
        <p className={styles.text}>I developed a custom software called Pixtape for mood-based image generation built upon VQGAN-CLIP. Pixtape takes Spotify playlist URLs as input and generates a text prompt for each song in the playlist including the mood and color of the songs. Multi-modal mood classification is used with neural networks to predict the mood for each song along with a mood map based on Russell's mood model and Last.fm user-generated tags. The color is calculated by mapping audio features to RGB and HSV codes. The images are iteratively created for each song in the playlist, depicting the mood by using colors and abstract representations of the given text using VQGAN-CLIP. These images are then used to create a video to visualize the playlist. </p>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://colab.research.google.com/drive/11b-NGMrYnOxRLsEd-ts6hxk0vrSbeS96">Colab Notebook</a></h6>
      </div>
      
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

      </main>


    <Footer/>
      
    </div>
  )
}