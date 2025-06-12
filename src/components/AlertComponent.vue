<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-vue-next";

const props = defineProps({
  message: String,
  sucesso: Boolean,
});

const isError = !props.sucesso;
</script>

<template>
  <Alert :class="isError
      ? 'bg-red-100 border-red-500 text-red-800'
      : 'bg-green-100 border-green-500 text-green-800'
    ">
    <component :is="isError ? XCircle : CheckCircle" class="h-4 w-4" />
    <AlertTitle>{{ isError ? "Erro!" : "Sucesso!" }}</AlertTitle>
    <AlertDescription>
      {{ message }}
    </AlertDescription>
  </Alert>
</template>
