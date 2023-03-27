import styles from '../styles/Header.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link'


export default function Header() {
  return (
    <>
    <Navbar sticky="top" className="w-100 p-3" expand="md">
     <Container>
        <Link className={styles.title} style={{textAlign: 'right', color:  "#FFF8E6"}} href="/">Melis Meriç</Link>
      </Container>
    </Navbar>
    </>
  )
}
