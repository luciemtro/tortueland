import Game from "../components/Game";
import ScoreTable from "../components/ScoreTable";

export default function GamePage() {
  return (
    <main className="p-6">
      <Game />
      <ScoreTable />
    </main>
  );
}
