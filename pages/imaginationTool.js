import Head from 'next/head'
import styles from '../styles/Project.module.css';
import Header from '../components/Header'
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
import { Image } from 'cloudinary-react';

import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper";

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
                  <h3 className={styles.title} style={{ paddingBottom: "40px" }} >Imagination Tool: AI Image Generation for Child Ideation and Creative Expression</h3>

         
                  <video height="auto" width="100%" controls className={styles.video}>
            <source src="\src\imaginationtoolvid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
                  </video>
                  <br></br>
        <h4 className={styles.title} >Overiew </h4>

        <p className={styles.text} >Imagination Tool is an Innovation UK funded project designed to support children's creative ideation and visual communication through AI-driven image generation. Developed through a co-design process involving workshops with children, the tool aims to make AI accessible for children and young people (CYP), supporting creative ideation and expression through image-making. The project emphasizes helping CYP gain AI literacy. Recognizing that existing image generation models are designed for adult use with limited usability for young users, this tool prioritizes both safety and user-friendliness.</p>

                  <Image alt="it1" height="auto" width="100%" className={`img-fluid ${styles.img}`} src="https://cdn.sanity.io/images/cedgpqtk/production/f244da7a9154ebc3b229b2871bd64ccbb18d30df-1920x1080.png" />          


        <h4 className={styles.title} >Key Features</h4>
        <ul className={styles.text}>
            <li><strong>Child-Safe Image Generation:</strong> Utilizes custom bad/safe word lists and Perspective API for toxicity detection to ensure all generated images are appropriate for children.</li>
            <li><strong>Prompt Scaffolding and User-Friendly Interface:</strong> Breaks down the image prompt into multiple question boxes, guiding children to describe their ideas in detail. Questions like “What is it?”, “What does it look like?”, and “Where can you find it?” help children provide comprehensive descriptions. The tool then combines these responses into a cohesive prompt, enhancing the quality and relevance of the generated images.</li>
            <li><strong>Imagination Bot and Speech-to-Text:</strong> An AI chatbot assistant supports idea development by engaging children in conversational prompts. Additionally, the Chrome browser's Web Speech API enables live speech-to-text input, removing the need for typing and making the tool more accessible.</li>
            <li><strong>Gallery:</strong> Features a gallery of user-generated images that serves as inspiration for other users. Children can view and remix these images, encouraging a collaborative and explorative environment.</li>
        </ul>
                  <br></br>



        <h4 className={styles.title} >Implementation Highlights</h4>
        <ul className={styles.text}>
            <li><strong>Working Prototype:</strong> Successfully developed and tested.</li>
            <li><strong>Workshops:</strong> Successfully tested in workshops with children aged 8-11, demonstrating ease of use and effectiveness in supporting creative expression.</li>
            <li><strong>ICCC’24 Publication:</strong> Short paper published, showcasing the project's findings and methodology.</li>
        </ul>
        <br></br>


                  <Row>
                      <Col xs={12} sm={6} md={4}>
                          <Image alt="it1" height="auto" width="100%" className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/f05224ee7e913c9f6190cea64e17dfc684bfe2c5-512x512.png" />
                          <Image alt="it1" height="auto" width="100%" className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/24559c8f8da85a13e87402f8acc583ea72cb16f4-512x512.png" />
                          <Image alt="it1" height="auto" width="100%" className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/cb61c2df8f76ae78ff0da99809043293278ff406-512x512.png" />
                      </Col>
                      <Col xs={12} sm={6} md={4}>
                          <Image alt="it1" height="auto" width="100%" className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/77a17ca0505cb39fa509d275d30b8c8540ddfef3-512x512.png" />
                          <Image alt="it1" height="auto" width="100%" className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/13c1e3d5ecc14a3940b6ac2c409ac856f8e81943-512x512.png" />
                          <Image alt="it1" height="auto" width="100%" className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/273b9ff915d9b941860418b4f7a4ea8f3fd6899c-512x512.png" />
                      </Col>
                      <Col xs={12} sm={6} md={4}>
                          <Image alt="it1" height="auto" width="100%" className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/09acfff145e9b71ce6945fa35c16ecd50778d75b-512x512.png" />
                          <Image alt="it1" height="auto" width="100%" className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/b09097a5e742d86ba4c05a334c5765599d87a558-512x512.png" />
                          <Image alt="it1" height="auto" width="100%" className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/ced358f84c411641dbe8fe89d41cef44d8326554-512x512.png" />
                      </Col>
                  </Row>
 
                  <br></br>

                  <div>
                      <iframe
                          src="/src/MericEtAl_ICCC2024.pdf"
                          style={{ width: '100%', height: '600px' }}
                      />
                  </div>
              </div>
       
    </main>


    <Footer/>
      
    </div>
  )
}