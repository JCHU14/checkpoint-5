<template>
  <div class="about text-center row justify-content-center">
    <h1>Hello {{ account.name }}</h1>
    <img class="rounded text-center" :src="account.picture" :alt="account.name" />
    <p>{{ account.email }}</p>
  </div>

  <div class="row text-center justify-content-center">
    <form @submit.prevent="editAccount()" class="col-5 p-5">
      <div class=" fs-2 mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" v-model="editable.name" class="form-control" id="name" aria-describedby="name" />
      </div>

      <div class="fs-2 mb-3">
        <label for="picture" class="form-label">Picture</label>
        <input v-model="editable.picture" type="url" class="form-control" id="picture" />
      </div>

      <div class="fs-2 mb-3">
        <input type="checkbox" id="graduated" name="graduated" v-model="editable.graduated">
        <label for="graduated">Graduated</label><br>
      </div>

      <div class="fs-2 mb-3">
        <label for="coverImg" class="form-label">Cover Image</label>
        <input v-model="editable.coverImg" type="url" class="form-control" id="coverImg" />
      </div>

      <div class="fs-2 mb-3">
        <label for="github" class="form-label">GitHub</label>
        <input v-model="editable.github" type="url" class="form-control" id="github" />
      </div>

      <div class="fs-2 mb-3">
        <label for="linkedin" class="form-label">LinkedIn</label>
        <input v-model="editable.linkedin" type="url" class="form-control" id="linkedin" />
      </div>

      <div class="fs-2 mb-3">
        <label for="resume" class="form-label">Resume</label>
        <input v-model="editable.resume" type="url" class="form-control" id="resume" />
      </div>

      <div class="fs-2 mb-3">
        <label for="bio" class="form-label">Bio</label>
        <textarea v-model="editable.bio" type="text" class="form-control" id="bio" />
      </div>

      <div class="fs-2 mb-3">
        <label for="class" class="form-label">Class</label>
        <textarea v-model="editable.class" type="text" class="form-control" id="class" />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

  </div>

  <div class="row p-3">

    <div v-for="ad in ads" :key="ad.id" class="col-6 p-3 text-center">
      <img class="boxImg box" :src="ad.square" alt="">
    </div>

  </div>
</template>



<script>
import { computed, onMounted, ref, watchEffect } from "vue";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const editable = ref({});

    onMounted(() => {
      getAds();
    })

    watchEffect(() => {
      logger.log("watch effect in use");
      editable.value = AppState.account;
    });

    async function getAds() {
      try {
        await postsService.getAds();
      }
      catch (error) {
        Pop.error(error);
      }
    }

    return {
      editable,
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads),

      async editAccount() {
        try {
          const accountData = editable.value;
          logger.log("editing account", accountData);
          await accountService.editAccount(accountData);
        } catch (error) {
          logger.error("edit account error", error);
          Pop.error("account error", error.message);
        }
      },


    };
  },
};
</script>

<style scoped>
img {
  max-width: 40vh;
}
</style>