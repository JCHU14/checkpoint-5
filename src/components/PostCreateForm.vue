<template>
    <div class="modal fade" id="postFormModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form @submit.prevent="handleForm()">



                        <div class="mb-3">
                            <label for="imgUrl" class="form-label">ImgUrl</label>
                            <input v-model="editable.imgUrl" type="url" class="form-control" id="imgUrl" maxlength="500">
                        </div>


                        <div class="mb-3">
                            <label for="body" class="form-label">Body</label>
                            <textarea v-model="editable.body" maxlength="500" class="form-control" id="body" required
                                rows="3"></textarea>
                        </div>



                        <div class="text-end">
                            <button class="btn btn-success" type="submit">Submit</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue';
import { Modal } from 'bootstrap';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';


export default {
    setup() {
        const editable = ref({})

        return {
            editable,

            handleForm() {

                this.createPost()

            },
            async createPost() {
                try {
                    const postData = editable.value
                    await postsService.createPost(postData)

                    editable.value = {}

                    Modal.getOrCreateInstance('#postFormModal').hide()
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>