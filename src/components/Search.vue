<template>
  <input
    :value="value"
    @input="debouncedInputHandler"
    placeholder="Please enter movie name"
    type="text"
  />
</template>

<script>
  import { debounce } from '@/modules/debounce.js';

  export default {
    name: 'Search',

    props: ['value'],

    methods: {
      inputHandler($event) {
        this.$emit('input', $event.target.value);
      },
    },

    created() {
      this.debouncedInputHandler = debounce(this.inputHandler, 300);
    },
  };
</script>
