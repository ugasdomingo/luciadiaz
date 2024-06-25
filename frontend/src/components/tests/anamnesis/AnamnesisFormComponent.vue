<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../stores/user-store';
import { useTestStore } from '../../../stores/test-store';
import { useUtilStore } from '../../../stores/util-store';

//Import questions
import { anamnesisQuestions } from './anamnesisQuestions';

//Activate tools
const router = useRouter();
const userStore = useUserStore();
const testStore = useTestStore();
const utilStore = useUtilStore();

//Data for loggin or register
const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const politiquesAcepted = ref(false);

//Data for anamnesis
const kidsName = ref('');
const edad = ref('');
const pregunta1 = ref('');
const pregunta2 = ref('');
const pregunta3 = ref('');
const pregunta4 = ref('');
const pregunta5 = ref('');
const pregunta6 = ref('');
const pregunta7 = ref('');
const pregunta8 = ref('');
const pregunta9 = ref('');
const pregunta10 = ref('');
const pregunta11 = ref('');
const pregunta12 = ref('');
const pregunta13 = ref('');
const pregunta14 = ref('');
const pregunta15 = ref('');
const pregunta16 = ref('');
const pregunta17 = ref('');
const pregunta18 = ref('');
const pregunta19 = ref('');
const pregunta20 = ref('');
const pregunta21 = ref('');

//Submit form
const submitForm = async () => {
    try {
        utilStore.isLoading = true;

        const formData = {
            kidsName: kidsName.value,
            edad: edad.value,
            pregunta1: pregunta1.value,
            pregunta2: pregunta2.value,
            pregunta3: pregunta3.value,
            pregunta4: pregunta4.value,
            pregunta5: pregunta5.value,
            pregunta6: pregunta6.value,
            pregunta7: pregunta7.value,
            pregunta8: pregunta8.value,
            pregunta9: pregunta9.value,
            pregunta10: pregunta10.value,
            pregunta11: pregunta11.value,
            pregunta12: pregunta12.value,
            pregunta13: pregunta13.value,
            pregunta14: pregunta14.value,
            pregunta15: pregunta15.value,
            pregunta16: pregunta16.value,
            pregunta17: pregunta17.value,
            pregunta18: pregunta18.value,
            pregunta19: pregunta19.value,
            pregunta20: pregunta20.value,
            pregunta21: pregunta21.value,
        };

        if (userStore.token) {
            await testStore.createTestResult('Anamnesis', formData);
        } else {
            await userStore.register(
                name.value,
                email.value,
                phone.value,
                password.value,
                politiquesAcepted.value,
            );

            await testStore.createTestResult('Anamnesis', formData);

            utilStore.displayAlert('¡Registro exitoso!', 'success');

            router.push('/espacio-personal');
        }
    } catch (error) {
        console.log(error);
    } finally {
        utilStore.isLoading = false;
    }
};
</script>

<template>
    <form @submit.prevent="submitForm">
        <h3 v-if="userStore.token">Hola {{ userStore.user.split(' ')[0] }}</h3>
        <div class="user-data" v-else>
            <input v-model="name" placeholder="Nombre" />
            <input v-model="email" placeholder="Correo electrónico" />
            <input v-model="phone" placeholder="Teléfono" />
            <input v-model="password" placeholder="Contraseña" />
        </div>
        <input v-model="kidsName" :placeholder="anamnesisQuestions[0].label" />
        <input v-model="edad" :placeholder="anamnesisQuestions[1].label" />
        <input v-model="pregunta1" :placeholder="anamnesisQuestions[2].label" />
        <input v-model="pregunta2" :placeholder="anamnesisQuestions[3].label" />
        <input v-model="pregunta3" :placeholder="anamnesisQuestions[4].label" />
        <input v-model="pregunta4" :placeholder="anamnesisQuestions[5].label" />
        <input v-model="pregunta5" :placeholder="anamnesisQuestions[6].label" />
        <input v-model="pregunta6" :placeholder="anamnesisQuestions[7].label" />
        <input v-model="pregunta7" :placeholder="anamnesisQuestions[8].label" />
        <input v-model="pregunta8" :placeholder="anamnesisQuestions[9].label" />
        <input
            v-model="pregunta9"
            :placeholder="anamnesisQuestions[10].label"
        />
        <input
            v-model="pregunta10"
            :placeholder="anamnesisQuestions[11].label"
        />
        <input
            v-model="pregunta11"
            :placeholder="anamnesisQuestions[12].label"
        />
        <input
            v-model="pregunta12"
            :placeholder="anamnesisQuestions[13].label"
        />
        <input
            v-model="pregunta13"
            :placeholder="anamnesisQuestions[14].label"
        />
        <input
            v-model="pregunta14"
            :placeholder="anamnesisQuestions[15].label"
        />
        <input
            v-model="pregunta15"
            :placeholder="anamnesisQuestions[16].label"
        />
        <input
            v-model="pregunta16"
            :placeholder="anamnesisQuestions[17].label"
        />
        <input
            v-model="pregunta17"
            :placeholder="anamnesisQuestions[18].label"
        />
        <input
            v-model="pregunta18"
            :placeholder="anamnesisQuestions[19].label"
        />
        <input
            v-model="pregunta19"
            :placeholder="anamnesisQuestions[20].label"
        />
        <input
            v-model="pregunta20"
            :placeholder="anamnesisQuestions[21].label"
        />
        <input
            v-model="pregunta21"
            :placeholder="anamnesisQuestions[22].label"
        />

        <div class="politiques">
            <input
                v-model="politiquesAcepted"
                type="checkbox"
                class="checkbox"
            />
            <p>Acceptar políticas de privacidad y tratamiento de datos</p>
            <RouterLink to="/politicas" class="politicas">
                Ver políticas
            </RouterLink>
        </div>
        <button type="submit" v-if="politiquesAcepted" class="action-btn">
            Enviar
        </button>
        <button class="disable-btn" disabled v-else>Enviar</button>
    </form>
</template>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    min-height: 100vh;
    padding: 2rem;
    box-sizing: border-box;

    h3 {
        color: var(--color-primary);
        margin: 0 0 2rem;
    }

    .user-data {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        background-color: var(--color-primary-light);

        input {
            width: 100%;
            height: 50px;
            margin-bottom: 20px;
            padding: 0 20px;
            border: 1px solid var(--color-black);
            border-radius: 5px;
            font-size: 16px;
            font-weight: 500;
            color: #000;
            outline: none;
        }
    }

    input {
        width: 100%;
        height: 50px;
        margin-bottom: 20px;
        padding: 0 20px;
        border: 1px solid var(--color-black);
        border-radius: 5px;
        font-size: 16px;
        font-weight: 500;
        color: var(--color-black);
        outline: none;
    }

    .politiques {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        width: 100%;
        margin-bottom: 1.5rem;

        input {
            margin-right: 10px;
            width: 30px;
            height: 30px;
            margin: 0;
            padding: 0;
        }

        p {
            font-size: 16px;
            font-weight: 500;
            color: #000;
        }

        .politicas {
            font-size: 16px;
            font-weight: 500;
        }
    }

    .action-btn {
        width: 100%;
        height: 50px;
        margin-bottom: 20px;
        padding: 0 20px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 500;
        color: #fff;
        background-color: var(--color-primary);
        outline: none;
        cursor: pointer;
    }

    .disable-btn {
        width: 100%;
        height: 50px;
        margin-bottom: 20px;
        padding: 0 20px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 500;
        color: #fff;
        background-color: #000;
        opacity: 0.5;
        outline: none;
        cursor: not-allowed;
    }
}
</style>
