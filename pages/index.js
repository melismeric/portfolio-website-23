import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
//import Image from 'next/image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from 'cloudinary-react';
import React, { useRef, useEffect } from 'react';

export default function Home() {
    const videoRef = useRef(null);
    const videoRef2 = useRef(null);
    const videoRef3 = useRef(null);
    const videoRef4 = useRef(null);

  useEffect(() => {
    videoRef.current.play();
    videoRef2.current.play();
    videoRef3.current.play();
    videoRef4.current.play();
  }, []);
  return (
    
    <div className={styles.container}>
      <Head>
        <title>Melis Meriç Portfolio Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <main className={styles.container} >

          <Row > 
            <Col className={styles.containerSection} >
             <a href="/musicartworks">
                <Image alt="rhino" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/9655fc2df6f02632a6be6704684f3d17f8978baf-512x512.gif"/>
             </a>
             <figcaption className={styles.caption} >Music Art with AI</figcaption>
             <br/>
              <a href="/intpaint">
                <Image alt="intpaint" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/643c13a6edcd8eba4601071c493666a4487c0c8a-1614x1214.png"/>
             </a>
             <figcaption className={styles.caption} >Interactive Painting</figcaption>
             <figcaption className={styles.caption} >CCI Course Project 2022</figcaption>
             <br/>
              <a href="/kaleidoscope">
                <video ref={videoRef} height="auto" width="100%"  className={styles.img}  src="https://res.cloudinary.com/dfn3uxsf6/video/upload/v1680628152/Screen_Recording_2023-04-04_at_18.02.15_i1mpvn.mov" class="w-100 shadow-1-strong rounded mb-4" autoplay loop> </video>
             </a>
             <figcaption className={styles.caption}>Kaleidoscope Shader</figcaption>
             <figcaption className={styles.caption}>CCI Course Project 2021</figcaption>
             <br/>
             <a href="/starrynight">
              <video ref={videoRef2} height="auto" width="100%"  className={styles.img}  src="https://res.cloudinary.com/dfn3uxsf6/video/upload/v1680628169/Screen_Recording_2023-04-04_at_18.01.44_ceuunj.mov" class="w-100 shadow-1-strong rounded mb-4" autoplay loop> </video>

             </a>
             <figcaption className={styles.caption}>Interactive Starry Night</figcaption>
             <figcaption className={styles.caption}>CCI Course Project 2021</figcaption>
             <br/>
              <a href="/polylines">
                <Image alt="ofpoly" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/bcf41d631e29016c920b95890c24deddc9f1a9b9-1070x1040.png"/>
              </a>
              <figcaption className={styles.caption}>Webcam Interactive Polylines</figcaption>
              <figcaption className={styles.caption}>Openframeworks 2020</figcaption>
              <br/>
              <a href="/soundreactiveled">
                <Image alt="led"  width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/8be78963d69481329a8be2a6f9926c0ebee89614-2420x1374.png"/>
              </a>
              <figcaption className={styles.caption}>Sound Interactive Led</figcaption>
              <figcaption className={styles.caption}>Arduino Project 2020</figcaption>
              <br/>
            </Col>

            <Col className={styles.containerSection}>
            <a href="/picstape">
                <video ref={videoRef3} height="auto" width="100%"  className={styles.img}  src="src/picstape_rfmuyc.mp4" class="w-100 shadow-1-strong rounded mb-4" autoplay loop> </video>
             </a>
             <figcaption className={styles.caption} >Spotify Playlist to Images [Picstape]</figcaption>
             <figcaption className={styles.caption} >CCI Final Project 2022</figcaption>
             <br/>
                <a href="/boid">
                  <Image alt="boid"  width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/555a0a57c81ab374e92f2931b4b3b595c2cac2e6-600x401.gif"/>
              </a>
              <figcaption className={styles.caption}>Boid Simulation</figcaption>
              <figcaption className={styles.caption}>CCI Course Project 2022</figcaption>
              <br/>
              <a href="/connection">
                <Image alt="connection" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/a4a4e2bdd9c349c67a26274ff2927ec72413f1ee-490x380.gif"/>
              </a>
              <figcaption className={styles.caption}>Connection</figcaption>
              <figcaption className={styles.caption}>CCI Course Project 2021</figcaption>
              <br/>
              <a href="/magritte">
                <Image alt="pipe" width={350} height={350} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/57397ec311f70173d514754c64e049c644d85b9d-1678x1112.png"/>
              </a>
              <figcaption className={styles.caption}>Recreated Treachery Of Images</figcaption>
              <figcaption className={styles.caption}>CCI Course Project 2021</figcaption>
              <br/>
              <a href="/pumpkin">
                <Image alt="pumpkin" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/838c31fa8e51317a5e35d78c50442cccce08e1a2-600x666.gif" autoplay/>
              </a>
              <figcaption className={styles.caption}>Light Detecting Pumpkin</figcaption>
              <figcaption className={styles.caption}>CCI Physical Computing Course Project 2021</figcaption>
              <br/>
              <a href="/paintpolyline">
                <Image alt="paint" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/c8324e3f09fe4ab3711d78448f4f6276de7f0d77-1743x1349.jpg"/>
              </a>
              <figcaption className={styles.caption}>Paint with Polylines</figcaption>
              <figcaption className={styles.caption}>Openframeworks 2020</figcaption>
              <br/>
            </Col>

            <Col>
              <a href="/ganflowers">
                <Image alt="flower" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/c4395a9f3e7ecb48f1a441c9c34c83df088e5ffa-256x256.gif"/>
              </a>
               <figcaption className={styles.caption}>AI Flowers</figcaption>
               <figcaption className={styles.caption}>CCI Course Project 2022</figcaption>
               <br/>
              <a href="/touchyfeely">
                <Image alt="img" width={320} height={320} className={styles.img} src="/home/image.png"/>
              </a>
              <figcaption className={styles.caption}>Touchy Feely</figcaption>
              <figcaption className={styles.caption}>CCI Advanced Environments Course Project 2022</figcaption>
              <br/>
              <a href="/rooms">
                <Image alt="extra" width={320} height={320} className={styles.img}  src="https://cdn.sanity.io/images/cedgpqtk/production/966f8a497dd91c6293b3bc15693bbf616c7a1019-600x337.gif" autoplay/>
              </a>
              <figcaption className={styles.caption}>3js Rooms</figcaption>
              <figcaption className={styles.caption}>CCI Course Project, Threejs, 2021</figcaption>
              <br/>
              <a href="/paintingstomesh">
                <Image alt="vincent" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/48be805c5d05cafa53fd006a3f7d53315efa0b64-600x599.gif" autoplay/>
              </a>
              <figcaption className={styles.caption}>Paintings To Mesh</figcaption>
              <figcaption className={styles.caption}>Openframeworks 2020</figcaption>
              <br/>
              <a href="/arduinfeedback">
                <Image alt="feedback" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/8028245ac37ee120ae36ca4cccbc735500b0315a-539x577.gif" autoplay/>
              </a>
              <figcaption className={styles.caption}>Arduino Feedback System</figcaption>
              <figcaption className={styles.caption}>CCI Advanced Physical Computing Course Project 2021</figcaption>
              <br/>
              <a href="/openglGame">
                <Image alt="lab" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/4eb3b4be7f0cb60b27344cba28bfd654d5fa301f-2538x1402.png"/>
              </a>
              <figcaption className={styles.caption}>Labyrinth Game</figcaption>
              <figcaption className={styles.caption}>OpenGL 2019-20</figcaption>
              <br/>
            </Col>

            <Col>
              <a href="/wetmixer">
                <Image alt="wtmxer" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/34ce365eb3e77e87492560eca7dc87d209c80c2d-915x522.gif"/>
              </a>
              <figcaption className={styles.caption}>Wetmixer</figcaption>
              <figcaption className={styles.caption}>CCI Physical Computing Course Project 2021</figcaption>
              <br/>
              <a href="/lotus">
                <Image alt="space" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/e286a3dae3911c19de521a30678a99e203c83825-600x600.gif"/>
              </a>
              <figcaption className={styles.caption}>Musical Lotus</figcaption>
              <figcaption className={styles.caption}>Personal Project, Threejs, 2023</figcaption>
              <br/>
              <a href="/spaceship">
                <Image alt="space" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/b6bcec19be9449c5a73b79423bdccb1d8052463c-600x375.gif"/>
              </a>
              <figcaption className={styles.caption}>Spaceship</figcaption>
              <figcaption className={styles.caption}>CCI Course Project, Threejs, 2021</figcaption>
              <br/>
              <a href="/blender">
                <Image alt="cloud" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/b8fa6c4b776c13e1996b2e92e969aeb7e598a368-1356x1704.png"/>
              </a>
              <figcaption className={styles.caption}>Blender Projects</figcaption>
              <figcaption className={styles.caption}>2022</figcaption>
              <br/>
              <a href="/cleanwallet">
                <Image alt="wallet" width={320} height={320} className={styles.img} src="https://cdn.sanity.io/images/cedgpqtk/production/6a018eaf341d3613c6a2c8eae0776c3d0cac65e0-945x766.jpg"/>
              </a>
              <figcaption className={styles.caption}>Clean Wallet</figcaption>
              <figcaption className={styles.caption}>SU Physical Computing Course Project 2020</figcaption>
              <br/>
              <a href="/openframeworks">
                <video ref={videoRef4} height="auto" width="100%"  className={styles.img}  src="https://res.cloudinary.com/dfn3uxsf6/video/upload/v1680628073/Screen_Recording_2023-04-04_at_18.01.02_elrjs2.mov" class="w-100 shadow-1-strong rounded mb-4" autoplay loop> </video>

              </a>
              <figcaption className={styles.caption}>Geometric Loops</figcaption>
              <figcaption className={styles.caption}>Openframeworks Basics 2020</figcaption>
              <br/>
            </Col>
          </Row>

         

      </main>

      <Footer/>
   
      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #ecb22c;
        }
      `}</style>

      <style jsx>{`
        html,
        body {
          background-color: #080808;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;

        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}