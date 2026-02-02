import bannerImg from '@/assets/banner.jpeg';
import PrayerWall from '@/components/PrayerWall';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ScrollText, BookOpen, Heart, Moon, Book } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

interface HomeProps {
  targetSection?: string;
}

export default function Home({ targetSection }: HomeProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (targetSection) {
      const el = document.getElementById(targetSection);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [targetSection]);

  return (
    <div className="min-h-screen font-sans bg-background text-foreground selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-primary tracking-widest">{t('nav.title')}</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#home" className="hover:text-primary transition-colors">{t('nav.home')}</a>
            <a href="#scriptures" className="hover:text-primary transition-colors">{t('nav.scriptures')}</a>
            <a href="#sutra-reader" className="hover:text-primary transition-colors">{t('nav.three_sutras')}</a>
            <a href="#prayer-wall" className="hover:text-primary transition-colors">{t('nav.prayer')}</a>
            <a href="#about" className="hover:text-primary transition-colors">{t('nav.offering')}</a>
            <Button asChild size="sm" className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
              <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer">{t('nav.donate')}</a>
            </Button>
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <Button variant="outline" size="icon">
              <BookOpen className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-16 min-h-[90vh] flex flex-col items-center justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={bannerImg} 
            alt="Ksitigarbha Bodhisattva" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 pt-32 md:pt-48 text-center">
          <div className="flex flex-col items-center gap-4 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-lg tracking-widest">{t('hero.namo')}</h2>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 drop-shadow-lg tracking-wide delay-100">
              {t('hero.vow_1')}<br className="md:hidden" /> {t('hero.vow_2')}
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 font-serif max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200">
            {t('hero.desc_1')}<br/>
            {t('hero.desc_2')}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 h-14 rounded-full shadow-xl shadow-primary/20" onClick={() => document.getElementById('prayer-wall')?.scrollIntoView({ behavior: 'smooth' })}>
              <Heart className="mr-2 h-5 w-5" /> {t('hero.btn_prayer')}
            </Button>
            <Button variant="outline" size="lg" className="bg-background/20 backdrop-blur-md border-white/20 text-white hover:bg-background/40 text-lg px-8 h-14 rounded-full" onClick={() => document.getElementById('scriptures')?.scrollIntoView({ behavior: 'smooth' })}>
              <ScrollText className="mr-2 h-5 w-5" /> {t('hero.btn_scriptures')}
            </Button>
          </div>
        </div>
      </section>

      {/* Scriptures Section (Excerpts) */}
      <section id="scriptures" className="py-24 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Moon className="w-8 h-8 text-primary mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-serif font-bold text-primary mb-12">{t('scriptures.title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif border-l-4 border-primary pl-4">{t('scriptures.poem_title')}</h3>
              <div className="bg-card p-6 rounded-lg shadow-sm border border-border leading-loose font-serif text-lg text-muted-foreground">
                {(t('scriptures.poem_content', { returnObjects: true }) as string[]).map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif border-l-4 border-primary pl-4">{t('scriptures.mantra_title')}</h3>
              <div className="bg-card p-6 rounded-lg shadow-sm border border-border leading-loose font-serif">
                <p className="text-xl mb-4 text-center font-bold text-primary">{t('scriptures.mantra_text')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('scriptures.mantra_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="opacity-50" />

      {/* Three Sutras Entry Section */}
      <section id="sutra-reader" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <Book className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">{t('reader.section_title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('reader.section_desc')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: 'ksitigarbha', title: t('reader.sutra_1'), desc: t('reader.sutra_1_desc') },
              { id: 'tenwheels', title: t('reader.sutra_2'), desc: t('reader.sutra_2_desc') },
              { id: 'karma', title: t('reader.sutra_3'), desc: t('reader.sutra_3_desc') },
            ].map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-lg border bg-card p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-bold font-serif mb-4">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-8 min-h-[3rem]">{item.desc}</p>
                <Link href={`/reader/${item.id}`}>
                  <Button variant="outline" className="rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {t('reader.read_btn')}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="opacity-50" />

      {/* Prayer Wall Section */}
      <PrayerWall />

      <Separator className="opacity-50" />

      {/* Footer / Offering Guide */}
      <section id="about" className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif font-bold mb-8">{t('footer.guide_title')}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="p-6">
              <h3 className="font-bold mb-2">{t('footer.guide_lamp_title')}</h3>
              <p className="text-sm text-muted-foreground">{t('footer.guide_lamp_desc')}</p>
            </div>
            <div className="p-6">
              <h3 className="font-bold mb-2">{t('footer.guide_flower_title')}</h3>
              <p className="text-sm text-muted-foreground">{t('footer.guide_flower_desc')}</p>
            </div>
            <div className="p-6">
              <h3 className="font-bold mb-2">{t('footer.guide_incense_title')}</h3>
              <p className="text-sm text-muted-foreground">{t('footer.guide_incense_desc')}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-[rgb(184,73,46)] font-bold text-lg px-8 h-12 shadow-lg hover:shadow-xl transition-all">
              <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer">
                {t('footer.donate_btn')}
              </a>
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </section>
    </div>
  );
}
