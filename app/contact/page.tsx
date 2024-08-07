import type { NextPage } from 'next';
import Head from 'next/head';
import FormContact from '../components/FormContact';
import Navbar from '../components/Navigation/Navbar';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Contact Us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <FormContact />
      </main>
    </div>
  );
};

export default Home;