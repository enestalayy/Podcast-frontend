<template>
  <div>
    <PrimeMessage :severity="severity">{{
      messages.message ? messages.message : message
    }}</PrimeMessage>
  </div>
</template>

<script>
import messages from "~/utils/messages.json";
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
