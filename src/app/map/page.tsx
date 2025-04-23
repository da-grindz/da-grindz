import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

export default function MapPage() {
  return (
    <main style={{ height: '100vh' }}>
      <Map />
    </main>
  );
}
