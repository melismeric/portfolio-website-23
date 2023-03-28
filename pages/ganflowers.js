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
        <h2 className={styles.title} >AI Generated Sunflowers and Roses</h2>

        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://colab.research.google.com/github/dvschultz/ml-art-colabs/blob/master/Stylegan2_ada_Custom_Training.ipynb#scrollTo=jOftFoyiDU3s">Stylegan2-ada Custom Training Notebook</a>  is used to generate images from a combinattion of Sunflowers and Roses datasets.
         <a style={{color:"wheat"}} href="https://colab.research.google.com/github/dvschultz/ai/blob/master/flesh_digressions.ipynb">Flesh Digressionns Colab Notebook</a>  is used to generate videos from the images
        </h6>

        <h6 className={styles.text}><a style={{color:"wheat"}} href="https://git.arts.ac.uk/21004071/MSc-Coding-3/tree/main/Final%20Project">Source Code</a>  for ML Final Project (older version of this project to generate images from combined datasets) </h6>

        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} className="text-center">
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="/src/flower.gif"/>
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="/src/flower10.gif"/>
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="/src/flower2.gif"/>

          </Col>

          <Col xs={12} sm={6} md={4} className="text-center">
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="/src/flower3.gif"/>
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="/src/flower4.gif"/>
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="/src/flower5.gif"/>

          </Col>

          <Col xs={12} sm={6} md={4} className="text-center">
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="/src/flower6.gif"/>
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="/src/flower7.gif"/>
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="/src/flower9.gif"/>

          </Col>
        </Row>


      </div>


      


      </main>


    <Footer/>
      
    </div>
  )
}