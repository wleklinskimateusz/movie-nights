import "./App.css";
import { AddMovie } from "./components/AddMovie";
import { MoviesTable } from "./components/MoviesTable";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <main>
      <AddMovie />
      <MoviesTable />
      <Toaster />
    </main>
  );
}

export default App;
