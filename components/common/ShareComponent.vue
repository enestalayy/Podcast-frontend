<template>
  <div>
    <PrimeInputGroup>
      <PrimeInputText
        ref="copyText"
        id="myInput"
        value="http://localhost:3000/profile"
        readonly
        class="w-25rem"
      ></PrimeInputText>
      <PrimeButton
        @click="copyToClipboard"
        v-tooltip.bottom="{
          value: 'Panoya Kopyalandı',
          pt: {
            arrow: {
              style: {
                borderBottomColor: 'var(--primary-color)',
              },
            },
            text: {
              style: {
                Color: 'var(--surface-ground)',
                backgroundColor: 'var(--primary-color)',
              },
            },
          },
        }"
        :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
      />
    </PrimeInputGroup>
    <ul class="w-full row-around">
      <li>
        <NuxtLink @click.prevent="openInNewWindow(whatsappLink)">
          <PrimeButton class="col-center gap-5" text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="68"
              viewBox="0 0 68 68"
            >
              <g fill="none" fill-rule="evenodd">
                <rect width="68" height="68" fill="#1DA1F2" rx="34"></rect>
                <path
                  fill="#FFF"
                  d="M53.014 25.718l-3.29-1.41 1.723-3.76-4.01 1.332c-1.278-1.19-2.954-1.861-4.7-1.88-3.89.009-7.041 3.16-7.05 7.05v1.566c-5.546 1.144-10.387-1.88-14.883-7.05-.783 4.178 0 7.311 2.35 9.4L18 30.183c.411 3.425 3.215 6.064 6.658 6.266l-4.308 1.567c1.567 3.133 4.418 3.619 8.225 3.917-3.112 2.122-6.81 3.217-10.575 3.133 19.99 8.883 31.724-4.167 31.724-15.666v-1.3l3.29-2.382z"
                ></path>
              </g>
            </svg>
            <p class="m-0" style="color: var(--text-color)">Twitter</p>
          </PrimeButton>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink @click.prevent="openInNewWindow(whatsappLink)">
          <PrimeButton class="col-center gap-5" text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="68"
              viewBox="0 0 68 68"
            >
              <g fill="none" fill-rule="evenodd">
                <rect width="68" height="68" fill="#3F51B5" rx="34"></rect>
                <path
                  fill="#FFF"
                  fill-rule="nonzero"
                  d="M36.535 51V35.492h5.01l.752-6.045h-5.762v-3.86c0-1.75.466-2.942 2.885-2.942l3.08-.001v-5.407c-.533-.072-2.361-.237-4.489-.237-4.443 0-7.486 2.817-7.486 7.989v4.458H25.5v6.045h5.025V51h6.01z"
                ></path>
              </g>
            </svg>
            <p class="m-0" style="color: var(--text-color)">Facebook</p>
          </PrimeButton>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink @click.prevent="openInNewWindow(whatsappLink)">
          <PrimeButton class="col-center gap-5" text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="68"
              viewBox="0 0 68 68"
            >
              <g fill="none" fill-rule="evenodd">
                <rect width="68" height="68" fill="#40C351" rx="34"></rect>
                <g fill="#FFF">
                  <path
                    d="M14.65 11.064c-.33-.734-.678-.75-.993-.762-.258-.011-.551-.01-.845-.01-.294 0-.772.11-1.176.552-.405.442-1.544 1.508-1.544 3.678s1.58 4.267 1.8 4.56c.22.295 3.052 4.89 7.535 6.658 3.725 1.47 4.483 1.177 5.292 1.104.81-.074 2.61-1.067 2.977-2.097s.367-1.912.258-2.096c-.111-.184-.405-.294-.845-.515-.441-.221-2.61-1.288-3.014-1.435-.405-.147-.699-.22-.993.222-.294.44-1.14 1.434-1.397 1.728-.257.295-.515.332-.955.11-.441-.22-1.862-.686-3.547-2.188-1.311-1.169-2.196-2.612-2.454-3.054-.257-.44-.028-.68.194-.9.198-.198.44-.515.662-.772.22-.258.293-.442.44-.736.147-.295.074-.552-.037-.772-.109-.222-.966-2.403-1.358-3.275z"
                    transform="translate(15 15)"
                  ></path>
                  <path
                    fill-rule="nonzero"
                    d="M32.207 5.522C28.663 1.963 23.95.002 18.93 0 8.582 0 .162 8.447.158 18.829c-.002 3.319.863 6.558 2.505 9.414L0 38l9.95-2.618c2.743 1.5 5.83 2.29 8.97 2.292h.009c10.345 0 18.767-8.448 18.771-18.83.002-5.032-1.95-9.763-5.493-13.322zM18.93 34.494h-.006c-2.8-.002-5.546-.756-7.941-2.182l-.57-.34-5.905 1.554 1.576-5.775-.371-.592c-1.562-2.492-2.386-5.372-2.385-8.329.003-8.63 7.002-15.65 15.608-15.65 4.167.002 8.084 1.632 11.03 4.59 2.946 2.958 4.567 6.89 4.566 11.073-.004 8.63-7.003 15.65-15.602 15.65z"
                    transform="translate(15 15)"
                  ></path>
                </g>
              </g>
            </svg>
            <p class="m-0" style="color: var(--text-color)">Whatsapp</p>
          </PrimeButton>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ShareComponent",
  props: {
    prop: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      copied: false,
      members: [
        {
          name: "Amy Elsner",
          image: "amyelsner.png",
          email: "amy@email.com",
          role: "Owner",
        },
        {
          name: "Bernardo Dominic",
          image: "bernardodominic.png",
          email: "bernardo@email.com",
          role: "Editor",
        },
        {
          name: "Ioni Bowcher",
          image: "ionibowcher.png",
          email: "ioni@email.com",
          role: "Viewer",
        },
      ],
    };
  },
  computed: {
    whatsappLink() {
      const text = encodeURIComponent("Check out this podcast: ");
      const url = encodeURIComponent(this.prop.shareUrl);
      console.log("this.prop.shareUrl :>> ", this.prop.shareUrl);
      return `https://api.whatsapp.com/send?text=${text}${url}`;
    },
    facebookLink() {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        this.podcastUrl
      )}`;
    },
    twitterLink() {
      const text = encodeURIComponent("Check out this podcast: ");
      const url = encodeURIComponent(this.podcastUrl);
      return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    },
    emailLink() {
      const subject = encodeURIComponent("Check out this podcast");
      const body = encodeURIComponent(
        `I found this great podcast: ${this.podcastUrl}`
      );
      return `mailto:?subject=${subject}&body=${body}`;
    },
    tiktokLink() {
      // TikTok paylaşım linki yoktur; bu, kullanıcıları TikTok'a yönlendirmek için bir alternatiftir.
      return `https://www.tiktok.com/`;
    },
    discordLink() {
      const text = encodeURIComponent("Check out this podcast: ");
      const url = encodeURIComponent(this.podcastUrl);
      return `https://discord.com/channels/@me?url=${url}&text=${text}`;
    },
    threadsLink() {
      // Threads için bir paylaşım linki yoktur; bu, kullanıcıları Threads'e yönlendirmek için bir alternatiftir.
      return `https://www.threads.net/`;
    },
  },
  methods: {
    openInNewWindow(url) {
      window.open(
        url,
        "_blank",
        "width=800,height=600,scrollbars=yes,resizable=yes"
      );
    },
    copyToClipboard() {
      const copyText = this.$refs.copyText.$el;
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);
      this.copied = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
