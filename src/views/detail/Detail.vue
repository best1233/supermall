<template>
  <div>
    <h2>Detail</h2>
		{{ id }}
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: {
    id: { required: true }
  }
};
</script>

<style scoped lang="scss"></style>
