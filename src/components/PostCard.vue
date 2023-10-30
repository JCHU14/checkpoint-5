<template>
    <div class="row align-items-center text-dark">


        <div class="col-5 p-5 text-center">
            <router-link :to="{ name: 'Profile', params: { profileId: postProp.creator.id } }">
                <img class="creatorPic rounded-circle box" :src="postProp.creator.picture" alt="">
            </router-link>
            <p class="fs-2">{{ postProp.creator.name }} <i v-if="postProp.creator.graduated == true"
                    class="mdi mdi-account-school"></i></p>
            <p class="fs-4">{{ postProp.createdAt.toLocaleTimeString() }}</p>
        </div>


        <div class="col-5 text-center m-5">


            <img v-if="postProp.imgUrl != undefined" class="boxImg box" :src="postProp.imgUrl" alt="">
            <p class="m-3 fs-4">{{ postProp.body }}</p>
        </div>
        <button v-if="account.id == postProp.creator.id" @click="destroyPost()"
            class="btn btn-danger col-2 text-center m-2">Delete
            Post</button>

        <div class="col-12 d-flex justify-content-end">

            <button @click="postLike()" class=" m-1 btn btn-danger mdi mdi-heart"></button>
            <div class=" m-1 fs-2">{{ postProp.likes.length }}</div>

        </div>


    </div>
</template>


<script>
import { computed } from 'vue';
import { Post } from '../models/Post';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { postsService } from '../services/PostsService';

export default {
    props: {
        postProp: { type: Post },
    },
    setup(props) {



        return {
            account: computed(() => AppState.account),



            async postLike() {

                try {
                    const postId = props.postProp.id;
                    logger.log(postId)
                    await postsService.postLike(postId)
                } catch (error) {
                    Pop.error(error)
                }
            },

            async destroyPost() {
                try {


                    const yes = await Pop.confirm('are you sure you want to delete');

                    if (!yes) {
                        return;
                    }

                    const postId = props.postProp.id;
                    logger.log(postId)
                    await postsService.destroyPost(postId)


                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.creatorPic {
    height: 20vh;
    width: 20vh;
    object-fit: cover;
    object-position: center;
}



.box {
    background-color: lightseagreen;
    border: 5px solid black;
}

.boxImg {
    height: 40vh;
    width: 40vh;
    object-fit: cover;
    object-position: center;
}
</style>