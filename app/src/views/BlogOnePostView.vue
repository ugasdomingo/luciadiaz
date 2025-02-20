<script setup lang="ts">
//Import tools
import { onBeforeMount, onMounted, ref, computed } from 'vue';
import { usePostStore } from '@/stores/post-store';
import { useRoute } from 'vue-router';

//States
const blog_store = usePostStore();
const route = useRoute();
const post_id = ref(route.params.id);
const post = computed(() => blog_store.one_post);
const post_date = ref('');

//Functions
const get_date = () => {
    if (post.value != undefined) {
        post_date.value = new Date(post.value.createdAt).toLocaleDateString();
    } else {
        post_date.value = 'Cargando...';
    }
};

//life cycle hook
onBeforeMount(async () => {
    if (blog_store.all_posts.length == 0) {
        await blog_store.get_one_post(post_id.value as string);
    } else {
        const find_post = blog_store.all_posts.find(
            (post: any) => post._id == post_id.value
        );
        find_post
            ? (blog_store.one_post = find_post)
            : await blog_store.get_one_post(post_id.value as string);
    }
});

onMounted(() => {
    get_date();
});
</script>

<template>
    <main class="page">
        <section class="post__content">
            <h1>{{ post?.title }}</h1>
            <div v-html="post?.content"></div>
        </section>
        <aside class="post__info__container">
            <section class="post_info">
                <img :src="post?.cover_image.secure_url" alt="cover5" />
                <ul>
                    <li>
                        Author <span>{{ post?.author }}</span>
                    </li>
                    <li>
                        Publicado el <span>{{ post_date }}</span>
                    </li>
                    <li>Le gusta a {{ post?.likes }} personas</li>
                </ul>
                <video :src="post?.video_url" v-if="post?.video_url"></video>
            </section>
            <section class="post_relation"></section>
        </aside>
    </main>
</template>

<style scoped lang="scss">
.page {
    .post__content {
        width: 70%;
        h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
    }

    .post__info__container {
        width: 25%;
        position: absolute;
        top: 6rem;
        right: 4rem;
        box-sizing: border-box;

        .post_info {
            margin-bottom: 2rem;

            img {
                width: 100%;
                height: 150px;
                object-fit: cover;
                margin-bottom: 0;
            }

            ul {
                list-style: none;
                li {
                    font-size: 1rem;
                    margin-bottom: 1rem;
                    span {
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>
