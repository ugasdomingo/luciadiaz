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
/* const show_learning_three = ref<boolean>(false); */
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
        <!-- <section class="why__container">
            WHY CONTAINER ******************************
            <h2>¿Para qué creé esta formación?</h2>
            <p>
                Me he tomado el tiempo para crear esta formación dirigida a
                aquellos padres y madres que han tomado la determinación de
                salir del bucle salvaje de la vida actual y, valientemente, han
                decidido sanar su propia historia emocional para brindar una
                opción completamente distinta a sus hijos. Con una mirada
                enfocada hacia el respeto, la comprensión, el acompañamiento y
                la validación hacia los más pequeños. Mamá y papá, si me
                acompañan en este viaje sentirás en algunos momentos de esta
                experiencia que estarás dando tus primeros pasos, ya que estarás
                desafiando tu propio sistema de creencias, cuestionando lo que
                toda una vida llevas afirmando que es “así”, porque es lo que te
                han enseñado.
            </p>
            <p>
                Esa es mi intención, que puedas primero encontrarte contigo
                mismo, de esa manera podrás ajustar tus expectativas, conocer y
                ver de una manera distinta a tu pequeño. ¡Porque sí!, tu peque
                todos los días amanece diferente y tu labor como cuidador y
                protector es conocer sus diferentes etapas para seguir
                guiandole. Brindarle apoyo en la búsqueda de su autonomía y
                construcción de su propio autoconcepto. Vamos, se que lo harás
                increible. Te espero para que juntos cambiemos tu historia
                familiar.
            </p>
        </section> -->
        <section class="conclution__container">
            <!-- CONCLUTION CONTAINER ****************************** -->
            <p>
                Alguna vez te has preguntado ¿por qué repites patrones en tus
                relaciones? ¿O por qué algunas personas parecen tener relaciones
                tan diferentes a las tuyas? La forma en que nos relacionamos de
                adultos, está directamente conectada con nuestras primeras
                experiencias de vida, a esto podemos darle el nombre de apego,
                que puede explicar la relación que se genera desde el primer
                contacto con la madre o figuras de cuidado en nuestra infancia y
                que arrastramos a lo largo de nuestra vida.
            </p>
            <p>
                En resumen, según haya sido tu relación con tus padres ha
                determinado el 80% (por no exagerar) de lo que hoy en día vives
                en tus relaciones. Has consciencia de cómo te sientes al leer
                esta sentencia, pero no pasa nada, en esta vida siempre
                tendremos la oportunidad de modificar nuestras creencias,
                conductas y la manera en que interpretamos nuestras emociones
            </p>
            <p>
                De mi mano, podrás descubrir entre los cuatro tipo de apego
                descritos en la literatura en cúal te mueves en tu diario vivir.
                Cómo se manifiestan en cada área de tu vida y esas cositas que
                te incomodan o no te agradan tendrás la habilidad para
                mejorarlas paso a paso.
            </p>
            <p>Con amor, Lucia Diaz</p>
        </section>
        <section class="content__container">
            <!-- CONTENT CONTAINER ****************************** -->
            <h2>¿Qué te llevarás en esta formación?</h2>
            <article>
                <h3 @click="show_learning_one = !show_learning_one">
                    Una guía sobre el apego.
                </h3>
                <p
                    class="learning"
                    :class="show_learning_one ? 'show' : 'hidden'"
                >
                    Con información clara y precisa sobre los cuatro estilos de
                    apego y cómo gestionarlos en tu vida diaria.
                </p>
            </article>
            <article>
                <h3 @click="show_learning_two = !show_learning_two">
                    Un pequeño recorrido en tu historia emocional
                </h3>
                <p
                    class="learning"
                    :class="show_learning_two ? 'show' : 'hidden'"
                >
                    De esta manera, podremos revisar el estilo de apego que
                    desarrollaste en tu infancia y ha hecho de ti lo que ahora
                    conoces.
                </p>
            </article>
            <!-- <article>
                <h3 @click="show_learning_three = !show_learning_three">
                    Establecer límites saludables
                </h3>
                <p
                    class="learning"
                    :class="show_learning_three ? 'show' : 'hidden'"
                >
                    Manteniendo la autoridad sin crear distancia emocional.
                    Recuerda, hay decisiones que solo pueden tomar los adultos.
                    Y hay opciones que podemos facilitar a los más pequeños para
                    lograr el objetivo que les planteamos como adultos.
                </p>
            </article> -->
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
                    familiar, y profundizando desde hace 4 años en el
                    acompañamiento emocional de niños y adolescentes, he
                    comprobado cómo, con sólo saber tu estilo de apego y tu
                    forma de relacionarte, puedes evitarte muchas tragos amargos
                    y dificultades innecesarias en tu vida.
                </p>
            </div>
        </section>
        <section ref="inscription" class="cta__container">
            <!-- CTA CONTAINER ****************************** -->
            <div class="user-logged" v-if="user_store.token">
                <h3>
                    ¡Estás a un paso de inscribirte en la formación! Selecciona
                    tu método de pago y completa tu inscripción.
                </h3>
                <RouterLink
                    to="/formaciones/confirmado/enrollment/FOR-001"
                    class="button__action"
                    >Inscribirme en la Formación</RouterLink
                >
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

    .conclution__container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 4rem 4rem;
        color: var(--color-white);
        background-color: var(--color-secondary);
        box-sizing: border-box;

        p {
            font-size: 1rem;
            margin: 0;
        }

        span {
            color: var(--color-accent);
            font-weight: bold;
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
            var(--color-secondary-trans) 10%,
            var(--color-secondary) 100%
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
            color: var(--color-white);
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
