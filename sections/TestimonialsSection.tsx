import { motion } from 'motion/react';
import { StaggeredText } from '../components/StaggeredText';
import { Quote } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

const REVIEWS = [
  {
    id: 1,
    name: 'Ana Carolina',
    role: 'Diretora de Marketing',
    text: '"O olhar de Detalhes Art transformou completamente a percepção da nossa marca. A direção de arte foi impecável e a conversão das campanhas aumentou em 40%."'
  },
  {
    id: 2,
    name: 'Marcos Silva',
    role: 'CEO, TechWear',
    text: '"Mais do que fotos bonitas, ela entregou estratégia. As imagens transmitem exatamente a inovação dos nossos produtos. Ela cuidou de cada detalhe."'
  },
  {
    id: 3,
    name: 'Julia & Pedro',
    role: 'Casal',
    text: '"Nossas fotos de casamento parecem saídas de um editorial de cinema. Detalhes Art nos deixou super à vontade e o resultado final foi além do que sonhamos."'
  }
];

export function TestimonialsSection() {
  return (
    <section className="bg-brand-cream py-20 md:py-32 text-brand-black overflow-hidden relative perspective-1000 border-t border-brand-red/10">
      
      {/* Abstract blurred background shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-brand-red/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-brand-red font-bold uppercase tracking-[0.2em] text-xs mb-4 inline-block px-6 py-2 border border-brand-red/30 rounded-full bg-brand-red/10 shadow-[0_0_20px_rgba(255,40,0,0.2)]">Depoimentos</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-cream to-brand-cream/50">
            O QUE <span className="text-brand-red drop-shadow-[0_0_15px_rgba(255,40,0,0.5)]">DIZEM SOBRE MIM</span>
          </h2>
          <p className="text-brand-black/60 text-lg max-w-2xl mx-auto font-medium">Histórias de sucesso e impressões de quem já confiou na minha lente para elevar sua imagem.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ y: -10, rotateY: 5, rotateX: 5 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, type: 'spring' }}
              key={review.id}
              className="bg-brand-cream-dark/60 backdrop-blur-xl border border-brand-red/20 rounded-[2rem] p-8 lg:p-10 shadow-2xl transition-all group cursor-hover transform-style-3d hover:shadow-[0_0_40px_rgba(255,40,0,0.15)] hover:border-brand-red/40"
            >
              <Quote size={40} className="text-brand-red/30 mb-6 group-hover:text-brand-red group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,40,0,0.5)]" />
              <p className="text-brand-black/80 text-lg lg:text-xl font-light italic leading-relaxed mb-8 relative z-10 group-hover:text-brand-black transition-colors">
                {review.text}
              </p>
              <div className="border-t border-brand-red/10 pt-6 group-hover:border-brand-red/30 transition-colors relative">
                <p className="font-bold text-brand-black uppercase tracking-widest text-sm">{review.name}</p>
                <p className="text-xs text-brand-red font-bold uppercase tracking-[0.2em] mt-1 drop-shadow-[0_0_10px_rgba(255,40,0,0.5)]">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
