import { KsefUploader } from './KsefUploader';
import { ShieldCheck, Zap, Bot, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-violet-100 selection:text-violet-700 font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-600 to-violet-600 text-white p-1.5 rounded-lg">
                <ShieldCheck size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">
                KSeF<span className="text-blue-600">Validator</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition-colors">Dlaczego my?</a>
              <a href="#pricing" className="hover:text-blue-600 transition-colors">Cennik</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">Kontakt</a>
              <button className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                Zaloguj się
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        
        {/* Dekoracyjne tło (Blobs) */}
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/2 w-[500px] h-[500px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Gotowy na KSeF 2026
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            Twoja tarcza przed <br className="hidden md:block" />
            błędami w <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600">KSeF</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Pierwszy w Polsce walidator, który używa <strong>Sztucznej Inteligencji</strong> do weryfikacji merytorycznej faktur. Uniknij korekt i kar zanim wyślesz plik do Ministerstwa.
          </p>

          {/* THE UPLOADER (Central Stage) */}
          <div className="animate-in fade-in zoom-in-95 duration-1000 delay-200">
             <KsefUploader />
          </div>

          {/* Social Proof / Trust */}
          <div className="mt-12 flex justify-center items-center gap-8 text-slate-400 grayscale opacity-70">
             <span className="flex items-center gap-2"><CheckCircle2 size={16}/> RODO Compliant</span>
             <span className="flex items-center gap-2"><CheckCircle2 size={16}/> Szyfrowanie SSL</span>
             <span className="flex items-center gap-2"><CheckCircle2 size={16}/> Serwery w Polsce</span>
          </div>

        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div id="features" className="py-24 bg-slate-50 relative border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Dlaczego zwykły ERP to za mało?</h2>
            <p className="mt-4 text-slate-600">Programy księgowe sprawdzają matematykę. My sprawdzamy logikę.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Bot size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Analiza AI (LLM)</h3>
              <p className="text-slate-600">
                Nasze AI rozumie kontekst. Wyłapie, że sprzedajesz "usługi budowlane" a zapomniałeś o kodzie GTU_12 lub błędnej stawce VAT.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Walidacja Techniczna</h3>
              <p className="text-slate-600">
                Sprawdzamy zgodność z oficjalną schemą XSD Ministerstwa Finansów. Żaden błędny przecinek nie przejdzie.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Błyskawiczny Wynik</h3>
              <p className="text-slate-600">
                Przeciągnij plik i w ułamku sekundy otrzymaj raport. Zielony? Możesz wysyłać. Czerwony? Pokażemy Ci jak to naprawić.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-12 md:p-20 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Przestań martwić się korektami</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Dołącz do firm, które śpią spokojnie. Sprawdź swoje pierwsze 10 faktur za darmo.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-2">
              Rozpocznij darmowy test <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; 2025 KSeF Validator AI. Wszelkie prawa zastrzeżone.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-slate-600">Polityka Prywatności</a>
            <a href="#" className="hover:text-slate-600">Regulamin</a>
            <a href="#" className="hover:text-slate-600">Kontakt</a>
          </div>
        </div>
      </footer>

    </div>
  );
};