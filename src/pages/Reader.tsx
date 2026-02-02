import { useParams, Link } from "wouter";
import { SUTRAS } from "@/data/sutras";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ExternalLink, BookOpen, Headphones } from "lucide-react";
import { useState } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Reader() {
  const { id } = useParams();
  const { t } = useTranslation();
  const topRef = useRef<HTMLDivElement>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const KSITIGARBHA_AUDIO_URL = "https://archive.org/download/20200704_20200704_0957/65%20%E5%9C%B0%E8%97%8F%E8%8F%A9%E8%90%A8%E6%9C%AC%E6%84%BF%E7%BB%8F.mp3";

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [id]);

  if (!id) {
    // List view
    return (
      <div className="min-h-screen bg-background text-foreground py-20 px-4 md:px-8" ref={topRef}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <h1 className="text-3xl font-serif font-bold text-primary">地藏三经</h1>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {SUTRAS.map((sutra) => (
              <Link key={sutra.id} href={`/reader/${sutra.id}`}>
                <div className="group cursor-pointer rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 h-full flex flex-col">
                  <BookOpen className="h-8 w-8 text-primary mb-4 opacity-80 group-hover:opacity-100" />
                  <h2 className="text-xl font-bold font-serif mb-2 group-hover:text-primary transition-colors">
                    {sutra.title}
                  </h2>
                  <p className="text-sm text-muted-foreground flex-grow">
                    {sutra.description}
                  </p>
                  <div className="mt-4 text-xs font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    阅读经文 <ExternalLink className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const sutra = SUTRAS.find(s => s.id === id);

  if (!sutra) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">经文未找到</h1>
          <Link href="/reader">
            <Button>返回目录</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f2eb] dark:bg-[#1a1614] text-foreground font-serif pb-20" ref={topRef}>
      <div className="max-w-3xl mx-auto bg-card shadow-xl min-h-screen flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/reader">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg md:text-xl font-bold truncate">{sutra.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            {sutra.id === 'ksitigarbha' && (
              <Button 
                variant={showPlayer ? "secondary" : "outline"} 
                size="sm" 
                onClick={() => setShowPlayer(!showPlayer)}
                className="gap-2 border-primary/20 text-primary hover:text-primary hover:bg-primary/5"
              >
                <Headphones className="h-4 w-4" />
                <span className="hidden md:inline">{showPlayer ? t('stop_audio') : t('play_audio')}</span>
                <span className="md:hidden">{t('play_audio')}</span>
              </Button>
            )}
            <a href={sutra.externalLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <ExternalLink className="mr-2 h-4 w-4" /> CBETA 电子藏
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <ExternalLink className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-grow p-6 md:p-12">
          <article className="prose dark:prose-invert prose-lg max-w-none mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{sutra.title}</h1>
              {sutra.titleEn && <p className="text-sm text-muted-foreground">{sutra.titleEn}</p>}
            </div>
            
            <div className="whitespace-pre-wrap leading-loose tracking-wide text-justify">
              {sutra.content}
            </div>

            {sutra.id === 'tenwheels' && (
              <div className="mt-12 text-center p-8 bg-muted/30 rounded-lg">
                <p className="mb-6 text-muted-foreground">此经篇幅浩大，为方便阅读，建议访问电子佛典。</p>
                <Button asChild size="lg" className="gap-2">
                  <a href={sutra.externalLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" /> 阅读完整全文 (CBETA)
                  </a>
                </Button>
              </div>
            )}
          </article>
          
          <div className="mt-20 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>愿以此功德，普及于一切</p>
            <p>我等与众生，皆共成佛道</p>
          </div>
        </ScrollArea>
      </div>
      
      {showPlayer && sutra.id === 'ksitigarbha' && (
        <AudioPlayer
          src={KSITIGARBHA_AUDIO_URL}
          title={sutra.title}
          onClose={() => setShowPlayer(false)}
          autoPlay={true}
        />
      )}
    </div>
  );
}
