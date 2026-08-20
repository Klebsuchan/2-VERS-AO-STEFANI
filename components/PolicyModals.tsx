import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cookie } from 'lucide-react';

interface PolicyModalsProps {
  activeModal: 'privacy' | 'terms' | null;
  onClose: () => void;
  onOpen: (type: 'privacy' | 'terms') => void;
}

export function PolicyModals({ activeModal, onClose, onOpen }: PolicyModalsProps) {
  const [cookieConsent, setCookieConsent] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setCookieConsent(false);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setCookieConsent(true);
  };

  return (
    <>
      <AnimatePresence>
        {!cookieConsent && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[99998] p-4 md:p-6 pointer-events-none"
          >
            <div className="max-w-5xl mx-auto bg-brand-cream text-brand-black p-6 rounded-2xl shadow-2xl border border-brand-yellow/20 flex flex-col md:flex-row items-center gap-6 pointer-events-auto">
              <div className="bg-brand-yellow/10 p-3 rounded-full shrink-0">
                <Cookie className="text-brand-yellow" size={24} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="font-bold text-lg mb-2">Sua privacidade é importante</h4>
                <p className="text-brand-black/70 text-sm leading-relaxed">
                  Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego. Ao continuar navegando, você concorda com a nossa <button onClick={() => onOpen('privacy')} className="text-brand-yellow hover:underline cursor-pointer">Política de Privacidade</button>.
                </p>
              </div>
              <div className="flex gap-3 shrink-0 w-full md:w-auto mt-4 md:mt-0">
                <button 
                  onClick={acceptCookies}
                  className="flex-1 md:flex-none bg-brand-yellow text-brand-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#FFF8D6] transition-colors shadow-lg"
                >
                  Aceitar Todos
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-brand-cream/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-cream text-brand-black w-full max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-brand-black/10">
                <h3 className="text-2xl font-bold tracking-tight">
                  {activeModal === 'privacy' ? 'Política de Privacidade' : 'Termos de Uso'}
                </h3>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-brand-cream/5 transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 md:p-8 overflow-y-auto font-light text-brand-black/80 space-y-6">
                {activeModal === 'privacy' ? (
                  <>
                    <h4 className="font-bold text-brand-black text-lg">1. Coleta de Dados</h4>
                    <p>
                      Coletamos informações essenciais para a prestação dos meus serviços fotográficos, incluindo nome, e-mail, telefone e detalhes do projeto quando você preenche meus formulários de contato ou solicita um orçamento.
                    </p>
                    
                    <h4 className="font-bold text-brand-black text-lg">2. Uso das Informações</h4>
                    <p>
                      Seus dados são utilizados exclusivamente para comunicação sobre orçamentos, agendamentos, entrega de materiais e emissão de contratos/notas fiscais. Não compartilho, vendo ou alugo suas informações para terceiros.
                    </p>

                    <h4 className="font-bold text-brand-black text-lg">3. Direitos de Imagem</h4>
                    <p>
                      A utilização das fotografias produzidas no meu portfólio, site e redes sociais será sempre acordada previamente mediante contrato específico de prestação de serviços e cessão de direitos de imagem.
                    </p>

                    <h4 className="font-bold text-brand-black text-lg">4. Cookies</h4>
                    <p>
                      Utilizo cookies técnicos essenciais para o funcionamento do site e cookies analíticos para entender o tráfego e melhorar a experiência de navegação.
                    </p>

                    <h4 className="font-bold text-brand-black text-lg">5. Contato</h4>
                    <p>
                      Para dúvidas ou solicitações sobre seus dados, entre em contato através do e-mail: contato@detalhesart.com
                    </p>
                  </>
                ) : (
                  <>
                    <h4 className="font-bold text-brand-black text-lg">1. Aceitação dos Termos</h4>
                    <p>
                      Ao acessar e utilizar este site, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concorda com alguma parte destes termos, por favor, não utilize meu site.
                    </p>

                    <h4 className="font-bold text-brand-black text-lg">2. Uso de Imagens e Direitos Autorais</h4>
                    <p>
                      Todas as fotografias, vídeos, logotipos e conteúdos exibidos neste site são de minha propriedade intelectual exclusiva (Detalhes Art Fotografia). É estritamente proibida a cópia, reprodução, distribuição ou uso comercial de qualquer imagem sem autorização prévia e expressa por escrito.
                    </p>

                    <h4 className="font-bold text-brand-black text-lg">3. Orçamentos e Serviços</h4>
                    <p>
                      As simulações de orçamento realizadas através do site são estimativas e não configuram um contrato final. Os valores e escopos definitivos serão acordados mediante proposta comercial e assinatura de contrato específico para cada projeto.
                    </p>

                    <h4 className="font-bold text-brand-black text-lg">4. Limitação de Responsabilidade</h4>
                    <p>
                      Me reservo o direito de alterar informações, portfólios, planos e valores exibidos no site a qualquer momento, sem aviso prévio.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
