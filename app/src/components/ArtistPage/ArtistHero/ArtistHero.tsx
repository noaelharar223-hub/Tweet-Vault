import '../../shared/CornerBrackets.css';
import './ArtistHero.css';

export function ArtistHero({
  onScrollToList,
  onOpenHome,
}: {
  onScrollToList: () => void;
  onOpenHome: () => void;
}) {
  return (
    <>
      <button className="artist-logo-btn" type="button" aria-label="Back to home page" onClick={onOpenHome}>
      <svg className="artist-logo" viewBox="0 0 146 11.0001" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Tweet Vault.">
        <path d="M13.2958 0.153004V2.49244H8.03933V10.9981H5.25648V2.49244H0V0.153004H13.2958Z" fill="white" />
        <path
          d="M33.6443 0.153004H36.659L32.392 10.9981H28.5424L25.3576 2.83329L22.1573 10.9981H18.3232L14.0561 0.153004H17.0554L20.2557 8.67413L23.6415 0.153004H27.0582L30.4595 8.68962L33.6443 0.153004Z"
          fill="white"
        />
        <path
          d="M48.7511 2.3685H40.0934V4.5685H48.7511V6.58258H40.0934V8.78258H48.7511V10.9981H37.3105V0.153004H48.7511V2.3685Z"
          fill="white"
        />
        <path
          d="M61.2069 2.3685H52.5491V4.5685H61.2069V6.58258H52.5491V8.78258H61.2069V10.9981H49.7663V0.153004H61.2069V2.3685Z"
          fill="white"
        />
        <path d="M75.2727 0.153004V2.49244H70.0162V10.9981H67.2333V2.49244H61.9769V0.153004H75.2727Z" fill="white" />
        <path d="M93.9273 5.66214e-05H97.0502L91.4845 10.8451H87.6813L82.1156 5.66214e-05H85.2386L89.5829 8.78456L93.9273 5.66214e-05Z" fill="white" />
        <path
          d="M104.965 10.8451L103.805 8.53668H97.3275L96.168 10.8451H93.1069L98.688 5.66214e-05H102.445L108.041 10.8451H104.965ZM98.3634 6.46062H102.77L100.574 2.06062L98.3634 6.46062Z"
          fill="white"
        />
        <path
          d="M121.27 5.4071C121.27 9.17189 119.214 11.0001 114.467 11.0001C109.706 11.0001 107.665 9.18738 107.665 5.4071V5.66214e-05H110.448V5.4071C110.448 6.92541 110.865 8.66062 114.467 8.66062C118.07 8.66062 118.487 6.90992 118.487 5.4071V5.66214e-05H121.27V5.4071Z"
          fill="white"
        />
        <path d="M125.213 8.50569H133.562V10.8451H122.431V5.66214e-05H125.213V8.50569Z" fill="white" />
        <path d="M143.996 5.66214e-05V2.33949H138.74V10.8451H135.957V2.33949H130.701V5.66214e-05H143.996Z" fill="white" />
        <path d="M143.356 8.76907H146V10.8451H143.356V8.76907Z" fill="white" />
      </svg>
      </button>

      <div className="artist-hero">
        <svg className="artist-title" viewBox="0 0 235.188 114.02" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Kanye West">
          <path d="M0 0H11.135V20.23H17.34L28.22 0H40.12L26.265 25.245L40.12 51H28.22L17.34 30.43H11.135V51H0V0Z" fill="white" />
          <path
            d="M89.4182 28.05V51H78.5382V35.87H60.4332V51H49.5532V28.05L57.5432 0H81.4282L89.4182 28.05ZM61.2832 26.095H77.6032L73.0132 9.945H65.8732L61.2832 26.095Z"
            fill="white"
          />
          <path d="M99.0214 0H112.026L127.836 21.845V0H138.631V51H127.836V39.44L109.816 14.79V51H99.0214V0Z" fill="white" />
          <path d="M146.62 0H158.095L168.295 20.995L178.41 0H189.885L173.99 32.13V51H162.77V32.3L146.62 0Z" fill="white" />
          <path d="M200.083 0H235.188V9.86H211.218V20.145H230.853V30.005H211.218V41.14H235.188V51H200.083V0Z" fill="white" />
          <path d="M18.0366 62H28.4066L33.0816 98.21L38.8616 72.115H49.8266L55.6066 98.295L60.2816 62H70.5666L63.7666 113H49.7416L44.3016 88.86L38.9466 113H25.0066L18.0366 62Z" fill="white" />
          <path d="M78.6748 62H113.78V71.86H89.8098V82.145H109.445V92.005H89.8098V103.14H113.78V113H78.6748V62Z" fill="white" />
          <path
            d="M124.688 76.28C124.688 67.1 131.658 61.065 143.728 61.065C155.543 61.065 163.193 66.59 163.193 77.64H152.058C152.058 72.71 148.828 70.67 143.558 70.67C138.543 70.67 135.823 72.625 135.823 75.855C135.823 85.63 163.958 78.915 163.958 98.72C163.958 108.24 156.648 114.02 143.898 114.02C131.573 114.02 124.178 108.41 124.178 97.36H135.313C135.313 102.035 138.373 104.415 144.238 104.415C149.848 104.415 152.823 102.29 152.823 98.805C152.823 88.775 124.688 95.49 124.688 76.28Z"
            fill="white"
          />
          <path d="M211.501 62V71.945H197.646V113H186.511V71.945H172.486V62H211.501Z" fill="white" />
        </svg>

        <div className="artist-photo-wrap corner-brackets">
          <img src="/kanye-artist-hero.png" alt='Kanye West at a concert, with a fan holding a "Ye is not crazy" sign in the crowd' />
        </div>

        <p className="artist-bio">
          A groundbreaking artist and fashion mogul. Known for erratic, unfiltered social media sprees. This archive preserves the raw digital
          footprint behind his biggest cultural and financial fallouts
        </p>
      </div>

      <button className="artist-scroll-btn" type="button" aria-label="Scroll to tweets" onClick={onScrollToList}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="#0e1016" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
