import { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ClientGalleryView } from './ClientGalleryView';
import { handleFirestoreError, OperationType } from '../lib/firebase-errors';

export function ClientPortal({ setView }: { setView: (view: string) => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [galleryData, setGalleryData] = useState<any>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!pin.trim()) {
      setError('Por favor, insira o seu código de acesso.');
      return;
    }

    setIsLoading(true);
    try {
      const docRef = doc(db, 'client_galleries', pin.trim());
      const docSnap = await getDocFromServer(docRef);
      
      if (docSnap.exists()) {
        setGalleryData({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError('Código de acesso inválido ou galeria não encontrada.');
      }
    } catch (err: any) {
      if (err instanceof Error && err.message.includes('the client is offline')) {
        setError('Erro de conexão. Verifique sua internet.');
      } else {
        // Log the error but show a generic message to the user for security
        try {
          handleFirestoreError(err, OperationType.GET, `client_galleries/${pin.trim()}`);
        } catch(e) {}
        setError('Erro ao acessar a galeria. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (galleryData) {
    return <ClientGalleryView gallery={galleryData} onLogout={() => setGalleryData(null)} />;
  }

  return (
    <section className="min-h-[80vh] bg-brand-cream text-brand-black flex flex-col justify-center items-center p-6 relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg bg-brand-cream rounded-3xl p-10 md:p-14 border border-brand-black/10 shadow-2xl"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-brand-yellow/10 text-brand-yellow flex items-center justify-center rounded-full">
            <Lock size={32} />
          </div>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-center mb-2">Área do Cliente</h2>
        <p className="text-center text-brand-black/70 text-sm mb-10">Acesse suas galerias exclusivas e arquivos em alta resolução.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-black/70 mb-3 text-center">Código de Acesso (PIN)</label>
            <input 
              type="text" 
              placeholder="Ex: casamentomaria" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-brand-cream border border-brand-black/10 rounded-xl p-4 text-center text-2xl tracking-widest focus:outline-none focus:border-brand-yellow transition-colors text-brand-black" 
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                className="text-red-500 text-sm text-center font-bold"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-yellow text-black hover:bg-brand-cream hover:text-brand-black p-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-colors flex items-center justify-center disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Acessar Galeria'}
          </button>
          <button 
            type="button"
            onClick={() => setView('home')}
            className="w-full bg-transparent text-brand-black/70 hover:text-brand-black p-4 font-bold text-xs uppercase tracking-widest transition-colors"
          >
            Voltar ao Site
          </button>
        </form>
      </motion.div>
    </section>
  );
}
