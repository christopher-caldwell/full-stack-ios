<template lang='pug'>
	span
</template>

<script>

import { mapActions } from 'vuex'

export default {
	Name: 'Logout',
	mounted(){
		this.endSession()
		this.$router.push('/login')
	},
	methods: {
		...mapActions('session', ['endSession'])
	}
}
</script>

<style lang='sass'>
.user-home-actions
	margin-top: 15%
.user-home-action
	margin-top: 5%
</style>