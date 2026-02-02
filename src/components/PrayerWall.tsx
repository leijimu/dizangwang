import { useState } from 'react';
import { usePrayers, type Prayer } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Flame, Flower2, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export default function PrayerWall() {
  const { t } = useTranslation();
  const { prayers, addPrayer } = usePrayers();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<Prayer['type']>('lamp');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addPrayer({
      name: name.trim() || t('prayer_wall.placeholder_name').split(' ')[0], // Default name fallback
      content: content.trim(),
      type
    });

    setIsOpen(false);
    setName('');
    setContent('');
    setType('lamp');
    toast.success(t('prayer_wall.toast_success'));
  };

  const getIcon = (type: Prayer['type']) => {
    switch (type) {
      case 'lamp': return <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />;
      case 'flower': return <Flower2 className="w-5 h-5 text-pink-400" />;
      case 'incense': return <Sparkles className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <section id="prayer-wall" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">{t('prayer_wall.title')}</h2>
          <p className="text-muted-foreground">{t('prayer_wall.subtitle')}</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              <Flame className="mr-2 h-5 w-5" /> {t('prayer_wall.btn_add')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-card border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif text-center text-primary">{t('prayer_wall.dialog_title')}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('prayer_wall.label_type')}</label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lamp">{t('prayer_wall.types.lamp')}</SelectItem>
                    <SelectItem value="incense">{t('prayer_wall.types.incense')}</SelectItem>
                    <SelectItem value="flower">{t('prayer_wall.types.flower')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('prayer_wall.label_name')}</label>
                <Input 
                  placeholder={t('prayer_wall.placeholder_name')}
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  maxLength={20}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t('prayer_wall.label_content')}</label>
                <Textarea 
                  placeholder={t('prayer_wall.placeholder_content')} 
                  value={content} 
                  onChange={e => setContent(e.target.value)} 
                  className="min-h-[100px]"
                  required
                  maxLength={200}
                />
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {t('prayer_wall.btn_submit')}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[600px] w-full rounded-md border border-border/50 bg-background/50 p-4 shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prayers.map((prayer) => (
            <Card key={prayer.id} className="p-6 bg-card/80 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    {getIcon(prayer.type)}
                  </div>
                  <span className="font-serif font-bold text-lg text-primary">{prayer.name}</span>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {format(new Date(prayer.date), 'yyyy-MM-dd')}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-card-foreground/90 font-serif">
                {prayer.content}
              </p>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}
