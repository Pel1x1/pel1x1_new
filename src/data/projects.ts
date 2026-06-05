export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  link: string;
  images: string[];
  technologies: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Загородный комплекс «ЗВЁЗДНЫЙ»',
    description: 'Сайт отеля с системой бронирования',
    category: 'Гостиничный бизнес',
    link: 'https://zvezdny-complex.ru/',
    images: ['/img/zvezdny/1.webp', '/img/zvezdny/2.webp', '/img/zvezdny/3.webp', '/img/zvezdny/4.webp', '/img/zvezdny/5.webp'],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind'],
  },
  {
    id: 2,
    title: 'Постельное бельё «НЮКТА»',
    description: 'Сайт для магазина премиального постельного белья',
    category: 'E-commerce',
    link: 'https://нюкта.рф',
    images: ['/img/nukta/1.webp', '/img/nukta/2.webp', '/img/nukta/3.webp', '/img/nukta/4.webp', '/img/nukta/5.webp'],
    technologies: ['React', 'Tailwind', 'Node.js', 'MODX'],
  },
  {
    id: 3,
    title: '«Даймонд»',
    description: 'Сайт-визитка клининговой компании',
    category: 'Сфера услуг',
    link: 'https://diamondsupport.ru',
    images: ['/img/diamond/1.webp', '/img/diamond/2.webp', '/img/diamond/3.webp'],
    technologies: ['React', 'Tailwind', 'MODX'],
  },
  {
    id: 4,
    title: 'Визитка ведущей',
    description: 'Сайт-визитка для ведущей мероприятий',
    category: 'Персональный сайт',
    link: 'https://irinasemenova.ru',
    images: ['/img/irina/1.webp', '/img/irina/2.webp', '/img/irina/3.webp'],
    technologies: ['React', 'Tailwind'],
  },
  {
    id: 5,
    title: 'JungebadMoscow',
    description: 'Сайт о масляно-дисперсионной терапии',
    category: 'Медицина',
    link: 'https://jungebadmoscow.ru/',
    images: ['/img/jungebad/1.webp', '/img/jungebad/2.webp', '/img/jungebad/3.webp', '/img/jungebad/4.webp', '/img/jungebad/5.webp'],
    technologies: ['React', 'Tailwind', 'Node.js', 'MODX'],
  },
  {
    id: 6,
    title: 'KiselevDA',
    description: 'Сайт юридической компании',
    category: 'Юридические услуги',
    link: 'https://kiselev-lawyer.ru/',
    images: ['/img/kiselev/1.png', '/img/kiselev/2.png', '/img/kiselev/3.png'],
    technologies: ['React', 'Tailwind', 'Node.js', 'MODX'],
  },
  {
    id: 7,
    title: 'Гостевой дом на Байкале',
    description: 'Cайт гостевого дома с системой бронирования',
    category: 'Гостиничный бизнес',
    link: 'https://xn--80aacccfkda5gdne1si.xn--p1ai/',
    images: ['/img/baikal/1.webp', '/img/baikal/2.webp', '/img/baikal/3.webp', '/img/baikal/4.webp'],
    technologies: ['React', 'Tailwind', 'Node.js', 'MODX'],
  },
  {
    id: 8,
    title: 'Байкальский МЁД',
    description: 'Свежий мëд с пасек Байкальского региона.',
    category: 'E-commerce',
    link: 'https://baikal-honey.vercel.app/',
    images: ['/img/honey/1.webp', '/img/honey/2.webp', '/img/honey/3.webp', '/img/honey/4.webp'],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Scss'],
  },
  {
    id: 9,
    title: 'FoodClient',
    description: 'Сайт учебный проект',
    category: 'Информационный сайт',
    link: 'https://food-next-rho.vercel.app/',
    images: ['/img/food/1.webp', '/img/food/2.webp', '/img/food/3.webp', '/img/food/4.webp', '/img/food/5.webp', '/img/food/6.webp'],
    technologies: ['Next.js', 'TypeScript', 'Scss', "Firebase", "Strapi"],
  },
];
