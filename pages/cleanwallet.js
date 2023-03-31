import Head from 'next/head'
import styles from '../styles/Project.module.css';
import Header from '../components/Header'
import Image from 'next/image'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../components/Footer'
import Card from 'react-bootstrap/Card';


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
        <h2 className={styles.title} >Clean Wallet</h2>
        <h3 className={styles.title} >Fusio 360 Project</h3>
        <h6 className={styles.text}>The concept of the project is during pandemic times and after, how to use money and credit cards without getting infected. People need to protect themselves by keeping their hands and faces clean and with social distancing. According to researches corona virus can live on inorganic objects too which makes it easier to spread among people. Money circulates around lots of people and how clean a banknote is not known when holding it and it is known that virus can live on paper too. Hence, if we get money from someone or from an ATM we need to clean our hands immediately without touching anything. Wearing gloves are also useful but the disinfectant is the exact solution to get rid of virus and bacteria.Clean Wallet is a transparent wallet with a pocket on its surface that consists of disinfectant. With disinfectant whenever we hold the money we can clean our hands after we put or take it out from the wallet.</h6>

        <Row className="justify-content-center" >
          <Col xs={12} sm={6} md={4} className="text-center">
            <Card bg="dark" variant="dark" text="light" style={{  margin: "10px", width: '18rem', paddingTop: "10px"}}>
              <Card.Img variant="dark" src="/src/cw2.png" />
              <Card.Body>
                <Card.Title className={styles.title}>Dissinfectant Pocket</Card.Title>
                <Card.Text className={styles.text}>
                  Clean Wallet is a transparent wallet with a pocket on its surface that consists of disinfectant. With disinfectant whenever we hold the money we can clean our hands after we put or take it out from the wallet.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card bg="dark" variant="dark" text="light" style={{  margin: "10px", width: '18rem', paddingTop: "10px"}}>
              <Card.Img variant="dark" src="/src/cw4.png" />
              <Card.Body>
                <Card.Title className={styles.title}>Credit Card Stick</Card.Title>
                <Card.Text className={styles.text}>
                  Clean Wallet’s another feature is the credit card stick. On the clean wallet there is a telescopic stick consisting of concentric tubular sections designed to slide into one another. On the tip of the stick there is a clip for credit cards to be attached. We take the credit card out of the wallet and attach it to the clip on the stick, then we pull and stretch it out and it goes with the credit card to the POS machine. Which provides us to keep our social distance.
                </Card.Text>
              </Card.Body>
            </Card>

          </Col>

          <Col xs={12} sm={6} md={4} className="text-center">
            <Card bg="dark" variant="dark" text="light" style={{ margin: "10px", width: '18rem', paddingTop: "10px"}}>
              <Card.Img variant="dark" src="/src/cw7.png" />
              <Card.Body>
                <Card.Title className={styles.title}>Phone Case</Card.Title>
                <Card.Text className={styles.text}>
                  The wallet is designed as a phone case, compactness of the wallet allows the user don't need anything else while going out.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card bg="dark" variant="dark" text="light" style={{ margin: "10px", width: '18rem', paddingTop: "10px"}}>
              <Card.Img variant="dark" src="/src/cw8.jpg" />
              <Card.Body>
                <Card.Title className={styles.title}>Finger Gloves</Card.Title>
                <Card.Text className={styles.text}>
                  There are two finger gloves attached to the Clean Wallet like a keychain. These finger gloves are for holding the money and credit card if don’t want to touch it, this way the chance of infection will decrease even more.
                </Card.Text>
              </Card.Body>
            </Card>

          </Col>

          <Col xs={12} sm={6} md={4} className="text-center">
            <Card bg="dark" variant="dark" text="light" style={{ margin: "10px", width: '18rem', paddingTop: "10px"}}>
              <Card.Img variant="dark" src="/src/cw6.jpg" />
              <Card.Body>
                <Card.Title className={styles.title}>Transparency</Card.Title>
                <Card.Text className={styles.text}>
                  The clean wallet is transparent which allows the uv rays of the Sun go through inside the wallet and kill the bacteria on the banknotes.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card bg="dark" variant="dark" text="light" style={{ margin: "10px",  width: '18rem', paddingTop: "10px"}}>
              <Card.Body>
                <Card.Title className={styles.title}>Details of the Design</Card.Title>
                <Card.Text className={styles.text}>
                  The clean wallet designed using Fusion 360 and will be implemented with a 3D printer. The design consists of 2 parts ; the wallet and 2 finger gloves. The clean wallet is a folding transparent object. The object has two lids. One lid’s top consists of a pocket for the disinfectant and telescopic stick. Other lid is the base lid , it can be used with an attached phone case if wanted. Inside the wallet , in the base lid there are 2 pockets for banknotes and credit cards. Two lids are connected to each other with a hinged socket.The disinfectant pocket is designed for easy to use. As its material is stretchy, 30 to 50 ml bottle of disinfectant will easily fit in the pocket.
                  The finger gloves are designed for two fingers to hold the money, it can be resized according to finger size of the user. The parameters of the wallet are; length is 140mm, height is 10mm, depth is 68mm. The size can be modified according to the phone size of the user because the phone case is attached tı the bottom of the wallet.The gloves will be attached to the wallet with keychain, hence they won’t be lost and usable for anytime.
                </Card.Text>
              </Card.Body>
            </Card>

          </Col>
        </Row>


      </div>


      


      </main>


    <Footer/>
      
    </div>
  )
}