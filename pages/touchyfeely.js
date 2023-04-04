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
      <img alt="intpaint" style={{display: "flex", margin: "auto", flexDirection: "row", justifyContent: "center"}} width="100%" height="auto" className={styles.img} src="/home/image.png"/>
      <Row style={{paddingTop: "40px"}}>
      
      <Col xs={12} sm={6} md={6}>
        <h2 className={styles.title}  >Touchy Feely</h2>
        <h6 className={styles.text}>Immersive Exploartion Game Built with Unreal Engine</h6>
        <h6 className={styles.text}>Advanced Environments Final Project - 2022</h6>
        <h6 className={styles.text}>Team Members:</h6>
        <ul className={styles.text}>
            <li>Anthony Garnett</li>
            <li>Marysia Tańska</li>
            <li>Meiyue Yan</li>
            <li>Seamus White</li>
            <li>Zeynep Melis Meriç</li>
          </ul>
        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://git.arts.ac.uk/21004071/21-22-Creative-Making/tree/main/Final%20Project">Source Code</a></h6>
      </Col>

      <Col xs={12} sm={6} md={6}>
        <p className={styles.text}>Many of our childhood memories are multi-sensory. The textures smells and sounds of our early years are intrinsic to vivid or blurry images of shapes, colors, places, and people that continue to inhabit our heads. Like kids exploring the world through play, we’d like to invite the audience to join us on an adventure into the box of our childhoods.
                The memories layer up. Going in circles, we repeatedly flip through them in our minds only to see them altered with every iteration. They’re still there, yet all we can grasp are just tiny bits of whole worlds been and gone. Presenting textures, objects, and phrases from 5 different universes of our own, Touchy-Feely pays homage to our late 1990s and early 2000s nostalgia as well as gives the viewer a peek into our childhood memories.</p>

      </Col>
      </Row>
       <Row style={{paddingTop: "40px"}}>
          <Col xs={12} sm={6} md={6}>
            <h6 className={styles.text}>Equipments:</h6>
            <img height="auto" width="100%" className={styles.img} src="/src/eqlist.png"/>

          </Col>

          <Col xs={12} sm={6} md={6}>
           <img height="auto" width="100%" className={styles.img} src="/src/3.jpg"/>
          </Col>
          </Row>

            <h3 className={styles.text}>Project Description</h3>
            <p className={styles.text}>Touchy-feely is an immersive exploration environment created using Unreal Engine 4. Multi-sensory childhood memories became our inspiration for this project. Each of us who created this project comes from a different culture which enabled us to combine textures, objects, and phrases from 5 different worlds of our own. Each of us designed 3d models and interactions activated by tactile controllers for visitors to experience this immersive journey. The environment consists of a CTR TV and a card box with holes for visitors to put their hands in and feel the controllers. The controllers are hidden in a card box. The controllers trigger the objects in the tunnel. As we go through the tunnel we come across various objects from each of our childhoods. The visitors are not able to see the controllers so they need to put their hands in the box and try to learn how to use them. We aimed the experience to be like children exploring the world around them. Not being able to see the controllers helps the users focus on the material of the controller and find ways to play with it. Manipulating the 3d models in the tunnel using these controllers improves the experience because the visitors don't know what to expect. They learn which controller is for which model by blindly playing with them. Each controller has a different tactile material for visitors to feel and see what happens on the screen. Some of the controllers are capacitive touch sensors with different textures like fabric, wood, or sponge. On the other hand, some controllers get activated by spinning, strumming, or dialing the phone.</p>

            <h3 className={styles.text}>Physical to Digital Process</h3>
            <img height="auto" width="100%" src="/src/phys-digital.png"/>

            <Row>
               <h3 className={styles.text}>Physical to Digital Process</h3>
              <Col xs={12} sm={6} md={6} style={{ display: "flex", justifyContent: "space-around"}} >
                <img height="auto" width="100%"  src="/src/1R0A3083.jpg"/>
              </Col>

              <Col xs={12} sm={6} md={6} style={{ display: "flex", justifyContent: "space-around"}} >
                <img height="auto" width="100%" src="/src/1R0A3085.jpg"/>
              </Col>

            </Row>

      </div>
      
    
        <div className={styles.videoContainer} style={{paddingTop: "40px"}}>
          <iframe width="60%" height="400px" class="responsive-iframe" src="https://www.youtube.com/embed/svcvmbKqDow" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>


      </main>


    <Footer/>
      
    </div>
  )
}