<script setup lang="ts">
//Import tools
import { ref, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user-store';

//Import components
import ShowUserComponent from './ShowUserComponent.vue';

//States
const user_store = useUserStore();
const text_to_filter = ref('');
const show_users = ref();
const show_users_data = ref(false);
const uid = ref('');

//Methods
const camel_sentence = (str: string) => {
    return (' ' + str)
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
            console.log(match);
            return chr.toUpperCase();
        });
};

const filter_users = (textFilter: any) => {
    show_users.value = user_store.users.filter((user: any) => {
        return camel_sentence(user.name).includes(camel_sentence(textFilter));
    });
};

//Lifecycle
onBeforeMount(async () => {
    await user_store.get_all_users();
    show_users.value = user_store.users;
});
</script>

<template>
    <div class="get-users">
        <section class="select-user">
            <input
                type="text"
                v-model="text_to_filter"
                @keyup="filter_users(text_to_filter)"
                placeholder="Nombre de paciente"
            />
            <p
                v-for="user in show_users"
                :key="user._id"
                @click="
                    (user_store.user_id = user._id),
                        user_store.get_data_by_admin(),
                        (text_to_filter = ''),
                        (show_users = []),
                        (show_users_data = true),
                        (uid = user._id)
                "
            >
                {{ user.name }}
            </p>
        </section>
        <section class="user-data" v-if="show_users_data">
            <ShowUserComponent :user_id="uid" />
        </section>
    </div>
</template>

<style scoped lang="scss">
.get-users {
    width: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    top: 2rem;

    .select-user {
        width: 35%;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        overflow-y: hidden;

        input {
            width: 80%;
        }

        p {
            cursor: pointer;
            width: 80%;
            padding: 1rem;
            margin: 0;
            border-radius: 1rem;
            background-color: var(--color-primary-trans);
            border: 1px solid var(--color-primary);
            transition: background-color 0.3s;

            &:hover {
                background-color: var(--color-secondary);
                color: var(--color-white);
                transform: scale(1.05);
            }
        }
    }

    .user-data {
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        .personal-info {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            h2 {
                width: 100%;
                font-size: 1.5rem;
                margin: 0;
                border-top: 1px solid var(--color-primary);
                border-bottom: 1px solid var(--color-primary);
                text-align: center;
            }

            p {
                margin: 0.5rem 0;
            }
        }
    }
}
</style>
