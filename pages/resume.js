import Head from 'next/head'
import styles from '../styles/aboutme.module.css';
import Header from '../components/Header'
import * as THREE from "three";
import { useRef, useEffect } from "react";
import Footer from '../components/Footer'
import { Image } from 'cloudinary-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Link from 'next/link'


export default function Home() {
  return (
  <div className={styles.page}>
      <Header/>
        <iframe width="1200" height="1000" src='./src/melismeric%CC%A7_cv.pdf' />
      <Footer/>
    </div>
  )
}