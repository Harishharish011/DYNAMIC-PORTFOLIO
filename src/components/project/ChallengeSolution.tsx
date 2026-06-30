export function ChallengeSolution({
  challenges,
  solutions,
}: {
  challenges: string[];
  solutions: string[];
}) {
  return (
    <div className="bbChallengeSolution">
      <div className="bbChallengeSolutionCol">
        <div className="bbCSLabel">Challenges</div>
        <ul className="bbCSList">
          {challenges.map((c, idx) => (
            <li key={idx} className="bbCSItem">
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="bbChallengeSolutionCol">
        <div className="bbCSLabel">Solutions</div>
        <ul className="bbCSList">
          {solutions.map((s, idx) => (
            <li key={idx} className="bbCSItem">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
