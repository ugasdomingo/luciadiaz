<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import type { IFormation } from '@/types/IFormation';
import { useUserStore } from '@/stores/user-store';
import { useUtilStore } from '@/stores/util-store';

//Props
const prop = defineProps<{
    formation: IFormation;
}>();

//States
const user_store = useUserStore();
const util_store = useUtilStore();
const show_learning_one = ref<boolean>(false);
const show_learning_two = ref<boolean>(false);
const show_learning_three = ref<boolean>(false);
const show_learning_four = ref<boolean>(false);
const inscription = ref<HTMLElement | null>(null);
const formted_date = new Date(prop.formation.date).toLocaleDateString();

//Methods
const smoothScrollTo = (targetPosition: number, duration = 1500) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        window.scrollTo(0, startPosition + distance * progress);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    };

    requestAnimationFrame(animation);
};

const scroll_to_inscription = () => {
    if (inscription.value) {
        const targetPosition = inscription.value.offsetTop;
        smoothScrollTo(targetPosition, 1500);
    }
};
</script>

<template>
    <main class="page">
        <section class="hero__container">
            <!-- HERO CONTAINER ****************************** -->
            <div class="hero__content">
                <h1>{{ prop.formation.title }}</h1>
                <p>{{ prop.formation.description }}</p>
                <button class="button__action" @click="scroll_to_inscription">
                    ¡Inscribirme!
                </button>
            </div>
            <div class="hero__image">
                <img
                    :src="prop.formation.cover_image.secure_url"
                    alt="Hero image"
                />
            </div>
            <img
                src="https://img.freepik.com/free-vector/neumorphic-round-shape-design-empty-white-banner_1017-43171.jpg?t=st=1740227360~exp=1740230960~hmac=32d36d933f49b6fe8f0f430271d9948aa43f3802c87ff19115a473867398d5a8&w=1380"
                alt="Hero image"
                class="hero__background"
            />
        </section>
        <section class="why__container">
            <!-- WHY CONTAINER ****************************** -->
            <h2>¿Para qué creé esta formación?</h2>
            <p>
                En un mundo acelerado, donde el ruido externo y las
                distracciones constantes nos alejan de lo esencial, muchos
                <span
                    >hemos perdido de vista lo que realmente importa: nuestra
                    capacidad para liderar nuestras propias vidas</span
                >
                con claridad, autenticidad y propósito. Nos hemos convertido en
                espectadores de nuestra propia existencia, siguiendo patrones
                automáticos y permitiendo que las circunstancias externas dicten
                nuestro rumbo.
            </p>
            <p>
                Pero no tiene que ser así. Imagina tener la capacidad de tomar
                decisiones con confianza absoluta, de liderar no solo tu vida,
                sino también inspirar a otros con tu ejemplo.
                <span
                    >Imagina vivir cada día con un sentido profundo de
                    propósito, sabiendo que cada paso que das está alineado con
                    tus valores más auténticos</span
                >. Este no es un sueño lejano; es una realidad que puedes crear
                al despertar hoy.
            </p>
            <p>
                Creé este curso 100% práctico. Aquí no solo aprenderás
                conceptos, sino que experimentarás un cambio profundo en tu
                forma de ver el mundo y de relacionarte contigo mismo/a y con
                los demás.
                <span
                    >Este es un espacio seguro para explorar, crecer y poder
                    vivir una vida extraordinaria</span
                >
            </p>
        </section>
        <section class="content__container">
            <!-- CONTENT CONTAINER ****************************** -->
            <h2>¿Qué aprenderás en esta formación?</h2>
            <article>
                <h3 @click="show_learning_one = !show_learning_one">
                    Detectar la verdad detrás de las palabras
                </h3>
                <p
                    class="learning"
                    :class="show_learning_one ? 'show' : 'hidden'"
                >
                    Conocerás técnicas para leer microexpresiones y lenguaje
                    corporal, habilidades que te permitirán identificar cuándo
                    alguien miente o dice la verdad. Este conocimiento es
                    invaluable para cualquier ámbito de tu vida, ya sea personal
                    o profesional.
                </p>
            </article>
            <article>
                <h3 @click="show_learning_two = !show_learning_two">
                    Descifrar el metalenguaje con PNL (Programación
                    Neurolingüística)
                </h3>
                <p
                    class="learning"
                    :class="show_learning_two ? 'show' : 'hidden'"
                >
                    Aprenderás a interpretar las intenciones detrás de las
                    palabras y utilizar el poder del lenguaje para influir de
                    manera positiva en tus relaciones y alcanzar tus metas con
                    mayor precisión.
                </p>
            </article>
            <article>
                <h3 @click="show_learning_three = !show_learning_three">
                    Diseñar una mentalidad poderosa
                </h3>
                <p
                    class="learning"
                    :class="show_learning_three ? 'show' : 'hidden'"
                >
                    Adquirirás las bases psicológicas necesarias para tomar
                    control de tu realidad, dejando atrás limitaciones y
                    potenciando tus capacidades para construir la vida que
                    siempre has soñado. Desarrollarás habilidades para tomar
                    decisiones más inteligentes, negociar con confianza, liderar
                    con autoridad y mejorar tu comunicación.
                </p>
            </article>
            <article>
                <h3 @click="show_learning_four = !show_learning_four">
                    Cómo vivir una transformación real
                </h3>
                <p
                    class="learning"
                    :class="show_learning_four ? 'show' : 'hidden'"
                >
                    Cada lección está diseñada para que salgas del curso con
                    habilidades prácticas que puedas aplicar inmediatamente en
                    tu día a día. Aprenderás a observar, decidir y actuar con un
                    nivel de confianza y claridad mental que jamás imaginaste.
                </p>
            </article>
        </section>
        <section class="about__container">
            <!-- ABOUT CONTAINER ****************************** -->
            <div class="left-content">
                <img
                    src="https://res.cloudinary.com/minteados/image/upload/v1737180498/Lucia/Lucia_y9pfhb.png"
                    alt=""
                />
            </div>
            <div class="right-content">
                <h2>Acerca de mi</h2>
                <p>
                    Con más de 7 años de experiencia como terapeuta individual y
                    familiar, y de todo el conocimiento que he adquirido de
                    innumerables pacientes, me he dado cuenta que no solo no nos
                    enseñan en la escuela a cultivar una buena salud mental,
                    sino que día a día vamos durmiendo nuestra mente a través
                    del uso de dispositivos y canales digitales con los que
                    remplazamos "vivir" por "aparentar" y "competir" .
                </p>
                <p>
                    Mi misión es brindarte información clara, práctica y basada
                    en la evidencia científica, para que puedas despertar tu
                    mente y puedas vivir de manera extraordinaria.
                </p>
            </div>
        </section>
        <section class="features__container">
            <!-- FEATURES CONTAINER ****************************** -->
            <article>
                {{ prop.formation.duration }}<span>de formación</span>
            </article>
            <article>
                {{ prop.formation.type
                }}<span>{{ prop.formation.location }}</span>
            </article>
            <article>
                {{ formted_date }}<span>Inicio de formación</span>
            </article>
            <article>
                {{ prop.formation.users_enrolled.length
                }}<span>usuarios inscritos</span>
            </article>
            <article>
                {{ prop.formation.likes }}<span>usuarios que les gusta</span>
            </article>
            <article>{{ prop.formation.price }}€<span>inversión</span></article>
        </section>

        <section ref="inscription" class="cta__container">
            <!-- CTA CONTAINER ****************************** -->
            <div class="user-logged" v-if="user_store.token">
                <h3>
                    ¡Estás a un paso de inscribirte en la formación! Selecciona
                    tu método de pago y completa tu inscripción.
                </h3>
                <a
                    :href="formation.paypal_button"
                    target="_blank"
                    class="button__action"
                    >Pagar con tarjeta o paypal</a
                >
                <button
                    class="button__transparent"
                    @click="util_store.show_other_payment_method = true"
                >
                    Ver otros métodos de pago
                </button>
            </div>
            <div class="user-not-logged" v-else>
                <h2>
                    Por favor inicia sesión para poder inscribirte en la
                    formación
                </h2>
                <button
                    class="button__action"
                    @click="util_store.show_access_modal = true"
                >
                    Iniciar sesión
                </button>
            </div>
        </section>
    </main>
</template>

<style scoped lang="scss">
.page {
    padding: 0;

    .hero__container {
        height: 100vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4rem;
        gap: 0;
        box-sizing: border-box;

        .hero__content {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            box-sizing: border-box;

            h1 {
                margin-bottom: 1rem;
            }
            p {
                font-size: 1rem;
                margin-bottom: 1rem;
            }
        }

        .hero__image {
            width: 50%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0;
            box-sizing: border-box;

            img {
                width: 80%;
                height: 70vh;
                border-radius: 1rem;
                object-fit: cover;
            }
        }

        .hero__background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            object-fit: cover;
            z-index: -1;
        }
    }

    .why__container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 2rem 4rem;
        color: var(--color-white);
        background-color: var(--color-secondary);
        box-sizing: border-box;

        h2 {
            margin-top: 0;
        }

        p {
            line-height: 1.5;

            span {
                font-weight: 500;
                color: var(--color-accent);
            }
        }
    }

    .content__container {
        width: 100%;
        min-height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 2rem;
        box-sizing: border-box;

        h2 {
            margin-top: 0;
        }

        article {
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0;
            padding: 1rem;
            border-radius: 0.5rem;
            font-size: 1.5rem;
            box-shadow: 0 0 10px var(--color-dark-trans);
            box-sizing: border-box;

            h3 {
                margin: 0;
                cursor: pointer;
            }

            .learning {
                font-size: 1rem;
                margin: 0;
                padding: 1rem;
                box-sizing: border-box;
                transition: all 1.5s;

                &.hidden {
                    display: none;
                }

                &.show {
                    display: block;
                    animation: slideInFromUpAndAppear 1.5s;
                }
            }
        }
    }

    .about__container {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 2rem;
        padding: 2rem 4rem;
        color: var(--color-white);
        background-color: var(--color-secondary);
        box-sizing: border-box;

        .left-content {
            width: 40%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 100%;
                height: 90%;
                object-fit: cover;
                object-position: top;
                border-radius: 0.5rem;
            }
        }

        .right-content {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1rem;

            h2 {
                margin: 0;
            }

            p {
                font-size: 1rem;
                line-height: 1.5;
                margin: 0;
            }
        }
    }

    .features__container {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        gap: 2rem;
        padding: 6rem 4rem;
        box-sizing: border-box;

        article {
            min-width: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            border-radius: 1rem;
            font-size: 2.5rem;
            box-shadow: 0 0 10px var(--color-dark-trans);
            box-sizing: border-box;

            span {
                font-size: 0.8rem;
            }
        }
    }

    .cta__container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
        padding: 2rem;
        background: linear-gradient(
            0deg,
            var(--color-white) 0%,
            var(--color-primary-trans) 100%
        );
        box-sizing: border-box;

        .user-logged {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            gap: 2rem;
            padding: 2rem;
            box-sizing: border-box;

            h3 {
                width: 40%;
                margin: 0;
            }

            a {
                padding: 3rem 2rem;
            }

            button {
                padding: 3rem 2rem;
            }
        }

        .user-not-logged {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            padding: 2rem;
            box-sizing: border-box;

            h2 {
                margin: 0;
            }

            button {
                padding: 1rem 2rem;
            }
        }
    }
}

@keyframes slideInFromUpAndAppear {
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@media screen and (max-width: 768px) {
    .page {
        .hero__container {
            height: 100vh;
            flex-direction: column-reverse;
            justify-content: space-around;
            align-items: flex-start;
            margin: 0;
            gap: 0;
            padding: 4rem 0 0;

            .hero__content {
                width: 100%;
                padding: 0 2rem;
                justify-content: flex-start;
                align-items: flex-start;
                box-sizing: border-box;

                h1 {
                    font-size: 2rem;
                }

                p {
                    font-size: 1rem;
                }
            }

            .hero__image {
                width: 100%;
                padding: 0 0.5rem;
                box-sizing: border-box;

                img {
                    width: 100%;
                    height: 50vh;
                }
            }
        }

        .why__container {
            padding: 2rem 1rem;

            p {
                font-size: 1rem;
            }
        }

        .content__container {
            padding: 1rem;

            article {
                width: 100%;
                padding: 1rem;
                font-size: 1.5rem;

                h3 {
                    font-size: 1.5rem;
                }

                .learning {
                    font-size: 1rem;
                    padding: 1rem 0;
                }
            }
        }

        .about__container {
            flex-direction: column;
            gap: 2rem;
            padding: 2rem 1rem;

            .left-content {
                width: 100%;
                height: 50vh;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .right-content {
                width: 100%;
                gap: 1rem;
            }
        }

        .features__container {
            padding: 2rem 1rem;

            article {
                min-width: 100%;
                padding: 1rem;
                font-size: 2rem;
            }
        }

        .cta__container {
            padding: 2rem 1rem;

            .user-logged {
                flex-direction: column;
                gap: 2rem;

                h3 {
                    width: 100%;
                }

                a {
                    padding: 2rem;
                }

                button {
                    padding: 2rem;
                }
            }

            .user-not-logged {
                gap: 1rem;

                button {
                    padding: 1rem 2rem;
                }
            }
        }
    }
}
</style>
