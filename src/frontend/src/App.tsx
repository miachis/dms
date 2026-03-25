import { About } from "./components/About";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { GetStarted } from "./components/GetStarted";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <main>
      <Navbar />
      <GetStarted />
      <About />
      <Features />
      <Footer />
    </main>
  );
}

export default App;
