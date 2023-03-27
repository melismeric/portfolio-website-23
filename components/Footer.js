import styles from '../styles/Header.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EnvelopeFill, Github, Linkedin } from 'react-bootstrap-icons';
import Link from 'next/link'


export default function Footer() {
  return (
    <>
    <div style={{ display: "flex", margin: "auto", flexDirection: "row", justifyContent: "center", gap: "10px", paddingTop: "10px"}}>
      <a href="mailto:zmelismeric@gmail.com">
        <EnvelopeFill 
        size={40} color="#FFF8E6"/>
      </a>

      <Link href="https://github.com/melismeric">
        <Github 
        size={40} color="#FFF8E6" />

      </Link>

      <Link href="https://www.linkedin.com/in/zeynep-melis-meri%C3%A7-04b481172/">
        <Linkedin 
        size={40} 
        color="#FFF8E6"/>
      </Link>
    </div>
   

    </>
  )
}