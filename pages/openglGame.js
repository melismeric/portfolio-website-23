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
        <video src="/src/lab_view2.mp4" alt="abc" height="auto" width="100%" id="image-section" controls/>


        <Row>
          <Col xs={12} sm={6} md={6}>
            <div >
              <iframe width="100%" height="440" src="https://www.youtube.com/embed/x7_bb6Em1_A?autoplay=1&mute=1&loop=1" frameBorder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </Col>
          <Col xs={12} sm={6} md={6}>

              <h2 className={styles.title} >OpenGl Labyrinth Game</h2>
              <h6 className={styles.text}>OpenGL is an API for rendering 2D vector graphics. The game is a labyrinth game player's point of view is the camera. The environment consists of 3d cubes that together form a maze. There is a key for the escape door in the labyrinth. There is a monster that follows the player during the game. The game ends if it catches the player. Its movements are slower than the player for the sake of the game. Then after the player gets the key, she gets one jump option to jump and see the labyrinth and find the door.  The player can also escape from the monster with the jump option. The player wins if she can manage to escape the monster and find the door and open it with the key. The implementation consists of shaders written in GLSL. The texture of the monster and the ground are applied using mipmaps. The light source of the environment rotates circularly above the labyrinth. The shadows and Phong lightning model calculated according to the coordinates of the light source. Collision detection is applied to prevent the player go into the walls of the labyrinth.</h6>

      
              <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/openglGAME">Github Source Code</a></h6>
 
          </Col>
        </Row>
      </div>
      
      </main>


    <Footer/>
      
    </div>
  )
}