export const therapyInfo = [
    {
        id: 1,
        title: 'Terapia individual',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.',
        image: 'https://images.pexels.com/photos/7176297/pexels-photo-7176297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Terapia individual',
        payLink: 'https://www.paypal1.com/',
        url: '/servicios/individual',
    },
    {
        id: 2,
        title: 'Terapia de pareja',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.',
        image: 'https://images.pexels.com/photos/3958379/pexels-photo-3958379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Terapia de pareja',
        payLink: 'https://www.paypal.com/',
        url: '/servicios/pareja',
    },
    {
        id: 3,
        title: 'Terapia infantil',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.',
        image: 'https://images.pexels.com/photos/7025515/pexels-photo-7025515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Terapia infantil',
        payLink: 'https://www.paypal3.com/',
        url: '/servicios/infantil',
    },
    {
        id: 4,
        title: 'Orientación para padres',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl.',
        image: 'https://images.pexels.com/photos/3995921/pexels-photo-3995921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Orientación para padres',
        payLink: 'https://www.paypal4.com/',
        url: '/servicios/padres',
    },
];

export interface ITherapyInfo {
    id: number;
    title: string;
    description: string;
    image: string;
    alt: string;
    payLink: string;
    url: string;
}
