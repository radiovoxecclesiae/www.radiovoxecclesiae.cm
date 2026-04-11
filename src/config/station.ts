export type Frequency = {
  value: string;
  label: string;
};

export interface StationConfig {
  name: string;
  shortName: string;
  description: { fr: string; en: string };
  logoUrl: string;
  ogImageUrl: string;
  canonicalUrl: string;
  appUrl: string;
  frequencies: Frequency[];
  contact: {
    whatsapp: string;
    whatsappDisplay: string;
    facebook: string;
    facebookDisplay: string;
    email: string;
    address: string;
  };
  payment: {
    mtn: { number: string; display: string };
    orange: { number: string; display: string };
  };
}

const station: StationConfig = {
  name: 'Radio Vox Ecclesiae',
  shortName: 'RVE',
  description: {
    fr: "Radio catholique du Diocèse de Bafoussam. Évangélisation, éducation et culture. 97.3 / 103.7 / 105.8 FM.",
    en: "Catholic radio of the Diocese of Bafoussam. Evangelization, education and culture. 97.3 / 103.7 / 105.8 FM.",
  },
  logoUrl: '/logo.png',
  ogImageUrl: '/og-image.png',
  canonicalUrl: 'https://www.radiovoxecclesiae.cm',
  appUrl: 'https://app.radiovoxecclesiae.cm/',
  frequencies: [
    { value: '97.3',  label: '97.3 FM'  },
    { value: '103.7', label: '103.7 FM' },
    { value: '105.8', label: '105.8 FM' },
  ],
  contact: {
    whatsapp: 'https://whatsapp.com/channel/0029VbBU76AHgZWcn3WWNA0L',
    whatsappDisplay: '+237 6 90 06 03 01',
    facebook: 'https://www.facebook.com/radiovoxecclesiae',
    facebookDisplay: 'Radio Vox Ecclesiae',
    email: 'radiovoxecclesiae@gmail.com',
    address: 'Bafoussam II, Cameroun',
  },
  payment: {
    mtn:    { number: '237653171211', display: '6 53 17 12 11' },
    orange: { number: '237690060301', display: '6 90 06 03 01' },
  },
};

export default station;
