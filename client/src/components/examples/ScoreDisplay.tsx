import ScoreDisplay from '../ScoreDisplay';

export default function ScoreDisplayExample() {
  return (
    <div className="space-y-4 max-w-md">
      <ScoreDisplay 
        team="India" 
        score={287} 
        wickets={4} 
        overs={45.2} 
        isWinning={true}
      />
      <ScoreDisplay 
        team="Australia" 
        score={156} 
        wickets={8} 
        overs={32.4} 
        isWinning={false}
      />
    </div>
  );
}