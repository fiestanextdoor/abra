import { getArtists } from '@/lib/spotify';
import { HomeClient } from '@/components/HomeClient';

export default async function Home() {
  const artists = await getArtists();
  return <HomeClient artists={artists} />;
}
