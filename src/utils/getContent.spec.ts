import { getContent } from "./getContent"

describe('#getContent', () => { 
    it('Should return the html of the profile', async () => {
        const $ = await getContent('twitter')
        const username = $('.profile-card-username').text()
        expect(username.length).toBeGreaterThan(0)
    })
 })