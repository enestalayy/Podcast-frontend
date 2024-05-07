<template>
  <section
    class="section-home-blog"
    style="overflow-x: hidden; background-color: white !important"
  >
    <div class="page-padding">
      <div class="container-large">
        <div class="padding-vertical padding-xhuge">
          <div class="top-blog-content">
            <div class="d-flex flex-row justify-content-center w-100">
              <h2
                ref="parentSpan"
                class="heading-medium text-animation text-center"
              >
                <span class="animated-title"
                  >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis sit ratione facere voluptatum aliquid impedit
                  explicabo, optio adipisci harum, neque eius? Asperiores sequi
                  facilis quas odit sapiente! Dolorum, nisi reprehenderit labore
                  repellendus perspiciatis minima rem laudantium accusamus
                  architecto autem nesciunt, dignissimos, tenetur delectus
                  temporibus ipsam at neque ipsa consequuntur. Impedit!
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ScrollAnimationTextsTheme2",

  computed: {},

  watch: {},
  mounted() {
    window.addEventListener("scroll", this.revealSpans);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.revealSpans);
  },

  methods: {
    revealSpans() {
      if (this.$refs.parentSpan && this.$refs.parentSpan.children) {
        const spans = this.$refs.parentSpan.children[0];
        const triggerDistance = window.innerHeight * 0.85;
        const rect = spans.getBoundingClientRect();

        let math = 1 - (Math.max(rect.top, 0) - triggerDistance) / 5;
        math = math < 0 ? 0 : math > 100 ? 100 : math;
        spans.style.backgroundSize = `${math}% 100%`;
      }
    },
  },
};
</script>

<style scoped>
@keyframes reveal {
  from {
    opacity: 0;
    clip-path: inset(45% 20% 45% 20%);
  }
  to {
    opacity: 1;
    clip-path: inset(0% 0% 0% 0%);
  }
}

@-webkit-keyframes reveal {
  from {
    opacity: 0;
    clip-path: inset(45% 20% 45% 20%);
  }
  to {
    opacity: 1;
    clip-path: inset(0% 0% 0% 0%);
  }
}

span {
  color: darkorchid !important;
  background-clip: text;
  background-repeat: no-repeat;
  background-image: -webkit-linear-gradient(90deg, brown, brown);
  background-image: linear-gradient(90deg, brown, brown);
}

.heading-medium {
  line-height: 1.3;
}
</style>
