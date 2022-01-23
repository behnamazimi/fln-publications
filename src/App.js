import PublicationsPage from "./components/PublicationsPage";
import Navbar from "./components/Navbar";
import useAuth from "./hooks/use-auth";

function App() {
  useAuth()

  return (
      <div data-testid={"app"}>
        <Navbar/>

        <PublicationsPage/>
      </div>
  );
}

export default App;
