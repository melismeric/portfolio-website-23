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
              <iframe width="100%" height="440" src="https://www.youtube.com/embed/CKjLFnHvdBM" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            </div>
          </Col>
          <Col xs={12} sm={6} md={6}>

              <h2 className={styles.title}>IMAGE TO MESH</h2>
              <h6 className={styles.text}>Generative mesh implemented using Openframeworks. The project implemented using an image to drive the creation of a mesh. With the color information of the pixels, the meshes created using the selected bright colors. A threshold applied such that we only generate a vertex at the pixel locations where the intensity of the color is higher than some set value that we choose. Then we need to loop through all possible pairs of selected pixel locations, check if the distance between them is less than a particular value, and if so, connect them. Perlin noise is used to add movement to the meshes. Perlin noise generates random values that smoothly change over time and this gives the movement to the lines.Here are some examples of the meshes I generated using important art works.</h6>
              <h6 className={styles.text}><a style={{color:"wheat"}} href="https://github.com/melismeric/Openframeworks-Projects/tree/main/Image%20to%20mesh">Github Source Code</a></h6>
          </Col>
        </Row>


        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} className="text-center">
            <video width="100%" height="400px" autoPlay loop muted>
              <source src={'/src/carravaggio.mov'} type="video/mp4" />
            </video>
            <video width="100%" height="400px" autoPlay loop muted>
              <source src={'/src/starry.mov'} type="video/mp4" />
            </video>
            <video width="100%" height="400px" autoPlay loop muted>
              <source src={'/src/egon.mov'} type="video/mp4" />
            </video>
            <video width="100%" height="400px" autoPlay loop muted>
              <source src={'/src/Openframeworks Image to Mesh.mov'} type="video/mp4" />
            </video>
            
            
          </Col>

          <Col xs={12} sm={6} md={4} className="text-center">
            <img alt="flower" width="100%" height="400px" style={{paddingTop: "10px"}} src="/src/caravaggio.jpg"/>
            <img alt="flower" width="100%" height="400px" style={{paddingTop: "10px"}} src="/src/starrynight (1).jpg"/>
            <img alt="flower" width="100%" height="400px" style={{paddingTop: "10px"}} src="/src/egon.jpg"/>
            <img alt="flower" width="100%" height="400px" style={{paddingTop: "10px"}} src="/src/vangogh.jpg"/>
          </Col>

        </Row>
      </div>
      
      </main>


    <Footer/>
      
    </div>
  )
}