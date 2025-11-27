
import { KsefUploader } from './KsefUploader';
import { ShieldCheck, Zap, Bot, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LandingPage = () => {
  return (
    // ZMIANA 1: GŁÓWNY KONTENER
    // Zamiast zwykłego bg-white, dodajemy styl inline z zaawansowanym gradientem (Mesh Gradient)
    // Używamy kolorów slate-50 jako bazy, oraz bardzo subtelnych (opacity 0.1 - 0.15) odcieni niebieskiego i fioletu.
    <div 
      className="min-h-screen selection:bg-violet-100 selection:text-violet-700 font-sans"
      style={{
        backgroundColor: '#f8fafc', // Tailwind slate-50 base
        backgroundImage: `
          radial-gradient(at 0% 0%, hsla(217, 91%, 60%, 0.15) 0px, transparent 50%), 
          radial-gradient(at 100% 0%, hsla(252, 100%, 67%, 0.15) 0px, transparent 50%), 
          radial-gradient(at 50% 100%, hsla(217, 100%, 95%, 0.5) 0px, transparent 50%)
        `
        // Wyjaśnienie gradientów:
        // 1. Lewy górny róg: Subtelny niebieski
        // 2. Prawy górny róg: Subtelny fiolet
        // 3. Dół środka: Rozjaśnienie (prawie biały)
      }}
    >
      
      {/* --- NAVBAR --- */}
      {/* Dodano backdrop-blur, żeby menu ładnie "mroziło" nowe tło */}
      <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100/50">
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
      {/* Usunięto "overflow-hidden" bo nowe tło jest statyczne i nie wychodzi poza ramy */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
        
        {/* ZMIANA 2: USUNIĘTO STARE TŁO (ANIMOWANE KULKI)
            Cały blok div className="absolute top-0..." z animate-blob został usunięty.
            Nowe tło jest teraz na głównym rodzicu (najwyższy div).
        */}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100/50 text-blue-600 text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 backdrop-blur-sm">
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
      {/* Zmieniono tło na transparentne, żeby gradient z góry przenikał, i dodano border */}
      <div id="features" className="py-24 bg-transparent relative border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Dlaczego zwykły ERP to za mało?</h2>
            <p className="mt-4 text-slate-600">Programy księgowe sprawdzają matematykę. My sprawdzamy logikę.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            {/* Dodano backdrop-blur do kart, żeby ładnie wyglądały na nowym tle */}
            <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Bot size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Analiza AI (LLM)</h3>
              <p className="text-slate-600">
                Nasze AI rozumie kontekst. Wyłapie, że sprzedajesz "usługi budowlane" a zapomniałeś o kodzie GTU_12 lub błędnej stawce VAT.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Walidacja Techniczna</h3>
              <p className="text-slate-600">
                Sprawdzamy zgodność z oficjalną schemą XSD Ministerstwa Finansów. Żaden błędny przecinek nie przejdzie.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
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
          {/* Zwiększono cienie i dodano delikatny border */}
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-12 md:p-20 text-white shadow-2xl shadow-blue-900/20 border border-white/10">
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
      {/* Zmiana tła na transparentne */}
      <footer className="bg-transparent border-t border-slate-200/60 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; 2025 KSeF Validator AI KMB SoftDev. Wszelkie prawa zastrzeżone.</p>
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