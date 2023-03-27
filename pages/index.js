import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
  return (
    
    <div className={styles.container}>
      <Head>
        <title>Melis Meriç Portfolio Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <main>

          <Row> 
            <Col>
             <a href="/picstape">
                <Image alt="picstape" width={320} height={320} className={styles.img} src="/home/picstape.gif"/>
             </a>
             <figcaption className={styles.caption} >Spotify Playlist to Images [Picstape]</figcaption>
             <figcaption className={styles.caption} >CCI Final Project 2022</figcaption>
             <br/>
              <a href="proj18.html">
                <Image alt="intpaint" width={320} height={320} className={styles.img} src="/home/intpaint.png"/>
             </a>
             <figcaption className={styles.caption} >Interactive Painting</figcaption>
             <figcaption className={styles.caption} >CCI Course Project 2022</figcaption>
             <br/>
              <a href="project1.html">
                <Image alt="kaleidoscope" width={320} height={320} className={styles.img} src="/home/kaleidoscope.gif"/>
             </a>
             <figcaption className={styles.caption}>Kaleidoscope Shader</figcaption>
             <figcaption className={styles.caption}>CCI Course Project 2021</figcaption>
             <br/>
             <a href="proj5.html">
              <Image alt="Starry" width={320} height={320} className={styles.img} src="/home/starry.gif"/>
             </a>
             <figcaption className={styles.caption}>Interactive Starry Night</figcaption>
             <figcaption className={styles.caption}>CCI Course Project 2021</figcaption>
             <br/>
              <a href="proj8.html">
                <Image alt="ofpoly" width={320} height={320} className={styles.img} src="/home/Openframeworks Interactive Polylines.png"/>
              </a>
              <figcaption className={styles.caption}>Webcam Interactive Polylines</figcaption>
              <figcaption className={styles.caption}>Openframeworks 2020</figcaption>
              <br/>
              <a href="proj16.html">
                <Image alt="led"  width={320} height={320} className={styles.img} src="/home/Sound Interactive Led Project.png"/>
              </a>
              <figcaption className={styles.caption}>Sound Interactive Led</figcaption>
              <figcaption className={styles.caption}>Arduino Project 2020</figcaption>
              <br/>
            </Col>

            <Col >
              <a href="/ganflowers">
                <Image alt="flower" width={320} height={320} className={styles.img} src="/home/flower.gif"/>
              </a>
               <figcaption className={styles.caption}>AI Flowers</figcaption>
               <figcaption className={styles.caption}>CCI Course Project 2022</figcaption>
               <br/>
                <a href="proj19.html">
                  <Image alt="boid"  width={320} height={320} className={styles.img} src="/home/boid.gif"/>
              </a>
              <figcaption className={styles.caption}>Boid Simulation</figcaption>
              <figcaption className={styles.caption}>CCI Course Project 2022</figcaption>
              <br/>
              <a href="project2.html">
                <Image alt="connection" width={320} height={320} className={styles.img} src="/home/connection.gif"/>
              </a>
              <figcaption className={styles.caption}>Connection</figcaption>
              <figcaption className={styles.caption}>CCI Course Project 2021</figcaption>
              <br/>
              <a href="proj6.html">
                <Image alt="pipe" width={350} height={350} className={styles.img} src="/home/pipe.png"/>
              </a>
              <figcaption className={styles.caption}>Recreated Treachery Of Images</figcaption>
              <figcaption className={styles.caption}>CCI Course Project 2021</figcaption>
              <br/>
              <a href="proj13.html">
                <Image alt="pumpkin" width={320} height={320} className={styles.img} src="/home/pumpkin.gif" autoplay/>
              </a>
              <figcaption className={styles.caption}>Light Detecting Pumpkin</figcaption>
              <figcaption className={styles.caption}>CCI Physical Computing Course Project 2021</figcaption>
              <br/>
                            <a href="proj11.html">
                <Image alt="paint" width={320} height={320} className={styles.img} src="/home/paint.jpg"/>
              </a>
              <figcaption className={styles.caption}>Paint with Polylines</figcaption>
              <figcaption className={styles.caption}>Openframeworks 2020</figcaption>
              <br/>
            </Col>

            <Col>
              <a href="/wetmixer">
                <Image alt="wtmxer" width={320} height={320} className={styles.img} src="/home/wtmxer.gif"/>
              </a>
              <figcaption className={styles.caption}>Wetmixer</figcaption>
              <figcaption className={styles.caption}>CCI Physical Computing Course Project 2021</figcaption>
              <br/>
              <a href="advancedenv.html">
                <Image alt="img" width={320} height={320} className={styles.img} src="/home/image.png"/>
              </a>
              <figcaption className={styles.caption}>Touchy Feely</figcaption>
              <figcaption className={styles.caption}>CCI Advanced Environments Course Project 2022</figcaption>
              <br/>
              <a href="proj14.html">
                <Image alt="extra" width={320} height={320} className={styles.img}  src="/home/extra.gif" autoplay/>
              </a>
              <figcaption className={styles.caption}>3js Rooms</figcaption>
              <figcaption className={styles.caption}>CCI Course Project, Threejs, 2021</figcaption>
              <br/>
              <a href="proj10.html">
                <Image alt="vincent" width={320} height={320} className={styles.img} src="/home/vincent.gif" autoplay/>
              </a>
              <figcaption className={styles.caption}>Paintings To Mesh</figcaption>
              <figcaption className={styles.caption}>Openframeworks 2020</figcaption>
              <br/>
              <a href="proj12.html">
                <Image alt="feedback" width={320} height={320} className={styles.img} src="/home/w3-l4-feedback.gif" autoplay/>
              </a>
              <figcaption className={styles.caption}>Arduino Feedback System</figcaption>
              <figcaption className={styles.caption}>CCI Advanced Physical Computing Course Project 2021</figcaption>
              <br/>
              <a href="proj9.html">
                <Image alt="lab" width={320} height={320} className={styles.img} src="/home/lab.png"/>
              </a>
              <figcaption className={styles.caption}>Labyrinth Game</figcaption>
              <figcaption className={styles.caption}>OpenGL 2019-20</figcaption>
              <br/>
            </Col>

            <Col>
              <a href="/spaceship">
                <Image alt="space" width={320} height={320} className={styles.img} src="/home/space.gif"/>
              </a>
              <figcaption className={styles.caption}>Spaceship</figcaption>
              <figcaption className={styles.caption}>CCI Course Project, Threejs, 2021</figcaption>
              <br/>
              <a href="blender.html">
                <Image alt="cloud" width={320} height={320} className={styles.img} src="/home/clouds2.png"/>
              </a>
              <figcaption className={styles.caption}>Blender Projects</figcaption>
              <figcaption className={styles.caption}>2022</figcaption>
              <br/>
              <a href="proj7.html">
                <Image alt="wallet" width={320} height={320} className={styles.img} src="/home/wallet.jpg"/>
              </a>
              <figcaption className={styles.caption}>Safe Wallet</figcaption>
              <figcaption className={styles.caption}>SU Physical Computing Course Project 2020</figcaption>
              <br/>
              <a href="proj15.html">
                <Image alt="pink" width={320} height={320} className={styles.img} src="/home/pink.gif" autoplay/>
              </a>
              <figcaption className={styles.caption}>Geometric Loops</figcaption>
              <figcaption className={styles.caption}>Openframeworks Basics 2020</figcaption>
              <br/>
              <a href="proj17.html">
                  <Image alt="arduino" width={320} height={320} className={styles.img} src="/home/arduino.jpg"/>
              </a>
              <figcaption className={styles.caption}>DIY Arduino</figcaption>
              <figcaption className={styles.caption}>SU Physical Computing Course Project 2020</figcaption>
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