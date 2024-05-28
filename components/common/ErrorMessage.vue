<template>
  <div>
    {{ message }}
    <PrimeMessage :severity="severity">{{
      messages[message] || messages.auth[message] || message
    }}</PrimeMessage>
  </div>
</template>

<script>
import messages from "~/assets/jsons/messages.json";
export default {
  name: "ErrorMessage",
  data() {
    return {
      messages: messages,
    };
  },
  props: {
    message: {
      type: Object || String,
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
