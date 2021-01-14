<template>
	<div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
		<table class="info-size" v-for="(table,index) in paramInfo.sizes" :key="index">
			<tr v-for="(tr,index) in table" :key="index">
				<td v-for="(td,index) in tr" :key="index">{{ td }}</td>
			</tr>
		</table>
		<table class="info-param">
			<tr v-for="item in paramInfo.infos" :key="item.key">
				<td class="info-param-key">{{ item.key }}</td>
				<td class="info-param-value">{{ item.value }}</td>
			</tr>
		</table>
		<div class="info-img" v-if="paramInfo.image">
			<img :src="paramInfo.image" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		name:'DetailParamInfo',
		props: {
			paramInfo: {
				type: Object,
				default: () => {}
			}
		}
	}
</script>

<style scoped lang="scss">
.param-info {
	padding: 20px 15px;
	border-bottom:5px solid $border-lighter;
	font-size:14px;

	table {
		width:100%;
		border-collapse: collapse;

		tr {
			height: 42px;

			td {
				border-bottom:1px solid $border-grey;
			}
		}
	}
	.info-param {
		border-top: 1px solid $border-black;

		.info-param-key {
			/*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
			width:95px;
		}
		.info-param-value {
			color: $text-pink;
		}
	}
	.info-img img {
		width:100%;
	}
}
</style>