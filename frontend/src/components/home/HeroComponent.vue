<script setup lang="ts"></script>

<template>
    <main>
        <img
            src="https://img.freepik.com/free-photo/blurred-abstract-background-interior-view-looking-out-toward-empty-office-lobby-entrance-doors-glass-curtain-wall-with-frame_1339-6364.jpg?w=740&t=st=1694330014~exp=1694330614~hmac=3a1f9cc584b512a43bd2eadc22f5387edcdc86f374770098d5bc9f3f36c59b51"
            alt="img grande"
            class="hero-big-img"
        />
        <section class="left-content">
            <div>
                <img src="src/assets/logo-med.png" alt="" class="logo" />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque, expedita.
                </p>
                <RouterLink to="/despertando">¡Quiero Comenzar!</RouterLink>
            </div>
        </section>
        <section class="right-content">
            <img src="image/foto-brazos.webp" alt="foto-lucia" class="lucia" />
        </section>
    </main>
</template>

<style scoped lang="scss">
main {
    display: flex;
    justify-content: space-between;
    height: 100vh;
    padding: 0 4rem;
    box-sizing: border-box;
    position: relative;
}
.hero-big-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

.left-content {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    div {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        box-sizing: border-box;
        padding: 1rem;
        border-radius: 0.5rem;

        .logo {
            width: 60%;
        }

        p {
            width: 80%;
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--color-accent);
            margin: 0;
        }

        a {
            width: 50%;
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--color-white);
            background-color: var(--color-accent);
            text-decoration: none;
            text-align: center;
            padding: 0.5rem 0;
            border-radius: 0.5rem;
            margin: 2rem 0 0;
        }

        a:hover {
            background-color: var(--color-secondary);
        }
    }
}

.right-content {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: end;
    box-sizing: border-box;

    h2 {
        font-size: 3rem;
        font-weight: 700;
        color: #000;
        margin: 0;
    }
}

.lucia {
    max-width: 100%;
    height: 90%;
    object-fit: cover;
}

@media screen and (max-width: 768px) {
    main {
        flex-direction: column;
        height: auto;
    }

    .left-content {
        width: 100%;
        align-items: center;
        text-align: center;
    }

    .right-content {
        width: 100%;
    }
}
</style>
