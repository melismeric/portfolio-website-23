import styles from '../styles/Header.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Link from 'next/link'


export default function Header() {
  return (
    <>
          <Navbar sticky="top" className="bg-body-tertiary" expand="md">
     <Container>
        <Link className={styles.title} href="/">Melis Meriç</Link>
      </Container>
    </Navbar>
    </>
  )
}
