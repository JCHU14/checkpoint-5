import { AppState } from "../AppState.js";
import { Ad } from "../models/Ad.js";
import { Post } from "../models/Post.js";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService.js";



class PostsService {

    async getPosts() {
        const res = await api.get('api/posts')
        logger.log('got posts', res.data)
        AppState.posts = res.data.posts.map((post) => new Post(post))
    }


    async getAds() {
        const res = await api.get('api/ads')
        logger.log('got ads', res.data)
        AppState.ads = res.data.map(pojo => new Ad(pojo))

    }

    async postLike(postId) {
        const res = await api.post(`api/posts/${postId}/like`)
        logger.log('liked post', res.data)
    }


    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        logger.log('creating post', res.data)
        const newPost = new Post(res.data)
        AppState.posts.unshift(newPost)

    }


    async destroyPost(postId) {
        const res = await api.delete(`api/posts/${postId}`)
        logger.log('deleted post', res.data)
    }


    async getPostById(postId) {
        const res = await api.delete(`api/posts/${postId}`)
        logger.log('got post id', res.data)
        const newPost = new Post(res.data)
        AppState.activePost = newPost
    }
}

export const postsService = new PostsService();