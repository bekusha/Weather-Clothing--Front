import './App.css'
import Footer from './components/Footer'
import Map from './components/Map'

function App() {

  return (
    <div className="appContainer">
      <div className="App">
        <div className='headersContainer'>
          <p className="appHeaders">
            Select a location on the map to receive a detailed <br /> <span style={{ color: "#a78bfa" }}>weather forecast</span>.
          </p>
          <p className="appHeaders">
            Planning an outdoor trip? Get reliable weather insights in advance and make informed decisions for a safe and enjoyable experience.
          </p>
        </div>
        <div className='mapContainer'>
          <Map />
        </div>

      </div>
      <div className='footerContainer'>
        <Footer />
      </div>
    </div>
  )
}

export default App
