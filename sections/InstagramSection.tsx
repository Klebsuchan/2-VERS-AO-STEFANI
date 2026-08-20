import { motion } from 'motion/react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

const INSTA_POSTS = [
  { id: 1, img: "/imsgensfoto_1.jpeg?v=2", likes: 342, comments: 12 },
  { id: 2, img: "/imsgensfoto_2.jpeg?v=2", likes: 256, comments: 8 },
  { id: 3, img: "/imsgensfoto_3.jpeg?v=2", likes: 412, comments: 24 },
  { id: 4, img: "/imsgensfoto_4.jpeg?v=2", likes: 189, comments: 5 },
  { id: 5, img: "/imsgensfoto_5.jpeg?v=2", likes: 521, comments: 34 },
  { id: 6, img: "/imsgensfoto_6.jpeg?v=2", likes: 298, comments: 11 },
];

export function InstagramSection() {
  return (
    <section className="py-20 md:py-24 bg-brand-cream border-t border-brand-red/10 overflow-hidden relative perspective-1000">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-red/5 to-transparent z-0 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <ScrollReveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Instagram className="text-brand-red drop-shadow-[0_0_10px_rgba(255,40,0,0.5)]" size={24} />
              <span className="text-brand-red font-bold uppercase tracking-[0.2em] text-xs drop-shadow-[0_0_10px_rgba(255,40,0,0.5)]">Acompanhe Ao Vivo</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-brand-cream to-brand-cream/50">
              @DETALHES_ARTT
            </h2>
          </div>
          <a href="https://www.instagram.com/detalhes_artt?igsh=MWF4bzhuMjg2ajd5Mw%3D%3D&igsi=MWF4bzhuMjg2ajd5Mw%3D%3D" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-brand-red/50 text-brand-black font-bold uppercase tracking-[0.2em] text-xs rounded-full shadow-[0_0_15px_rgba(255,40,0,0.2)] hover:shadow-[0_0_30px_rgba(255,40,0,0.5)] hover:bg-brand-red hover:text-brand-black transition-all flex items-center gap-2 group cursor-hover" data-cursor="view">
            Seguir no Instagram
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 transform-style-3d">
          {INSTA_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9, rotateY: 15, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
              whileHover={{ scale: 1.05, rotateY: 10, rotateX: -5 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, type: 'spring' }}
              className="relative aspect-square rounded-[1.5rem] overflow-hidden group cursor-pointer border border-brand-red/10 hover:border-brand-red/40 hover:shadow-[0_0_20px_rgba(255,40,0,0.2)] transition-all transform-style-3d"
              data-cursor="view"
            >
              <img src={post.img} alt="Instagram Post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-brand-cream/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-brand-black backdrop-blur-sm">
                <div className="flex items-center gap-1.5 font-bold drop-shadow-[0_0_5px_rgba(255,40,0,0.8)]">
                  <Heart size={18} className="fill-brand-red text-brand-red" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                  <MessageCircle size={18} className="fill-brand-cream text-brand-black" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
