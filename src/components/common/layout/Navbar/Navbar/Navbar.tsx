import NavbarMobile from '../NavbarMobile/NavbarMobile';
import NavbarDesktop from '../NavbarDesktop/NavbarDesktop';

function App() {
  // Detecta el tamaño de la pantalla aquí y decide cuál Navbar renderizar
  const isMobile = window.innerWidth < 768; // Puedes ajustar el valor según tus necesidades

  return (
    <div className="app">
      {isMobile ? <NavbarMobile /> : <NavbarDesktop />}
      {/* Resto de tu contenido de la aplicación */}
    </div>
  );
}

export default App;
