<template>
    <div class="container-fluid background">
        <div v-if="profile" class="row">
            <div class="col-12 p-5">
                <img class="backImg" :src="profile.coverImg" alt="">
            </div>
            <div class="row">
                <div class="col-12 text-center">
                    <img class="rounded-circle creatorImg box p-2 m-3" :src="profile.picture" alt="">

                    <p class="fs-2">{{ profile.name }}</p>

                    <h1 v-if="profile.graduated == true" class="mdi mdi-account-school fs-2">
                    </h1>

                    <p v-if="profile.class != ''" class="fs-3"> Class: {{ profile.class }}</p>

                    <p v-if="profile.bio != ''" class="fs-5"> Bio: {{ profile.bio }}</p>

                    <div>
                        <a v-if="profile.github != ''" :href="profile.github" :title="`${profile.name} Github Account`"><i
                                class="mdi fs-1 mdi-github"></i></a>

                        <a v-if="profile.resume != ''" :href="profile.resume" :title="`${profile.name} Resume`"><i
                                class="mdi fs-1 mdi-file"></i></a>

                        <a v-if="profile.linkedin != ''" :href="profile.linkedin" :title="`${profile.name} LinkedIn`"><i
                                class="mdi fs-1 mdi-linkedin"></i></a>

                    </div>
                </div>
            </div>
            <div class="row justify-content-center p-5">

                <div class=" col-7 p-5 m-5 text-center box" v-for="post in posts" :key="post.id">
                    <PostCard :postProp="post" />

                </div>

            </div>


            <div v-for="ad in ads" :key="ad.id" class="col-6 p-3 text-center">
                <img class="boxImg box" :src="ad.square" alt="">
            </div>

        </div>

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import { profileService } from '../services/ProfileService.js';
import { useRoute } from "vue-router"
import Pop from '../utils/Pop';
import PostCard from '../components/PostCard.vue';
import { postsService } from '../services/PostsService';


export default {
    setup() {
        onMounted(() => {
            getProfile();
            getPostsByProfile();
            getAds();
        });

        async function getAds() {
            try {
                await postsService.getAds();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getPostsByProfile() {
            try {
                const profileId = route.params.profileId;
                await profileService.getPostsByProfile(profileId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        const route = useRoute();
        async function getProfile() {
            const profileId = route.params.profileId;
            logger.log(profileId);
            await profileService.getProfile(profileId);
        }
        return {
            profile: computed(() => AppState.profile),
            posts: computed(() => AppState.posts),
            ads: computed(() => AppState.ads),
        };
    },
    components: { PostCard }
};
</script>


<style lang="scss" scoped>
.creatorImg {
    height: 10rem;
    width: 10rem;

}

.background {
    background-color: lightblue;
}

.box {
    background-color: lightseagreen;
    border: 5px solid black;
}

.backImg {
    object-fit: cover;
    object-position: center;
    height: 60vh;
    width: 100%;
    border: 8px solid black;

}

.boxImg {
    height: 40vh;
    width: 40vh;
    object-fit: cover;
    object-position: center;
}
</style>