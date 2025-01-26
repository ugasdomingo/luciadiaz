export const test_info = [
    {
        id: 1,
        name: 'Arquetipos de la personalidad',
        brief: 'Comprensión de tu naturaleza interna, identificando patrones de comportamiento, motivaciones inconscientes y potenciales innatos.',
        link: '/tests/arquetipos',
        image: 'https://res.cloudinary.com/minteados/image/upload/v1737653354/Lucia/Test/portada-archetype_pudxmr.png'
    },
    {
        id: 2,
        name: 'Temperamentos',
        brief: 'Comprender tus reacciones emocionales, estilos de comunicación y tendencias de comportamiento.',
        link: '/tests/temperamentos',
        image: 'https://res.cloudinary.com/minteados/image/upload/v1737653353/Lucia/Test/portada-temper_otnxd2.png'
    },
    {
        id: 3,
        name: 'Meta más deseada',
        brief: 'Saber cuales son los obstáculos que tu mente inconsciente necesita solucionar para que logres esa metas que tanto deseas.',
        link: '/tests/meta',
        image: 'https://res.cloudinary.com/minteados/image/upload/v1737653354/Lucia/Test/portada-goals_v1h0fn.png'
    }
];

export interface ITestInfo {
    id: number;
    name: string;
    brief: string;
    link: string;
    image: string;
}
