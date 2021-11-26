<template>
  <div class="input-number large" :class="size">
    <span class="decrease" @click="decrease">-</span>
    <span class="increase" @click="increase" :class="{ disabled: this.number === this.maxNum }">+</span>
    <div class="input">
      <input type="text" v-model="number" @input="handleNumber" @change="formatNumber" />
    </div>
  </div>
</template>

<script>
export default {
  name: "InputNumber",
  props: {
    minNum: {
      type: Number,
      default: 1
    },
    maxNum: {
      type: Number,
      default: 20
    },
    counter: {
      type:Number,
      default: 1
    },
    size: {
      type: String,
      default: 'mini',
      validator(val) {
        return ['large', 'mini'].includes(val);
      }
    }
  },
  data() {
    return {
      number: this.counter
    };
  },
  watch: {
    number(value) {
      this.$emit("numChange", value);
    }
  },
  methods: {
		increase() {
			if (this.number >= this.maxNum) {
				return;
			}
			this.number++;
		},
		decrease() {
      if (this.number <= this.minNum) {
        this.$emit('deeItem');
        return;
			}
      this.number--;
		},
    // 输入框输入数字时，修改它的类型
    handleNumber() {
      this.number = +this.number;
    },
    formatNumber() {
      let formatNum = 0;
      if (isNaN(this.number)) {
        formatNum = this.minNum;
      } else {
        formatNum = Number(this.number);
      }
      // 最大限制
      if (formatNum >= this.maxNum) {
        formatNum = this.maxNum;
      }
      // 最小限制
      if (formatNum <= this.minNum) {
        formatNum = this.minNum;
      }
      this.number = formatNum;
    }
  }
};
</script>

<style lang="scss">
.input-number.large {
  position: relative;
  display: inline-block;
  width: 180px;
  line-height: 38px;

  &.mini {
    width: 70px;
    line-height: 18px;

    span {
      width: 20px;
      font-size: 16px;
      color: #000;
    }
    .input {
      font-size: 14px;

      input {
        height: 20px;
        line-height: 20px;
        padding-left: 19px;
        padding-right: 19px;
      }
    }
  }

  span {
    position: absolute;
    z-index: 1;
    top: 1px;
    width: 40px;
    height: auto;
    text-align: center;
    background: #f5f7fa;
    color: #606266;
    cursor: pointer;
    font-size: 20px;

    &:hover {
      color: #409eff;
    }
    &.increase {
      right: 1px;
      border-radius: 0 4px 4px 0;
      border-left: 1px solid #dcdfe6;
    }
    &.decrease {
      left: 1px;
      border-radius: 4px 0 0 4px;
      border-right: 1px solid #dcdfe6;
    }

		&.disabled {
			color: #c0c4cc;
    	cursor: not-allowed;
		}
  }
  .input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
    display: block;

    input {
      background-image: none;
      background-color: #fff;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      display: inline-block;
      border-radius: 4px;
      color: #606266;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: none;
      padding: 0 15px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;

      padding-left: 50px;
      padding-right: 50px;
      text-align: center;

      &:focus {
        outline: none;
        border-color: #409eff;
      }
    }
  }
}
</style>
