import { ksitigarbha } from './ksitigarbha';
import { karma } from './karma';
import { tenwheels } from './tenwheels';

export const SUTRAS = [
  {
    id: 'ksitigarbha',
    title: '地藏菩萨本愿经',
    titleEn: 'Ksitigarbha Bodhisattva Purvapranidhana Sutra',
    description: '佛教孝经，详细描述了地藏菩萨的弘大誓愿与救度众生的事迹。',
    content: ksitigarbha,
    externalLink: 'https://cbetaonline.dila.edu.tw/zh/T0412'
  },
  {
    id: 'tenwheels',
    title: '大乘大集地藏十轮经',
    titleEn: 'Dasacakra Ksitigarbha Sutra',
    description: '阐述地藏菩萨的功德与十轮法门，消除业障，增长福慧。',
    content: tenwheels,
    externalLink: 'https://cbetaonline.dila.edu.tw/zh/T0411'
  },
  {
    id: 'karma',
    title: '占察善恶业报经',
    titleEn: 'Karma Vibhaga Sutra',
    description: '教授占察木轮相法，以此忏悔业障，求得清净戒体。',
    content: karma,
    externalLink: 'https://cbetaonline.dila.edu.tw/zh/T0839'
  }
];
