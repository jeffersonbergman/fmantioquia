import { useEffect, useState } from 'react';
import SectionTitle from '../components/UI/SectionTitle';
import { supabase } from '../lib/supabaseClient';

interface GalleryItem {
  id: string;
  url: string;
}

const GalleryPage = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('images')
        .select('id, url');

      if (error) {
        setError(error.message);
      } else if (data) {
        setImages(data as GalleryItem[]);
      }
      setLoading(false);
    };

    fetchImages();

    // Para escutar uploads no Storage, use on('storage') do channel correto
    // Porém, Supabase v2 não expõe diretamente eventos storage via realtime
    // Alternativa: escute inserções na tabela images via postgres_changes, já que você insere lá após upload
    const subscription = supabase
      .channel('public:images')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'images' },
        (payload: any) => {
          console.log('Nova imagem inserida na tabela:', payload.new);
          setImages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const prevImage = () =>
    setCurrentImage((currentImage - 1 + images.length) % images.length);

  const nextImage = () =>
    setCurrentImage((currentImage + 1) % images.length);

  if (loading)
    return (
      <div className="text-center py-8 text-gray-500">Carregando galeria...</div>
    );
  if (error)
    return (
      <div className="text-center py-8 text-red-500">{error}</div>
    );
  if (images.length === 0)
    return (
      <div className="text-center py-8 text-gray-500">Nenhuma imagem disponível.</div>
    );

  return (
    <>
      {/* Gallery Header */}
      <section className="pt-32 pb-16 bg-secondary text-white">
        <div className="container">
          <SectionTitle
            title="Galeria de Fotos"
            subtitle="Relembre os melhores momentos do Festival de Música Antioquia."
            centered
            light
          />
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div
                key={img.id}
                className="relative overflow-hidden rounded-lg group cursor-pointer"
                onClick={() => openLightbox(index)}
                data-aos="fade-up"
                data-aos-delay={(index % 4) * 100}
              >
                <img
                  src={img.url}
                  alt="Foto da galeria"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center">
            <img
              src={images[currentImage].url}
              alt=""
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={closeLightbox}
            >
              ×
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              ‹
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryPage;
