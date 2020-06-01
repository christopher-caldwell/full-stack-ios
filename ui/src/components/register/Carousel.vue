<template lang='pug'>
	div
		v-stepper
			v-stepper-header
				v-stepper-step(step="1") Email	
				v-stepper-step(step="2") Name
		v-row
			v-carousel(
				v-model="model"
				hide-delimiters
				:show-arrows="false"
				height='50%'
				:continuous="false"
			)
				slot

</template>

<script>
export default {
	name: 'Carousel',
	data(){
		return {
			items: [
				{
					text: 'Dashboard',
					disabled: false,
					href: 'breadcrumbs_dashboard',
				},
				{
					text: 'Link 1',
					disabled: false,
					href: 'breadcrumbs_link_1',
				},
				{
					text: 'Link 2',
					disabled: true,
					href: 'breadcrumbs_link_2',
				},
			],
			model: 0,
		}
	}
}
</script>

<style lang='sass'>
</style>