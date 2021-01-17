<template>
	<div class="params-info" v-if="Object.keys(paramsInfo).length !== 0">
		<table class="info-size" v-for="(table,index) in paramsInfo.sizes" :key="index">
			<tr v-for="(tr,indey) in table" :key="indey">
				<td v-for="(td,indez) in tr" :key="indez">{{ td }}</td>
			</tr>
		</table>
		<table class="info-params">
			<tr v-for="item in paramsInfo.infos" :key="item.key">
				<td class="info-params-key">{{ item.key }}</td>
				<td class="info-params-value">{{ item.value }}</td>
			</tr>
		</table>
		<div class="info-img" v-if="paramsInfo.image">
			<img :src="paramsInfo.image" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		name:'DetailParamsInfo',
		props: {
			paramsInfo: {
				type: Object,
				default: () => {}
			}
		}
	}
</script>

<style scoped lang="scss">
.params-info {
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
	.info-params {
		border-top: 1px solid $border-black;

		.info-params-key {
			/*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
			width:95px;
		}
		.info-params-value {
			color: $text-pink;
		}
	}
	.info-img img {
		width:100%;
	}
}
</style>