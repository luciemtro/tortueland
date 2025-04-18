import Game from "../components/Game";
import ScoreTable from "../components/ScoreTable";

export default function GamePage() {
  return (
    <main className="p-6 bg-[url('/images/ringbox.png')] bg-cover">
      <Game />
      <ScoreTable />
    </main>
  );
}
