import service from '@/services/user'
import { getItemFromLocalStorage, writeToLocalStorage } from '@/utils/localStorage'

export default {
	namespaced: true,
	state: {
		role: '',
		givenName: '',
		familyName: '',
		pictureUrl: null,
		locale: 'en',
		email: '', 
		id: '',
	},
	getters: {
		allowedRoutes(state){
			return state.allowedRoutes
		},
		usersName(state){
			if(state.givenName && state.familyName){
				return state.givenName + ' ' + state.familyName
			} else {
				return ''
			}
		},
		pictureUrl(state){
			return state.pictureUrl
		}
	},
	actions: {
		async registerUser({ commit, dispatch }, payload){
			const { userInformation, token } = await service.register(payload)
			dispatch('session/beginNewSession', token, { root: true })
			commit('UPDATE_USER', userInformation)
		},
		async googleOauth({ commit, dispatch }, { codeToSend, isLogin }){
			const { userInformation, token } = isLogin
				? await service.googleOauthLogin(codeToSend)
				: await service.googleOauthRegister(codeToSend)
				dispatch('session/beginNewSession', token, { root: true })
			commit('UPDATE_USER', userInformation)
		},
		async standardLogin({ commit, dispatch }, payload){
			const { userInformation, token } = await service.login(payload)
			dispatch('session/beginNewSession', token, { root: true })
			commit('UPDATE_USER', userInformation)
		},
		restoreUserToStore({ commit }){
			const prevUser = getItemFromLocalStorage('user')
			if(prevUser){
				commit('UPDATE_USER', prevUser)
			}
		}
	},
	mutations: {
		UPDATE_USER(state, userInformation){
			Object.keys(userInformation).forEach(key => {
				state[key] = userInformation[key]
			})
			writeToLocalStorage('user', userInformation)
		}
	}
}