
'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '../../components/Loader'; 


const Homee = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get('/api/admin/home');
        setHomeData(response.data);
      } catch (err) {
        setError('Failed to fetch home data');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <Loader />;  // Display loader while loading
  if (error) return <p>{error}</p>;

const auto = "100"

const height = "100"
  return (
   
    <>
<header>

    <div className="section__container header__container" id="home">
      <div className="header__image">
      {homeData.imageUrl && <Image height={height} width={auto} src={homeData.imageUrl} alt="Home Image" />}
      </div>
      <div className="header__content">
        <h1> {homeData.subtitle1} <span className="yollow"> {homeData.subtitle2} </span> {homeData.subtitle3}</h1>
        <p>
        {homeData.subtitle4}
        </p>
        <div className="header__links">
          <Link href="/register">
              <button className="btn2">Register</button>
            
          </Link>
          <Link href="/login">
              <button className="btn2">Login</button>
           
          </Link>
        </div>
      </div>
    </div>
  </header>
  <section className="section__container steps__container" id="rent">
     
  <div className="steps__grid1 steps__gri">



<div className="steps__div"> <p className="section__subheader">{homeData.subtitle5}</p>
<h2 className="section__header">{homeData.subtitle6}</h2></div>


    <div className="steps__card1">
     
      <li><a className="btn2" href="#login">{homeData.subtitle7}</a></li>
    </div>

    <div className="steps__card1">
      
      <li><a className="btn2" href="#login">{homeData.subtitle8}</a></li>
    </div>

    <div className="steps__card1">
      <li><a className="btn2" href="#login">{homeData.subtitle9}</a></li>
    </div>

    <div className="steps__card1">
      <li><a className="btn2" href="#login">{homeData.subtitle10}</a></li>
    </div>

    <div className="steps__card1">
     
      <li><a className="btn2" href="#login">{homeData.subtitle11}</a></li>
    </div>

    <div className="steps__card1">
      
      <li><a className="btn2" href="#login">{homeData.subtitle12}</a></li>
    </div>

    <div className="steps__card1">
      <li><a className="btn2" href="#login">{homeData.subtitle13}</a></li>
    </div>

    <div className="steps__card1">
      <li><a className="btn2" href="#login">{homeData.subtitle14}</a></li>
    </div>

    <div className="steps__card1">
      <li><a className="btn2" href="#login">{homeData.subtitle15}</a></li>
    </div>

    <div className="steps__card1">
      <li><a className="btn2" href="#login">{homeData.subtitle16}</a></li>
    </div>
    <div className="steps__card1">
      <li><a className="btn2" href="#login">{homeData.subtitle17}</a></li>
    </div>


    <div className="steps__card1">
      <li><a className="btn2" href="#login">{homeData.subtitle18}</a></li>
    </div>

  </div>
</section>

<section className="section__container steps__container" id="rent">
  <p className="section__subheader">{homeData.subtitle19}</p>
  <h2 className="section__header">{homeData.subtitle20}</h2>
  <div className="steps__grid">
    <div className="steps__card">
      <span><i className="ri-map-pin-fill"></i></span>
      <h4>{homeData.subtitle21}</h4>
      <p>
      {homeData.subtitle22}
      </p>
    </div>
    <div className="steps__card">
      <span><i className="ri-calendar-check-fill"></i></span>
      <h4>{homeData.subtitle23}</h4>
      <p>
      {homeData.subtitle24}
      </p>
    </div>
    <div className="steps__card">
      <span><i className="ri-bookmark-3-fill"></i></span>
      <h4>{homeData.subtitle25}</h4>
      <p>
      {homeData.subtitle26}
      </p>
    </div>
  </div>
</section>

<section className="section__container service__container" id="service">
  <div className="service__image">
  {homeData.imageUrl && <Image src={homeData.imageUrl2} alt="Home Image" width={auto}  height={height} />}
  </div>
  <div className="service__content">
    <p className="section__subheader">{homeData.subtitle27}</p>
    <h2 className="section__header">
     <span className="yollow">{homeData.subtitle28}</span> {homeData.subtitle29}
    </h2>
    <ul className="service__list">
      <li>
        <span><i className="ri-price-tag-3-fill"></i></span>
        <div>
          <h4>{homeData.subtitle30}</h4>
          <p>
          {homeData.subtitle31}
          </p>
        </div>
      </li>
      <li>
        <span><i className="ri-wallet-fill"></i></span>
        <div>
          <h4>{homeData.subtitle32} </h4>
          <p>
          {homeData.subtitle33}
          </p>
        </div>
      </li>
      <li>
        <span><i className="ri-customer-service-fill"></i></span>
        <div>
          <h4>{homeData.subtitle34}</h4>
          <p>
          {homeData.subtitle35}
          </p>
        </div>
      </li>
    </ul>
  </div>
</section>

<section className="section__container experience__container" id="ride">
  <p className="section__subheader">{homeData.subtitle36}</p>
  <h2 className="section__header">
  {homeData.subtitle37}
  </h2>
  <div className="experience__content">
    <div className="experience__card">
      <span><i className="ri-price-tag-3-fill"></i></span>
      <h4>{homeData.subtitle38}</h4>
    </div>
    <div className="experience__card">
      <span><i className="ri-money-rupee-circle-fill"></i></span>
      <h4>{homeData.subtitle39}</h4>
    </div>
    <div className="experience__card">
      <span><i className="ri-bank-card-fill"></i></span>
      <h4>{homeData.subtitle40}</h4>
    </div>
    <div className="experience__card">
      <span><i className="ri-award-fill"></i></span>
      <h4>{homeData.subtitle41}</h4>
    </div>
    <div className="experience__card">
      <span><i className="ri-customer-service-2-fill"></i></span>
      <h4>{homeData.subtitle42}</h4>
    </div>
    <div className="experience__card">
      <span><i className="ri-car-fill"></i></span>
      <h4>{homeData.subtitle43}</h4>
    </div>
    {homeData.imageUrl && <Image src={homeData.imageUrl3} alt="Home Image" width={auto} height={height} />}
   {/*<img src="assets/experience.png" alt="experience" />*/}
  </div>
</section>

<section className="section__container download__container" id="contact">
  <div className="download__grid">
    <div className="download__content">
      <h2 className="section__header">{homeData.subtitle44}</h2>
      <p>
      {homeData.subtitle45}
      </p>
      <div className="download__links">
        <a href="#">
          <Image width={auto} height={height} src="/assets/store.jpg" alt="app store" />
        </a>
        <a href="#">
          <Image width={auto} height={height} src="/assets/play.png" alt="play" />
        </a>
      </div>
    </div>
    <div className="download__image">
    {homeData.imageUrl && <Image src={homeData.imageUrl4} alt="Home Image"  width={auto} height={height} />}

     {/* <img src="./img/card.png" alt="download" /> */}
    </div>
  </div>
</section>

<footer className="footer">
  <div className="section__container footer__container">
    <div className="footer__col">
      <h4>Our Products</h4>
      <ul className="footer__links">
        <li><a href="#">Career</a></li>
        <li><a href="#">Job</a></li>
        <li><a href="#">Join pathner program</a></li>
        <li><a href="#">team</a></li>
        <li><a href="#">Features</a></li>
        <li><a href="#">contact</a></li>
      </ul>
    </div>

    <div className="footer__col">
      <h4>About website</h4>
      <ul className="footer__links">
        <li><a href="#">Why Forver</a></li>
        <li><a href="#">Our Story</a></li>
        <li><a href="#">Investors</a></li>
        <li><a href="#">Press Centers</a></li>
        <li><a href="#">Advertises</a></li>
      </ul>
    </div>
    <div className="footer__col">
      <h4>Resources</h4>
      <ul className="footer__links">
        <li><a href="#">Download</a></li>
        <li><a href="#">Help Centers</a></li>
        <li><a href="#">Guides</a></li>
        <li><a href="#">Partner Network</a></li>
        <li><a href="#">Mechanics</a></li>
        <li><a href="#">Developer</a></li>
      </ul>
    </div>
    <div className="footer__col">
      <h4>Extras</h4>
      <ul className="footer__links">
        <li><a href="#">Forver </a></li>
        <li><a href="#">Addrss</a></li>
        <li><a href="#">Numbar</a></li>
        <li><a href="#">Hire Companies</a></li>
        <li><a href="#">New Offers</a></li>
      </ul>
    </div>
  </div>
  <div className="section__container footer__bar">
    <h4>forver</h4>
    <p>{homeData.subtitle46}</p>
    <ul className="footer__socials">
      <li>
        <a href="#"><i className="ri-facebook-fill"></i></a>
      </li>
      <li>
        <a href="#"><i className="ri-twitter-fill"></i></a>
      </li>
      <li>
        <a href="#"><i className="ri-google-fill"></i></a>
      </li>
    </ul>
  </div>
</footer>


    </>
  )
}

export default Homee;
