<template>
  <div class="image border">
    <transition
      appear
      name="fade"
    >
      <img
        :style="{width: '185px', height: '278px'}"
        :src="notFoundSvg"
        :alt="alt"
        key="1"
        v-if="isCorruptUrl"
      />
      <img
        :alt="alt"
        :src="url"
        key="1"
        v-else
      />
    </transition>

    <slot></slot>
  </div>
</template>

<script>
  import notFoundSvg from '../assets/not-found.svg';

  export default {
    props: {
      baseUrl: {
        required: true,
      },
      path: {
        required: true,
      },
      sizes: {
        required: true,
      },
      size: {
        required: true,
      },
      alt: { default: 'image alt' },
    },

    data() {
      return {
        notFoundSvg,
      };
    },

    computed: {
      isCorruptUrl() {
        return [this.imageSize, this.baseUrl, this.path].some(
          el => Boolean(el) === false,
        );
      },

      imageSize() {
        return this.sizes.find(el => el === this.size);
      },

      url() {
        return `${this.baseUrl}${this.imageSize}${this.path}`;
      },
    },
  };
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
