<template>
  <div>
    <PrimeMessage :severity="severity">{{
      message || messages.message || messages[message] || messages.auth
    }}</PrimeMessage>
  </div>
</template>

<script>
import messages from "~/assets/jsons/messages.json";
export default {
  name: "Message",
  data() {
    return {
      messages: messages,
    };
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      default: "info",
      required: false,
    },
  },
};
</script>

<style scoped></style>
