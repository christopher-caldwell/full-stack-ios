import client from '@/client'

export default {
  async register({ emailAddress, password, userInformation }) {
		const registerParams = { emailAddress, password, userInformation }
		const { data } = await client.post('/user/register', registerParams)
		return data
  },
  async login({ emailAddress, password }) {
		const { data } = await client.post('/user/login', { emailAddress, password })
		return data
	},
	async googleOauthRegister(codeToSend){
		const { data } = await client.post('/register/oauth/google', { idToken: codeToSend })
		return data
	},
	async googleOauthLogin(codeToSend){
		const apiRes = await client.post('/login/oauth/google', { idToken: codeToSend })
		console.log('api res', apiRes)
		return apiRes.data
	}
}
