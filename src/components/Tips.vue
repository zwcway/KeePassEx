<!-- TIPS is a UI for helping the user learn to navigate Tusk -->
<template>
	<div class="box-bar selectable" v-on:click="$router.goBack">
		<span>
      <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
      {{ message }}
    </span>
	</div>
</template>

<script>
	export default {
		props: {
            settings: Object
        },
        data () {
            return {}
        },
        mounted() {
            // 
        }
	}
</script>

<style lang="scss">
	@import "../styles/settings.scss";
</style>