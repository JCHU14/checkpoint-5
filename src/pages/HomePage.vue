<template>
  <div class="container-fluid">


    <div class="row justify-content-center">


      <h1 class="text-center">
        <button class="btn shadow m-5 fs-3 text-center box" v-if="account.id" type="button" title="Open Post Form"
          data-bs-toggle="modal" data-bs-target="#postFormModal">Make Post</button>
      </h1>

      <div v-for="ad in ads" :key="ad.id" class="col-6 text-center">
        <img class="boxImg box" :src="ad.square" alt="">
      </div>

      <div v-for="post in posts" :key="post.id" class="col-8 m-5 box">

        <PostCard :postProp="post" />

      </div>

    </div>

  </div>

  <PostCreateForm />
</template>

<script>
import { computed, onMounted } from 'vue';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue';
import PostCreateForm from '../components/PostCreateForm.vue';



export default {

  setup() {





    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error);
      }
    }

    async function getAds() {
      try {
        await postsService.getAds();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    onMounted(() => {
      getPosts();
      getAds()
    });
    return {
      posts: computed(() => AppState.posts),
      ads: computed(() => AppState.ads),
      account: computed(() => AppState.account),



    };
  },
  components: { PostCard, PostCreateForm }
}
</script>

<style scoped lang="scss">
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
