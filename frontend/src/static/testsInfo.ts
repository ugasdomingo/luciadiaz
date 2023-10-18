export const testsInfo = [
    {
        id: 1,
        title: 'Desbloqueo de Metas',
        short: '¿Siempre ocurre algo que te impide lograr esa meta que tanto deseas? ',
        description:
            'Detrás de toda meta que no logramos alcanzar, aun estando muy cerca de alcanzarla, hay una mente que rechaza y bloquea algo alrededor de esa meta. Este test te permitira en sólo 2 minutos descubrir qué es.',
        link: '/despertando/desbloqueo-de-metas',
        img: 'https://res.cloudinary.com/minteados/image/upload/v1697630433/LuciaWeb/portada-goals_ncstey.png',
    },
    {
        id: 2,
        title: 'Personalidad - Arquetipos',
        short: 'Mago, Guerrero, Sabio Rey, Amante, Descubre tu arquetipo y aprende a usarlo para tu beneficio',
        description:
            'lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctort.',
        link: '/despertando/arquetipos',
        img: 'https://res.cloudinary.com/minteados/image/upload/v1697630433/LuciaWeb/portada-archetype_uql8p8.png',
    },
    {
        id: 3,
        title: 'Temperamentos',
        short: 'Sanguíneo, Melancólico, Colérico, Flemático, Descubre tu temperamento y aprende a usarlo para tu beneficio',
        description:
            'lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctort.',
        link: '/despertando/temperamentos',
        img: 'https://res.cloudinary.com/minteados/image/upload/v1697630433/LuciaWeb/portada-temper_e3leuf.png',
    },
];

export interface ITestInfo {
    id: number;
    title: string;
    short: string;
    description: string;
    link: string;
    img: string;
}
