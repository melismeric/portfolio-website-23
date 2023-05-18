import Head from 'next/head'
import styles from '../styles/Project.module.css';
import Header from '../components/Header'
import { Image } from 'cloudinary-react';
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
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="https://cdn.sanity.io/images/cedgpqtk/production/c4395a9f3e7ecb48f1a441c9c34c83df088e5ffa-256x256.gif"/>
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="https://cdn.sanity.io/images/cedgpqtk/production/419af3a8bde05ff19ccd8319e8229cd3efd231ac-256x256.gif"/>
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="https://cdn.sanity.io/images/cedgpqtk/production/a503d6d1e140456ad66a2ecfedb8b4e5a6b56810-256x256.gif"/>

          </Col>

          <Col xs={12} sm={6} md={4} className="text-center">
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="https://cdn.sanity.io/images/cedgpqtk/production/0eb35cf71c5b0cde3187f7272be8e3ddeb416f6f-256x256.gif"/>
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="https://cdn.sanity.io/images/cedgpqtk/production/453c07db409a83f0abf3064c6ec7f73a6c41e409-256x256.gif"/>
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="https://cdn.sanity.io/images/cedgpqtk/production/15a9a6c7755887d479e4bc6fc8de612e7783a193-256x256.gif"/>

          </Col>

          <Col xs={12} sm={6} md={4} className="text-center">
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="https://cdn.sanity.io/images/cedgpqtk/production/4dcc0df99a291a72750e3f175b871e56a688508a-256x256.gif"/>
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="https://cdn.sanity.io/images/cedgpqtk/production/b548f9a31a26b64b41f839028781b031ce1d5ede-256x256.gif"/>
            <Image alt="flower" width={320} height={320} style={{paddingTop: "10px"}} src="https://cdn.sanity.io/images/cedgpqtk/production/33498cc5aa84c66839be5a1d3e6ac92845368dfd-256x256.gif"/>

          </Col>
        </Row>


      </div>


      


      </main>


    <Footer/>
      
    </div>
  )
}