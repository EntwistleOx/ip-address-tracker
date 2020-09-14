import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Arrow from '../components/Icons/Arrow';
import MapLoading from '../components/MapLoading';

const DynamicComponentWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <MapLoading />,
});

const Home = ({ data }) => {
  const [geo, setGeo] = useState(false);
  const [ipError, setIpError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    console.log(data);
    async function fetchData() {
      const res = await fetch(`https://json.geoiplookup.io/`);
      const data2 = await res.json();
      console.log(data2);
      setGeo(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleChange = () => {
    setIpError(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const ip = e.target.ip.value;
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ip,
      )
    ) {
      setLoading(true);
      const res = await fetch(`api/geo/${ip}`);
      const data = await res.json();
      setGeo(data);
      setLoading(false);
    } else {
      setIpError(true);
    }
  };

  return (
    <>
      <Head>
        <meta
          http-equiv='Content-Security-Policy'
          content='upgrade-insecure-requests'
        />

        <title>IP Address Tracker</title>
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
      </Head>
      <header className='pattern'>
        <div className='tracker'>
          <h1>IP Address Tracker</h1>
          <form className='search' onSubmit={onSubmit}>
            <div className='formContainer'>
              <input
                type='text'
                name='ip'
                placeholder='Search for any IP address or domain'
                required
                onChange={handleChange}
              />
              <button type='submit'>
                <Arrow />
              </button>
              {ipError && <small className='error'>Invalid IP Address!</small>}
            </div>
          </form>

          <div className='card'>
            <div className='info'>
              <h2 className='title'>IP ADDRESS</h2>
              <p className='data'>
                {loading ? <Skeleton width={'90%'} /> : geo.query}
              </p>
            </div>
            <div className='info'>
              <h2 className='title'>LOCATION</h2>
              <p className='data'>
                {loading ? (
                  <Skeleton width={'90%'} />
                ) : (
                  `${geo.city}, ${geo.regionName} ${geo.zip}`
                )}
              </p>
            </div>
            <div className='info visible'>
              <h2 className='title'>TIMEZONE</h2>
              <p className='data'>
                {loading ? <Skeleton width={'90%'} /> : geo.timezone}
              </p>
            </div>
            <div className='info visible'>
              <h2 className='title'>ISP</h2>
              <p className='data'>
                {loading ? <Skeleton width={'90%'} /> : geo.isp}
              </p>
            </div>
          </div>
        </div>
      </header>
      {loading ? (
        <MapLoading />
      ) : (
        <DynamicComponentWithNoSSR position={[geo.lat, geo.lon]} zoom={28} />
      )}
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(`http://ip-api.com/json/`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Home;
