export class Post {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.createdAt = new Date(data.updatedAt)
        this.creator = data.creator
        this.url = data.url
        this.likes = data.likes
    }

}