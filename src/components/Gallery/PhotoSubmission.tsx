import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface GalleryItem {
  id: string;
  url: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('images')
        .select('id, url');

      if (error) {
        console.error('Erro ao carregar imagens:', error.message);
        setError(error.message);
      } else {
        setImages(data as GalleryItem[]);
      }
      setLoading(false);
    };

    fetchImages();
  }, []);

  if (loading) return <div className="text-center py-8 text-gray-500">Carregando galeria...</div>;
  if (error)   return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!images.length) return <div className="text-center py-8 text-gray-500">Nenhuma imagem disponível.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {images.map(img => (
        <div key={img.id} className="rounded-lg shadow hover:shadow-lg transition">
          <img
            src={img.url}
            alt="Foto da galeria"
            className="w-full h-64 object-cover rounded-t-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
