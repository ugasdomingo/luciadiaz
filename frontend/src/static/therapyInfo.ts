export const therapyInfo = [
    {
        id: 1,
        title: 'Terapia individual',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.',
        image: 'https://via.placeholder.com/150',
        alt: 'Terapia individual',
        payLink: 'https://www.paypal1.com/',
    },
    {
        id: 2,
        title: 'Terapia de pareja',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.',
        image: 'https://via.placeholder.com/150',
        alt: 'Terapia de pareja',
        payLink: 'https://www.paypal.com/',
    },
    {
        id: 3,
        title: 'Terapia infantil',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.',
        image: 'https://via.placeholder.com/150',
        alt: 'Terapia infantil',
        payLink: 'https://www.paypal3.com/',
    },
    {
        id: 4,
        title: 'Orientación para padres',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.',
        image: 'https://via.placeholder.com/150',
        alt: 'Orientación para padres',
        payLink: 'https://www.paypal4.com/',
    },
];

export interface ITherapyInfo {
    id: number;
    title: string;
    description: string;
    image: string;
    alt: string;
    payLink: string;
}
