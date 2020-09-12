import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';

const DynamicComponentWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <p>...</p>,
});

const Home = ({ data }) => {
  const [geo, setGeo] = useState(false);

  useEffect(() => {
    setGeo(data);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const ip = e.target.ip.value;
    const res = await fetch(`http://localhost:3000/api/geo/${ip}`);
    const data = await res.json();
    console.log(data);
    setGeo(data);
  };

  console.log(geo);

  return (
    <div>
      <Head>
        <title>IP Address Tracker</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1>IP Address Tracker</h1>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            name='ip'
            placeholder='Search for any IP address or domain'
          />
          <button type='submit'>{'>'}</button>
        </form>
        {!geo ? (
          'Loading...'
        ) : (
          <Fragment>
            <div>IP ADDRESS: {geo.ip}</div>
            <div>
              LOCATION: {geo.location.city}, {geo.location.region} <br />
              {geo.location.postalCode}
            </div>
            <div>TIMEZONE: {geo.location.timezone}</div>
            <div>ISP: {geo.isp}</div>
            <DynamicComponentWithNoSSR
              position={[geo.location.lat, geo.location.lng]}
              zoom={28}
            />
          </Fragment>
        )}
      </main>
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(` http://localhost:3000/api/geo`);
  const data = await res.json();

  return { props: { data } };
}

export default Home;
