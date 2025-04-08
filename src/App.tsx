import './App.css'
import Footer from './components/Footer'
import Map from './components/Map'

function App() {

  return (
    <div className="appContainer">
      <div className="App">
        {/* APP HEADERS */}
        <div className='headersContainer'>
          <p className="appHeaders">
            Click anywhere on the map to receive a <span style={{ color: "#a78bfa" }}>5-day weather forecast</span>.
          </p>
          <p className="appHeaders">
            Let <span style={{ color: "#a78bfa" }}>AI</span> help you pack and plan your outdoor adventure.
          </p>
        </div>
        {/* MAP COMPONENT */}
        <div className='mapContainer'>
          <Map />
        </div>
      </div>
      {/* FOOTER */}
      <div className='footerContainer'>
        <Footer />
      </div>
    </div>
  )
}

export default App
