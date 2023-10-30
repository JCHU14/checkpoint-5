import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfileService {
    async getProfile(profileId) {
        AppState.profile = null
        const res = await api.get(`api/profiles/${profileId}`)
        logger.log(res.data)
        AppState.profile = new Profile(res.data)
    }

    async getPostsByProfile(profileId) {
        logger.log(`profile id: ${profileId}`)
        const res = await api.get(`api/profiles/${profileId}/posts`)
        logger.log('got posts by id', res.data)
        AppState.posts = res.data.posts.map((post) => new Post(post))
    }
}

export const profileService = new ProfileService