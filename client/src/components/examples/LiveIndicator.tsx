import LiveIndicator from '../LiveIndicator';

export default function LiveIndicatorExample() {
  return (
    <div className="space-y-4 p-4">
      <LiveIndicator isLive={true} />
      <LiveIndicator isLive={false} />
    </div>
  );
}