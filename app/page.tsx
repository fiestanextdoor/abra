import { getArtists } from '@/lib/spotify';
import { HomeClient } from '@/components/HomeClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const artists = await getArtists();
  return <HomeClient artists={artists} />;
}
