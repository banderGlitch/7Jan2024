import ConnectButton from '../common/ConnectButton';

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        W3W
      </h1>
      <ConnectButton />
    </nav>
  );
}