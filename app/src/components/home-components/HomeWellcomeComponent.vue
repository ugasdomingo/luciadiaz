<script setup lang="ts"></script>

<template>
    <section class="wellcome">
        <div class="wellcome__decoration">
            <img
                src="https://res.cloudinary.com/minteados/image/upload/v1737180498/Lucia/Lucia_y9pfhb.png"
                alt="foto lucia"
            />
            <section class="content">
                <h3>
                    Te doy 4 herrramientas, un sólo objetivo:<br />
                    hacer tu vida extraordinaria
                </h3>
                <p>¿Cómo funciona mi página web?</p>
                <ul>
                    <li>Los tests y formaciones te nutrirán de herramientas</li>
                    <li>El blog te permitirá profundizar conocimiento</li>
                    <li>
                        Con las terapias podré acompañarte y ayudarte durante
                        todo tu proceso
                    </li>
                </ul>
            </section>
        </div>
    </section>
</template>

<style scoped lang="scss">
.wellcome {
    width: 100%;
    height: 70vh;
    display: flex;
    align-items: flex-end;
    padding: 6rem 0 0;
    margin: 0;
    box-sizing: border-box;

    .wellcome__decoration {
        width: 100%;
        max-height: 600px;
        height: 50vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 0;
        padding: 0 0 0 2rem;
        margin: 0;
        background-color: var(--color-secondary);
        border-radius: 5rem 0 5rem 0;
        box-sizing: border-box;

        img {
            height: 250px;
            border-radius: 0.5rem;
            object-fit: cover;
        }
        .content {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.5rem 0 0.5rem 2rem;
            margin: 0;
            h3 {
                margin: 0 0 1rem;
                color: var(--color-white);
                font-weight: 600;
            }
            p {
                width: 80%;
                margin: 0;
                opacity: 0.7;
                font-weight: bold;
                color: var(--color-accent);
            }
            ul {
                width: 80%;
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin: 0;
                padding: 0;
                list-style: outside;
                color: var(--color-white);

                li {
                    opacity: 0.7;
                    color: var(--color-white);
                }
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .wellcome {
        padding: 0;
        margin: 0;
        height: fit-content;

        .wellcome__decoration {
            width: 100%;
            max-height: fit-content;
            flex-direction: column;
            gap: 1rem;
            padding: 4rem 1rem;
            border-radius: 0;

            img {
                height: 200px;
                width: 100%;
                border-radius: 1rem;
            }
            .content {
                width: 100%;
                padding: 0 1rem;
                border-radius: 0;
                border-radius: 0;
                h3 {
                    font-size: 2rem;
                }
                p {
                    width: 100%;
                    font-size: 1rem;
                }
                ul {
                    width: 100%;
                    gap: 0.5rem;
                    padding-left: 1rem;
                    li {
                        font-size: 0.9rem;
                    }
                }
            }
        }
    }
}
</style>
