import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Heart, CheckCircle2, LayoutGrid, Image as ImageIcon } from 'lucide-react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firebase-errors';

interface Photo {
  id: string;
  url: string;
  isApproved: boolean;
}

export function ClientGalleryView({ gallery, onLogout }: { gallery: any, onLogout: () => void }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const photosRef = collection(db, 'client_galleries', gallery.id, 'photos');
    
    const unsubscribe = onSnapshot(photosRef, (snapshot) => {
      const fetchedPhotos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Photo[];
      setPhotos(fetchedPhotos);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, `client_galleries/${gallery.id}/photos`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [gallery.id]);

  const toggleApproval = async (photoId: string, currentStatus: boolean) => {
    try {
      const photoRef = doc(db, 'client_galleries', gallery.id, 'photos', photoId);
      await updateDoc(photoRef, {
        isApproved: !currentStatus
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `client_galleries/${gallery.id}/photos/${photoId}`);
    }
  };

  const approvedCount = photos.filter(p => p.isApproved).length;

  return (
    <section className="min-h-screen bg-brand-cream text-brand-black pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-black/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="font-bold tracking-widest uppercase text-sm md:text-base">
            {gallery.clientName}
          </h1>
          <span className="hidden md:inline-block px-3 py-1 bg-brand-cream/5 rounded-full text-[10px] font-bold uppercase tracking-widest">
            {gallery.eventName}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-brand-black/70 font-bold text-xs">
            <Heart size={14} className="text-brand-yellow" fill="currentColor" />
            <span>{approvedCount} / {photos.length}</span>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-brand-black/70 hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-widest"
          >
            <LogOut size={16} />
            <span className="hidden md:inline">Sair</span>
          </button>
        </div>
      </header>

      {/* Cover */}
      {gallery.coverImage && (
        <div className="w-full h-[40vh] md:h-[50vh] relative">
          <img src={gallery.coverImage} alt="Capa da Galeria" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-cream" />
          <div className="absolute bottom-10 left-6 md:left-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-shadow-elegant mb-2">{gallery.eventName}</h2>
            <p className="text-brand-black/70 font-bold uppercase tracking-widest text-sm">Selecione suas fotos favoritas</p>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="max-w-[1600px] mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold text-xl tracking-tight flex items-center gap-2">
            <LayoutGrid size={20} />
            Todas as Fotos
          </h3>
        </div>

        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-brand-black/10 border-t-brand-yellow rounded-full animate-spin"></div>
          </div>
        ) : photos.length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center text-brand-black/50">
            <ImageIcon size={48} className="mb-4 opacity-50" />
            <p className="font-bold uppercase tracking-widest text-sm mb-2">Nenhuma foto disponível</p>
            <p className="text-xs max-w-sm">As fotos deste ensaio ainda não foram disponibilizadas ou estão sendo processadas.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            <AnimatePresence>
              {photos.map((photo, i) => (
                <motion.div 
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                  onClick={() => toggleApproval(photo.id, photo.isApproved)}
                >
                  <img src={photo.url} alt="Foto" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  
                  <div className={`absolute inset-0 transition-colors duration-300 ${photo.isApproved ? 'bg-brand-cream/20' : 'bg-transparent group-hover:bg-brand-cream/10'}`} />
                  
                  <div className="absolute top-3 right-3">
                    <button 
                      className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                        photo.isApproved 
                          ? 'bg-brand-yellow text-brand-black scale-110 shadow-lg' 
                          : 'bg-brand-cream/50 text-brand-black/50 hover:bg-brand-cream hover:text-brand-black hover:scale-110'
                      }`}
                    >
                      {photo.isApproved ? <CheckCircle2 size={24} /> : <Heart size={20} />}
                    </button>
                  </div>

                  {photo.isApproved && (
                    <div className="absolute bottom-0 left-0 w-full bg-brand-yellow py-2 text-center text-[10px] font-bold uppercase tracking-widest text-brand-black">
                      Selecionada
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
