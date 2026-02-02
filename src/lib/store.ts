import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export interface Prayer {
  id: string;
  name: string;
  content: string;
  date: string; // ISO string
  type: 'lamp' | 'incense' | 'flower';
}

const STORAGE_KEY = 'dizang_prayers';

// Default initial prayers to make the wall look populated
const INITIAL_PRAYERS: Prayer[] = [
  {
    id: '1',
    name: '善信',
    content: '愿以此功德，庄严佛净土。上报四重恩，下济三途苦。',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    type: 'lamp'
  },
  {
    id: '2',
    name: '慧明',
    content: '祈愿家人身体健康，平安喜乐。南无地藏王菩萨。',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    type: 'incense'
  },
  {
    id: '3',
    name: '觉悟',
    content: '地狱不空，誓不成佛。愿众生离苦得乐。',
    date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    type: 'flower'
  }
];

export function usePrayers() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPrayers(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse prayers', e);
        setPrayers(INITIAL_PRAYERS);
      }
    } else {
      setPrayers(INITIAL_PRAYERS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRAYERS));
    }
  }, []);

  const addPrayer = (prayer: Omit<Prayer, 'id' | 'date'>) => {
    const newPrayer: Prayer = {
      ...prayer,
      id: nanoid(),
      date: new Date().toISOString()
    };
    
    const updated = [newPrayer, ...prayers];
    setPrayers(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { prayers, addPrayer };
}
